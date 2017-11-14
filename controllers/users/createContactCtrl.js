const User = require('../../models/userModel');

module.exports = async (req, res) => {
  const user = await User.findUserById(req.params.id);
  const { newContact } = req.body;

  if (user) {
    user.contacts.push(newContact);
    user.save();
  }
};
