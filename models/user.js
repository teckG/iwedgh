import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  clerkUserId: {  // Storing Clerk's userId for easy reference
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["ADMIN", "VENDOR", "CLIENT"],
    default: "CLIENT",
    required: true,
  },
  firstName: {    // Clerk's optional first name
    type: String,
    trim: true,
  },
  lastName: {     // Clerk's optional last name
    type: String,
    trim: true,
  },
  // Add any additional fields you want to store
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
