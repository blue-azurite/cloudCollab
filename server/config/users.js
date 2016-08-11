import mongoose from 'mongoose';

const UserSchema = mongoose.Schema(
  username: {type: String, unique: true, required: true},  
  sessions: [{id: String, contents: String}]
  )

const User = mongoose.model('User', UserSchema);

export default User;