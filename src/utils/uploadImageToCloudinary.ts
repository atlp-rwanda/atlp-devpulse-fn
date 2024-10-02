import axios from "axios";

export const uploadImageToCloudinary = async (file: File) => {

    const token = localStorage.getItem("access_token");

    let userId;
    if (token) {
      const payload = token.split(".")[1];
      const decodedPayload = JSON.parse(atob(payload));
      userId = decodedPayload.data.userId;
    }

  let uploadPreset  = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET as string;
  let cloudinaryName = process.env.REACT_APP_CLOUDINARY_NAME as string;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset",uploadPreset);
  const publicId = `user_${userId}_${Date.now()}}`; 
  formData.append("public_id", publicId);

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudinaryName}/image/upload`,
      formData
    );
  
    return {
      url: response.data.secure_url,
      public_id: response.data.public_id,
    };
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw error;
  }
};
