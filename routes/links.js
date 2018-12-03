const express = require('express');
const mongoose = require('mongoose');
const router  = express.Router();

const Link = mongoose.model("Link", {
    name: String,
    lng: String,
    path:String
});

router
    .get('/get-all', (req , res)=>{
        Link.find({},(err , links)=>{
           res.json(links);
        })
    })

module.exports = router;