const axios = require("axios").default;
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());

// Predefined arrays for different word lengths
const random4 = ["goal", "nice", "rice", "mail", "toil"];
const random5 = ["foyer", "tails", "mails", "steak", "polar"];
const random6 = ["frying", "trying", "bolted", "strand", "brains"];

// Maximum number of attempts to find a unique word
const maxAttempts = 10;

// Function to check if a word has unique letters
function hasUniqueLetters(word) {
  const uniqueLetters = new Set(word);
  return uniqueLetters.size === word.length;
}

// Function to generate a random word from the API
async function generateRandomWord(wordLength) {
  console.log(
    "inside generateRandomWord function, the received wordLenght is " +
      wordLength
  );
  const apiUrl = `https://random-word-api.herokuapp.com/word?number=1&length=${wordLength}`;

  try {
    const response = await axios.get(apiUrl);
    console.log("receiving response from api");
    const randomWord = response.data[0];

    if (hasUniqueLetters(randomWord)) {
      return randomWord;
    }
  } catch (error) {
    console.error("Error fetching random word:", error);
    throw error;
  }

  return getRandomWordFromPredefined(wordLength);
}

// Function to get a random word from the predefined arrays
function getRandomWordFromPredefined(wordLength) {
  let wordList;
  switch (parseInt(wordLength)) {
    case 4:
      wordList = random4;
      console.log("fetching from array of length 4");
      break;
    case 5:
      wordList = random5;
      console.log("fetching from array of length 5");
      break;
    case 6:
      wordList = random6;
      console.log("fetching from array of length 6");
      break;
    default:
      console.log("didn't match a word length..");
      return "No Word Available";
  }

  return wordList[Math.floor(Math.random() * wordList.length)];
}

app.get("/word", async (req, res) => {
  //   const wordLength = 4;
  const { wordLength } = req.query;
  console.log("parsing int.. " + parseInt(wordLength));
  console.log("without parsing int..." + wordLength);

  try {
    const randomWord = await generateRandomWord(wordLength);
    console.log("trying to generate random word of length " + wordLength);
    //res.send(`<h1>The target word is: ${randomWord}</h1>`);
    res.json(randomWord);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Unable to generate a random word." });
  }
});

app.use(express.static("public"));

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
