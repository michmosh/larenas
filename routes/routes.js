const express   = require('express');
const router    = express.Router();

router
    .use('/articles' , require('./articles'))
    .use('/rooms' , require('./rooms'))
    .use('/rooms/:id*' , require('./rooms'))
    .use('/resturante' , require('./resturante'))
    .use('/gallery' , require('./gallery'))
    .use('/contacts' , require('./contacts'))
    .use('/login' , require('./login'))
    .use('/links' , require('./links'));

module.exports = router;