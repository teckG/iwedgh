import db_connection from "../../../../db";
import Vendor from "../../../../models/vendor";


export async function GET() {
  await db_connection();

  try {
    const vendors = await Vendor.find({}).select('uploadImagesOfService');
    const images = vendors
      .flatMap((vendor) => vendor.uploadImagesOfService)
      .filter(Boolean);

    // Shuffle the images and limit the number sent
    images.sort(() => Math.random() - 0.5);
    const limitedImages = images.slice(0, 15); 
    return new Response(JSON.stringify(limitedImages), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to fetch images' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
