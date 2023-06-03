module.exports.random4 = ["goal", "nice", "rice", "mail", "toil"];
module.exports.random5 = ["foyer", "tails", "style", "steak", "polar"];
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
      return res
        .status(404)
        .send("Something went wrong.. Please try again later!");
  }

  return wordList[Math.floor(Math.random() * wordList.length)];
};
