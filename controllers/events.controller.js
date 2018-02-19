const User = require('../models/User');

/**
 * Events Index
 * gets all events for the current user
 * @param {Object} req the request object
 * @param {Object} res the response object
 */
exports.index = async (req, res) => {
  // get the user
  const events = await User.fetchEvents(req.decodedToken.id);

  if (!events) {
    res.status(404).json({
      success: false,
      message: 'Events not found!',
    });
  }

  // send the user's events
  res.json({
    success: true,
    events,
  });
};

/**
 * Events Show
 * show a single event
 * @param {Object} req the request object
 * @param {Object} res the response object
 */
exports.show = async (req, res) => {
  // use the fetchSingleEvent model method
  const event = await User.fetchSingleEvent(req.decodedToken.id, req.params.eventId);

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

/**
 * Create Event
 * create a new event with given params
 * @param {Object} req the request object
 * @param {Object} res the response object
 */
exports.create = async (req, res) => {
  const user = await User.findUserById(req.decodedToken.id);
  const { newEvent } = req.body;

  if (user) {
    user.events.addToSet(newEvent);
    user.save();
    res.json({
      success: true,
      events: user.events,
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'User not found!',
    });
  }
}
