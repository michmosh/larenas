const express = require('express');
const mongoose = require('mongoose');
const dburl = 'mongodb://localhost:27017/hotel';
const mLabUrl = 'mongodb://michmosh:ceim5193@ds123834.mlab.com:23834/hotel';

mongoose.connect(mLabUrl);
const db = mongoose.connection;
db.on('error' ,console.error.bind(console, 'MongoDB connection error:'));




