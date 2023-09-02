![Banner](/screenshots/CowBull_-_A_Word_Guessing_Game.png) 

<br>
CowBull is a word guessing game built using HTML, CSS, Vanilla JavaScript, Node.js, Express, Webpack, and Babel.
<br>

## Overview

CowBull is a fun word guessing game where players try to guess a secret word by inputting their guesses. The game provides feedback in the form of cows and bulls to help players refine their guesses. This project was created using a combination of front-end and back-end technologies.

## Demo

Here are a few screenshots from the CowBull game page:

### Screenshots


<div align="center">
  **Main Game Page**
  <img src="/screenshots/home-page.png" alt="Main Game Page" width="500">
</div>



<div align="center">
  <p "text-decoration: underline;">Game Options Modal</p>
  <img src="/screenshots/game-options-display.png" alt="Game Options Modal" width="500">
</div>


<div align="center">
  <p "text-decoration: underline;">Game Guessing Grid with virtual keyboard and result display</p>
  <img src="/screenshots/guessing-grid.png" alt="Game Guessing Grid with virtual keyboard and result display" width="500">
</div>


<div align="center">
  <p "text-decoration: underline;">Responsive Layout for Game Grid Page</p>
  <img src="/screenshots/responsive-gamegrid.png" alt="Responsive Layout for Game Grid Page" width="500">
</div>


<div align="center">
  <p "text-decoration: underline;">Game Rules Reference Modal</p>
  <img src="/screenshots/game-rules-modal.png" alt="Game Rules Reference Modal" width="500">
</div>


<div align="center">
  <p "text-decoration: underline;">Winning Game Modal</p>
  <img src="/screenshots/game-winning-modal.png" alt="Winning Game Modal" width="500">
</div>

## Installation

To run CowBull locally, follow these steps:

1. Clone the repository to your local machine.

   ```bash
   git clone https://github.com/calmNinja/cow-bull-word-game.git
   ```

2. Navigate to the project directory.
   ```bash
   cd cowbull
   ```
3. Install the required dependencies.
   ```bash
   npm install
   ```
4. Create a .env file in the project root and add your API key for dictionary lookup. You can obtain an API key from [dictionaryapi.com](https://www.dictionaryapi.com/register/index).
   ```bash
   API_KEY=your-api-key-here
   ```
5. Start the development server.
   ```bash
   npm start
   ```
6. Open your web browser and visit http://localhost:3000 to play CowBull.

## How to Play

Welcome to CowBull, the word-guessing game!

1. Enter your guesses in the word grid.
2. Click the "Enter" button to submit your guess.
3. Receive feedback in the form of cows and bulls.
4. Try to guess the secret word within the limited number of attempts.

Choose your preferred input method - either the virtual keyboard or your physical keyboard -

## API Usage

This project utilizes two APIs:

### Random Word API

The Random Word API is used to generate random words of a specific length. You can use the following URL to request a random word:
https://random-word-api.herokuapp.com/word?number=1&length={wordLength}

### Dictionary API

The Dictionary API is used to check if a word is valid and in the dictionary. You should obtain an API key from dictionaryapi.com and store it in your .env file as API_KEY.

## Live Demo

TBD

## Happy CowBulling! 🐄🐂
