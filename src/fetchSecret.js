import {
  enableKeyboard,
  disableDeleteKey,
  disableEnterKey,
} from "./keyboardEvents.js";

//fetch secret word from backend
export let secret;
export const getSecret = async (wordLength) => {
  try {
    const response = await fetch(
      `http://localhost:8000/word?wordLength=${wordLength}`
    );
    const json = await response.json();
    const isValid = await checkWordInDictionary(json);
    if (isValid) {
      secret = json;
      enableKeyboard();
      disableDeleteKey();
      disableEnterKey();
      //console.log(secret); //for testing
    } else {
      //Retry fetching a valid secret
      await getSecret(wordLength);
    }
  } catch (err) {
    console.log(err);
  }
};

export const checkWordInDictionary = async (word) => {
  try {
    const response = await fetch(
      `http://localhost:8000/check-dictionary/?word=${word}`
    );
    const json = await response.json();
    return json.status === "valid";
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
};
