import { NextResponse } from "next/server";
import Clients from "../../../../../models/clients";
import Vendor from "../../../../../models/vendor";
import db_connection from "../../../../../db";
import { getAuth, clerkClient } from "@clerk/nextjs/server"; // Import clerkClient for fetching user details

export async function GET(req) {
  try {
    await db_connection();

    const { userId } = getAuth(req); // Get the current user's ID

    if (!userId) {
      return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
    }

    // Fetch the user details from Clerk to get the email address
    const user = await clerkClient().users.getUser(userId);

    if (!user || !user.primaryEmailAddress) {
      return NextResponse.json({ message: "User email not found" }, { status: 404 });
    }

    const email = user.primaryEmailAddress.emailAddress;

    // Fetch the client data based on the email
    const client = await Clients.findOne({ email });

    if (!client) {
      return NextResponse.json({ message: "Client not found" }, { status: 404 });
    }

    // Fetch vendors based on client's favorites
    const vendors = await Vendor.find({ _id: { $in: client.favorites } });

    // Group vendors by business category
    const categorizedVendors = vendors.reduce((acc, vendor) => {
      const category = vendor.businessCategory;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(vendor);
      return acc;
    }, {});

    return NextResponse.json({ favorites: categorizedVendors }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching favorites" }, { status: 500 });
  }
}
