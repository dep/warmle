const word = words[0];

const todaysDate = new Date().toLocaleDateString("en-US");

let timer = null;

window.localStorage.removeItem("win");
window.localStorage.removeItem("results");
window.localStorage.removeItem("time");

let previousWin = window.localStorage.getItem("win" + todaysDate);
let previousResults = window.localStorage.getItem("results" + todaysDate);
let previousTime = window.localStorage.getItem("time" + todaysDate);
let previousStreak = parseInt(window.localStorage.getItem("streak"));

if (previousWin) {
  showResults(previousWin, false);
}

function showResults(type, incrementStreak) {
  document.getElementById("stopwatch").style.display = "none";

  if (previousResults) {
    document
      .getElementById("results")
      .append(previousResults + " in " + previousTime + " seconds");
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

    const time = document.getElementById("stopwatch").innerHTML;

    document
      .getElementById("results")
      .append(results + " in " + time + " seconds");
    document.getElementById("link").style.display = "block";
    document.getElementsByTagName("button")[0].style.display = "inline-block";

    window.localStorage.setItem("win" + todaysDate, type);
    window.localStorage.setItem("results" + todaysDate, results);
    window.localStorage.setItem("time" + todaysDate, time);
  }

  if (type === "win") {
    if (incrementStreak) {
      if (previousStreak) {
        previousStreak++;
      } else {
        previousStreak = 1;
      }
    }

    window.localStorage.setItem("streak", previousStreak);
    document.getElementById("msg").innerHTML = `You Won!`;

    if (previousStreak > 0) {
      document
        .getElementById("results")
        .append(` (current streak: ${previousStreak})`);
    }
  } else {
    window.localStorage.setItem("streak", 0);
    document.getElementById("msg").innerHTML =
      "You died. The word was '" + word + "'.";
  }
}

const stopwatch = document.getElementById("stopwatch");
function Timer() {
  var i = 1;
  timer = setInterval(function () {
    stopwatch.innerHTML = parseFloat(i / 20).toFixed(2);
    i++;
    if (i > 100) {
      stopwatch.style.color = colors[14];
    }
    if (i > 200) {
      stopwatch.style.color = colors[12];
    }
    if (i > 300) {
      stopwatch.style.color = colors[10];
    }
    if (i > 400) {
      stopwatch.style.color = colors[9];
    }
    if (i > 425) {
      stopwatch.style.color = colors[8];
    }
    if (i > 500) {
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

if (!previousResults) {
  for (var i = 0; i < word.length; i++) {
    const newInput = document.createElement("input");
    newInput.type = "text";
    newInput.dataset.letter = word.charAt(i);
    newInput.maxLength = 1;
    newInput.autocomplete = "off";
    document.getElementById("game").appendChild(newInput);
  }

  document.getElementsByTagName("input")[0].focus();

  const inputs = document.getElementsByTagName("input");

  var time = null;

  for (var x = 0; x < inputs.length; x++) {
    const input = inputs[x];
    let distance;
    let el;

    input.addEventListener("keydown", function (event) {
      disableTab(event);
    });

    input.addEventListener("keyup", function (event) {
      disableTab(event);

      el = event.target;

      value = el.value.toLowerCase();
      var nextInput = el.nextElementSibling;

      if (!timer && value.match(/[a-z]/i)) {
        Timer();
      }

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
        distance = distanceBetween(value, el.dataset.letter.toLowerCase());
        el.style.backgroundColor = colors[distance];

        el.value = "";
        value = "";

        if (distance > 8) {
          el.style.color = "black";
        } else {
          el.style.color = "white";
        }
      }
    });
  }
}
