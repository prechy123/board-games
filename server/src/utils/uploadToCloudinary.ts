import { v2 as cloudinary } from "cloudinary";

const retryUpload = async (image: string, retries = 3): Promise<string> => {
  try {
    const uploadImage = await cloudinary.uploader.upload(image, {
      folder: "user",
      allowed_formats: ["png", "jpg", "jpeg", "svg", "ico", "jfif", "webp"],
    });

    return uploadImage.url;
  } catch (error) {
    if (retries > 0) {
      console.log(`(${retries} retries left)`);
      return retryUpload(image, retries - 1);
    }
    return "https://raw.githubusercontent.com/nz-m/public-files/main/dp.jpg"
  }
};

const uploadImageToCloudinary = async (image: string): Promise<string> => {
  const url = await retryUpload(image);
  return url;
};

export default uploadImageToCloudinary;
