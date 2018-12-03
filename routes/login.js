const express   = require('express');
const router    = express.Router();
const mongoose = require('mongoose');

const User = mongoose.model("User", {
    email: String,
    password:String
});

router
    .post('/' , (req , res)=>{
        User.find({email:req.body.email , password : req.body.password})
            .then(user =>{
                if(user[0]) res.json('authenticated');
                if(!user[0]) res.json('no_auth');
            }).catch(e=>{
                res.status(500);
            })
    })

module.exports = router;