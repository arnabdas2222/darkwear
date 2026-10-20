import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  auth,
  googleProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  updateFirebaseProfile,
  isConfigured
} from '../services/firebase';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  // Sync user with backend MongoDB
  const syncWithBackend = async (firebaseUser, customName = null) => {
    try {
      let token = 'mock-token-customer';
      if (firebaseUser.getIdToken) {
        token = await firebaseUser.getIdToken(true);
      } else if (firebaseUser.token) {
        token = firebaseUser.token;
      }
      localStorage.setItem('darkwear_auth_token', token);

      const res = await api.post('/users/sync', {
        displayName: customName || firebaseUser.displayName || 'DarkWear Member',
        email: firebaseUser.email,
        photoURL: firebaseUser.photoURL || ''
      });

      if (res.data?.success) {
        setUserProfile(res.data.data);
      }
    } catch (err) {
      console.warn('[AuthContext] Backend sync warning:', err.message);
      // Fallback local profile if backend is starting
      setUserProfile({
        firebaseUid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: customName || firebaseUser.displayName || 'DarkWear Member',
        role: firebaseUser.email === 'admin@darkwear.com' ? 'admin' : 'customer'
      });
    }
  };

  useEffect(() => {
    // Check local storage for persistent demo/fallback session
    const savedDemoUser = localStorage.getItem('darkwear_demo_user');
    if (!isConfigured && savedDemoUser) {
      try {
        const parsed = JSON.parse(savedDemoUser);
        setCurrentUser(parsed);
        setUserProfile(parsed.profile);
        setLoading(false);
        return;
      } catch (e) {
        localStorage.removeItem('darkwear_demo_user');
      }
    }

    if (auth && isConfigured) {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          setCurrentUser(user);
          await syncWithBackend(user);
        } else {
          setCurrentUser(null);
          setUserProfile(null);
          localStorage.removeItem('darkwear_auth_token');
        }
        setLoading(false);
      });
      return unsubscribe;
    } else {
      setLoading(false);
    }
  }, []);

  // Email / Password Login
  const login = async (email, password) => {
    setAuthError(null);
    try {
      if (isConfigured && auth) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        setCurrentUser(userCredential.user);
        await syncWithBackend(userCredential.user);
        return userCredential.user;
      } else {
        // Fallback demo authentication when Firebase is unconfigured
        const isAdmin = email.toLowerCase().includes('admin');
        const mockUser = {
          uid: isAdmin ? 'admin-uid-100' : 'demo-customer-uid-200',
          email: email,
          displayName: isAdmin ? 'DarkWear Admin' : 'Streetwear Member',
          token: isAdmin ? 'admin-token' : 'mock-token-customer'
        };
        const mockProfile = {
          _id: isAdmin ? 'user_admin' : 'user_customer',
          firebaseUid: mockUser.uid,
          email: mockUser.email,
          displayName: mockUser.displayName,
          role: isAdmin ? 'admin' : 'customer'
        };
        localStorage.setItem('darkwear_auth_token', mockUser.token);
        localStorage.setItem('darkwear_demo_user', JSON.stringify({ ...mockUser, profile: mockProfile }));
        setCurrentUser(mockUser);
        setUserProfile(mockProfile);
        await syncWithBackend(mockUser);
        return mockUser;
      }
    } catch (err) {
      setAuthError(err.message);
      throw err;
    }
  };

  // Sign up
  const signup = async (name, email, password) => {
    setAuthError(null);
    try {
      if (isConfigured && auth) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateFirebaseProfile(userCredential.user, { displayName: name });
        setCurrentUser(userCredential.user);
        await syncWithBackend(userCredential.user, name);
        return userCredential.user;
      } else {
        // Fallback registration
        const isAdmin = email.toLowerCase().includes('admin');
        const mockUser = {
          uid: `user_${Date.now()}`,
          email,
          displayName: name,
          token: isAdmin ? 'admin-token' : 'mock-token-customer'
        };
        const mockProfile = {
          _id: `user_${Date.now()}`,
          firebaseUid: mockUser.uid,
          email: mockUser.email,
          displayName: name,
          role: isAdmin ? 'admin' : 'customer'
        };
        localStorage.setItem('darkwear_auth_token', mockUser.token);
        localStorage.setItem('darkwear_demo_user', JSON.stringify({ ...mockUser, profile: mockProfile }));
        setCurrentUser(mockUser);
        setUserProfile(mockProfile);
        await syncWithBackend(mockUser, name);
        return mockUser;
      }
    } catch (err) {
      setAuthError(err.message);
      throw err;
    }
  };

  // Google Sign-In
  const loginWithGoogle = async () => {
    setAuthError(null);
    try {
      if (isConfigured && auth) {
        const result = await signInWithPopup(auth, googleProvider);
        setCurrentUser(result.user);
        await syncWithBackend(result.user);
        return result.user;
      } else {
        // Demo Google Sign-In
        const googleUser = {
          uid: 'google-uid-' + Math.floor(1000 + Math.random() * 9000),
          email: 'google.shopper@darkwear.com',
          displayName: 'Google Shopper',
          photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
          token: 'mock-token-customer'
        };
        const profile = {
          firebaseUid: googleUser.uid,
          email: googleUser.email,
          displayName: googleUser.displayName,
          photoURL: googleUser.photoURL,
          role: 'customer'
        };
        localStorage.setItem('darkwear_auth_token', googleUser.token);
        localStorage.setItem('darkwear_demo_user', JSON.stringify({ ...googleUser, profile }));
        setCurrentUser(googleUser);
        setUserProfile(profile);
        await syncWithBackend(googleUser);
        return googleUser;
      }
    } catch (err) {
      setAuthError(err.message);
      throw err;
    }
  };

  // Sign out
  const logout = async () => {
    try {
      if (isConfigured && auth) {
        await signOut(auth);
      }
    } catch (e) {
      console.warn('Firebase logout note:', e.message);
    } finally {
      setCurrentUser(null);
      setUserProfile(null);
      localStorage.removeItem('darkwear_auth_token');
      localStorage.removeItem('darkwear_demo_user');
    }
  };

  // Password reset
  const resetPassword = async (email) => {
    if (isConfigured && auth) {
      return await sendPasswordResetEmail(auth, email);
    }
    // Simulation
    return new Promise(resolve => setTimeout(resolve, 800));
  };

  // Quick switch for demo testing
  const quickLoginDemo = async (role = 'customer') => {
    const isAdmin = role === 'admin';
    const email = isAdmin ? 'admin@darkwear.com' : 'shopper@darkwear.com';
    return await login(email, 'darkwear123');
  };

  const isAdmin = userProfile?.role === 'admin' || currentUser?.email === 'admin@darkwear.com';

  const value = {
    currentUser,
    userProfile,
    isAdmin,
    loading,
    authError,
    login,
    signup,
    loginWithGoogle,
    logout,
    resetPassword,
    quickLoginDemo,
    syncWithBackend,
    isFirebaseConfigured: isConfigured
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
