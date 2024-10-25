import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Label, Input } from "@/components/ui"; // Make sure these are correctly imported from Shadcn
import { useDropzone } from "react-dropzone";

function ImageUploadForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [selectedImages, setSelectedImages] = useState([]);

  const onDrop = (acceptedFiles) => {
    setSelectedImages([...selectedImages, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: true,
  });

  const handleFormSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      {/* Upload Images */}
      <div>
        <Label htmlFor="images" className="block text-sm font-medium text-gray-700">Upload Images of Service *</Label>
        <div {...getRootProps()} className="border-2 border-dashed border-gray-300 p-4 rounded-lg mt-1 cursor-pointer">
          <input id="images" {...register("images")} {...getInputProps()} className="hidden" />
          <p className="text-gray-500">Drag 'n' drop some files here, or click to select files</p>
        </div>
        {errors.images && <p className="mt-2 text-sm text-red-600">{errors.images.message}</p>}

        {/* Preview Selected Images */}
        <div className="mt-4 grid grid-cols-3 gap-4">
          {selectedImages.map((file, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(file)}
                alt={`Preview ${index}`}
                className="w-full h-24 object-cover rounded-md"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Upload Logo */}
      <div className="mt-4">
        <Label htmlFor="logo" className="block text-sm font-medium text-gray-700">Upload Logo (Optional)</Label>
        <Input type="file" id="logo" {...register("logo")} className="w-full mt-1" />
      </div>

      <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">Submit</button>
    </form>
  );
}

export default ImageUploadForm;
