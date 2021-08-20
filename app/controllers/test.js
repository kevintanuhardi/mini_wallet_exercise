/* global Helpers */
const s3Service = require('../services/s3Service');


module.exports = {
  uploadImage: async (req, res) => {
    try {
      console.log(req.files);
      // const file = Buffer.from(req.files.image.data, 'binary');
      // console.log(req.files.image.name);
      // const { Location: imageUrl } = await s3Service.uploadImage(
      //   file,
      //   req.files.image.name,
      //   'customer',
      // );
      // console.log(imageUrl);
      return Helpers.successResponse(
        res,
        200,
        'Successfully updload',
      );
    } catch (err) {
      return Helpers.errorResponse(res, null, err);
    }
  },
};
