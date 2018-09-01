var typingDelayTimer;

function typingDelay(callback, delay) {
  clearTimeout(typingDelayTimer);
  typingDelayTimer = setTimeout(callback, delay);
}

function toMathML(jax, callback) {
  var mml;
  try {
    mml = jax.root.toMathML("");
  } catch (err) {
    if (!err.restart) { throw err } // an actual error
    return MathJax.Callback.After([toMathML, jax, callback], err.restart);
  }
  MathJax.Callback(callback)(mml);
}


function loadWindow() {
  document.getElementById("input-1").addEventListener("keyup", function () {
    typingDelay(function () {
      var newMathValue = document.getElementById("input-1").value;
      var oldMath = MathJax.Hub.getAllJax("math-1")[0];
      console.log(MathJax.Hub.getAllJax("math-0")[0]);
      MathJax.Hub.Queue(
        ["Text", oldMath, newMathValue], function () {
          toMathML(MathJax.Hub.getAllJax("math-1")[0], function (mml) {
            document.getElementById("output-1").value = mml;
          });
        });
    }, 500)
  })

  document.getElementById("input-2").addEventListener("keyup", function () {
    typingDelay(function () {
      var newMathValue = document.getElementById("input-2").value;
      var oldMath = MathJax.Hub.getAllJax("math-2")[0];
      MathJax.Hub.Queue(["Text", oldMath, newMathValue]);
    }, 500)
  })
}

window.addEventListener("load", loadWindow);

