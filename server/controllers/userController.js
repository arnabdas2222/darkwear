const { userStore } = require('../data/store');

// @desc    Sync Firebase user into MongoDB / store
// @route   POST /api/users/sync
// @access  Private
const syncUser = async (req, res, next) => {
  try {
    const { displayName, photoURL, email } = req.body;

    const user = await userStore.upsert({
      firebaseUid: req.firebaseUser.uid,
      email: email || req.firebaseUser.email,
      displayName: displayName || req.firebaseUser.name || 'DarkWear Member',
      photoURL: photoURL || req.firebaseUser.picture || ''
    });

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res, next) => {
  try {
    const user = await userStore.findByUid(req.user.firebaseUid);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User profile not found'
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile & shipping address
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res, next) => {
  try {
    const { displayName, phone, shippingAddress } = req.body;

    const updatedUser = await userStore.updateProfile(req.user.firebaseUid, {
      ...(displayName ? { displayName } : {}),
      ...(phone ? { phone } : {}),
      ...(shippingAddress ? { shippingAddress } : {})
    });

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedUser
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  syncUser,
  getUserProfile,
  updateUserProfile
};
