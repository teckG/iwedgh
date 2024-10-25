import { NextResponse } from "next/server";
import db_connection from "../../../../db";
import User from "../../../../models/user";

export async function POST(request) {
    const {firstName, email, password} = await request.json();
    await db_connection();

    await User.create({firstName, email, password});
    return NextResponse.json({message: "User created"}, {status: 201})
}