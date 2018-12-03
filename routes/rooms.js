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
const fields = upload.fields([{name:'mainImage'} ,{name:'images'} , {name:'title'} , {name:'description'} , {name:'lng'}])
const Room = mongoose.model("Room", {
    title: String,
    lng: String,
    description: String,
    images: Array,
    mainImage : String
});

router
    .post('/' , fields ,(req , res )=>{
        let item = req.body;
        let room = new Room({
                        title:item.title ,
                        lng:item.lng , 
                        description:item.description , 
                        images :req.files.images ?  
                                        req.files.images.map(img=>{
                                            return img.originalname
                                        }) 
                                        :
                                        item.images || [] ,
                        mainImage :  req.files.mainImage ?  
                                        req.files.mainImage[0].originalname : 
                                        item.mainImage
                    })
        room.save().then(room=>{
            res.json(room);
        })
    })
    .put('/' , fields,(req , res )=>{
        let item = req.body;
        item.mainImage = req.files.mainImage ?  req.files.mainImage[0].originalname : item.mainImage;
        if(req.files.images){
            item.images = typeof item.images == 'string' ?  [item.images] : item.images || [];
            req.files.images.map(img=>{
                item.images.push(img.originalname);
            }) 
        }
        
        Room.findOneAndUpdate({_id : item.id} ,item , {upsert :true , new : true} , (err , room)=>{
           if(err) return res.send(500);
           return res.json(room);
         })
    })
    .delete('/' , (req , res )=>{
        let item = req.query.room;
        Room.findOneAndDelete({_id: item},(err , room)=>{
            try{
                fs.unlink(`./public/images/${room.mainImage}` , function(err , results){
                    if(err) console.log(err);
                });
                room.images.map(img=>{
                    fs.unlink(`./public/images/${img}`, function(err , results){
                        if(err) console.log(err);
                    });
                }) 
            }catch(err){
                console.log(err);
            }
            
         })
        Room.findOneAndDelete({_id: item}, function(err){
            if(err) return res.send(500);  
            return res.json({status:'deleted' , _id:item});
        })
    })
    .get('/:id*', (req , res)=>{
        let id = req.params.id
        Room.find({_id :id },(err , room)=>{
           res.json(room[0]);
        })
    })
    .get('/', (req , res)=>{
        Room.find({},(err , rooms)=>{
           res.json(rooms);
        })
    })

module.exports = router;