const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

let firebaseInitialized = false;

const initFirebase = () => {
  if (firebaseInitialized) return admin;

  try {
    const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
    if (serviceAccountPath && fs.existsSync(serviceAccountPath)) {
      const serviceAccount = require(path.resolve(serviceAccountPath));
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
      firebaseInitialized = true;
      console.log('[Firebase Admin] Initialized with service account file.');
      return admin;
    }

    if (
      process.env.FIREBASE_PROJECT_ID &&
      process.env.FIREBASE_CLIENT_EMAIL &&
      process.env.FIREBASE_PRIVATE_KEY
    ) {
      // In env vars, private key often has escaped newlines "\n"
      const privateKey = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n');
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: privateKey,
        })
      });
      firebaseInitialized = true;
      console.log('[Firebase Admin] Initialized with environment credentials.');
      return admin;
    }

    console.warn('[Firebase Admin] Warning: No Firebase Admin credentials found in .env.');
    console.warn('[Firebase Admin] Running in Development Mode. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY in .env for full production token verification.');
    return null;
  } catch (error) {
    console.error('[Firebase Admin] Initialization failed:', error.message);
    return null;
  }
};

const verifyFirebaseToken = async (idToken) => {
  if (!idToken) throw new Error('No token provided');

  if (firebaseInitialized) {
    return await admin.auth().verifyIdToken(idToken);
  }

  // Graceful fallback for development when Firebase Admin credentials are not yet configured in .env
  // Handles JWT decoding safely to allow instant testing
  try {
    const parts = idToken.split('.');
    if (parts.length === 3) {
      const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString('utf8'));
      if (payload && (payload.user_id || payload.sub || payload.uid || payload.email)) {
        return {
          uid: payload.user_id || payload.sub || payload.uid || 'dev-user',
          email: payload.email || 'customer@darkwear.com',
          name: payload.name || payload.displayName || 'Dev Customer',
          picture: payload.picture || '',
          email_verified: Boolean(payload.email_verified),
          devDecoded: true
        };
      }
    }
  } catch (err) {
    // Fall through
  }

  // If token is a test simulated token (e.g. from UI demo or quick dev)
  if (idToken.startsWith('mock-token-') || idToken.startsWith('test-token-') || idToken === 'admin-token') {
    const isAdmin = idToken.includes('admin');
    return {
      uid: isAdmin ? 'admin-uid-100' : 'demo-customer-uid-200',
      email: isAdmin ? 'admin@darkwear.com' : 'shopper@darkwear.com',
      name: isAdmin ? 'DarkWear Admin' : 'Streetwear Shopper',
      picture: '',
      email_verified: true,
      devDecoded: true
    };
  }

  throw new Error('Invalid or unverified authentication token');
};

module.exports = {
  admin,
  initFirebase,
  verifyFirebaseToken
};
