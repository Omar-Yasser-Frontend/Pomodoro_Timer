module.exports = function (routeHandler) {
  return async function (req, res, next) {
    try {
      await routeHandler(req, res);
    } catch (e) {
      next(e);
    }
  };
};
