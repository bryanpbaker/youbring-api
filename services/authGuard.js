module.exports = (req, res, next) => {
  const authenticated = false;

  if (!authenticated) {
    res.status(401).send('Please provide a valid token');
  }

  next();
};
