randomgreeting.js

const greetings = [ { word: "Mirëdita", language: "Albanian"}, { word: "Ahalan", language: "Arabic" }, { word: "Parev", language: "Armenian" }, 
                    { word: "Zdravei", language: "Bulgarian"}, { word: "Nei Ho", language: "Cantonese" }, { word: "Dobrý den", language: "Czech" },
                    { word: "Goddag", language: "Danish" }, { word: "Goede dag", language: "Dutch" }, { word: "Saluton", language: "Esperanto" }, 
                    { word: "Hei", language: "Finnish" }, { word: "Bonjour", language: "French" }, { word: "Guten Tag", language: "German" }, 
                    { word: "Gia'sou", language: "Greek" }, { word: "Aloha", language: "Hawaiian" }, { word: "Shalom", language: "Hebrew" }, 
                    { word: "Namaste", language: "Hindi" }, { word: "Jó napot", language: "Hungarian" }, { word: "Góðan daginn", language: "Icelandic"}, 
                    { word: "Halo", language: "Indonesian" }, { word: "Aksunai", language: "Inuit" }, { word: "Dia dhuit", language: "Gaelic" }, 
                    { word: "Salve", language: "Italian" }, { word: "Kon-nichiwa", language: "Japanese" }, { word: "An-nyong Ha-se-yo", language: "Korean" },
                    { word: "Ni hao", language: "Mandarin" }, { word: "Hallo", language: "Norwegian" }, { word: "Dzien' dobry", language: "Polish" },
                    { word: "Olá", language: "Portuguese" }, { word: "Bunã ziua", language: "Romanian" }, { word: "Zdravstvuyte", language: "Russian" },
                    { word: "Hola", language: "Spanish" }, { word: "Jambo", language: "Swahili" }, { word: "Hej", language: "Swedish" }, { word: "Hej", language: "Thai" },
                    { word: "Merhaba", language: "Turkish" }, { word: "Vitayu", language: "Ukranian" }, { word: "Xin chào", language: "Vietnemese" },
                    { word: "Hylo", language: "Welsh" },  { word: "Sholem Aleychem", language: "Yiddish" }, { word: "Sawubona", language: "Zulu" } ];
  randomGreeting() {
    var greeting = greetings[Math.floor(greetings.length * Math.random())]

    return greeting.word + ' ' + this.props.name + '. (That\'s ' + greeting.language + ' for hello.)';
  }
