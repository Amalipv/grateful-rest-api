import express from "express";
import Entries from "../models/Entries.js";
import User from "../models/User.js";

const entriesRouter = express();

//get entries
entriesRouter.get("/getEntries/:userId", async(req, res) => {
  try{
    const entries = await Entries.find({userId: req.params.userId});
    if(entries){
     res.status(200).json(entries);
    }else{
      res.status(404).json("No entries found");
    }
  }catch(err){
    res.status(500).json(err);
  }
});

//get entries by date
entriesRouter.get("/getByDate/:userId", async(req, res) => {
  let reqDate = new Date(req.query.date).toISOString();
  console.log(reqDate);
  let reqDatePlus1 = new Date(req.query.date).getTime() + 1000 * 3600 * 24 * 1;
  console.log(new Date(reqDatePlus1));
  try{
    const entries = await Entries.find({userId: req.params.userId}).
    find(
      { "createdAt" : 
        { 
          $gte : reqDate,
          $lt: reqDatePlus1
        }});
    if(entries){
     res.status(200).json(entries);
    }else{
      res.status(404).json("No entries found");
    }
  }catch(err){
    res.status(500).json(err);
  }
});

//save entries
entriesRouter.post("/saveEntries", async (req, res) => {
  try{
    const user = await User.findById(req.body.userId);
    if(user){
      const newEntry = new Entries({
        entry1: req.body.entry1,
        entry2: req.body.entry2,
        entry3: req.body.entry3,
        userId: req.body.userId
      })
      const entry = await newEntry.save();
      res.status(200).json(entry);
    }else{
      res.status(404).json("User not found for the given ID");
    }
  }catch(err){
    res.status(500).json(err);
  }
});

export default entriesRouter;