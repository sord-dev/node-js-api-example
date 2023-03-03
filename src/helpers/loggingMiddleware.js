function logger(req, res, next) {
  const { url, method } = req;

  // get the current time
  const date = Date(Date.now());
  // get rid of the (GMT+0000 (Greenwich Mean Time)) part of the string
  const timestamp = date.toString().split("GMT")[0];

  // log to console
  console.log(`${method} ${url} ${timestamp}`);

  next();
}

module.exports = logger;
