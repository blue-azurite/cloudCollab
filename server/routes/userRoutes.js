import User from '../config/users.js';

const saveSession = function (session){
  //session objest should contain "username", "sessionId", "sessionContent"
  User.findOne({username: session.username}, function (err, user){
    if(err){
      //do something to handle err,
    }
    if(!user){
      // we may need to create a new user here
      console.log("we need to do something, can not found: ", session.username);
      User.create({username: session.username, 
                sessions: [{
                  id: session.sessionId, 
                  contents: session.sessionContent
                }]
              });
    } else {      
      var sessions = user.sessions;
      var notFound = true; 
      sessions.forEach((pastSession) => {
        if(pastSession.id === session.sessionId){
          pastSession.contents = session.sessionContent;
          notFound = false;
        }
      })
      if(notFound){
        sessions.push({
          id: sessionId,
          contents: session.sessionContent
        });
      }
      User.findOneAndUpdate({username: session.username}, {$set: {sessions: sessions}}, function(err, newResult){
        if(err){
          console.log('fail to update sessions because of: ', err);
        }
        if(newResult){
          // console.log('sucessufully update', newResult);
        }
      });
    }
  });
};

export default saveSession; 