var socket = io();

function scrollToBottom() {
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');

  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight =  messages.prop('scrollHeight');
  var newMessageHeight =  newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }

}





socket.on('connect' ,function () {
  console.log('Connected to the server');
  var params = jQuery.deparam(window.location.search);

  socket.emit('join' , params , function(err) {
    if(err){
      alert(err);
        window.location.href = '/';
    } else {
        console.log('No error');
    }
  })

  // socket.emit('createMessage',{
  //   from:'test@qw.com',
  //   text:'how are you'
  // });
});

socket.on('updateUserList' , function (users) {
    var ol = jQuery('<ol></ol>');

    users.forEach((user)=>{
      ol.append(jQuery('<li></li>').text(user))
    });

    jQuery('#users').html(ol);
  });

socket.on('disconnect' ,function () {
  console.log('Disconnected from the server');
});

socket.on('newMessage' , function (newMessage){
  // var formattedTime = moment(newMessage.createdAt).format('h:mm:a');
  // console.log('New Message' , newMessage);
  // var li =jQuery('<li></li>');
  // li.text(`${newMessage.from} ${formattedTime}: ${newMessage.text}`);
  // jQuery('#messages').append(li);
  var formattedTime = moment(newMessage.createdAt).format('h:mm:a');
  var template = jQuery('#message-template').html();
  var html =  Mustache.render(template ,{
    text:newMessage.text,
    from:newMessage.from,
    createdAt:formattedTime
  });
  jQuery('#messages').append(html);
  scrollToBottom();

});


socket.on('newLocationMessage' , function (newMessage){
  // console.log('New Message' , newMessage);
   var formattedTime = moment(newMessage.createdAt).format('h:mm:a')
  // var li =jQuery('<li></li>');
  // var a =jQuery('<a target="_blank">My Location</a>');
  // li.text(`${newMessage.from} ${formattedTime}: `);
  // a.attr('href',newMessage.url);
  // li.append(a);
  var template = jQuery('#location-message-template').html();
  var html =  Mustache.render(template ,{
    url:newMessage.url,
    from:newMessage.from,
    createdAt:formattedTime
  });
  jQuery('#messages').append(html);
  scrollToBottom();
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
    text:jQuery('[name=message]').val()
  } , function (){
    jQuery('[name=message]').val('');
  });
});

var locationButton = jQuery('#send-location');

locationButton.on('click' , function() {
  if(!navigator.geolocation) {
    return alert('Geolocation not supported by the browser');
  }

locationButton.attr('disabled','disabled').text('Sending Location...')
  navigator.geolocation.getCurrentPosition(function(position) {
    // console.log(position);
      locationButton.removeAttr('disabled').text('Send Location');
    socket.emit('createLocationMessage' ,{
      latitude:position.coords.latitude,
      longitude:position.coords.longitude,
    })
   } , function() {
       locationButton.removeAttr('disabled').text('Send Location');
    alert('Unable to fetch the location');
  })

});
