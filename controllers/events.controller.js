const User = require('../models/User');
const responses = require('../helpers/responses');

/**
 * INDEX
 * gets all events for the current user
 * @param {Object} req the request object
 * @param {Object} res the response object
 */
exports.index = async (req, res) => {
  // get the user
  const events = await User.fetchEvents(req.decodedToken.id);

  if (!events) {
    responses.notFound('Events', res);
  }

  // send the user's events
  res.json({
    success: true,
    events,
  });
};

/**
 * SHOW
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
    responses.notFound('Event', res);
  }
};

/**
 * CREATE
 * create a new event with given params
 * @param {Object} req the request object
 * @param {Object} res the response object
 */
exports.create = async (req, res) => {
  // find the user first
  const user = await User.findOne({ userId: req.decodedToken.id });
  // grab the new event from the request body
  const { newEvent } = req.body;

  // if there's a user...
  if (user) {
    // add the event to the user's events
    user.events.addToSet(newEvent);
    // save the user
    user.save(() => {
      res.json({
        success: true,
        events: user.events,
      });
    });
  } else {
    responses.notFound('User', res);
  }
}

/**
 * UPDATE
 * update a single event
 * @param {Object} req the request object
 * @param {Object} res the response object
 */
exports.update = async(req, res) => {
  // find the user first
  const user = await User.findOne({ userId: req.decodedToken.id });
  // grab the updated event from the request body
  const { updatedEvent } = req.body;

  // if the user is found...
  if (user) {
    // grab the event from the user object
    const event = user.events.id(req.params.eventId);

    // if the event is found
    if (event) {
      // update the event
      event.set(updatedEvent)
      // save the user
      user.save(() => {
        res.json({
          success: true,
          events: user.events,
        });
      });

    } else {
      responses.notFound('Event', res);
    }
    
  } else {
    responses.notFound('User', res);
  }
}

/**
 * DESTROY
 * delete a single event
 * @param {Object} req the request object
 * @param {Object} res the response object
 */
exports.destroy = async(req, res) => {
  // find the user first
  const user = await User.findOne({ userId: req.decodedToken.id });

  // if the user is found...
  if (user) {
    // delete the event
    user.events.pull(req.params.eventId);

    // save the user
    user.save(() => {
      res.json({
        success: true,
        events: user.events,
      });
    })
    
  } else {
    responses.notFound('User', res);
  }
}