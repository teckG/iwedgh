import { NextResponse } from "next/server";
import db_connection from "../../../../db";
import Vendor from "../../../../models/vendor";

export const GET = async () => {
    try {
        await db_connection();
        const vendors = await Vendor.find();
        return new NextResponse(JSON.stringify(vendors), { status: 200 });
    } catch (error) {
        return new NextResponse("Error in fetching vendors: " + error, { status: 500 });
    }
};

