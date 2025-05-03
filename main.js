let gameName = "Guess The Word";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector(
    "footer"
).innerHTML = `${gameName} created by &copy; Ahmed Abdelaziz 2025 `;
//Game's words
let words = [
    "planet",
    "rocket",
    "jungle",
    "silver",
    "window",
    "bridge",
    "castle",
    "yellow",
    "guitar",
    "people",
    "forest",
    "stream",
    "ticket",
    "monkey",
    "battle",
    "hunter",
    "dragon",
    "button",
    "saddle",
    "bottle",
    "pickle",
    "pencil",
    "camera",
    "basket",
    "hammer",
    "danger",
    "flower",
    "ground",
    "candle",
    "temple",
    "golden",
    "travel",
    "kitten",
    "friend",
    "silent",
    "butter",
    "thread",
    "socket",
    "cheese",
    "cradle",
    "planet",
    "wallet",
    "summer",
    "number",
    "circle",
    "frozen",
    "jacket",
    "rabbit",
    "museum",
    "flight",
];
let randomWord = words[Math.floor(Math.random() * words.length)];

//start the game
let numbersOfTries;
let numbersOfLetter = 6;
let currentTry = 1;

let startGame = document.querySelector(".start-game");
let input = document.querySelector(".tries-inputs input");
let start = document.querySelector(".start");
let theGame = document.querySelector(".guess-game");

input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        start.click();
    }
});
window.onload = function () {
    input.focus();
};
start.addEventListener("click", function () {
    let oldErrorMsg = document.querySelector(".error-msg");
    if (oldErrorMsg) oldErrorMsg.remove();
    let errorMsg = document.createElement("div");
    errorMsg.classList.add("error-msg");
    numbersOfTries = +input.value;

    if (numbersOfTries > 6 || numbersOfTries < 1 || isNaN(numbersOfTries)) {
        errorMsg.innerHTML =
            "The number you entered is incorrect. It should be between 1 and 6.";
        errorMsg.style.cssText = `color: rgb(255, 45, 45);
        font-size: 14px;`;
        startGame.appendChild(errorMsg);
        input.value = "";
    } else {
        let theGameName = document.querySelector("h1");
        theGameName.style.cssText = `top: 10px;`;
        startGame.style.cssText = `display: none;`;
        theGame.style.cssText = `display: block;`;
        generateIpus();
        checkLetter();
    }
});

//Game Logic
let letters = 0;
function checkLetter() {
    letters = 0;
    let successes = true;
    for (let i = 1; i <= numbersOfLetter; i++) {
        let theInput = document.querySelector(
            `.guess-${currentTry}-letter-${i}`
        );
        theInput.addEventListener("input", function () {
            let theLetter = theInput.value.toLowerCase();
            if (theLetter === randomWord[i - 1]) {
                theInput.classList.add("in-place");
                theInput.disabled = true;
                letters++;
            } else if (randomWord.includes(theLetter)) {
                theInput.classList.add("not-in-place");
                theInput.disabled = true;
                successes = false;
                letters++;
            } else {
                theInput.classList.add("wrong");
                theInput.disabled = true;
                successes = false;
                letters++;
            }
            if (letters === 6) {
                checkSuccesse(successes);
            }
        });
    }
}
function checkSuccesse(successes) {
    let theMassage = document.querySelector(".massage");
    if (successes) {
        theMassage.classList.add("win");
        theMassage.innerHTML = "YOU WON";
        let allInput = document.querySelectorAll(".inputs div");
        allInput.forEach((div) => div.classList.add("disabled"));
    } else {
        document.querySelector(`.try-${currentTry}`).classList.add("disabled");
        let allInput = document.querySelectorAll(`.try-${currentTry} input`);
        allInput.forEach((ele) => (ele.disabled = true));
        currentTry++;
        if (currentTry <= numbersOfTries) {
            document
                .querySelector(`.try-${currentTry}`)
                .classList.remove("disabled");
            let allInput = document.querySelectorAll(
                `.try-${currentTry} input`
            );
            allInput.forEach((ele) => (ele.disabled = false));
            document.querySelector(`.try-${currentTry}`).children[0].focus();
            checkLetter();
        } else {
            theMassage.classList.add("lose");
            theMassage.innerHTML = `<p>You Losed The word is</p> <span>${randomWord}</span>`;
        }
    }
}

// generate the inputs
let gameContainer = document.querySelector(".game-area .inputs");
function generateIpus() {
    for (let i = 1; i <= numbersOfTries; i++) {
        let tryDiv = document.createElement("div");
        tryDiv.classList.add(`try-${i}`);
        // tryDiv.innerHTML = `<span>Try ${i}</span>`;
        if (i !== 1) tryDiv.classList.add("disabled");
        for (let j = 1; j <= numbersOfLetter; j++) {
            let input = document.createElement("input");
            input.type = "text";
            input.classList.add(`guess-${i}-letter-${j}`);
            input.setAttribute("maxLength", "1");
            tryDiv.appendChild(input);
        }
        gameContainer.appendChild(tryDiv);
    }
    gameContainer.children[0].children[0].focus();
    let disabledInputs = document.querySelectorAll(".disabled input");
    disabledInputs.forEach((input) => (input.disabled = true));

    //navigate the inputs
    let inputs = document.querySelectorAll("input");
    inputs.forEach((theInput, index) => {
        theInput.addEventListener("input", function () {
            this.value = this.value.toUpperCase();
            let nextInput = inputs[index + 1];
            if (nextInput.disabled === true) nextInput = inputs[index + 2];
            if (nextInput) nextInput.focus();
        });
        theInput.addEventListener("keydown", function (event) {
            if (event.key === "ArrowRight") {
                let nextInput = inputs[index + 1];
                if (nextInput.disabled === true) nextInput = inputs[index + 2];
                if (nextInput) nextInput.focus();
            }
            if (event.key === "ArrowLeft") {
                let nextInput = inputs[index - 1];
                if (nextInput.disabled === true) nextInput = inputs[index - 2];
                if (nextInput) nextInput.focus();
            }
        });
    });
}

//Manage The Hints
let hintButton = document.querySelector(".hint");
let hintNumber = document.querySelector(".hint span");
let hintsTries = 2;
hintNumber.innerHTML = hintsTries;
hintButton.addEventListener("click", getHint);

function getHint() {
    hintsTries--;
    if (hintsTries === 1) {
        hintButton.innerHTML = "1 HINT";
    } else if (hintsTries === 0) {
        hintButton.innerHTML = "0 HINTS";
        hintButton.disabled = true;
    }
    let allowableInputs = document.querySelectorAll("input:not([disabled])");
    let allowableIndex = Array.from(allowableInputs).filter(
        (ele) => ele.value === ""
    );
    if (allowableIndex.length >= 1) {
        let randomIndex = Math.floor(Math.random() * allowableIndex.length);
        let randomInput = allowableIndex[randomIndex];
        randomInput.value = randomWord[randomIndex].toUpperCase();
        randomInput.classList.add("in-place");
        randomInput.disabled = true;
        letters++;
    }
}
//reload the page
let reloadButton = document.querySelector(".try-again");
reloadButton.addEventListener("click", function () {
    location.reload();
});
