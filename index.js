require('dotenv').config({silent: true})
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var multer = require('multer');
var cloudinary = require('cloudinary');
var app = express();
var upload = multer({dest: './uploads'});

cloudinary.config({
  cloud_name: 'smilesandcocktails',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

app.set('view engine', 'ejs');
app.use(ejsLayouts);

app.get('/', function(req, res) {
  res.render('index');
});

app.post('/', upload.single('myFile'), function(req, res) {
  res.send(req.file)
})

app.post('/', upload.single('myFile'), function(req, res) {
  cloudinary.upload(req.file.path, function(result) {
    res.send(result)
  })
})




app.listen(8000);
