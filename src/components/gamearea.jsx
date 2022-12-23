"use strict";

import React, { Component } from "react";
import Card from "./card";

class GameArea extends Component {
  state = {
    cards: [],
    flippedCard: undefined,
    clickedCard: undefined,
    clickable: true,
  };

  //När sidan laddas körs följande, hämtar katt & hund bilder, för att sedan sortera upp dem.
  componentDidMount() {
    this.getCat();
    this.getDog();
    this.delay(1000).then(() => {
      this.shuffleCards(this.state.cards);
    });
  }

  //En funktion för att sätta en paus
  delay = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  //Hämtar en array av hundbilder från thedogapi.com
  getDog = () => {
    fetch("https://api.thedogapi.com/v1/images/search?limit=5")
      .then((response) => response.json())
      .then((data) => {
        for (let i = 0; i < 5; i++) {
          this.setState((prevState) => ({
            cards: [
              ...prevState.cards,
              { url: data[i].url, id: data[i].id + 1 },
              { url: data[i].url, id: data[i].id + 2 },
            ],
          }));
        }
      });
  };

  //Hämtar en array av kattbilder från thecatapi.com
  getCat = () => {
    fetch("https://api.thecatapi.com/v1/images/search?limit=5")
      .then((response) => response.json())
      .then((data) => {
        for (let i = 0; i < 5; i++) {
          this.setState((prevState) => ({
            cards: [
              ...prevState.cards,
              { url: data[i].url, id: data[i].id + 1 },
              { url: data[i].url, id: data[i].id + 2 },
            ],
          }));
        }
      });
  };

  //Sorterar om arrayen med bilder.
  shuffleCards = (array) => {
    const length = array.length;
    for (let i = length; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * i);
      const currentIndex = i - 1;
      const temp = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temp;
    }
    this.setState({ cards: array });
  };

  handleClick = (card, event) => {
    const TARGET = event.target;

    //Avbryter clickmomentet ifall clickable är false.
    if (!this.state.clickable) return;

    //Tar bort hidden från bild.
    if (TARGET.children[0]) {
      TARGET.children[0].classList.remove("hidden");
    }

    //Om man klickar redan vald bild
    if (!TARGET.children[0]) {
      this.setState({ clickable: true });
      return;
    }

    //Sätter variabler för att kunna jämföra två bilder.
    if (this.state.flippedCard == undefined) {
      this.setState({ flippedCard: TARGET });
      this.setState({ clickedCard: card });
    }

    // Hanterar clickande av samma bild två gånger.
    if (this.state.flippedCard != undefined) {
      this.setState({ clickable: false });
      this.delay(100).then(() => {
        if (this.state.clickedCard.id == card.id) {
          this.setState({ clickable: true });
          this.state.flippedCard.children[0].classList.add("hidden");
          this.setState({ flippedCard: undefined });
          return;
        }
      });
    }

    //Huvud kontrollen för att jämföra korrekt valda bilder
    if (
      this.state.flippedCard != undefined &&
      this.state.clickedCard.id != card.id
    ) {
      this.setState({ clickable: false });
      this.delay(1000).then(() => {
        //Om det inte matchas, ska allt nollställas.
        if (this.state.flippedCard.children[0].src != TARGET.children[0].src) {
          this.state.flippedCard.children[0].classList.add("hidden");
          TARGET.children[0].classList.add("hidden");
          this.setState({ flippedCard: undefined });
          this.delay(100).then(() => {
            this.setState({ clickable: true });
          });
        } else {
          // Annars lämnas bilderna synliga.
          this.setState({ flippedCard: undefined });
          this.delay(100).then(() => {
            this.setState({ clickable: true });
          });
        }
      });
    }
  };

  //Renderaren kallar map funktionen för att loopa genom alla kort på djurbilder. Skapar upp en Card objekt med varje.
  render() {
    return (
      <div className="game-area">
        {this.state.cards.map((card) => (
          <Card key={card.id} card={card} onClick={this.handleClick}></Card>
        ))}
      </div>
    );
  }
}

export default GameArea;
