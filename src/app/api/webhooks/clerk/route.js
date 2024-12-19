import db_connection from "../../../../../db";
import User from "../../../../../models/user";


export async function POST(req) {
  const body = await req.json();
  const clerkWebhookSecret = process.env.CLERK_WEBHOOK_SECRET;
  const signature = req.headers.get("clerk-signature");

  // Verify webhook signature (optional)
  if (!clerkWebhookSecret || !signature || !verifyClerkWebhook(body, signature, clerkWebhookSecret)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, email_addresses, first_name, last_name } = body;

  try {
    await connectMongoDB();

    const email = email_addresses[0]?.email_address || "";
    const newUser = new User({
      clerkId: id,
      email,
      firstName: first_name || "",
      lastName: last_name || "",
    });

    await newUser.save();

    return NextResponse.json({ message: "User saved successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error saving user:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Optional: Verify Clerk webhook signature
function verifyClerkWebhook(body, signature, secret) {
  const crypto = require("crypto");
  const hash = crypto.createHmac("sha256", secret).update(JSON.stringify(body)).digest("base64");
  return hash === signature;
}
