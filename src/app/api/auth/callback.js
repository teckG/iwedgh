// pages/api/auth/callback.js
import { withAuth } from '@clerk/nextjs/api';
import mongoose from 'mongoose';
import User from '../../../../models/user';
import db_connection from '../../../../db';


const handler = async (req, res) => {
  try {
    const { userId, emailAddresses, firstName, lastName } = req.body;

    await db_connection();

    // Check if user already exists
    let dbUser = await User.findOne({ clerkUserId: userId });

    if (!dbUser) {
      // Create a new user if not found
      dbUser = new User({
        clerkUserId: userId,
        email: emailAddresses[0].emailAddress,
        password: "", // Handle password securely if needed
        firstName,
        lastName,
        role: "CLIENT", // Default role or fetch from Clerk metadata if available
      });
      await dbUser.save();
    }

    res.status(200).json({ message: "User signed in and stored successfully", user: dbUser });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default withAuth(handler);
