import mongoose from 'mongoose';
import redis from 'redis';

const client = redis.createClient();
const url = process.env.DATABASEURL || 'mongodb://localhost/blueazurite';

//------------------------------- Mongo
mongoose.connect(url);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

const success = ['(っ◕‿◕)っ', '㋡', '-`ღ´-', 'ᕦ(ò_óˇ)ᕤ', '\ō͡≡o˞̶', 'Yᵒᵘ Oᶰˡʸ Lᶤᵛᵉ Oᶰᶜᵉ', 'ᒡ◯ᵔ◯ᒢ','♪└(￣◇￣)┐♪','☼ ☀ ☁ ☂ ☃ ☄ ☾ ☽ ❄ ☇ ☈ ⊙ ☉ ℃ ℉ ° ❅ ✺ ϟ'];

let random = success[Math.floor(Math.random() * (success.length - 0)) + 0];

db.once('open', () => {
  console.log(`mongodb is connected ${random}`);
});



//------------------------------- Redis

client.on('connect', function() {
    console.log(`redis is connected ${random}`);
});