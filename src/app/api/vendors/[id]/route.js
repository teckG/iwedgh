import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGO_URL;
const client = new MongoClient(uri);

export async function GET(req, { params }) {
  const { id } = params;

  try {
    await client.connect();
    const db = client.db('vendors'); // Replace with your database name
    const collection = db.collection('vendors'); // Replace with your collection name

    const vendor = await collection.findOne({ _id: new ObjectId(id) });

    if (vendor) {
      return new Response(JSON.stringify(vendor), { status: 200 });
    } else {
      return new Response('Vendor not found', { status: 404 });
    }
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  } finally {
    await client.close();
  }
}



export async function PUT(req, { params }) {
  const { id } = params;
  const body = await req.json();

  try {
    await client.connect();
    const db = client.db('vendors'); // Replace with your database name
    const collection = db.collection('vendors'); // Replace with your collection name

    const result = await collection.updateOne(
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
  } finally {
    await client.close();
  }
}