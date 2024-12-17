import { NextResponse } from "next/server";
import Clients from "../../../../../models/clients";
import db_connection from "../../../../../db";

export async function POST(req) {
  try {
    await db_connection();

    const { email, vendorId } = await req.json();

    // Find the client by email and pull the vendorId from favorites
    const client = await Clients.findOneAndUpdate(
      { email: email },
      { $pull: { favorites: vendorId } }, // pull removes the vendorId
      { new: true }
    );

    if (!client) {
      return NextResponse.json({ message: "Client not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, favorites: client.favorites }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
