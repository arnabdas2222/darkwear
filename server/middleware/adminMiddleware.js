const requireAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }

  // Check if user's email matches admin email list as fallback
  const adminEmails = (process.env.ADMIN_EMAILS || 'admin@darkwear.com')
    .split(',')
    .map(e => e.trim().toLowerCase());

  if (req.user && req.user.email && adminEmails.includes(req.user.email.toLowerCase())) {
    req.user.role = 'admin';
    return next();
  }

  return res.status(403).json({
    success: false,
    message: 'Access restricted to DarkWear administrators only.'
  });
};

module.exports = { requireAdmin };
