import express from 'express';
import path from 'path';
import db from './config/db';

const app = express();
const port = process.env.PORT || 3000;

// Render static index route
app.use(express.static(path.join(__dirname,'../client')));

app.listen(port, () => {
  console.log('----------------------------------------');
  console.log(`| app.js has been served on port: ${port} |`);
  console.log('----------------------------------------');
});