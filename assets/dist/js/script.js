// Catch Selectors
let lvlModeInputs = Array.from(document.querySelectorAll(".control .lvls input"));
let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");

// Array Of Words
const words = [
  "Hello",
  "Programming",
  "Code",
  "Javascript",
  "Town",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "Leetcode",
  "Internet",
  "Python",
  "Scala",
  "Destructuring",
  "Paradigm",
  "Styling",
  "Cascade",
  "Documentation",
  "Coding",
  "Funny",
  "Working",
  "Dependencies",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing",
];

// Setting Levels
const lvls = {
  Easy: 5,
  Normal: 3,
  Hard: 2,
};

// Default Level
let defaultLevelName; // Change Level From Here
let defaultLevelSeconds = lvls["Easy"];
modeApp();
document.getElementById("Hard").removeAttribute("checked");


// Setting Level Name + Seconds + Score
lvlNameSpan.innerHTML = defaultLevelName;
secondsSpan.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds;
scoreTotal.innerHTML = words.length;

// Change Mode
lvlModeInputs.forEach((input) => {
  input.addEventListener("click", function () {
    modeApp();
    defaultLevelSeconds = lvls[defaultLevelName];
    lvlNameSpan.innerHTML = defaultLevelName;
    secondsSpan.innerHTML = defaultLevelSeconds;
    timeLeftSpan.innerHTML = defaultLevelSeconds;
  })
})

// Disable Paste Event
input.onpaste = function () {
  return false;
};

// Start Game
startButton.addEventListener("click", function () {
  this.remove();
  input.focus();
  // Generate Word Function
  genWords();
});

input.addEventListener("keydown", function (e) {
  if (!input.hasAttribute("Done")) {
    if (e.key === "Enter") {
      input.setAttribute("Done", "Done");
      input.focus();
      // Generate Word Function
      genWords();
    }
  }
});

function modeApp() {
  lvlModeInputs.forEach((mode) => {
    mode.checked ?  console.log(defaultLevelName = mode.dataset.lvl) : "";
  });
  
}

function genWords() {
  // Get Random Word From Array
  let randomWord = words[Math.floor(Math.random() * words.length)];

  // Get Word Index
  let wordIndex = words.indexOf(randomWord);
  // Remove WordFrom Array
  words.splice(wordIndex, 1);

  // Show The Random Word
  theWord.innerHTML = randomWord;

  // Empty Upcoming Words
  upcomingWords.innerHTML = "";
  // Generate Words
  words.forEach((word) => {
    let div = document.createElement("div");
    let text = document.createTextNode(word);
    div.append(text);
    upcomingWords.append(div);
  });

  // Call Start Play Function
  startPlay();
}

function startPlay() {
  timeLeftSpan.innerHTML = defaultLevelSeconds;
  let start = setInterval(() => {
    timeLeftSpan.innerHTML--;
    if (timeLeftSpan.innerHTML === "0") {
      // Stop Timer
      clearInterval(start);
      if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
        // Empty Input Field
        input.value = "";
        scoreGot.innerHTML++;
        if (words.length > 0) {
          genWords();
        } else {
          let span = document.createElement("span");
          span.className = "good";
          let spanText = document.createTextNode("Congratz");
          span.append(spanText);
          finishMessage.append(span);
          // Remove Upcoming Words Box
          upcomingWords.remove();
        }
      } else {
        let span = document.createElement("span");
        span.className = "bad";
        let spanText = document.createTextNode("Game Over");
        span.append(spanText);
        finishMessage.append(span);

        upcomingWords.remove();
        input.remove();
        theWord.remove();
      }
    }
  }, 1000);
}
