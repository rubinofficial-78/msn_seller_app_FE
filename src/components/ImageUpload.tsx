import React, { useEffect, useState } from "react";
import ImageUploading from "react-images-uploading";
import Cropper from "react-easy-crop";
import { Image } from "@chakra-ui/image";
import { useDispatch } from "react-redux";
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Button } from "@mui/material";
import { toast } from "react-toastify";
import { Trash2, Eye } from 'lucide-react';

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
  uploadText?: string;
  uploadDescription?: string;
  multiple?: boolean;
}

// Helper function to crop image
const cropImage = async (imageSrc: string, pixelCrop: any) => {
  return new Promise<string>((resolve, reject) => {
    const image = document.createElement('img');
    image.src = imageSrc;
    
    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        reject(new Error('No 2d context'));
        return;
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

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Canvas is empty'));
            return;
          }
          resolve(URL.createObjectURL(blob));
        },
        'image/jpeg',
        1
      );
    };

    image.onerror = () => {
      reject(new Error('Failed to load image'));
    };
  });
};

const ImageUploadingButton: React.FC<{ value: any; onChange: (value: any) => void; uploadText?: string; uploadDescription?: string }> = 
  ({ value, onChange, uploadText, uploadDescription }) => {
  return (
    <ImageUploading
      value={value}
      onChange={onChange}
      acceptType={["jpg", "png", "gif"]}
      maxFileSize={10485760} // 10MB
      multiple
    >
      {({ onImageUpload, onImageUpdate, isDragging, dragProps }) => (
        <div className="col-span-full">
          <div
            className={`mt-2 flex justify-center rounded-lg border-2 border-dashed border-gray-300 px-6 py-10 cursor-pointer
              ${isDragging ? 'border-blue-500 bg-blue-50' : 'hover:border-gray-400'}`}
            onClick={onImageUpload}
            {...dragProps}
          >
            <div className="text-center">
              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <label className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500">
                  <span>{uploadText || 'Upload files'}</span>
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs leading-5 text-gray-600">
                {uploadDescription || 'PNG, JPG, GIF up to 10MB'}
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
  onComplete: (croppedImage: string) => void;
  containerStyle?: React.CSSProperties;
  aspect_ratio: number;
}> = ({ open, image, onComplete, containerStyle, aspect_ratio }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const handleCrop = async () => {
    try {
      const croppedImage = await cropImage(image, croppedAreaPixels);
      onComplete(croppedImage);
    } catch (error) {
      console.error('Error cropping image:', error);
    }
  };

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
        <Button onClick={handleCrop}>
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
  required = false,
  uploadText,
  uploadDescription,
  multiple = false
}) => {
  const [images, setImages] = useState<any[]>([]);
  const [croppedImages, setCroppedImages] = useState<string[]>([]);
  const [currentImage, setCurrentImage] = useState<string>('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>('');

  useEffect(() => {
    if (croppedImages.length > 0) {
      handleImageLink(id || '', croppedImages.join(','), index);
    }
  }, [croppedImages]);

  const handleDeleteImage = (index: number) => {
    const newCroppedImages = croppedImages.filter((_, i) => i !== index);
    setCroppedImages(newCroppedImages);
    handleImageLink(id || '', newCroppedImages.join(','), index);
  };

  const handleNewImages = (imageList: any) => {
    setImages(imageList);
    if (aspect_ratio === 'free') {
      // If no cropping needed, directly use the images
      const newImages = imageList.map((img: any) => img.dataURL);
      setCroppedImages(prev => [...prev, ...newImages]);
    } else {
      // If cropping needed, open dialog for each image
      setCurrentImage(imageList[0].dataURL);
      setDialogOpen(true);
    }
  };

  const handleCroppedImage = (croppedImage: string) => {
    setCroppedImages(prev => [...prev, croppedImage]);
    setDialogOpen(false);
  };

  const handleViewImage = (image: string) => {
    setSelectedImage(image);
    setViewDialogOpen(true);
  };

  return (
    <div className="w-full">
      {showLable && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="space-y-4">
        {/* Image Preview Grid */}
        {croppedImages.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {croppedImages.map((img, idx) => (
              <div key={idx} className="relative group">
                <img
                  src={img}
                  alt={`Product ${idx + 1}`}
                  className="h-24 w-24 object-cover rounded-lg"
                />
                <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {/* View Button */}
                  <button
                    onClick={() => handleViewImage(img)}
                    className="p-1 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                    title="View Image"
                  >
                    <Eye size={16} />
                  </button>
                  {/* Delete Button */}
                  <button
                    onClick={() => handleDeleteImage(idx)}
                    className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    title="Delete Image"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Upload Button */}
        <ImageUploadingButton
          value={images}
          onChange={handleNewImages}
          uploadText={uploadText}
          uploadDescription={uploadDescription}
        />
      </div>

      {/* Cropper Dialog */}
      {aspect_ratio !== 'free' && (
        <ImageCropper
          open={dialogOpen}
          image={currentImage}
          onComplete={handleCroppedImage}
          aspect_ratio={aspect_ratio}
          containerStyle={{
            position: "relative",
            width: "100%",
            height: 300,
          }}
        />
      )}

      {/* Image View Dialog */}
      <Dialog 
        open={viewDialogOpen} 
        onClose={() => setViewDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle className="flex justify-between items-center">
          Image Preview
          <IconButton onClick={() => setViewDialogOpen(false)} size="small">
            <span className="text-gray-500">&times;</span>
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <div className="flex justify-center">
            <img
              src={selectedImage}
              alt="Preview"
              className="max-h-[70vh] object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageUpload; 