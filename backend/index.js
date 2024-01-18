const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const User = require("./model/datamodel");
const cors = require("cors")
app.use(cors());
mongoose.connect("mongodb://127.0.0.1:27017/userDatabase").then(()=>{
    console.log("database connection successful");
})

app.get("/",async(req,res)=>{
    const allUsers = await User.find();
    res.send(allUsers);
})

app.post("/",(req,res)=>{
    const user = new User({
        name : req.body.name,
        email:req.body.email,
        age:req.body.age
    });

    user.save();

    res.send({
        user,
        message:"successfully created user",
    })
});

app.delete("/:id",async(req,res)=>{
    const user = req.params.id;
    await User.findByIdAndDelete(user);
    res.send("user deleted successfylly");
});


app.get("/:id", async (req, res) => {
    try {
      const userId = req.params.id;
  
      const user = await User.findById(userId);
  
      return user ? res.status(200).send(user) : res.status(404).send("User not found");
    } catch (error) {
      console.error('Error getting user data:', error);
      res.status(500).send("Internal Server Error");
    }
});
  

app.put("/:id",async (req,res)=>{
    const id = req.params.id;
    const user = await User.findByIdAndUpdate(id ,{
        name : req.body.name,
        email:req.body.email,
        age:req.body.age
    });

    res.send({
        message:"user updated successfully "
    })
})


app.listen(4000,()=>{
    console.log("server working at port 4000");
})