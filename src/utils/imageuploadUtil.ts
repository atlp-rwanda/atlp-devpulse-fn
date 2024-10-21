import { toast } from "react-toastify";
import { uploadImageToCloudinary } from "./uploadImageToCloudinary";
import { FieldValues, UseFormSetValue } from "react-hook-form";
import { TuserSchema } from "../utils/userSchema"; 


// Function to handle image file preview
export const handleFilePreview = (
  file: File,
  setPreviewImage: (url: string) => void
) => {
  const reader = new FileReader();
  reader.onloadend = () => setPreviewImage(reader.result as string);
  reader.readAsDataURL(file);
};




// Function to upload image to cloudinary
export const handleImageUpload = async (
  file: File,
  setValue: UseFormSetValue<TuserSchema>, 
  setIsUploading: (status: boolean) => void
) => {
  setIsUploading(true);
  try {
    
    const imageUrl: any = await uploadImageToCloudinary(file);
    setValue("picture", imageUrl.url);
  } catch (error) {
    console.error("Failed to upload image:", error);
    toast.error("Failed to upload image. Please try again.");
  } finally {
    setIsUploading(false);
  }
};

