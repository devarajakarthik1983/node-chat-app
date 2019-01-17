var socket = io();
socket.on('connect' ,function () {
  console.log('Connected to the server');

  // socket.emit('createMessage',{
  //   from:'test@qw.com',
  //   text:'how are you'
  // });
});

socket.on('disconnect' ,function () {
  console.log('Disconnected from the server');
});

socket.on('newMessage' , function (newMessage){
  console.log('New Message' , newMessage);
  var li =jQuery('<li></li>');
  li.text(`${newMessage.from}: ${newMessage.text}`);
  jQuery('#messages').append(li);
});


socket.on('newLocationMessage' , function (newMessage){
  // console.log('New Message' , newMessage);
  var li =jQuery('<li></li>');
  var a =jQuery('<a target="_blank">My Location</a>');
  li.text(`${newMessage.from}: `);
  a.attr('href',newMessage.url);
  li.append(a);
  jQuery('#messages').append(li);
});


// socket.emit('createMessage',{
//   from:'test@test.com',
//   text:'Hi'
// } , function (data) {
//   console.log('Got it' , data);
// });

jQuery('#message-form').on('submit' , function(e) {
  e.preventDefault();

  socket.emit('createMessage' , {
    from:'User',
    text:jQuery('[name=message]').val()
  } , function (){

  });
});

var locationButton = jQuery('#send-location');

locationButton.on('click' , function() {
  if(!navigator.geolocation) {
    return alert('Geolocation not supported by the browser');
  }

  navigator.geolocation.getCurrentPosition(function(position) {
    // console.log(position);
    socket.emit('createLocationMessage' ,{
      latitude:position.coords.latitude,
      longitude:position.coords.longitude,
    })
   } , function() {
    alert('Unable to fetch the location');
  })

});
