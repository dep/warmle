<html>
  <head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/simple-keyboard@latest/build/css/index.css">
    <link rel="stylesheet" href="styles.css?cache=<?php echo date("h:i:sa") ?>">
    <script src="randomConst.js?cache=<?php echo date("h:i:sa") ?>"></script>
    <script src="colors.js"></script>
    <link rel="icon" href="favicon.png" type="image/x-icon">
    <title>warmle!</title>
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-2P26DE6DZ9"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-2P26DE6DZ9');
    </script>
  </head>
  <body>
    <div>
      <div id="instructions" style="display: none">
        <p>Each day provides a new word that you must guess starting with the first letter.</p>
        <p>When you guess a letter, the counter begins.</p>
        <p>When you guess the correct letter, you gain 5 seconds and the tile turns green and you are taken to the next letter.</p>
        <p>When you guess the wrong letter, you lose 1 second and must guess again. The "darkness" of the tile shows you how close you are alphabetically to the correct letter ("A" is very close to "B", so a very dark red, whereas "A" is very far from "Z", etc).</p>
        <p>You have 30 seconds to guess the word. Good luck!</p>
        <p>Tap this message to close.</p>
      </div>
      <span id="instructionsLink">&#10068; how to play</span>
      <div id="game"></div>
      <h1 id="msg"></h1><br />
      <div id="results">
        <p id="link" style="display: none">Play Warmle at https://warmle-game.com</p>
        <span id="stopwatch">
          30.00
        </span>
      </div>
      <br/>
      <button style="display: none" id="resultsButton">Copy your results and share them!</button><br /><br/>
      <div id="copyright">
        a <a href="https://dannypeck.com">dannypeck</a> project
      </div>
      <div class="simple-keyboard"></div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/simple-keyboard@latest/build/index.js"></script>
    <script src="main.js?cache=<?php echo date("h:i:sa") ?>"></script>
  </body>
</html>

