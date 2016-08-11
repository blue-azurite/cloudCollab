import Promise from 'bluebird';

export default function(app) {
  app.get('/api/github', (req,res) => {
    res.send('hello');
  });
}