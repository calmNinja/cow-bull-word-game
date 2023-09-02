/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/displayGameOptions.js":
/*!***********************************!*\
  !*** ./src/displayGameOptions.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   displayGameOptions: () => (/* binding */ displayGameOptions)\n/* harmony export */ });\nfunction displayGameOptions(wordLength, difficulty, guesses) {\n  const wordLengthSpan = document.querySelector(\"#option-length\");\n  const difficultySpan = document.querySelector(\"#option-level\");\n  wordLengthSpan.textContent = `${wordLength} letters`;\n  difficultySpan.textContent = `${difficulty} (${guesses} guesses)`;\n}\n\n//# sourceURL=webpack://cow-bull-game/./src/displayGameOptions.js?");

/***/ }),

/***/ "./src/drawGrid.js":
/*!*************************!*\
  !*** ./src/drawGrid.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   drawGrid: () => (/* binding */ drawGrid),\n/* harmony export */   scrollToAddTileRow: () => (/* binding */ scrollToAddTileRow),\n/* harmony export */   state: () => (/* binding */ state)\n/* harmony export */ });\nconst gameContainer = document.querySelector(\"#game-container\");\nconst tilesGrid = document.querySelector(\".tiles-grid\");\nconst state = {\n  grid: [],\n  currentRow: 0,\n  currentTile: 0\n};\n//Generate the word guessing grid\nconst drawGrid = (wordLength, guesses) => {\n  for (let i = 0; i < guesses; i++) {\n    //Create a tile row\n    const tileRow = document.createElement(\"div\");\n    tileRow.classList.add(\"tile-row\");\n    tileRow.setAttribute(\"id\", `tileRow-${i + 1}`);\n    //Create tiles\n    const tileRowData = [];\n    for (let j = 0; j < wordLength; j++) {\n      const tile = document.createElement(\"div\");\n      tile.classList.add(\"tile\");\n      tile.setAttribute(\"id\", `tile-${i}-${j}`);\n      tileRow.appendChild(tile);\n      //Initialize grid with empty values\n      tileRowData.push(\"\");\n    }\n    //Create Placeholders for cows and bulls\n    const bullsElement = document.createElement(\"div\");\n    bullsElement.classList.add(\"bulls\");\n    const cowsElement = document.createElement(\"div\");\n    cowsElement.classList.add(\"cows\");\n\n    //Append placeholders to the Tile Row\n    tileRow.appendChild(bullsElement);\n    tileRow.appendChild(cowsElement);\n\n    //Append tile Rows to the Tile Grid\n    tilesGrid.appendChild(tileRow);\n\n    // Add tile row data to the grid state\n    state.grid.push(tileRowData);\n  }\n\n  //Append Tiles Grid to the Game Container\n  gameContainer.appendChild(tilesGrid);\n};\nconst scrollToAddTileRow = () => {\n  const tileRowId = `tileRow-${state.currentRow + 1}`;\n  const tileRowElement = document.getElementById(tileRowId);\n  if (tileRowElement) {\n    tileRowElement.scrollIntoView({\n      behavior: \"smooth\"\n    });\n  }\n};\n\n//# sourceURL=webpack://cow-bull-game/./src/drawGrid.js?");

/***/ }),

/***/ "./src/fetchSecret.js":
/*!****************************!*\
  !*** ./src/fetchSecret.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   checkWordInDictionary: () => (/* binding */ checkWordInDictionary),\n/* harmony export */   getSecret: () => (/* binding */ getSecret),\n/* harmony export */   secret: () => (/* binding */ secret)\n/* harmony export */ });\n/* harmony import */ var _keyboardEvents_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./keyboardEvents.js */ \"./src/keyboardEvents.js\");\n\n\n//fetch secret word from backend\nlet secret;\nconst getSecret = async wordLength => {\n  try {\n    const response = await fetch(`http://localhost:8000/word?wordLength=${wordLength}`);\n    const json = await response.json();\n    const isValid = await checkWordInDictionary(json);\n    if (isValid) {\n      secret = json;\n      (0,_keyboardEvents_js__WEBPACK_IMPORTED_MODULE_0__.enableKeyboard)();\n      (0,_keyboardEvents_js__WEBPACK_IMPORTED_MODULE_0__.disableDeleteKey)();\n      (0,_keyboardEvents_js__WEBPACK_IMPORTED_MODULE_0__.disableEnterKey)();\n      //console.log(secret); //for testing\n    } else {\n      //Retry fetching a valid secret\n      await getSecret(wordLength);\n    }\n  } catch (err) {\n    console.log(err);\n  }\n};\nconst checkWordInDictionary = async word => {\n  try {\n    const response = await fetch(`http://localhost:8000/check-dictionary/?word=${word}`);\n    const json = await response.json();\n    return json.status === \"valid\";\n  } catch (error) {\n    console.error(\"Error:\", error);\n    return false;\n  }\n};\n\n//# sourceURL=webpack://cow-bull-game/./src/fetchSecret.js?");

/***/ }),

/***/ "./src/gameLogic.js":
/*!**************************!*\
  !*** ./src/gameLogic.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   checkGuess: () => (/* binding */ checkGuess),\n/* harmony export */   getCowBulls: () => (/* binding */ getCowBulls)\n/* harmony export */ });\n/* harmony import */ var _fetchSecret__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fetchSecret */ \"./src/fetchSecret.js\");\n/* harmony import */ var _drawGrid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./drawGrid */ \"./src/drawGrid.js\");\n/* harmony import */ var _keyboardEvents__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./keyboardEvents */ \"./src/keyboardEvents.js\");\n/* harmony import */ var _modalEvents__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modalEvents */ \"./src/modalEvents.js\");\n/* harmony import */ var _gameLogicUtils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./gameLogicUtils */ \"./src/gameLogicUtils.js\");\n/* harmony import */ var _gamescript__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./gamescript */ \"./src/gamescript.js\");\n\n\n\n\n\n\nlet hasScrolled = false;\nlet isGameOver = false;\nconst checkGuess = async () => {\n  const guess = _drawGrid__WEBPACK_IMPORTED_MODULE_1__.state.grid[_drawGrid__WEBPACK_IMPORTED_MODULE_1__.state.currentRow].join(\"\");\n  (0,_keyboardEvents__WEBPACK_IMPORTED_MODULE_2__.disableKeyboard)();\n  (0,_keyboardEvents__WEBPACK_IMPORTED_MODULE_2__.disableDeleteKey)();\n  (0,_keyboardEvents__WEBPACK_IMPORTED_MODULE_2__.disableEnterKey)();\n  if (_drawGrid__WEBPACK_IMPORTED_MODULE_1__.state.currentTile > _gamescript__WEBPACK_IMPORTED_MODULE_5__.wordLength - 1) {\n    (0,_keyboardEvents__WEBPACK_IMPORTED_MODULE_2__.disableEnterKey)();\n    (0,_keyboardEvents__WEBPACK_IMPORTED_MODULE_2__.disableDeleteKey)();\n    const isValid = await (0,_fetchSecret__WEBPACK_IMPORTED_MODULE_0__.checkWordInDictionary)(guess);\n    if (!isValid) {\n      (0,_gameLogicUtils__WEBPACK_IMPORTED_MODULE_4__.showMessage)(\"Your Guess is Invalid\");\n      (0,_gameLogicUtils__WEBPACK_IMPORTED_MODULE_4__.applyInvalidGuessStyle)(_drawGrid__WEBPACK_IMPORTED_MODULE_1__.state.currentRow);\n      return;\n    }\n    if (guess === _fetchSecret__WEBPACK_IMPORTED_MODULE_0__.secret) {\n      const cowBulls = getCowBulls(guess);\n      _drawGrid__WEBPACK_IMPORTED_MODULE_1__.state.currentRow++;\n      (0,_gameLogicUtils__WEBPACK_IMPORTED_MODULE_4__.displayCowBullImages)(cowBulls);\n      isGameOver = true;\n      setTimeout(() => {\n        (0,_modalEvents__WEBPACK_IMPORTED_MODULE_3__.showGameOverModal)(\"Congratulations! \\u{1F389}\", `The word was '<span class=\"target-word\">${_fetchSecret__WEBPACK_IMPORTED_MODULE_0__.secret}</span>'.`);\n      }, 1000);\n      return;\n    }\n    if (_drawGrid__WEBPACK_IMPORTED_MODULE_1__.state.currentRow >= _gamescript__WEBPACK_IMPORTED_MODULE_5__.guesses - 1) {\n      _drawGrid__WEBPACK_IMPORTED_MODULE_1__.state.currentRow++;\n      const cowBulls = getCowBulls(guess);\n      (0,_gameLogicUtils__WEBPACK_IMPORTED_MODULE_4__.displayCowBullImages)(cowBulls);\n      isGameOver = true;\n      setTimeout(() => {\n        (0,_modalEvents__WEBPACK_IMPORTED_MODULE_3__.showGameOverModal)(\"Game Over \\u{1F480}\", `The word was '<span class=\"target-word\">${_fetchSecret__WEBPACK_IMPORTED_MODULE_0__.secret}</span>'.`);\n      }, 500);\n      return;\n    }\n    if (_drawGrid__WEBPACK_IMPORTED_MODULE_1__.state.currentRow < _gamescript__WEBPACK_IMPORTED_MODULE_5__.guesses) {\n      _drawGrid__WEBPACK_IMPORTED_MODULE_1__.state.currentRow++;\n      _drawGrid__WEBPACK_IMPORTED_MODULE_1__.state.currentTile = 0;\n      if (!hasScrolled) {\n        const halfwayPoint = Math.floor(_gamescript__WEBPACK_IMPORTED_MODULE_5__.guesses / 2);\n        if (_drawGrid__WEBPACK_IMPORTED_MODULE_1__.state.currentRow >= halfwayPoint) {\n          (0,_drawGrid__WEBPACK_IMPORTED_MODULE_1__.scrollToAddTileRow)();\n          hasScrolled = true;\n        }\n      }\n    }\n    const cowBulls = getCowBulls(guess);\n    (0,_gameLogicUtils__WEBPACK_IMPORTED_MODULE_4__.displayCowBullImages)(cowBulls);\n  }\n};\nconst getCowBulls = guess => {\n  let cows = 0;\n  let bulls = 0;\n  let secretCopy = _fetchSecret__WEBPACK_IMPORTED_MODULE_0__.secret.split(\"\");\n  let guessCopy = guess.split(\"\");\n  for (let i = 0; i < guess.length; i++) {\n    if (guess[i] === _fetchSecret__WEBPACK_IMPORTED_MODULE_0__.secret[i]) {\n      bulls++;\n      secretCopy[i] = \"\";\n      guessCopy[i] = \"\";\n    }\n  }\n  for (let i = 0; i < guess.length; i++) {\n    if (guessCopy[i] !== \"\" && secretCopy.includes(guessCopy[i])) {\n      cows++;\n      const index = secretCopy.indexOf(guessCopy[i]);\n      secretCopy[index] = \"\";\n    }\n  }\n  // Handle case for only cows or only bulls\n  if (bulls === 0 && cows === 0) {\n    return {\n      cows: \"none\",\n      bulls: \"none\"\n    };\n  } else if (bulls === 0) {\n    return {\n      cows: cows,\n      bulls: \"none\"\n    };\n  } else if (cows === 0) {\n    return {\n      cows: \"none\",\n      bulls: bulls\n    };\n  } else {\n    return {\n      cows,\n      bulls\n    };\n  }\n};\n\n//# sourceURL=webpack://cow-bull-game/./src/gameLogic.js?");

/***/ }),

/***/ "./src/gameLogicUtils.js":
/*!*******************************!*\
  !*** ./src/gameLogicUtils.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   applyInvalidGuessStyle: () => (/* binding */ applyInvalidGuessStyle),\n/* harmony export */   displayCowBullImages: () => (/* binding */ displayCowBullImages),\n/* harmony export */   removeInvalidGuessStyle: () => (/* binding */ removeInvalidGuessStyle),\n/* harmony export */   showMessage: () => (/* binding */ showMessage)\n/* harmony export */ });\n/* harmony import */ var _keyboardEvents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./keyboardEvents */ \"./src/keyboardEvents.js\");\n/* harmony import */ var _drawGrid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./drawGrid */ \"./src/drawGrid.js\");\n/* harmony import */ var _inputHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./inputHandler */ \"./src/inputHandler.js\");\n\n\n\nconst displayCowBullImages = cowBulls => {\n  const bullsElement = document.querySelector(`#tileRow-${_drawGrid__WEBPACK_IMPORTED_MODULE_1__.state.currentRow} .bulls`);\n  const cowsElement = document.querySelector(`#tileRow-${_drawGrid__WEBPACK_IMPORTED_MODULE_1__.state.currentRow} .cows`);\n  // Clear existing content\n  bullsElement.innerHTML = \"\";\n  cowsElement.innerHTML = \"\";\n  if (cowBulls.bulls === 0 || cowBulls.bulls === \"none\") {\n    // Append a message indicating no bulls\n    const noneElement = document.createElement(\"span\");\n    noneElement.textContent = \"None\";\n    noneElement.classList.add(\"none-message\");\n    bullsElement.appendChild(noneElement);\n  } else {\n    // Append bulls images\n    Array.from({\n      length: cowBulls.bulls\n    }).forEach(() => {\n      const bullImg = document.createElement(\"img\");\n      bullImg.src = \"./assets/bull-icon.png\";\n      bullImg.classList.add(\"bull-image\");\n      bullsElement.appendChild(bullImg);\n    });\n  }\n  if (cowBulls.cows === 0 || cowBulls.cows === \"none\") {\n    // Append a message indicating no cows\n    const noneElement = document.createElement(\"span\");\n    noneElement.textContent = \"None\";\n    noneElement.classList.add(\"none-message\");\n    cowsElement.appendChild(noneElement);\n  } else {\n    // Append cows images\n    Array.from({\n      length: cowBulls.cows\n    }).forEach(() => {\n      const cowImg = document.createElement(\"img\");\n      cowImg.src = \"./assets/cow-icon.png\";\n      cowImg.classList.add(\"cow-image\");\n      cowsElement.appendChild(cowImg);\n    });\n  }\n  (0,_keyboardEvents__WEBPACK_IMPORTED_MODULE_0__.enableKeyboard)();\n  (0,_keyboardEvents__WEBPACK_IMPORTED_MODULE_0__.disableDeleteKey)();\n  (0,_keyboardEvents__WEBPACK_IMPORTED_MODULE_0__.disableEnterKey)();\n};\nconst applyInvalidGuessStyle = rowIndex => {\n  const rowTiles = _drawGrid__WEBPACK_IMPORTED_MODULE_1__.state.grid[rowIndex];\n  rowTiles.forEach((_, columnIndex) => {\n    const tile = document.getElementById(`tile-${rowIndex}-${columnIndex}`);\n    tile.style.border = \"2px solid red\";\n  });\n};\nconst removeInvalidGuessStyle = rowIndex => {\n  const rowTiles = _drawGrid__WEBPACK_IMPORTED_MODULE_1__.state.grid[rowIndex];\n  rowTiles.forEach((_, columnIndex) => {\n    const tile = document.getElementById(`tile-${rowIndex}-${columnIndex}`);\n    tile.style.border = \"1px solid darkgreen\";\n  });\n};\nconst messageDisplay = document.querySelector(\".message-container\");\nconst showMessage = message => {\n  const messageElement = document.createElement(\"p\");\n  messageElement.textContent = message;\n  messageDisplay.append(messageElement);\n  (0,_keyboardEvents__WEBPACK_IMPORTED_MODULE_0__.disableDeleteKey)();\n  (0,_keyboardEvents__WEBPACK_IMPORTED_MODULE_0__.disableEnterKey)();\n  (0,_keyboardEvents__WEBPACK_IMPORTED_MODULE_0__.disableKeyboard)();\n  setTimeout(() => {\n    messageDisplay.removeChild(messageElement);\n    if (message === \"Your Guess is Invalid\") {\n      (0,_inputHandler__WEBPACK_IMPORTED_MODULE_2__.deleteRowTiles)(_drawGrid__WEBPACK_IMPORTED_MODULE_1__.state.currentRow);\n      removeInvalidGuessStyle(_drawGrid__WEBPACK_IMPORTED_MODULE_1__.state.currentRow);\n    }\n    (0,_keyboardEvents__WEBPACK_IMPORTED_MODULE_0__.enableKeyboard)();\n    (0,_keyboardEvents__WEBPACK_IMPORTED_MODULE_0__.disableDeleteKey)();\n    (0,_keyboardEvents__WEBPACK_IMPORTED_MODULE_0__.disableEnterKey)();\n  }, 1500);\n};\n\n//# sourceURL=webpack://cow-bull-game/./src/gameLogicUtils.js?");

/***/ }),

/***/ "./src/gamescript.js":
/*!***************************!*\
  !*** ./src/gamescript.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   guesses: () => (/* binding */ guesses),\n/* harmony export */   wordLength: () => (/* binding */ wordLength)\n/* harmony export */ });\n/* harmony import */ var _displayGameOptions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./displayGameOptions.js */ \"./src/displayGameOptions.js\");\n/* harmony import */ var _fetchSecret_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fetchSecret.js */ \"./src/fetchSecret.js\");\n/* harmony import */ var _keyboardEvents_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./keyboardEvents.js */ \"./src/keyboardEvents.js\");\n/* harmony import */ var _drawGrid_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./drawGrid.js */ \"./src/drawGrid.js\");\n\n\n\n\n\n//Game start\nconst urlParams = new URLSearchParams(window.location.search);\nconst wordLength = urlParams.get(\"wordLength\");\nconst difficulty = urlParams.get(\"difficulty\");\nconst guesses = urlParams.get(\"guesses\");\nconst startUp = () => {\n  (0,_displayGameOptions_js__WEBPACK_IMPORTED_MODULE_0__.displayGameOptions)(wordLength, difficulty, guesses);\n  (0,_drawGrid_js__WEBPACK_IMPORTED_MODULE_3__.drawGrid)(wordLength, guesses);\n  (0,_keyboardEvents_js__WEBPACK_IMPORTED_MODULE_2__.disableKeyboard)();\n  (0,_keyboardEvents_js__WEBPACK_IMPORTED_MODULE_2__.registerKeyboardEvents)();\n  (0,_fetchSecret_js__WEBPACK_IMPORTED_MODULE_1__.getSecret)(wordLength);\n};\nstartUp();\n\n//# sourceURL=webpack://cow-bull-game/./src/gamescript.js?");

/***/ }),

/***/ "./src/inputHandler.js":
/*!*****************************!*\
  !*** ./src/inputHandler.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addLetter: () => (/* binding */ addLetter),\n/* harmony export */   deleteLetter: () => (/* binding */ deleteLetter),\n/* harmony export */   deleteRowTiles: () => (/* binding */ deleteRowTiles),\n/* harmony export */   handleClick: () => (/* binding */ handleClick)\n/* harmony export */ });\n/* harmony import */ var _drawGrid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./drawGrid */ \"./src/drawGrid.js\");\n/* harmony import */ var _gameLogic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameLogic */ \"./src/gameLogic.js\");\n/* harmony import */ var _gamescript__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gamescript */ \"./src/gamescript.js\");\n/* harmony import */ var _keyboardEvents__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./keyboardEvents */ \"./src/keyboardEvents.js\");\n\n\n\n\nlet isFirstTileFilled = false;\nconst handleClick = event => {\n  const letter = event.target.getAttribute(\"data-key\");\n  if (letter === \"Backspace\") {\n    deleteLetter();\n    return;\n  }\n  if (letter === \"Enter\") {\n    (0,_gameLogic__WEBPACK_IMPORTED_MODULE_1__.checkGuess)();\n    return;\n  }\n  //Finally update the tile with the letter\n  addLetter(letter);\n};\nconst addLetter = letter => {\n  if (_drawGrid__WEBPACK_IMPORTED_MODULE_0__.state.currentTile < _gamescript__WEBPACK_IMPORTED_MODULE_2__.wordLength && _drawGrid__WEBPACK_IMPORTED_MODULE_0__.state.currentRow < _gamescript__WEBPACK_IMPORTED_MODULE_2__.guesses) {\n    const tile = document.getElementById(`tile-${_drawGrid__WEBPACK_IMPORTED_MODULE_0__.state.currentRow}-${_drawGrid__WEBPACK_IMPORTED_MODULE_0__.state.currentTile}`);\n    tile.textContent = letter;\n    _drawGrid__WEBPACK_IMPORTED_MODULE_0__.state.grid[_drawGrid__WEBPACK_IMPORTED_MODULE_0__.state.currentRow][_drawGrid__WEBPACK_IMPORTED_MODULE_0__.state.currentTile] = letter;\n    _drawGrid__WEBPACK_IMPORTED_MODULE_0__.state.currentTile++;\n\n    // Update the isFirstTileFilled variable if the current tile is the first tile in the row\n    // Enable the delete key once the first tile is filled\n    if (_drawGrid__WEBPACK_IMPORTED_MODULE_0__.state.currentTile === 1) {\n      isFirstTileFilled = true;\n      (0,_keyboardEvents__WEBPACK_IMPORTED_MODULE_3__.enableDeleteKey)();\n    }\n\n    // Check if the row is full and enable the enter key\n    if (_drawGrid__WEBPACK_IMPORTED_MODULE_0__.state.currentTile == _gamescript__WEBPACK_IMPORTED_MODULE_2__.wordLength) {\n      const enterKey = document.getElementById(\"enterKey\");\n      enterKey.classList.remove(\"disabled\");\n      enterKey.disabled = false;\n    }\n  }\n};\nconst deleteLetter = () => {\n  if (_drawGrid__WEBPACK_IMPORTED_MODULE_0__.state.currentTile > 0) {\n    _drawGrid__WEBPACK_IMPORTED_MODULE_0__.state.currentTile--;\n    const tile = document.getElementById(`tile-${_drawGrid__WEBPACK_IMPORTED_MODULE_0__.state.currentRow}-${_drawGrid__WEBPACK_IMPORTED_MODULE_0__.state.currentTile}`);\n    tile.textContent = \"\";\n    _drawGrid__WEBPACK_IMPORTED_MODULE_0__.state.grid[_drawGrid__WEBPACK_IMPORTED_MODULE_0__.state.currentRow][_drawGrid__WEBPACK_IMPORTED_MODULE_0__.state.currentTile] = \"\";\n    // Disable the delete key if the row has no filled tiles\n    const currentRowTiles = _drawGrid__WEBPACK_IMPORTED_MODULE_0__.state.grid[_drawGrid__WEBPACK_IMPORTED_MODULE_0__.state.currentRow];\n    const hasFilledTiles = currentRowTiles.some(tile => tile !== \"\");\n    if (!hasFilledTiles || !isFirstTileFilled) {\n      (0,_keyboardEvents__WEBPACK_IMPORTED_MODULE_3__.disableDeleteKey)();\n    } else {\n      (0,_keyboardEvents__WEBPACK_IMPORTED_MODULE_3__.enableDeleteKey)();\n    }\n    // Disable the enter key if the row is not full\n    (0,_keyboardEvents__WEBPACK_IMPORTED_MODULE_3__.disableEnterKey)();\n  }\n};\n\n// Function to delete the letters in the given row\nconst deleteRowTiles = rowIndex => {\n  const rowTiles = _drawGrid__WEBPACK_IMPORTED_MODULE_0__.state.grid[rowIndex];\n  rowTiles.forEach((_, columnIndex) => {\n    const tile = document.getElementById(`tile-${rowIndex}-${columnIndex}`);\n    tile.textContent = \"\";\n    _drawGrid__WEBPACK_IMPORTED_MODULE_0__.state.grid[rowIndex][columnIndex] = \"\";\n  });\n  (0,_keyboardEvents__WEBPACK_IMPORTED_MODULE_3__.disableDeleteKey)();\n  (0,_keyboardEvents__WEBPACK_IMPORTED_MODULE_3__.disableEnterKey)();\n  _drawGrid__WEBPACK_IMPORTED_MODULE_0__.state.currentTile = 0;\n};\n\n//# sourceURL=webpack://cow-bull-game/./src/inputHandler.js?");

/***/ }),

/***/ "./src/keyboardEvents.js":
/*!*******************************!*\
  !*** ./src/keyboardEvents.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   disableDeleteKey: () => (/* binding */ disableDeleteKey),\n/* harmony export */   disableEnterKey: () => (/* binding */ disableEnterKey),\n/* harmony export */   disableKeyboard: () => (/* binding */ disableKeyboard),\n/* harmony export */   enableDeleteKey: () => (/* binding */ enableDeleteKey),\n/* harmony export */   enableKeyboard: () => (/* binding */ enableKeyboard),\n/* harmony export */   handleKeyDown: () => (/* binding */ handleKeyDown),\n/* harmony export */   registerKeyboardEvents: () => (/* binding */ registerKeyboardEvents)\n/* harmony export */ });\n/* harmony import */ var _inputHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./inputHandler */ \"./src/inputHandler.js\");\n/* harmony import */ var _gameLogic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameLogic */ \"./src/gameLogic.js\");\n\n\nconst registerKeyboardEvents = () => {\n  const keys = document.querySelectorAll(\".keyboard-row button\");\n  keys.forEach(key => {\n    key.addEventListener(\"click\", _inputHandler__WEBPACK_IMPORTED_MODULE_0__.handleClick);\n  });\n};\nconst disableKeyboard = () => {\n  const buttons = document.querySelectorAll(\"#keyboard-container button\");\n  buttons.forEach(button => {\n    button.classList.add(\"disabled\");\n  });\n};\nconst enableKeyboard = () => {\n  const buttons = document.querySelectorAll(\"#keyboard-container button\");\n  buttons.forEach(button => {\n    button.classList.remove(\"disabled\");\n  });\n};\nconst disableEnterKey = () => {\n  const enterKey = document.getElementById(\"enterKey\");\n  enterKey.classList.add(\"disabled\");\n  enterKey.disabled = true;\n};\nconst deleteKey = document.getElementById(\"deleteKey\");\nconst disableDeleteKey = () => {\n  deleteKey.classList.add(\"disabled\");\n  deleteKey.disabled = true;\n};\nconst enableDeleteKey = () => {\n  deleteKey.classList.remove(\"disabled\");\n  deleteKey.disabled = false;\n};\n\n// Function to handle input from physical keyboard\nconst handleKeyDown = event => {\n  const letter = event.key;\n  if (/^[a-zA-Z]$/.test(letter)) {\n    (0,_inputHandler__WEBPACK_IMPORTED_MODULE_0__.addLetter)(letter.toLowerCase());\n  } else if (event.key === \"Enter\") {\n    (0,_gameLogic__WEBPACK_IMPORTED_MODULE_1__.checkGuess)();\n  } else if (event.key === \"Backspace\") {\n    (0,_inputHandler__WEBPACK_IMPORTED_MODULE_0__.deleteLetter)();\n  }\n};\n//Listening for input from physical keyboard\ndocument.addEventListener(\"keydown\", handleKeyDown);\n\n//# sourceURL=webpack://cow-bull-game/./src/keyboardEvents.js?");

/***/ }),

/***/ "./src/modalEvents.js":
/*!****************************!*\
  !*** ./src/modalEvents.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   showGameOverModal: () => (/* binding */ showGameOverModal)\n/* harmony export */ });\n/* harmony import */ var _keyboardEvents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./keyboardEvents */ \"./src/keyboardEvents.js\");\n/* harmony import */ var _fetchSecret__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fetchSecret */ \"./src/fetchSecret.js\");\n\n\nconst rulesModal = document.getElementById(\"rules-modal\");\nconst rulesButton = document.getElementById(\"rules-button\");\nconst closeRulesButton = document.getElementById(\"close-rules-modal\");\nconst openRulesModal = () => {\n  rulesModal.style.display = \"block\";\n};\nconst closeRulesModal = () => {\n  rulesModal.style.display = \"none\";\n};\n\n// Open the modal when the \"Game Rules\" button is clicked\nrulesButton.addEventListener(\"click\", openRulesModal);\ncloseRulesButton.addEventListener(\"click\", closeRulesModal);\nwindow.addEventListener(\"click\", function (event) {\n  if (event.target === rulesModal) {\n    closeRulesModal();\n  }\n});\nconst gameOverModal = document.getElementById(\"game-over-modal\");\nconst closeModalAndNavigateToHomePage = () => {\n  gameOverModal.classList.add(\"hidden\");\n  setTimeout(() => {\n    window.location.href = \"index.html\";\n  }, 500);\n};\nconst showGameOverModal = (title, message) => {\n  const gameOverModalTitle = document.getElementById(\"game-over-modal-title\");\n  const gameOverModalMessage = document.getElementById(\"game-over-modal-message\");\n  const closeSymbol = document.getElementById(\"close-game-over-modal\");\n  gameOverModalTitle.textContent = title;\n  gameOverModalMessage.innerHTML = message;\n  gameOverModal.classList.remove(\"hidden\");\n  (0,_keyboardEvents__WEBPACK_IMPORTED_MODULE_0__.disableKeyboard)();\n\n  // Close modal and navigate to the home page when close symbol is clicked\n  closeSymbol.addEventListener(\"click\", closeModalAndNavigateToHomePage);\n  // Close modal and navigate to the home page when clicking outside the modal\n  document.addEventListener(\"click\", function (event) {\n    const modal = document.getElementById(\"game-over-modal\");\n    if (event.target === modal) {\n      closeModalAndNavigateToHomePage();\n    }\n  });\n};\n\n//Handle Play Again Feature\nconst closeModalAndPlayAgain = () => {\n  gameOverModal.style.display = \"none\";\n  const queryParams = new URLSearchParams();\n  queryParams.set(\"showGameOptionsModal\", \"true\");\n  const gameOptionsUrl = `index.html?${queryParams.toString()}`;\n  window.location.href = gameOptionsUrl;\n};\nconst playAgainBtn = document.getElementById(\"game-over-play-again-button\");\nplayAgainBtn.addEventListener(\"click\", closeModalAndPlayAgain);\n\n//Handling esc key for respective modals\ndocument.addEventListener(\"keydown\", function (event) {\n  if (event.key === \"Escape\") {\n    if (!gameOverModal.classList.contains(\"hidden\")) {\n      closeModalAndNavigateToHomePage();\n    } else if (rulesModal.style.display != \"none\") {\n      closeRulesModal();\n    }\n  }\n});\n\n//Quit modal\nconst quitButton = document.getElementById(\"quit-button\");\nquitButton.addEventListener(\"click\", () => {\n  showGameOverModal(\"Good effort! \\u{1F44D}\", `The word was '<span class=\"target-word\">${_fetchSecret__WEBPACK_IMPORTED_MODULE_1__.secret}</span>'.`);\n});\n\n//# sourceURL=webpack://cow-bull-game/./src/modalEvents.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/gamescript.js");
/******/ 	
/******/ })()
;