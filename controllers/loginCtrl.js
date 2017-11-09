const User = require('../models/userModel');

module.exports = async (req, res) => {
  const user = await User.findUserByEmail(req.body.email);

  res.send(user);
};
