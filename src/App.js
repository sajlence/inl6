"use strict";

import Navbar from "./components/navbar";
import GameArea from "./components/gamearea";
import React, { Component } from "react";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <GameArea />
        <div className="App"></div>
      </React.Fragment>
    );
  }
}

export default App;
