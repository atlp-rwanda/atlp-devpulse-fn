import { useState, useEffect, useCallback } from "react";
import { UseFormReturn } from "react-hook-form";
import {
  handleFilePreview,
  handleImageUpload,
} from "../../utils/imageuploadUtil";
import { TuserSchema } from "../../utils/userSchema";
import { toast } from "react-toastify";

const DEFAULT_IMAGE =
  "https://t4.ftcdn.net/jpg/01/24/65/69/360_F_124656969_x3y8YVzvrqFZyv3YLWNo6PJaC88SYxqM.jpg";

const useImageUpload = (form: UseFormReturn<TuserSchema>) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { setValue, watch } = form;
  const currentPicture = watch("picture");

  useEffect(() => {
    setPreviewImage(currentPicture || DEFAULT_IMAGE);
  }, [currentPicture]);

  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
   if (file) {
     if (!file.type.startsWith("image/")) {
       toast.error("Only image files are allowed!");
       return;
     }
     handleFilePreview(file, setPreviewImage);
     handleImageUpload(file, setValue, setIsUploading);
   }
    },
    [setValue]
  );

  return { previewImage, isUploading, handleImageChange, DEFAULT_IMAGE };
};

export default useImageUpload;
