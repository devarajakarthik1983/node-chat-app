const path = require('path');
const express = require('express');
const http = require('http');
const socketIO =require('socket.io')

const {generateMessage,generateLocationMessage} =require('./utils/message');
const{isRealString} =require('./utils/validation');
const {Users} = require('./utils/users')

const publicPath = path.join(__dirname , '../public');
const port = process.env.PORT || 3000;
var app = express();

var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection' ,(socket)=>{
  console.log('New user is connected');



  socket.on('join' , (params ,callback)=>{
      if(! isRealString(params.name) || !isRealString(params.room)) {
        return callback('Name and Room name are required');
      }

      socket.join(params.room);
      users.removeUser(socket.id);
      users.addUser(socket.id,params.name,params.room);

      io.to(params.room).emit('updateUserList' , users.getUserList(params.room));

      socket.emit('newMessage' , generateMessage('Admin' ,'Welcome to chat app'));
      socket.broadcast.to(params.room).emit('newMessage' ,generateMessage('Admin' , `${params.name} has joined`));

      callback();
  });

  socket.on('createMessage',(createMessage , callback)=>{
      var user = users.getUser(socket.id);

      if(user && isRealString(createMessage.text)) {
          io.to(user.room).emit('newMessage' ,generateMessage(user.name,createMessage.text));
      }

      callback();

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

  socket.on('createLocationMessage' ,(coords)=>{
    var user = users.getUser(socket.id);
    if(user) {
    io.to(user.room).emit('newLocationMessage' , generateLocationMessage(`${user.name}` ,coords.latitude,coords.longitude));
  }
  });

  socket.on('disconnect' ,()=>{
      var user = users.removeUser(socket.id);
      if(user){
        io.to(user.room).emit('updateUserList' , users.getUserList(user.room));
        io.to(user.room).emit('newMessage' ,generateMessage('Admin' , `${user.name} has left`));
      }

  });
});




server.listen(3000,()=>{
  console.log(`Server started at ${port}`);
});
