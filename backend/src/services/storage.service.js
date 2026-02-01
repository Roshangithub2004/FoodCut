const ImageKit  =  require('imagekit');
require('dotenv').config()

const client = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

const uploadFile = async (file, fileName)=>{
  return await client.upload({
    file: file, // Buffer or base64 string
    fileName: fileName,
  });

}

module.exports = {
  uploadFile,
}