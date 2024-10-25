import { NextResponse } from "next/server";
import db_connection from "../../../../../db";
import Clients from "../../../../../models/clients";

export async function POST(req) {
  await db_connection();

  try {
    const { email } = await req.json();

    // Check if the client already exists
    const client = await Clients.findOne({ email });

    if (client) {
      return NextResponse.json({ exists: true }, { status: 200 });
    } else {
      return NextResponse.json({ exists: false }, { status: 200 });
    }
  } catch (error) {
    console.error("Error checking client existence:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
