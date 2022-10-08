//custom node module
const someMiddleware = (req, res, next) => {
  console.log('The custom Node Module middleware has been invoked');
  next();
}

module.exports = someMiddleware;