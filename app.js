const express = require('express');
const bodyParser= require('body-parser');
const cors = require('cors');
var path = require('path');
const app = express();
const port = 4400;
const routes = require('./routes/routes');
const db = require('./database/db');

app.use(cors({
    origin:["http://localhost:3000"]
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));
app.use('/api' ,routes);
app.use('/', function(req, res){ 
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))