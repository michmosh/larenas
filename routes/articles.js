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
const fields = upload.fields([{name:'image'} , {name:'title'} , {name:'body' } ,{name:'lng'} , {name:'page'}])

const Article = mongoose.model("Article", {
    title: String,
    lng: String,
    body:String,
    page:String,
    image:String
});

router
    .post('/' , fields, (req , res )=>{
        let item = req.body
        let article = new Article({
            title:item.title , 
            page:item.page , 
            body:item.body , 
            lng : item.lng , 
            image : req.files.image ?  req.files.image[0].originalname : item.mainImage || ''
        })
        article.save().then(article=>{
            res.json(article);
        })
    })
    .put('/' , fields, (req , res )=>{
        let item = req.body
        item.image = req.files.image ?  req.files.image[0].originalname : item.image || '';
        Article.findOneAndUpdate({_id : item.id} ,item , {upsert :true , new : true} , (err , article)=>{
           if(err) return res.send(500);
           return res.json(article);
         })
    })
    .delete('/' , (req , res )=>{
        let item = req.query.article;
        try{
            fs.unlink(`./public/images/${item.image}` , function(err , results){
                if(err) console.log(err);
            });
        }catch(err){
            console.log(err);
        } 
        Article.findOneAndRemove({_id: item}, function(err){
            if(err) return res.send(500);
            return res.json({status:'deleted' , _id:item});
        })
    })
    .get('/:id*', (req , res)=>{
        let id = req.params.id
        Article.find({_id :id },(err , article)=>{
            if(err) return res.send(500);
            res.json(article[0]);
        })
    })
    .get('/', (req , res)=>{
        let param = req.query;
        Article.find(param,(err , articles)=>{
            if(err) return res.send(500);
            res.json(articles);
        })
    })

module.exports = router;