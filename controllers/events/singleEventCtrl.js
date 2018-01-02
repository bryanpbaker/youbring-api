const User = require('../../models/userModel');

module.exports = async (req, res) => {
  // use the fetchSingleEvent model method
  const event = await User.fetchSingleEvent(req.params.id, req.params.eventId);

  // if an event is found, return it
  if (event) {
    res.json({
      success: true,
      details: event,
    });
  }

  // if not, send a 404
  else {
    res.status(404).json({
      success: false,
      message: 'Event not found!',
    });
  }
};
