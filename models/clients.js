import mongoose from "mongoose";

const { Schema } = mongoose;

const clientsSchema = new Schema({
 
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: false,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  favorites: [{
    type: String,
    trim: true,
  }],
  }, {timestamps: true});

// Check if the model already exists before defining it
const Clients = mongoose.models.Clients || mongoose.model("Clients", clientsSchema);

export default Clients;