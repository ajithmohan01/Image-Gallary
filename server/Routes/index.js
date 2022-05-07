const express = require("express");
const router = express.Router();
const PhotosModel = require("../Models/Photos")
const cloudinary = require("../Utils/cloundnary");

router.post("/upload", async (req, res) => {
  const { baseImage } = req.body;
  // console.log(baseImage)
  try {
    const { url } = await cloudinary.uploader.upload(baseImage);
      
      let date = new Date();
      
    let photo = new PhotosModel({
      image: url,
      date,
    });
      
      let response = await photo.save();
      console.log(response);
      
      res.json("Image uploaded")
  } catch (error) {
    console.log(error);
  }
});


router.get("/getimage", async (req, res) => {
    try {
        
        const datas = await PhotosModel.find()
        res.json(datas);
        
    } catch (error) {
        console.log(error);
    }
    
    
});

module.exports = router;
