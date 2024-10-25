import db_connection from "../../../../db";
import Vendor from "../../../../models/vendor";
import cloudinary from "cloudinary";

// Cloudinary configuration
cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = file.arrayBuffer().then((buffer) => {
      cloudinary.v2.uploader.upload_stream({ folder: 'vendors/services' }, (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }).end(Buffer.from(buffer)); // Convert arrayBuffer to Buffer and upload
    }).catch((error) => reject(error));
  });
};

// Export POST method for API route
export async function POST(req) {
  try {
    await db_connection();
    const formData = await req.formData();
    
    const email = formData.get("email");
    const logo = formData.get("uploadLogo"); // Logo file (Blob)
    const serviceImages = formData.getAll("uploadImagesOfService"); // Multiple service images (Blob)

    // Upload logo to Cloudinary
    let uploadLogoUrl = null;
    if (logo && logo.size > 0) {
      const logoUpload = await uploadToCloudinary(logo);
      uploadLogoUrl = logoUpload;
    }

    // Upload service images to Cloudinary
    let serviceImageUrls = [];
    if (serviceImages.length > 0) {
      serviceImageUrls = await Promise.all(
        serviceImages.map(async (image) => {
          return await uploadToCloudinary(image);
        })
      );
    }

    // Update Vendor collection with uploaded image URLs
    await Vendor.updateOne(
      { email },
      {
        uploadLogo: uploadLogoUrl,
        uploadImagesOfService: serviceImageUrls,
      }
    );

    return new Response(JSON.stringify({ success: true, message: "Image uploaded successfully" }), { status: 200 });

  } catch (error) {
    console.error("Error while uploading image:", error);
    return new Response(JSON.stringify({ success: false, message: "Error while uploading image" }), { status: 500 });
  }
}
