import React, { Component } from 'react';
import { connect } from 'react-redux';
import MessageEntry from './MessageEntry';
import Messagebox from '../components/Messagebox';

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



class Messages extends Component {
  constructor (props) {
    super(props);
    this.state = {
      messages: [] 
    }

    var addMessage = function (msg){
      var messages = this.state.messages.slice();
      messages.push(msg);
      this.setState({messages: messages});
    }.bind(this);

    this.props.socket.on('new message', function(newMessage){
      addMessage(newMessage);
    });
  }

  // componentWillMount() {
  //   this.props.socket.on('connect', function(){
  //     console.log('Connected on the client-side: MessageDisplay');
  //   });
  // }

  randomGreeting() {
    var greeting = greetings[Math.floor(greetings.length * Math.random())]

    return greeting.word + ' ' + this.props.name + '. (That\'s ' + greeting.language + ' for hello.)';
  }



  render(){
    return (

      <div id="chatcontainer" className="col-xs-12 col-sm-4 col-md-3 col-lg-3 pull-left chatcontainer">
        <div className="tab-content pull-left">
          <div className="tab-pane active" id="public">
            <div id="chat" className="chatbox">
              <div className="panel">

                <div className="panel-body">
                    <ul className="chat">
                        <li id="chatmessage" className="whitebg clearfix">
                            <div className="chat-body clearfix chathelpmessage">
                                <div className="header">
                                    <strong id="name" className="primary-font">{ this.randomGreeting() }</strong>
                                </div>
                            </div>
                        </li>
                      {this.state.messages.map((message, index) => 
                        <MessageEntry key={index} message={message} />
                      )}

                      <Messagebox />

                    </ul>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

function mapStateToProps(state) {
  return {
    socket: state.Socket.socket
  }
}

export default connect(mapStateToProps)(Messages);