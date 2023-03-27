import mongoose, { Mongoose } from "mongoose";

const entrySchema = new mongoose.Schema({
  entry1 :{
    type: String,
    required: true
  },
  entry2 :{
    type: String,
    required: true
  },
  entry3 :{
    type: String,
    required: true
  },
  userId:{
    type: String,
    required: true
  }
},{timestamps:true});

const Entries = mongoose.model("Entries",entrySchema);
export default Entries;