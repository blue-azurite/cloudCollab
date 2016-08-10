import express from 'express';
import path from 'path';
import db from './config/db';
import http, { Server } from 'http';
import Io from 'socket.io';

const app = express();
const server = Server(app);
const io = Io(server);
const port = process.env.PORT || 3000;

// Render static index route
app.use(express.static(path.join(__dirname,'../compiled')));
app.use(express.static(path.join(__dirname,'../client')));

io.on('connection', function(socket){
  console.log('Connected on the server side!');
  socket.on('change text', function(text){
    io.emit('change text', text)
  });
});

server.listen(port, () => {
  console.log('----------------------------------------');
  console.log(`| app.js has been served on port: ${port} |`);
  console.log('----------------------------------------');
});