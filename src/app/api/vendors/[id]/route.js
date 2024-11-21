import {  ObjectId } from 'mongodb';

import db_connection from "../../../../../db";
import Vendor from "../../../../../models/vendor";



export async function GET(req, { params }) {
  const { id } = params;

  try {
    
    await db_connection();
    const vendor = await Vendor.findOne({ _id: new ObjectId(id) });

    if (vendor) {
      return new Response(JSON.stringify(vendor), { status: 200 });
    } else {
      return new Response('Vendor not found', { status: 404 });
    }
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  } 
}



export async function PUT(req, { params }) {
  const { id } = params;
  const body = await req.json();

  try {
    await db_connection();

    const result = await Vendor.updateOne(
      { _id: new ObjectId(id) },
      { $set: body }
    );

    if (result.modifiedCount > 0) {
      return new Response('Vendor updated successfully', { status: 200 });
    } else {
      return new Response('Vendor not found or no changes made', { status: 404 });
    }
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  } 
}