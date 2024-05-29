import { v2 } from 'cloudinary';

v2.config({
  cloud_name: 'devfdx8fs',
  api_key: '891586263536798',
  api_secret: 'RzdaT2bvDC4KZ-BeHlm0ZccPcS0',
});

// Upload an image
v2.uploader.upload('my-image.jpg', (error, result) => {
  console.log(result, error);
  result;
});

// Delete an image
v2.uploader.destroy('my-image.jpg', (error, result) => {
  console.log(result, error);
  result;
});

v2.uploader.up