import mongoose from 'mongoose';

const url = process.env.DATABASEURL || 'mongodb://localhost/blueazurite';

mongoose.connect(url);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

const success = ['(っ◕‿◕)っ', '㋡', '-`ღ´-', 'ᕦ(ò_óˇ)ᕤ', '\ō͡≡o˞̶', 'Yᵒᵘ Oᶰˡʸ Lᶤᵛᵉ Oᶰᶜᵉ', 'ᒡ◯ᵔ◯ᒢ','♪└(￣◇￣)┐♪','☼ ☀ ☁ ☂ ☃ ☄ ☾ ☽ ❄ ☇ ☈ ⊙ ☉ ℃ ℉ ° ❅ ✺ ϟ'];

let random = success[Math.floor(Math.random() * (success.length - 0)) + 0];

db.once('open', () => {
  console.log(`db is connected ${random}`);
});