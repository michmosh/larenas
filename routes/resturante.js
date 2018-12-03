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
const fields = upload.fields([{name:'image' , maxCount:10} , {name:'title'} , {name:'body'} , {name:'lng'}])

const Restaurante = mongoose.model("Restaurante", {
    title: String,
    lng: String,
    image:Array ,
    body:String
});

router
    .post('/' , fields ,(req , res )=>{
        let item = req.body;
        let restaurante = new Restaurante({
                        title:item.title ,
                        lng:item.lng , 
                        body:item.body , 
                        image:req.files.image ?  
                                        req.files.image.map(img=>{
                                            return img.originalname
                                        }) 
                                        :
                                        item.image || []
                    })
            restaurante.save().then(rItem=>{
                res.json(rItem);
        })
    })
    .put('/' , fields,(req , res )=>{
        let item = req.body;
        if(req.files.image){
            item.image =  typeof item.image == "string" ?  [item.image] : item.image || [] ;
            req.files.image.map(img=>{
                item.image.push(img.originalname);
            }) 
        }
        
        Restaurante.findOneAndUpdate({_id : item.id} ,item , {upsert :true , new : true} , (err , rItem)=>{
            if(err) return res.send(500);
            return res.json(rItem);
        })
    })
    .delete('/' , (req , res )=>{
        let item = req.query.restaurante;
        Restaurante.findOneAndDelete({_id: item},(err , rItem)=>{
            try{
                rItem.image.map(img=>{
                    fs.unlink(`./public/images/${img}`, function(err , results){
                        if(err) console.log(err);
                    });
                }) 
            }catch(err){
                console.log(err);
            }
            Restaurante.findOneAndDelete({_id: item}, function(err){
                if(err) return res.send(500);  
                return res.json({status:'deleted' , _id:item});
            })
            
        })
       
    })
    .get('/', (req , res)=>{
        Restaurante.find({},(err , response)=>{
           res.json(response);
        })
    })

module.exports = router;