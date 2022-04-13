const word = words[0];

// Get # of days game has been active.
var gameCreateDate = "02/27/2022";
const todaysDate = new Date().toLocaleDateString("en-US");

function parseDate(str) {
  var mdy = str.split("/");
  return new Date(mdy[2], mdy[0] - 1, mdy[1]);
}

function datediff(first, second) {
  return Math.round((second - first) / (1000 * 60 * 60 * 24));
}

const todaysGameCount = datediff(
  parseDate(gameCreateDate),
  parseDate(todaysDate)
);

let timer = null;
let timeLimit = 30;
let guesses = 0;
let time;
let results;

// Local Storage
const ls = window.localStorage;
let previousWin = ls.getItem(todaysDate + "win");
let previousResults = ls.getItem(todaysDate + "results");
let previousTime = ls.getItem(todaysDate + "time");
let previousGuesses = ls.getItem(todaysDate + "guesses");
let previousStreak = parseInt(ls.getItem("streak"));
let hardMode = ls.getItem("hardMode");

// Elements
const gameDiv = document.getElementById("game");
const stopwatch = document.getElementById("stopwatch");
const instructionsLink = document.getElementById("instructionsLink");
const instructions = document.getElementById("instructions");
const firstGameInput = gameDiv.getElementsByTagName("input")[0];
const hardModeCheckbox = document.getElementById("hardModeCheckbox");
const shareButtons = document.getElementById("shareButtons");
const shareButton = document.getElementById("shareButton");
const twitterButton = document.getElementById("twitterButton");
const resultsDiv = document.getElementById("results");
const answerDiv = document.getElementById("answer");
const softKeyboard = document.getElementsByClassName("simple-keyboard")[0];

// Events
instructionsLink.onclick = () => {
  instructions.style.display =
    instructions.style.display == "none" ? "block" : "none";
  firstGameInput.focus();
};

hardModeCheckbox.onclick = (e) => {
  if (e.target.checked) {
    ls.setItem("hardMode", e.target.checked);
  } else {
    ls.removeItem("hardMode");
  }
  hardMode = e.target.checked;
  gameDiv.getElementsByTagName("input")[0].focus();

  if (hardMode) {
    stopwatch.innerHTML = timeLimit.toFixed(2);
  } else {
    stopwatch.innerHTML = "0.00";
  }
};
hardModeCheckbox.checked = hardMode;
if (hardMode) {
  stopwatch.innerHTML = timeLimit.toFixed(2);
} else {
  stopwatch.innerHTML = "0.00";
}

instructions.onclick = () => {
  instructions.style.display = "none";
  firstGameInput.focus();
};

console.log(shareButton);

shareButton.addEventListener("click", () => {
  navigator.clipboard.writeText(resultsDiv.innerText);
  shareButton.innerHTML = "Copied to your clipboard!";
});

function getResultMessage(winner, time) {
  let resultsMessage = "";
  resultsDiv.style.display = "block";

  const score = (guesses) => {
    const calcedGuesses = guesses - word.length;
    return calcedGuesses < 10 && time < 15
      ? "an A+"
      : calcedGuesses < 15 && time < 20
      ? "an A"
      : calcedGuesses < 20 && time < 25
      ? "an A-"
      : calcedGuesses < 20 && time < 30
      ? "a B+"
      : calcedGuesses < 25 && time < 35
      ? "a B"
      : calcedGuesses < 30 && time < 35
      ? "a B-"
      : calcedGuesses < 35 && time < 40
      ? "a C+"
      : calcedGuesses < 35 && time < 45
      ? "a C"
      : calcedGuesses < 40 && time < 45
      ? "a C-"
      : calcedGuesses < 40 && time < 55
      ? "a D+"
      : calcedGuesses < 45 && time < 60
      ? "a D"
      : calcedGuesses < 50 && time < 60
      ? "a D-"
      : "an F";
  };

  const scoreEmoji = (guesses) => {
    const calcedGuesses = guesses - word.length;
    return calcedGuesses < 15 && time < 20
      ? "😁"
      : calcedGuesses < 25 && time < 35
      ? "😀"
      : calcedGuesses < 35 && time < 45
      ? "😅"
      : calcedGuesses < 45 && time < 60
      ? "😬"
      : "😑";
  };

  if (winner) {
    resultsMessage = `Warmle #${todaysGameCount}`;
    resultsMessage += "<br /><br />";
    resultsMessage += `I got ${score(guesses)} score`;
    if (hardMode) {
      resultsMessage += " in hard mode";
    }
    resultsMessage += `! ${scoreEmoji(
      guesses
    )} It took me ${time} seconds and ${guesses - word.length} wrong guesses.`;
    resultsMessage += "<br />";
    resultsMessage += results;
    resultsMessage += ` (streak: ${previousStreak})`;
  } else {
    resultsMessage = `I tried hard mode and lost after ${guesses} guesses. 😭 ${results}`;
    answerDiv.innerHTML = `The word was <strong>${word}</strong>. 🙁`;
  }
  resultsMessage += "<br /><br />";

  resultsMessage += "Play Warmle at https://warmle-game.com";
  resultsDiv.innerHTML = resultsMessage;
  twitterButton.setAttribute(
    "href",
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      resultsMessage.replace("<br /><br />", " ")
    )}`
  );
}

function showResults(type, incrementStreak) {
  stopwatch.style.display = "none";

  if (previousResults) {
    // Returning user
    results = previousResults;
    time = previousTime;
    guesses = previousGuesses;
    getResultMessage(Boolean(previousStreak > 0), time);
    shareButtons.style.display = "block";
  } else {
    // New user
    var elems = gameDiv.getElementsByTagName("input");
    var len = elems.length;

    results = "";
    for (var i = 0; i < len; i++) {
      elems[i].disabled = true;
      if (
        elems[i].dataset.letter &&
        elems[i].value.toLowerCase() === elems[i].dataset.letter.toLowerCase()
      ) {
        results += String.fromCodePoint(0x1f7e9);
      } else {
        results += String.fromCodePoint(0x2b1b);
      }
    }

    time = hardMode
      ? parseFloat(timeLimit - stopwatch.innerHTML).toFixed(2)
      : stopwatch.innerHTML;

    if (type === "win") {
      if (previousStreak) {
        previousStreak++;
      } else {
        previousStreak = 1;
      }
      ls.setItem("streak", previousStreak);
    } else {
      ls.setItem("streak", 0);
    }

    getResultMessage(type, time);

    shareButtons.style.display = "block";

    ls.setItem(todaysDate + "win", type);
    ls.setItem(todaysDate + "results", results);
    ls.setItem(todaysDate + "time", time);
    ls.setItem(todaysDate + "guesses", guesses);
  }

  softKeyboard.style.display = "none";
}

if (previousResults) {
  showResults(Boolean(previousStreak > 0));
}

function Timer() {
  var i = 1;
  timer = setInterval(function () {
    if (hardMode) {
      stopwatch.innerHTML = parseFloat(timeLimit - parseFloat(i / 100)).toFixed(
        2
      );
      i++;

      let currentTime = parseFloat(stopwatch.innerHTML);

      if (currentTime < 30) {
        stopwatch.style.color = "#fff";
        stopwatch.style.fontSize = "45px";
      }
      if (currentTime < 25) {
        stopwatch.style.color = colors[12];
        stopwatch.style.fontSize = "55px";
      }
      if (currentTime < 20) {
        stopwatch.style.color = colors[11];
        stopwatch.style.fontSize = "65px";
      }
      if (currentTime < 15) {
        stopwatch.style.color = colors[10];
        stopwatch.style.fontSize = "80px";
      }
      if (currentTime < 12) {
        stopwatch.style.color = colors[9];
        stopwatch.style.fontSize = "90px";
      }
      if (currentTime < 10) {
        stopwatch.style.color = colors[8];
        stopwatch.style.fontSize = "95px";
      }
      if (currentTime < 9) {
        stopwatch.style.color = colors[7];
        stopwatch.style.fontSize = "100px";
      }
      if (currentTime < 7) {
        stopwatch.style.color = colors[6];
        stopwatch.style.fontSize = "105px";
      }
      if (currentTime < 5) {
        stopwatch.style.color = colors[5];
        stopwatch.style.fontSize = "110px";
      }
      if (currentTime < 3) {
        stopwatch.style.color = colors[4];
        stopwatch.style.fontSize = "115px";
      }
      if (currentTime <= 0) {
        clearInterval(timer);
        showResults();
      }
    } else {
      stopwatch.innerHTML = parseFloat(0 + parseFloat(i / 100)).toFixed(2);
      i++;
    }
  }, 10);
}

const disableTab = (event) => {
  const key = event.keyCode;
  if (key === 9 || key === 91 || key === 17) {
    event.preventDefault();
  }
  return false;
};

const str = "abcdefghijklmnopqrstuvwxyz";
const distanceBetween = (a, b) => {
  const aIndex = str.indexOf(a);
  const bIndex = str.indexOf(b);
  if (aIndex === -1 || b === -1) {
    return false;
  }
  return Math.abs(aIndex - bIndex);
};
const highOrLow = (a, b) => {
  const aIndex = str.indexOf(a);
  const bIndex = str.indexOf(b);
  if (aIndex === -1 || b === -1) {
    return false;
  }
  return aIndex > bIndex ? "&#128317" : "&#128316";
};

const Keyboard = window.SimpleKeyboard.default;

const keyboard = new Keyboard({
  onChange: (input) => onChange(input),
  excludeFromLayout: {
    default: ["[", "]", "\\", ";", "'", ",", ".", "/", "`", "~", "=", "-"],
  },
});

function keyDownAction(event) {
  el = event.target;
  value = el.value.toLowerCase();

  if (!timer && value.match(/[a-z]/i)) {
    Timer();
  }

  guesses = guesses + 1;

  var nextInput = el.parentElement.nextSibling
    ? el.parentElement.nextSibling.getElementsByTagName("input")[0]
    : null;

  distance = distanceBetween(value, el.dataset.letter.toLowerCase());
  direction = highOrLow(value, el.dataset.letter.toLowerCase());
  const hint = document.createElement("span");
  if (el.parentNode.getElementsByTagName("span").length) {
    el.parentNode.getElementsByTagName("span")[0].remove();
  }
  hint.className = "hint";
  hint.innerHTML =
    distance > 0 ? `${direction}` : String.fromCodePoint(0x1f389);
  el.insertAdjacentElement("afterend", hint);

  if (value == el.dataset.letter.toLowerCase()) {
    el.style.backgroundColor = "#32CD32";
    el.style.color = "white";
    if (nextInput) {
      nextInput.focus();
    } else {
      el.blur();
      clearInterval(timer);

      showResults("win", true);
    }
  } else {
    el.style.backgroundColor = colors[distance];

    if (el.previousElementSibling) {
      timeLimit = timeLimit - 2;
    }

    el.select();
    keyboard.clearInput(event.target.id);
    el.style.color = "white";
  }
}

let selectedInput;
let selectedEvent;

function onInputFocus(event) {
  selectedInput = `#${event.target.id}`;
  selectedEvent = event;

  keyboard.setOptions({
    inputName: event.target.id,
  });
}

function onInputChange(event) {
  keyboard.setInput(event.target.value, event.target.id);
}

function onChange(input) {
  selectedInput.value = input;
  document.querySelector(selectedInput || "#input0").value = input;
  keyDownAction(selectedEvent);
}

function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
    return "Windows Phone";
  }

  if (/android/i.test(userAgent)) {
    return "Android";
  }

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return "iOS";
  }

  return "unknown";
}

if (!previousResults) {
  for (var i = 0; i < word.length; i++) {
    const newInput = document.createElement("input");
    const newDiv = document.createElement("div");
    newInput.type = "text";
    newInput.dataset.letter = word.charAt(i);
    newInput.maxLength = 1;
    newInput.autocomplete = "off";
    newInput.className = "input";
    newInput.id = "input" + i;
    if (
      getMobileOperatingSystem() === "iOS" ||
      getMobileOperatingSystem() === "Android"
    ) {
      newInput.readOnly = true;
    }
    newDiv.appendChild(newInput);
    document.getElementById("game").appendChild(newDiv);
  }

  document.querySelectorAll(".input").forEach((input) => {
    input.addEventListener("focus", onInputFocus);
    input.addEventListener("input", onInputChange);
  });

  gameDiv.getElementsByTagName("input")[0].focus();

  const inputs = gameDiv.getElementsByTagName("input");

  for (var x = 0; x < inputs.length; x++) {
    const input = inputs[x];

    input.addEventListener("keydown", function (event) {
      disableTab(event);
    });

    input.addEventListener("keyup", function (event) {
      if (
        event.target.tagName == "INPUT" &&
        event.target.value.match(/[A-Za-z]/i)
      ) {
        disableTab(event);
        keyDownAction(event);
        if (document.getElementById("hardMode")) {
          document.getElementById("hardMode").remove();
        }
      }
    });
  }
}

document.body.classList = getMobileOperatingSystem();
