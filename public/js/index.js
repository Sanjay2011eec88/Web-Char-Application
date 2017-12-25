var socket = io();

socket.on('connect',function () {
    console.log('Connected to server');

});

socket.on('disconnect',function () {
    console.log('Disconnected from server');
});

socket.on('newMessage',function (msg) {
    console.log('New Message',msg);
    var li = jQuery('<li></li>');
    li.text(`${msg.from}: ${msg.text}`);

    jQuery('#messages').append(li);
});


//Event acknowlegdement
//3rd argument is callback which fires when acknowledgement is arrived
// socket.emit('createMessage',{
//     from: 'Frank',
//     text: 'Hi'
// },function (data) {
//     console.log('Got it!!',data);
// });

socket.on('newLocationMessage',function (message) {
   var li = jQuery('<li></li>');
   var a = jQuery('<a target="_blank">My current location</a>');

   li.text(`${message.from}: `);
   a.attr('href',message.url);
   li.append(a);
   jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit',function (e) {
    //preventDefault prevents a default event such as page loading after clicking on submit button
    e.preventDefault();
    
    socket.emit('createMessage',{
        from: 'User',
        text:jQuery('[name=message]').val()
    },function () {
        
    })
});

var locationButton = jQuery('#send-location');
locationButton.on('click',function () {
   if(!navigator.geolocation){
       return alert('Geolocation not supported by your browser.');
   }

   navigator.geolocation.getCurrentPosition(function (position) {
       console.log(position);
       socket.emit('createLocationMessage',{
           latitude: position.coords.latitude,
           longitude: position.coords.longitude
       });
   },function () {
       alert('Unable to fetch location.')
   })
});