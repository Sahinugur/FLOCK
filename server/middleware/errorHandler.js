const mainErrorHandler = (err, req, res, next) => {
  if (err) {
    res.status(err.status || 500);
    res.send({ message: err.message });
    //shorter syntax res.status().send()
  }
  next();
};

module.exports = { mainErrorHandler };
