const word = words[0];

const todaysDate = new Date().toLocaleDateString("en-US");

let timer = null;
let timeLimit = 30;
let time;

window.localStorage.removeItem("win");
window.localStorage.removeItem("results");
window.localStorage.removeItem("time");

let previousWin = window.localStorage.getItem("win" + todaysDate);
let previousResults = window.localStorage.getItem("results" + todaysDate);
let previousTime = window.localStorage.getItem("time" + todaysDate);
let previousStreak = parseInt(window.localStorage.getItem("streak"));
let shareMessage;

if (previousWin) {
  showResults(previousWin, false);
}

document.getElementById("instructionsLink").onclick = () => {
  document.getElementById("instructions").style.display =
    document.getElementById("instructions").style.display == "none"
      ? "block"
      : "none";
  document.getElementById("input0").focus();
};

document.getElementById("instructions").onclick = () => {
  document.getElementById("instructions").style.display = "none";
  document.getElementById("input0").focus();
};

document.getElementById("resultsButton").addEventListener("click", () => {
  navigator.clipboard.writeText(document.getElementById("results").innerText);
  document.getElementById("resultsButton").innerHTML =
    "Copied to your clipboard!";
});

function showResults(type, incrementStreak) {
  document.getElementById("stopwatch").style.display = "none";

  if (previousResults) {
    if (previousStreak > 0) {
      document
        .getElementById("results")
        .append(previousResults + " in " + previousTime + " seconds");
    } else {
      document.getElementById("results").append("I died. " + previousResults);
    }
    document.getElementsByTagName("button")[0].style.display = "inline-block";
    document.getElementById("link").style.display = "block";
  } else {
    var elems = document.getElementsByTagName("input");
    var len = elems.length;

    let results = "";
    for (var i = 0; i < len; i++) {
      elems[i].disabled = true;
      if (
        elems[i].value.toLowerCase() === elems[i].dataset.letter.toLowerCase()
      ) {
        results += String.fromCodePoint(0x1f7e9);
      } else {
        results += String.fromCodePoint(0x2b1b);
      }
    }

    time = parseFloat(
      timeLimit - document.getElementById("stopwatch").innerHTML
    ).toFixed(2);

    if (type === "win") {
      document
        .getElementById("results")
        .append(results + " in " + time + " seconds");
    } else {
      document.getElementById("results").append("I died. " + results);
    }
    document.getElementById("link").style.display = "block";
    document.getElementsByTagName("button")[0].style.display = "inline-block";

    window.localStorage.setItem("win" + todaysDate, type);
    window.localStorage.setItem("results" + todaysDate, results);
    window.localStorage.setItem("time" + todaysDate, time);
  }

  document.getElementsByClassName("simple-keyboard")[0].style.display = "none";

  if (type === "win") {
    if (incrementStreak) {
      if (previousStreak) {
        previousStreak++;
      } else {
        previousStreak = 1;
      }
    }

    window.localStorage.setItem("streak", previousStreak);
    document.getElementById("msg").innerHTML = `&#128516; You Won!`;

    if (previousStreak > 0) {
      document
        .getElementById("results")
        .append(` (current streak: ${previousStreak})`);
    }
  } else {
    window.localStorage.setItem("streak", 0);
    document.getElementById("msg").innerHTML =
      "&#128532; You died. The word was '" + word + "'.";
  }
}
const stopwatch = document.getElementById("stopwatch");
function Timer() {
  var i = 1;
  timer = setInterval(function () {
    stopwatch.innerHTML = parseFloat(
      timeLimit - parseFloat(i / 20).toFixed(2)
    ).toFixed(2);
    i++;
    if (i > 100) {
      stopwatch.style.color = colors[14];
      stopwatch.style.fontSize = "40px";
    }
    if (i > 200) {
      stopwatch.style.color = colors[13];
      stopwatch.style.fontSize = "45px";
    }
    if (i > 300) {
      stopwatch.style.color = colors[12];
      stopwatch.style.fontSize = "55px";
    }
    if (i > 400) {
      stopwatch.style.color = colors[11];
      stopwatch.style.fontSize = "65px";
    }
    if (i > 425) {
      stopwatch.style.color = colors[10];
      stopwatch.style.fontSize = "80px";
    }
    if (i > 450) {
      stopwatch.style.color = colors[9];
      stopwatch.style.fontSize = "90px";
    }
    if (i > 475) {
      stopwatch.style.color = colors[8];
      stopwatch.style.fontSize = "95px";
    }
    if (i > 500) {
      stopwatch.style.color = colors[7];
      stopwatch.style.fontSize = "100px";
    }
    if (i > 525) {
      stopwatch.style.color = colors[6];
      stopwatch.style.fontSize = "105px";
    }
    if (i > 550) {
      stopwatch.style.color = colors[5];
      stopwatch.style.fontSize = "110px";
    }
    if (i > 575) {
      stopwatch.style.color = colors[4];
      stopwatch.style.fontSize = "115px";
    }
    if (i > 600 || parseFloat(stopwatch.innerHTML) <= 0) {
      clearInterval(timer);
      showResults();
    }
  }, 50);
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

  var nextInput = el.nextElementSibling;

  if (value == el.dataset.letter.toLowerCase()) {
    el.style.backgroundColor = "#32CD32";
    el.style.color = "white";
    if (nextInput) {
      nextInput.focus();
      timeLimit = timeLimit + 5;
    } else {
      el.blur();
      clearInterval(timer);

      showResults("win", true);
    }
  } else {
    distance = distanceBetween(value, el.dataset.letter.toLowerCase());
    el.style.backgroundColor = colors[distance];

    timeLimit = timeLimit - 1;

    el.value = "";
    value = "";
    keyboard.clearInput(event.target.id);

    if (distance > 8) {
      el.style.color = "black";
    } else {
      el.style.color = "white";
    }
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
    document.getElementById("game").appendChild(newInput);
  }

  document.querySelectorAll(".input").forEach((input) => {
    input.addEventListener("focus", onInputFocus);
    input.addEventListener("input", onInputChange);
  });

  document.getElementsByTagName("input")[0].focus();

  const inputs = document.getElementsByTagName("input");

  for (var x = 0; x < inputs.length; x++) {
    const input = inputs[x];

    input.addEventListener("keydown", function (event) {
      disableTab(event);
    });

    input.addEventListener("keyup", function (event) {
      disableTab(event);
      keyDownAction(event);
    });
  }
}

document.body.classList = getMobileOperatingSystem();
