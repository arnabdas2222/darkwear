const { verifyFirebaseToken } = require('../config/firebase');
const { userStore } = require('../data/store');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decodedToken = await verifyFirebaseToken(token);

      // Fetch or sync user profile
      let user = await userStore.findByUid(decodedToken.uid);

      if (!user) {
        user = await userStore.upsert({
          firebaseUid: decodedToken.uid,
          email: decodedToken.email || `${decodedToken.uid}@darkwear.com`,
          displayName: decodedToken.name || decodedToken.displayName || 'DarkWear Member',
          photoURL: decodedToken.picture || ''
        });
      }

      req.user = user;
      req.firebaseUser = decodedToken;
      return next();
    } catch (error) {
      console.error('[AuthMiddleware] Token verification failed:', error.message);
      return res.status(401).json({
        success: false,
        message: 'Authentication failed. Invalid or expired token.',
        error: error.message
      });
    }
  }

  return res.status(401).json({
    success: false,
    message: 'Access denied. No authorization token provided.'
  });
};

module.exports = { protect };
