import { NextResponse } from "next/server";
import db_connection from "../../../../../db";
import Clients from "../../../../../models/clients";

export async function POST(req) {
  try {
    await db_connection();

    const { email, vendorId } = await req.json();

    const user = await Clients.findOne({ email: email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (!user.favorites.includes(vendorId)) {
      user.favorites.push(vendorId);
      await user.save();
    }

    return NextResponse.json({ message: "Added to favorites", favorites: user.favorites }, { status: 200 });
  } catch (error) {
    console.error("Error adding to favorites:", error);
    return NextResponse.json({ error: "Error adding to favorites" }, { status: 500 });
  }
}
