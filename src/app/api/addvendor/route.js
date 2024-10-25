import { NextResponse } from "next/server";
import db_connection from "../../../../db";
import Vendor from "../../../../models/vendor";

export async function POST(request) {
  try {
    const {
      businessName,
      businessCategory,
      briefIntroduction,
      activePhoneNumber,
      firstName,
      lastName,
      email,
      password,
      address,
      city,
      region,
      website,
      instagram,
      twitter,
      facebook,
      tiktok,
      whatsapp,
    } = await request.json();

    await db_connection();

    const newVendor = await Vendor.create({
      businessName,
      businessCategory,
      briefIntroduction,
      activePhoneNumber,
      firstName,
      lastName,
      email,
      password,
      address,
      city,
      region,
      website,
      socialMediaLinks: {
        instagram,
        twitter,
        facebook,
        tiktok,
        whatsapp,
      },
    });

    return NextResponse.json(
      { success: true, message: "Vendor created successfully", vendor: newVendor },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating vendor:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create vendor", error: error.message },
      { status: 500 }
    );
  }
}
