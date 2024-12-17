import { NextResponse } from "next/server";
import mongoose from 'mongoose';
mongoose.set('strictPopulate', false);
import db_connection from "../../../../db";
import Review from "../../../../models/reviews";
import Vendor from "../../../../models/vendor";

export async function POST(req) {
    try {
      await db_connection();
  
      const { firstName, email, rating, comment, vendorId } = await req.json();
  
      // Check if vendorId is provided and is valid
      if (!vendorId || !mongoose.Types.ObjectId.isValid(vendorId)) {
        return NextResponse.json({ message: "Invalid or missing vendorId" }, { status: 400 });
      }
  
      // Check if the vendor exists
      const vendorExists = await Vendor.findById(vendorId);
      if (!vendorExists) {
        return NextResponse.json({ message: "Vendor not found" }, { status: 404 });
      }
  
      // Create a new review document with vendorId
      const newReview = new Review({
        firstName,
        email,
        rating,
        vendorId, // Ensure vendorId is included
        comment,
        replies: [],
        upvotes: [],
        downvotes: []
      });
  
      // Save the review to the database
      const saved = await newReview.save();
      return NextResponse.json({ message: "Review submitted successfully! ", saved }, { status: 201 });
    } catch (error) {
      return NextResponse.json({ message: "Error saving review", error }, { status: 500 });
    }
  }


  export async function GET(req) {
    try {
        await db_connection();

        // Get the vendorId from the query parameters
        const { searchParams } = new URL(req.url);
        const vendorId = searchParams.get('vendorId');

        // Check if vendorId is provided
        if (!vendorId) {
            return NextResponse.json({ message: "Vendor ID is required" }, { status: 400 });
        }

        // Fetch reviews for the specific vendorId and populate vendor details
        const populatedReviews = await Review.find({ vendorId })
        .populate('vendorId')
        .sort({ createdAt: -1 }); // Sort in descending order based on createdAt
      

        if (populatedReviews.length === 0) {
            return NextResponse.json({ message: "No reviews found for this vendor" }, { status: 404 });
        }

        // Map over the populated reviews to format data
        const reviewsWithVendorDetails = populatedReviews.map(review => ({
            _id: review._id,
            firstName: review.firstName,
            email: review.email,
            rating: review.rating,
            comment: review.comment,
            createdAt: review.createdAt,
            replies: review.replies,
            vendor: {
                businessName: review.vendorId?.businessName || "",
                email: review.vendorId?.email || "",
                city: review.vendorId?.city || "",
                region: review.vendorId?.region || ""
            }
        }));

        return NextResponse.json(reviewsWithVendorDetails, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Error fetching reviews" }, { status: 500 });
    }
}



