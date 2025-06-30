//need this file to show the request method and url in the console
function logger(req, res, next) {
    console.log(`${req.method} ${req.url}`);
    next();
  }
  
  module.exports = logger;