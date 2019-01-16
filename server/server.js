const path = require('path');
const express = require('express');
const http = require('http');
const socketIO =require('socket.io')

const {generateMessage} =require('./utils/message');

const publicPath = path.join(__dirname , '../public');
const port = process.env.PORT || 3000;
var app = express();

var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection' ,(socket)=>{
  console.log('New user is connected');

  socket.emit('newMessage' , generateMessage('Admin' ,'Welcome to chat app'));

  socket.broadcast.emit('newMessage' ,generateMessage('Admin' , 'New user joined'));

  socket.on('createMessage',(createMessage , callback)=>{
      console.log('New message: ' ,createMessage);
      io.emit('newMessage' ,generateMessage(createMessage.from,createMessage.text));
      callback('This is from server');

      // socket.broadcast.emit('newMessage' ,{
      //   from:createMessage.from,
      //   text:createMessage.text,
      //   createdAt:new Date().getTime()
      // });
  });

  // socket.emit('newMessage',{
  //   from:'Karthik@qw.com',
  //   text:'Hey',
  //   createdAt: new Date().getTime();
  // });

  socket.on('disconnect' ,()=>{
    console.log('User was disconnected')
  });
});




server.listen(3000,()=>{
  console.log(`Server started at ${port}`);
});
