import express from 'express';
import path from 'path';
import db from './config/db';
import http, { Server } from 'http';
import Io from 'socket.io';
import apiRoutes from './routes/apiRoutes';
import passport from 'passport';
import GitHubStrategy, { Strategy } from 'passport-github2';
import session from 'express-session';
import bodyParser from 'body-parser';
import saveSession from './routes/userRoutes'

const app = express();
const server = Server(app);
const io = Io(server);
const port = process.env.PORT || 3000;

// Render static index route
app.use(express.static(path.join(__dirname,'../compiled')));
app.use(express.static(path.join(__dirname,'../client')));


app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }));

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    done(null, {
      accessToken: accessToken,
      profile: profile
    });
  }
));

// Passport session setup
passport.serializeUser((user,done) => {
  const newUser = {
    accessToken: user.accessToken,
    id: user.profile.id,
    username: user.profile.username
  }
  done(null, newUser);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});


io.on('connection', function(socket){
  console.log('Connected on the server side!');
  
  //create a new time stamp, and save new session 10sec apart
  // var time = new Date().getTime();
  // var username = 'something'; //need to update this later
  // var sessionId = 'someID'; //need to update this later

  socket.on('change text', function(text){
    io.emit('change text', text);
    // var newTime = new Date().getTime();
    // if(newTime - time >= 10000){
    //   saveSession({ username: username, sessionId: sessionId, sessionContent: text });
    //   time = newTime;
    }
  });
});

// RESTful routes for app
apiRoutes(app);

server.listen(port, () => {
  console.log('----------------------------------------');
  console.log(`| app.js has been served on port: ${port} |`);
  console.log('----------------------------------------');
});