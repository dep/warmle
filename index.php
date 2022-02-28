<html>
  <head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
    <style>
      body {
        font-family: 'Roboto';
        background: #222;
        text-align: center;
        color: #fff;
        margin: 25% 0;
      }
      body > div {
        position: relative;
      }
      a {
        color: white;
      }
      input[type="text"] {
        margin: 2px;
        width: 75px;
        height: 75px;
        padding: 10px;
        font-size: 30px;
        text-transform: uppercase;
        text-align: center;
        border: 1px solid #555;
      }
      button {
        margin-top: 20px;
        background: green;
        color: white;
        padding: 10px;
      }
      #instructions {
        width: 80%;
        margin: 20px auto 0;
        background: #000;
        padding: 10px;
      }
      .hg-rows > .hg-row:first-child,
      .hg-rows > .hg-row:last-child {
        display: none;
      }
      .simple-keyboard {
        background: #222 !important;
      }
      .hg-button {
        background: #000 !important;
        color: #fff !important;
      }
      .hg-theme-default .hg-button {
        height: 100px !important;
        font-size: 30px !important;
      }
      .hg-theme-default .hg-button-tab,
      .hg-theme-default .hg-button-lock,
      .hg-theme-default .hg-button-shift,
      .hg-theme-default .hg-button-enter {
        display: none !important;
      }
      .simple-keyboard {
        position: fixed;
        bottom: 0;
      }
    </style>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/simple-keyboard@latest/build/css/index.css">

    <script src="randomConst.js?cache=<?php echo date("h:i:sa") ?>"></script>
    <script src="colors.js"></script>
    <link rel="icon" href="favicon.png" type="image/x-icon">
    <title>warmle!</title>
  </head>
  <body>
    <div>
      <div id="game"></div>
      <h1 id="msg"></h1><br />
      <span id="results">
        <p id="link" style="display: none">Play Warmle at https://warmle.xyz</p>
        <span id="stopwatch">
          0.00
        </span>
      </span>
      <br/>
      <button style="display: none" onClick="navigator.clipboard.writeText(document.getElementById('results').innerText);">Copy Results</button><br /><br/>
      <span style="cursor: pointer" onClick="document.getElementById('instructions').style.display = (document.getElementById('instructions').style.display == 'none') ? 'block' : 'none'">how to play</span>
      <div id="instructions" style="display: none">
        <p>Each day provides a new word that you must guess starting with the first letter.</p>
        <p>When you guess a letter, the counter begins. The "darkness" of the tile shows you how close you are to the correct letter ("S" is very close to "T", so a very dark red, etc). When you guess the correct letter, the tile turns green and you are taken to the next letter.</p>
        <p>You have 25 seconds to guess the word. Good luck!</p>
      </div>
      <div class="simple-keyboard"></div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/simple-keyboard@latest/build/index.js"></script>
    <script src="main.js?cache=<?php echo date("h:i:sa") ?>"></script>
  </body>
</html>

