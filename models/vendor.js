import mongoose from "mongoose";
import slugify from "slugify";

const { Schema } = mongoose;

const vendorSchema = new Schema(
  {
    businessName: {
      type: String,
      required: true,
      trim: true,
    },
    slug: { type: String, unique: true },
    businessCategory: {
      type: String,
      required: true,
    },
    otherCategory: {
      type: String,
      trim: true,
    },
    subcategory: {
      type: String,
      trim: true,
    },
    briefIntroduction: {
      type: String,
      required: true,
      trim: true,
    },
    activePhoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
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
      trim: true,
    },
    uploadImagesOfService: [
      {
        type: String,
        required: false,
      },
    ],
    uploadLogo: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    region: {
      type: String,
      required: true,
      trim: true,
    },
    website: {
      type: String,
      trim: true,
    },
    socialMediaLinks: {
      instagram: {
        type: String,
        trim: true,
      },
      twitter: {
        type: String,
        trim: true,
      },
      facebook: {
        type: String,
        trim: true,
      },
      tiktok: {
        type: String,
        trim: true,
      },
      whatsapp: {
        type: String,
        trim: true,
      },
    },
  },
  { timestamps: true }
);

// Middleware to generate a slug before saving a vendor
vendorSchema.pre("save", function (next) {
  if (this.isModified("businessName")) {
    this.slug = slugify(this.businessName, { lower: true, strict: true });
  }
  next();
});

// Check if the model already exists before defining it
const Vendor = mongoose.models.Vendor || mongoose.model("Vendor", vendorSchema);

export default Vendor;
