import passport from 'passport';
import GitHubStrategy, { Strategy } from 'passport-github2';
import { requestGithub } from '../github/githubQuery';

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
  app.get('/test', (req,res) => {
    console.log(req.user)
    res.send('hello');
  });
};  