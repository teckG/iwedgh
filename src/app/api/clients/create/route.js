import { NextResponse } from "next/server";
import db_connection from "../../../../../db";
import Clients from "../../../../../models/clients";

export async function POST(req) {
  await db_connection();

  try {
    const { email, firstName, lastName } = await req.json();

    // Check again to ensure the client doesn't already exist
    const existingClient = await Clients.findOne({ email });
    if (existingClient) {
      return NextResponse.json({ success: false, message: "Client already exists" }, { status: 409 });
    }

    // Create a new client record
    const newClient = new Clients({ email, firstName, lastName, category: 'client', favorites: [] });
    await newClient.save();

    return NextResponse.json({ success: true, data: newClient }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
