import React, { Component } from "react";

class Card extends Component {
  styles = {
    fontSize: "1rem",
    fontWeight: "bold",
  };
  state = {
    IMAGEURL: "",
    DataisLoaded: false,
    draggable: false,
  };

  componentDidMount() {
    fetch("https://api.thecatapi.com/v1/images/search?limit=1")
      .then((response) => response.json())
      .then((data) => {
        this.props.card.hasImage = true;
        console.log("check again" + this.props.card.hasImage);
        this.setState({
          IMAGEURL: data[0].url,
          DataisLoaded: true,
        });
      });
  }

  render() {
    const { DataisLoaded, items } = this.state;
    if (!DataisLoaded)
      return (
        <div>
          <h1> Buffering some animals </h1>{" "}
        </div>
      );
    return (
      <div className="App">
        <img
          src={this.state.IMAGEURL}
          draggable={this.state.draggable}
          className="imgProperties"
        />
      </div>
    );
  }
}

export default Card;
