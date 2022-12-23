"use strict";

import React, { Component } from "react";

class Card extends Component {
  state = {
    draggable: false,
  };

  render() {
    return (
      <div className="container">
        <div
          className="card"
          onClick={(event) => this.props.onClick(this.props.card, event)}
        >
          <img
            src={this.props.card.url}
            draggable={this.state.draggable}
            className="hidden"
          />
        </div>
      </div>
    );
  }
}

export default Card;
