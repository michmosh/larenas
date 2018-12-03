const express = require('express');
const router  = express.Router();
const mongoose = require('mongoose');
const multer  = require('multer');
const fs = require('fs');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/')
    },
    filename: function (req, file, cb) {
      cb(null,file.originalname) //Appending extension
    }
  })
const upload = multer({storage:storage});
const fields = upload.fields([{name:'imageUrl'} , {name:'title'}])

const Gallery = mongoose.model("Gallery", {
    title: String,
    imageUrl:String
});

router
    .post('/' , fields ,(req , res )=>{
        let item = req.body;
        let gallery = new Gallery({
                        title:item.title ,
                        imageUrl :  req.files.imageUrl ?  
                                        req.files.imageUrl[0].originalname : 
                                        item.imageUrl
                    })
            gallery.save().then(gItem=>{
            res.json(gItem);
        })
    })
    .put('/' , fields,(req , res )=>{
        let item = req.body;
        item.imageUrl = req.files.imageUrl ?  req.files.imageUrl[0].originalname : item.imageUrl;
        Gallery.findOneAndUpdate({_id : item.id} ,item , {upsert :true , new : true} , (err , gItem)=>{
        if(err) return res.send(500);
        return res.json(gItem);
        })
    })
    .delete('/' , (req , res )=>{
        let item = req.query.gallery;
        Gallery.findOneAndDelete({_id: item},(err , gItem)=>{
            try{
                fs.unlink(`./public/images/${gItem.imageUrl}` , function(err , results){
                    if(err) console.log(err);
                });
            }catch(err){
                console.log(err);
            }
            if(err) return res.send(500);  
            return res.json({status:'deleted' , _id:item});
            
        })
    })
    .get('/', (req , res)=>{
        Gallery.find({},(err , gallery)=>{
           res.json(gallery);
        })
    })

module.exports = router;