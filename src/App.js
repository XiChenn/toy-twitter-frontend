import React, { Component } from 'react';
import './App.css';
import Tweets from "./tweets";

class App extends Component {
  render() {
    return (
      <div className="App">
        Hello ACBC. This is a toy twitter!
        <Tweets/>
      </div>
    );
  }
}

export default App;
