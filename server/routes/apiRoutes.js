import passport from 'passport';
import GitHubStrategy, { Strategy } from 'passport-github2';
import { requestGithub } from '../github/githubQueries';
import request from 'request';
import fetch from 'node-fetch';

export default function(app) {
  // Authenticate user
  app.get('/api/github', 
    passport.authenticate('github', {scope: ['repo','user:email', 'read:org']})
  );

  app.get('/auth/github/callback', 
    passport.authenticate('github', { failureRedirect: '/' }),
    function(req, res) {
      // TODO: Unncessary code?
      // if(req.user) {
      //   const userId = req.user.profile.id;
      //   const userObj = {
      //     id: userId,
      //     accessToken: req.user.accessToken,
      //     username: req.user.profile.username,
      //   };
      // }
      // console.log('user')
      // console.log(req.user)
      res.redirect('/');
    });

  // GET user repos
  app.get('/api/github/repos', (req, res) => {
    let access_token = req.user.accessToken;
    let user = req.user.username;
    let url = `https://api.github.com/users/${user}/repos?access_token=${access_token}`;

    let options = {
      url: url,
      headers: {
        'User-Agent': user
      }
    };

    fetch(url, options)
      .then(response => {
        return response.json();
      })
      .then(data => {
        let collection = [];
        for (let keys in data) {
          collection.push(data[keys].name);
        }
        res.send(collection);
      });
  });

  // GET orgs user belongs to
  app.get('/api/github/orgs', (req, res) => {
    let access_token = req.user.accessToken;
    let user = req.user.username;
    let url = `https://api.github.com/user/orgs?access_token=${access_token}`;

    let options = {
      url: url,
      headers: {
        'User-Agent': user
      }
    };

    fetch(url, options)
      .then(response => {
        return response.json();
      })
      .then(json => {
        res.send(json);
      });
  });

  // Test to get user files
  app.get('/test', (req,res) => {
    console.log(req.user)
    res.send('hello');
  });
};  
