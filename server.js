const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();

const server = http.createServer(app);
const io = new Server(server);


//Serve the static files from the "public" folder
app.use(express.static('public'));

//Handle the socket connection
io.on('connection', (socket) => {
    console.log('New client connected');
    
    //Handle the message event
    socket.on('drawing', (data) => {
        //Broadcast the message to all connected clients
        socket.broadcast.emit('drawing', data);
    });

    //Handle the disconnect event
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Start the server
server.listen(3000, () => {
    console.log('Server running on http://localhost:3000')
})



