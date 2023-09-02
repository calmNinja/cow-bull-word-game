module.exports.random3 = [
  "urn",
  "dry",
  "hat",
  "ink",
  "jam",
  "kit",
  "lap",
  "men",
  "nut",
  "owl",
  "pen",
  "rug",
  "sun",
  "tap",
  "jab",
  "qua",
  "tug",
];

module.exports.random4 = [
  "word",
  "girl",
  "fish",
  "park",
  "town",
  "hand",
  "city",
  "lion",
  "game",
  "bird",
  "rain",
  "desk",
  "idea",
  "jump",
  "lake",
  "gift",
  "goal",
  "code",
  "yoga",
];
module.exports.random5 = [
  "foyer",
  "style",
  "steak",
  "polar",
  "beach",
  "candy",
  "daisy",
  "earth",
  "fairy",
  "ghost",
  "lucky",
  "mango",
  "novel",
  "ocean",
  "piano",
  "quilt",
  "tiger",
];
module.exports.random6 = ["frying", "trying", "bolted", "strand", "strain"];

module.exports.getRandomWordFromPredefined = (wordLength) => {
  let wordList;
  switch (parseInt(wordLength)) {
    case 4:
      wordList = module.exports.random4;
      break;
    case 5:
      wordList = module.exports.random5;
      break;
    case 6:
      wordList = module.exports.random6;
      break;
    default:
      throw new Error("Invalid word length");
  }

  return wordList[Math.floor(Math.random() * wordList.length)];
};
