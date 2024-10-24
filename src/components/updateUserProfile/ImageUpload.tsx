import React from "react";
import { UseFormReturn } from "react-hook-form";
import { ThreeDots } from "react-loader-spinner";
import { TuserSchema } from "../../utils/userSchema";
import useImageUpload from "../../components/updateUserProfile/useImagePreview";
import ImagePreview from "../../components/updateUserProfile/imagePreview";

interface ImageUploadProps {
  form: UseFormReturn<TuserSchema>;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ form }) => {
  const { previewImage, isUploading } = useImageUpload(form);

  return (

      <div className="w-full absolute top-20 px-8">
        <span>
          {isUploading && <ThreeDots height="30" width="30" color="#ffffff" />}
        </span>
        <ImagePreview previewImage={previewImage} form={form} />
      </div>
  );
};

export default ImageUpload;
