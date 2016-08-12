import passport from 'passport';
import GitHubStrategy, { Strategy } from 'passport-github2';
import { requestGithub } from '../github/githubQueries';
import request from 'request';
export default function(app) {
  app.get('/api/github', 
    passport.authenticate('github', {scope: ['repo','user:email']})
  );
  app.get('/auth/github/callback', 
    passport.authenticate('github', { failureRedirect: '/' }),
    function(req, res) {
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

    const cb = (err, res, body) => {
      console.log(body);
    };

    request(options,cb);
  });

  app.get('/test', (req,res) => {
    console.log(req.user)
    res.send('hello');
  });
};  


// GET https://api.github.com/user/repos?access_token: