const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

//Register for new built in event
io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('disconnect', (msg) => {
        console.log('User was disconnected');
    });

    //socket.emit from  Admin text Welcome to the chat app

    socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app.'));

    //socket.broadcast.emit from Admin text New User joined
    socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'));


    socket.on('createMessage', (message, callback) => {
        console.log('create Msg',message);
        //Emits a event to every single connection including sender
        io.emit('newMessage',generateMessage(message.from,message.text));
        callback('This is from server');
    });

    //Emits to all connection except the sender
    // socket.broadcast.emit('newMessage',{
    //     from:message.from,
    //     text:message.text,
    //     createdAt: new Date().getTime()
    // });
});

server.listen(port, () => {
    console.log(`Server is up on ${port}`);
});