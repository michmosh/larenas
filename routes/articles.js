const express = require('express');
const router  = express.Router();
const mongoose = require('mongoose');

const Article = mongoose.model("Article", {
    title: String,
    lng: String,
    body:String,
    page:String
});

router
    .post('/' , (req , res )=>{
        let item = req.body.article;
        let article = new Article({title:item.title , page:item.page , body:item.body , lng : item.lng})
        article.save().then(article=>{
            res.json(article);
        })
    })
    .put('/' , (req , res )=>{
        let item = req.body.article;
        Article.findOneAndUpdate({_id : item._id} ,item , {upsert :true , new : true} , (err , article)=>{
           if(err) return res.send(500);
           return res.json(article);
         })
    })
    .delete('/' , (req , res )=>{
        let item = req.query.article;
        Article.findOneAndRemove({_id: item}, function(err){
            if(err) return res.send(500);
            return res.json({status:'deleted' , _id:item});
        })
    })
   
    .get('/', (req , res)=>{
        let param = req.query;
        Article.find(param,(err , articles)=>{
           res.json(articles);
        })
    })

module.exports = router;