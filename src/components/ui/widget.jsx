import { useState } from 'react';
import { Cloudinary } from 'cloudinary-core';
import Image from 'next/image';

export default function CloudinaryWidget({ onUpload }) {
  const cloudinary = new Cloudinary({ cloud_name: 'dl2k5jq2r' });
  const [imageUrl, setImageUrl] = useState(null);

  const openWidget = () => {
    window.cloudinary.createUploadWidget(
      {
        cloudName: 'dl2k5jq2r',
        uploadPreset: 'kwhcbt4j', // set up in Cloudinary Dashboard
        multiple: false,
      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          setImageUrl(result.info.secure_url);
          onUpload(result.info);
        }
      }
    ).open();
  };

  return (
    <div>
      <button onClick={openWidget}>Upload Image</button>
      {imageUrl && <Image src={imageUrl} alt="Uploaded Image" width="100" />}
      
    </div>
  );
}
