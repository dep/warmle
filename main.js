const word = words[0];

const todaysDate = new Date().toLocaleDateString("en-US");

let timer = null;
let timeLimit = 30;
let time;

let previousWin = window.localStorage.getItem(todaysDate + "win");
let previousResults = window.localStorage.getItem(todaysDate + "results");
let previousTime = window.localStorage.getItem(todaysDate + "time");
let previousStreak = parseInt(window.localStorage.getItem("streak"));
let hardMode = window.localStorage.getItem("hardMode");

let shareMessage;

if (previousWin) {
  showResults(previousWin, false);
}

const gameDiv = document.getElementById("game");
const stopwatch = document.getElementById("stopwatch");

document.getElementById("instructionsLink").onclick = () => {
  document.getElementById("instructions").style.display =
    document.getElementById("instructions").style.display == "none"
      ? "block"
      : "none";
  document.getElementById("input0").focus();
};

// Hard mode
const hardModeCheckbox = document.getElementById("hardModeCheckbox");
hardModeCheckbox.onclick = (e) => {
  if (e.target.checked) {
    window.localStorage.setItem("hardMode", e.target.checked);
  } else {
    window.localStorage.removeItem("hardMode");
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
        .append(
          "I won! " + previousResults + " in " + previousTime + " seconds"
        );
      if (hardMode) {
        document.getElementById("results").append(" (hard mode)");
      }
    } else {
      document.getElementById("results").append("I lost! " + previousResults);
    }
    document.getElementsByTagName("button")[0].style.display = "inline-block";
    document.getElementById("link").style.display = "block";
  } else {
    var elems = gameDiv.getElementsByTagName("input");
    var len = elems.length;

    let results = "";
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

    if (hardMode) {
      time = parseFloat(
        timeLimit - document.getElementById("stopwatch").innerHTML
      ).toFixed(2);
    } else {
      time = document.getElementById("stopwatch").innerHTML;
    }

    if (type === "win") {
      document
        .getElementById("results")
        .append("I won! " + results + " in " + time + " seconds");
      if (hardMode) {
        document.getElementById("results").append(" (hard mode)");
      }
    } else {
      document.getElementById("results").append("I tried Hard Mode and lost. " + results);
    }
    document.getElementById("link").style.display = "block";
    document.getElementsByTagName("button")[0].style.display = "inline-block";

    window.localStorage.setItem(todaysDate + "win", type);
    window.localStorage.setItem(todaysDate + "results", results);
    window.localStorage.setItem(todaysDate + "time", time);
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
        .append(` -- current streak: ${previousStreak}`);
    }
  } else {
    window.localStorage.setItem("streak", 0);
    document.getElementById("msg").innerHTML =
      "&#128532; You lost. The word was '" + word + "'.";
  }
}

function Timer() {
  var i = 1;
  timer = setInterval(function () {
    if (hardMode) {
      stopwatch.innerHTML = parseFloat(
        timeLimit - parseFloat(i / 20).toFixed(2)
      ).toFixed(2);
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
      stopwatch.innerHTML = parseFloat(
        0 + parseFloat(i / 20).toFixed(2)
      ).toFixed(2);
      i++;
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
        document.getElementById("hardMode").remove();
      }
    });
  }
}

document.body.classList = getMobileOperatingSystem();
