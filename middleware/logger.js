module.exports = (req, res, next) => {
  const log = `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`;
  require('fs').appendFileSync('access.log', log + '\n');
  next();
};
