import express  from "express";
import User from "../models/User.js";
import bcrypt from 'bcrypt';
const userRouter = express.Router();


//update user details
userRouter.put("/:id", async (req, res) => {
  if(req.body.userId === req.params.id){
    if(req.body.password){
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password,salt);
    }
    try{
      const updatedUser = await User.findByIdAndUpdate(req.body.userId,{
        $set: req.body
      },
      {new: true});
      res.status(200).json(updatedUser);
    }catch(err){
      res.status(500).json(err);
    }
  }else{
    res.status(500).json("You can update only your account.")
  }
  
});

//delete user details
userRouter.delete("/:id",async (req, res) => {
  try{
    const user = await User.findById(req.params.id);
    if(user){
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted the user!");
    }else{
      res.status(404).json("User not found!");
    }
  }catch(err){
    res.status(500).json(err);
  }
});

//get user details
userRouter.get("/:id", async (req, res) => {
  try{
    const user = await User.findById(req.params.id);
    if(user){
      console.log("user present");
      const {password, ...others} = user._doc;
      res.status(200).json(others);
    }else{
      res.status(404).json("User not found!");
    }
  }catch(err){
    res.status(500).json(err);
  }
});

export default userRouter;