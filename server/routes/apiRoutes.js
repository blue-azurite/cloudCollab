import passport from 'passport';
import GitHubStrategy, { Strategy } from 'passport-github2';
import { requestGithub } from '../github/githubQueries';
import request from 'request';
import fetch from 'node-fetch';
import atob from 'atob';

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
        // console.log('data from apiroutes', data);
        let collection = [];
        for (let keys in data) {
          collection.push(data[keys].name);
        }
        res.send(collection);
      })
      .catch(error => {
        console.log('GET user repos error', error);
      });
  });

  // GET sha for repo
  app.post('/api/github/repo/sha', (req, res) => {
    let access_token = req.user.accessToken;
    let user = req.user.username;
    let repo = req.body.repo;
    let url = `https://api.github.com/repos/${user}/${repo}/git/refs/heads/master?access_token=${access_token}`;
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
        let sha = data.object.sha;
        let url = `https://api.github.com/repos/${user}/${repo}/git/trees/${sha}?access_token=${access_token}`
        fetch(url, {
          url: url,
          headers: {
            'User-Agent': user
          }
        })
        .then(response => {
          return response.json();
        })
        .then(tree => {
          console.log(tree.tree)
          res.send(tree.tree);
        });
      })
      .catch(error => {
        console.log('GET user sha error', error);
      });
  });

  // GET user tree
  // /repos/:owner/:repo/git/trees/:sha
  app.get('/api/github/tree', (req, res) => {
    let user = req.user.username;
    let repo = req.body.repo;
    let sha = req.body.sha;
    let url = `https://api.github.com/repos/${user}/${repo}/git/trees/${sha}`;
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
        console.log(data);
      })
      .catch(error => {
        console.log('GET user tree error', error);
      });
  });

  // Get file contents
  app.post('/api/github/contents', (req, res) => {
    let access_token = req.user.accessToken;
    let user = req.user.username;
    let repo = req.body.repo;
    let path = req.body.path;
    console.log(repo, path);
    let url = `https://api.github.com/repos/${user}/${repo}/contents/${path}?access_token=${access_token}`;
    let options = {
      url: url,
      headers: {
        'User-Agent': user
      }
    };
    res.send('hello');
    fetch(url, options)
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        let b64 = data.content;
        let bin = atob(b64);
        console.log(bin);
      })
      .catch(error => {
        console.log('GET file contents error', error);
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
      })
      .catch(error => {
        console.log('GET user orgs error', error);
      });
  });  


};  
