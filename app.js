const utils = require("./utils");
const axios = require("axios").default;
const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());

// Maximum number of attempts to find a unique word
const maxAttempts = 10;

// Function to check if a word has unique letters
function hasUniqueLetters(word) {
  const uniqueLetters = new Set(word);
  return uniqueLetters.size === word.length;
}

// Function to generate a random word from the API
async function generateRandomWord(wordLength) {
  const randomWordApiUrl = `https://random-word-api.herokuapp.com/word?number=1&length=${wordLength}`;

  try {
    const response = await axios.get(randomWordApiUrl);
    const randomWord = response.data[0];

    if (hasUniqueLetters(randomWord)) {
      return randomWord;
    }
  } catch (error) {
    console.error("Error fetching random word:", error);
    throw error;
  }

  return utils.getRandomWordFromPredefined(wordLength);
}

app.get("/word", async (req, res) => {
  const { wordLength } = req.query;
  try {
    const randomWord = await generateRandomWord(wordLength);
    res.json(randomWord);
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ error: "Invalid word length" });
  }
});

//Function to check if a word is dictionary word
app.get("/check-dictionary", (req, res) => {
  const guess = req.query.word; // Get the word from the query parameter
  const apiKey = process.env.API_KEY;
  const dictApiUrl = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${guess}?key=${apiKey}`;

  axios
    .get(dictApiUrl)
    .then((response) => {
      const data = response.data;

      if (Array.isArray(data) && data.length > 0) {
        const meta = data[0].meta;
        console.log(meta);
        if (meta && meta.id.includes(guess)) {
          res.json({ status: "valid" });
        } else {
          res.json({ status: "invalid" });
        }
      } else {
        res.json({ status: "not_found" });
      }
    })
    .catch((error) => {
      console.error("Error checking word in dictionary:", error);
      res.status(500).send("An error occurred while checking the dictionary.");
    });
});

app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
