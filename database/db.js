const express = require('express');
const mongoose = require('mongoose');
const dburl = 'mongodb://localhost:27017/hotel';
const mLabUrl = 'mongodb://@ds123834.mlab.com:23834/hotel'

mongoose.connect(mLabUrl,{ 
    useNewUrlParser: true ,
    auth:{
            user : 'michmosh',
            password: 'ceim5193'
        }
    }
   );
const db = mongoose.connection;
db.on('error' ,console.error.bind(console, 'MongoDB connection error:'));




