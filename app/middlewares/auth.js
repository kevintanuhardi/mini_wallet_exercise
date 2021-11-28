const jwtService = require('../services/jwtService');

const { privateRoute } = require('../helpers/constant');

module.exports = {
  validateToken: async (req, _, next) => {
    const {
      headers,
    } = req;
    try {
      const header = headers.Authorization || headers.authorization;
      if (!header) throw ({ status: 401, message: 'authorization is not exist' });

      const bearer = header.split(' ');

      const { userId } = await jwtService.getDataFromToken(bearer[1]);
      req.userId = userId;

      return next();
    } catch (err) {
      return next(err);
    }
  },
};
