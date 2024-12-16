//@ts-nocheck
import React, { useEffect, useState } from "react";
import ImageUploading from "react-images-uploading";
import { Image } from "@chakra-ui/image";
import { useDispatch } from "react-redux";
import { IconButton, Dialog, DialogTitle, DialogContent } from "@mui/material";
import { toast } from "react-toastify";
import { uploadFile } from "../redux/Action/action";
import DeleteIcon from "@mui/icons-material/Delete";
import { Eye } from "lucide-react";

const ImageUploadingButton = ({ value, onChange, ...props }) => {
  return (
    <ImageUploading
      value={value}
      onChange={onChange}
      acceptType={["png", "svg"]}
      maxFileSize={10485760} // 10MB in bytes
    >
      {({ onImageUpload, onImageUpdate, isDragging, dragProps }) => (
        <div className="col-span-full">
          <div
            className={`mt-2 flex justify-center rounded-lg px-6 py-10`}
            {...dragProps}
            style={{
              backgroundColor: isDragging ? "rgb(229 231 235)" : "white",
              backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='15' ry='15' stroke='%2311182740' stroke-width='2' stroke-dasharray='8' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
              borderRadius: "15px",
            }}
          >
            <div className="text-center">
              <div className="flex text-sm leading-6 text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md font-semibold text-indigo-600"
                  onClick={value ? onImageUpload : () => onImageUpdate(0)}
                >
                  Upload a file
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs leading-5 text-gray-600">
                PNG, SVG up to 10MB
              </p>
            </div>
          </div>
        </div>
      )}
    </ImageUploading>
  );
};

function TailAddSingleImage(props) {
  const dispatch = useDispatch();
  const { handleImageLink, id, index, required = false } = props;
  const [storeLogo, setStoreLogo] = useState([]);

  useEffect(() => {
    if (storeLogo?.length) {
      for (let index = 0; index < storeLogo?.length; index++) {
        let reader = new FileReader();
        reader.readAsDataURL(storeLogo[index]);
        reader.onload = (e) => {
          const payload = {
            data: e.target.result.split(",")[1],
            filetype: storeLogo[index]?.type,
            extension:
              "." +
              storeLogo[index]?.name?.split(".")[
                storeLogo[index]?.name?.split(".")?.length - 1
              ],
            module: "onboarding",
          };
          dispatch(
            uploadFile(payload, (resp) => {
              handleImageLink(id, resp?.data?.link, index);
            })
          );
        };
      }
    }
  }, [storeLogo]);

  return (
    <label
      htmlFor={id ?? "file-upload"}
      className="relative cursor-pointer rounded-md font-semibold"
    >
      <div
        className={`mt-2 gridjustify-center rounded-lg px-6 py-10 text-indigo-600`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='15' ry='15' stroke='%2311182740' stroke-width='2' stroke-dasharray='8' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
          borderRadius: "15px",
        }}
      >
        <div className="w-full text-center text-sm leading-6">
          Upload a file
        </div>
        <p className="text-xs leading-5 text-gray-600">PNG, SVG up to 10MB</p>
      </div>
      <input
        id={id ?? "file-upload"}
        name={id ?? "file-upload"}
        type="file"
        accept="image/svg+xml, image/png"
        className="sr-only"
        onChange={(e) => {
          setStoreLogo(e.target.files);
        }}
        required={required}
      />
    </label>
  );
}

const ImagePreviewDialog = ({ open, onClose, imageUrl }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle className="flex justify-between items-center">
        <span>Image Preview</span>
        <IconButton onClick={onClose} size="small">
          <span className="text-gray-500 text-xl">&times;</span>
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <div className="flex justify-center p-4">
          <img
            src={imageUrl}
            alt="Preview"
            className="max-w-full max-h-[60vh] object-contain"
            style={{ margin: "auto" }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default function ImageUpload({
  id,
  value = null,
  label = "Image Upload",
  handleImageLink = () => {},
  index,
  showLable = true,
  text = "",
  required = false,
}) {
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);

  useEffect(() => {
    if (value && typeof value === 'string' && value.trim() !== '') {
      setUploadedImage(value);
    }
  }, [value]);

  useEffect(() => {
    if (images.length > 0) {
      const file = images[0].file;
      const file_type = file?.type?.split("/")[1];

      if (["png", "svg", "svg+xml"]?.includes(file_type)) {
        const payload = {
          data: images[0].dataURL.split(",")[1],
          filetype: file.type,
          extension: "." + file_type,
          module: "company_details",
        };

        dispatch(
          uploadFile(payload, (resp) => {
            if (resp?.meta?.status) {
              const imageUrl = resp?.data?.link;
              setUploadedImage(imageUrl);
              handleImageLink(id, imageUrl, index);
            } else {
              toast.error(resp?.meta?.message || "Failed to upload image");
            }
          })
        );
      } else {
        toast.error("The supported formats are PNG and SVG");
      }
    }
  }, [images]);

  const handleDeleteImage = () => {
    setUploadedImage(null);
    setImages([]);
    handleImageLink(id, null, index);
  };

  return (
    <div className="">
      {showLable && (
        <span className="text-[#181E7F] font-medium">
          {label ?? "Upload Your Image"}
        </span>
      )}
      <div className="mt-4 place-items-center grid grid-cols-2 max-w-xl">
        <div className="">
          {uploadedImage ? (
            <div className="relative group w-24 h-24">
              <Image
                src={uploadedImage}
                alt="image"
                className="w-full h-full object-contain"
              />
              <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                  onClick={() => setPreviewDialogOpen(true)}
                  className="p-1 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                  title="View Image"
                >
                  <Eye size={16} className="text-blue-600" />
                </button>
                <button
                  onClick={handleDeleteImage}
                  className="p-1 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                  title="Delete Image"
                >
                  <DeleteIcon fontSize="small" className="text-red-600" />
                </button>
              </div>
            </div>
          ) : (
            <ImageUploadingButton
              className="w-fit"
              value={images}
              onChange={setImages}
            />
          )}
        </div>

        {/* <div className="text-[10px] md:text-sm font-medium">
          {text
            ? text
            : "For the logo image, please ensure it has a transparent background. Additionally, the file size should not exceed 10 megabytes. Accepted formats include PNG, SVG."}
        </div> */}
      </div>

      {uploadedImage && (
        <ImagePreviewDialog
          open={previewDialogOpen}
          onClose={() => setPreviewDialogOpen(false)}
          imageUrl={uploadedImage}
        />
      )}
    </div>
  );
}
