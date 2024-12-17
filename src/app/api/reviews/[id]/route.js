import mongoose from 'mongoose';
import db_connection from '../../../../../db';
import { ObjectId } from "mongodb";

// Ensure mongoose is connected
mongoose.set('strictPopulate', false);

// Handle GET request
export async function GET(req, { params }) {
  const { id } = params; // Get dynamic id

  await db_connection();

  // Sample logic for GET request (you can replace this with your actual logic)
  return new Response(JSON.stringify({ message: 'GET request received', id }), { status: 200 });
}

// Handle PUT request
export async function PUT(req, { params }) {
    const { id } = params; // Get dynamic review id
  const body = await req.json(); // Parse the request body
  
  try {
    // Connect to the database
    await db_connection();
  
    // Get the reviews collection
    const reviewsCollection = mongoose.connection.collection('reviews');
  
    // Extract email and comment from the request body
    const { email, comment } = body;
  
  

    // Check if email and comment are provided
    if (!email || !comment) {
      return new Response(JSON.stringify({ message: "Missing email or comment" }), { status: 400 });
    }
  
    // Push the reply to the replies array for the specific review id
    const updatedReview = await reviewsCollection.updateOne(
      { _id: new ObjectId(id) },  // Match review by id
      {
        $push: {
          replies: { 
            email,  // Add email
            comment,  // Add the comment
            createdAt: new Date()  // Add the timestamp of the reply
          },
        },
      }
    );
  
    // Check if the review was found and updated
    if (updatedReview.modifiedCount === 1) {
      return new Response(JSON.stringify({ message: "Reply added successfully." }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ message: "Review not found." }), { status: 404 });
    }
  
  } catch (error) {
    return new Response(JSON.stringify({ message: "Internal Server Error", error: error.message }), { status: 500 });
  }

}


export async function POST(req, { params }) {
  const { id } = params; // Get dynamic id
  const body = await req.json();
  return new Response(JSON.stringify({ message: 'POST request received', id }), { status: 200 });

}

// Handle DELETE request (if needed)
export async function DELETE(req, { params }) {
  const { id } = params;

  await db_connection();

  // Sample logic for DELETE request (you can replace this with your actual logic)
  return new Response(JSON.stringify({ message: 'DELETE request received', id }), { status: 200 });
}
