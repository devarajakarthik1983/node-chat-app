const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname , '../public');

var app = express();

app.use(express.static(publicPath));

port = process.env.PORT || 3000;

app.listen(3000,()=>{
  console.log(`Server started at ${port}`);
});
