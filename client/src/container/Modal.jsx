import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { saveName } from '../actions';

const animals = [" alligator", " anteater", " armadillo", " auroch", " axolotl", " badger", " bat", " beaver", " buffalo", " camel", " chameleon", " cheetah", " chipmunk", " chinchilla", " chupacabra", " cormorant", " coyote", " crow", " dingo", " dinosaur", " dolphin", " duck", " elephant", " ferret", " fox", " frog", " giraffe", " gopher", " grizzly", " hedgehog", " hippo", " hyena", " jackal", " ibex", " ifrit", " iguana", " koala", " kraken", " lemur", " leopard", " liger", " llama", " manatee", " mink", " monkey", " narwhal", " nyan cat", " orangutan", " otter", " panda", " penguin", " platypus", " python", " pumpkin", " quagga", " rabbit", " raccoon", " rhino", " sheep", " shrew", " skunk", " slow loris", " squirrel", " turtle", " walrus", " wolf", " wolverine", " wombat"]

const randomAnimal = function() {
  return animals[Math.floor(animals.length * Math.random())];
}

// does this even need its own container? 

class Modal extends Component {

  componentDidMount() {
    const savename = this.props.saveName.bind(this);
    // if (!this.props.name) {
    //   bootbox.prompt("What is your name?", function(result) {             
    //     if (result.length === 0) {
    //       const anon = 'anonymous' + randomAnimal()
    //       console.log('you didn\'t enter a name', anon)
    //       savename(anon)
    //     } else {
    //       savename(result);
    //       console.log('hello', result);                        
    //     }
    //   });
    // }
    savename('anonymous' + randomAnimal());
  }

  render() {
    return(
      <div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    name: state.Name.name
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ saveName: saveName }, dispatch);
}



export default connect(mapStateToProps, mapDispatchToProps)(Modal);