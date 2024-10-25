import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    email: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true }, // Ensure this line is correct
    comment: { type: String, required: true },
    replies: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        comment: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
    upvotes: [{ userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } }],
    downvotes: [{ userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } }],
  },
  { timestamps: true }
);

export default mongoose.models.Review || mongoose.model("Review", ReviewSchema);
