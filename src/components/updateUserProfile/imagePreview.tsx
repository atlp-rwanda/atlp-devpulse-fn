import React from "react";
import { UseFormReturn } from "react-hook-form";
import { CiImageOff } from "react-icons/ci";
import { toast } from "react-toastify";
import { TuserSchema } from "../../utils/userSchema";
const DEFAULT_IMAGE: string = require("../../assets/default-image.jpg").default;

interface ImagePreviewProps {
  previewImage: string | null;
  form: UseFormReturn<TuserSchema>;
}


const ImagePreview: React.FC<ImagePreviewProps> = ({ previewImage, form }) => {
  const { setValue, watch } = form;
  const currentPicture = watch("picture");

  const deletePreviewImage = () => {
    if (currentPicture === DEFAULT_IMAGE) {
      toast.info("This is the default image");
    } else {
      setValue("picture", DEFAULT_IMAGE);
      toast.error("Image is removed");
    }
  };

  if (!previewImage) return null;

  return (
    <div className="flex  justify-between flex-wrap mt-5 relative">
      <img
        src={previewImage}
        alt="Preview"
        className="rounded-full w-32 h-32"
      />
      <button
        className="w-36 h-10 self-end flex items-center gap-2 justify-center rounded-md text-white bg-red-700 hover:bg-red-500"
        onClick={deletePreviewImage}
      >
        <CiImageOff size={22} />
        Delete Image
      </button>
    </div>
  );
};

export default ImagePreview;
