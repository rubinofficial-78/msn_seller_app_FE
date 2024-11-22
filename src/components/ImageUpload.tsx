import React, { useEffect, useState } from "react";
import ImageUploading from "react-images-uploading";
import Cropper from "react-easy-crop";
import { Image } from "@chakra-ui/image";
import { useDispatch } from "react-redux";
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Button } from "@mui/material";
import { toast } from "react-toastify";
import { Trash2 } from 'lucide-react';

interface ImageUploadProps {
  id?: string;
  value?: string | null;
  label?: string;
  aspect_ratio?: number | "free";
  handleImageLink?: (id: string, link: string | null, index?: number) => void;
  index?: number;
  showLable?: boolean;
  text?: string;
  required?: boolean;
}

// Helper function to crop image
const cropImage = async (imageSrc: string, pixelCrop: any, flip = { horizontal: false, vertical: false }) => {
  const image = new Image();
  image.src = imageSrc;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('No 2d context');
  }

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        throw new Error('Canvas is empty');
      }
      resolve(URL.createObjectURL(blob));
    }, 'image/jpeg');
  });
};

const ImageUploadingButton: React.FC<{ value: any; onChange: (value: any) => void }> = ({ value, onChange }) => {
  return (
    <ImageUploading
      value={value}
      onChange={onChange}
      acceptType={["png", "svg"]}
      maxFileSize={10485760} // 10MB
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
                  className="relative cursor-pointer rounded-md font-semibold text-primary-600"
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

const ImageCropper: React.FC<{
  open: boolean;
  image: string;
  onComplete: (result: Promise<string>) => void;
  containerStyle?: React.CSSProperties;
  aspect_ratio: number;
}> = ({ open, image, onComplete, containerStyle, aspect_ratio }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle>Crop Image</DialogTitle>
      <DialogContent>
        <div style={containerStyle}>
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={aspect_ratio}
            onCropChange={setCrop}
            onCropComplete={(_, croppedAreaPixels) => {
              setCroppedAreaPixels(croppedAreaPixels);
            }}
            onZoomChange={setZoom}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => onComplete(cropImage(image, croppedAreaPixels))}
        >
          Finish
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const ImageUpload: React.FC<ImageUploadProps> = ({
  id,
  value = null,
  label = "Image Upload",
  aspect_ratio = 1,
  handleImageLink = () => {},
  index,
  showLable = true,
  text = "",
  required = false
}) => {
  const dispatch = useDispatch();
  const [images, setImages] = useState<any[]>([]);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (croppedImage) {
      // Handle image upload logic here
      // You'll need to implement your own upload logic
      handleImageLink(id || '', croppedImage, index);
    }
  }, [croppedImage]);

  const handleDeleteImage = () => {
    setCroppedImage(null);
    handleImageLink(id || '', null, index);
  };

  return (
    <div>
      {showLable && (
        <span className="text-primary-600 font-medium">
          {label}
        </span>
      )}
      <div className="mt-4 place-items-center grid grid-cols-2 max-w-xl">
        <div>
          {(value || croppedImage) ? (
            <div className="relative w-fit">
              <Image
                src={value || croppedImage || ''}
                alt="image"
                className="h-24 object-contain"
              />
              <IconButton
                size="small"
                className="absolute top-0 right-0 text-red-600"
                onClick={handleDeleteImage}
              >
                <Trash2 size={16} />
              </IconButton>
            </div>
          ) : (
            <ImageUploadingButton
              value={images}
              onChange={(newImage) => {
                setDialogOpen(true);
                setImages(newImage);
              }}
            />
          )}
        </div>

        <div className="text-[10px] md:text-sm font-medium">
          {text || "For the logo image, please ensure it has a transparent background. Additionally, the file size should not exceed 10 megabytes. Accepted formats include PNG, SVG."}
        </div>
      </div>

      <ImageCropper
        open={dialogOpen}
        image={images.length > 0 ? images[0].dataURL : ''}
        onComplete={(imagePromise) => {
          imagePromise.then((image) => {
            setCroppedImage(image);
            setDialogOpen(false);
          });
        }}
        aspect_ratio={aspect_ratio === 'free' ? 1 : aspect_ratio}
        containerStyle={{
          position: "relative",
          width: "100%",
          height: 300,
        }}
      />
    </div>
  );
};

export default ImageUpload; 