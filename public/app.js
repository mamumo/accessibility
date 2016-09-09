var jokes = [
    {joke: "Never date a tennis player. Love means nothing to them.",
     comedian:"Matt Winning"
    },
    {joke: "People who process expired passports are so lazy, they’re always cutting corners.",
     comedian:"Joel Dommett"
    },
    {joke: "If you don’t know what introspection is – you need to take a long, hard look at yourself. ",
     comedian:"Ian Smith"
    }
  ]

window.onload = function(){
  main();
}

function main(){
  var jokeList = document.getElementById('joke-list');
  var form = document.getElementById('joke-form');
  var jokeInput = document.getElementById('joke-text-input');
  var comedianInput = document.getElementById('comedian-text-input');
  var tmpElement = createJoke("", "");

  // setup existing quotes
  for (var i of jokes) {
    jokeList.appendChild(createJoke(i.joke, i.comedian));
  }

  function createJoke(jokeText, comedianText) {
    var container = document.createElement("li");
    var joke = document.createElement("blockquote");
    joke.innerHTML = jokeText + " ";
    var comedian = document.createElement("cite");
    comedian.innerHTML = comedianText;
    joke.appendChild(comedian);-
    container.appendChild(joke);
    container.appendChild(document.createElement("hr"));
    return container;
  }

  form.onsubmit = function(event) {
    event.preventDefault();
    tmpElement = createJoke("", "");
    resetForm();
  }

  var resetForm = function() {
    jokeInput.value = "";
    comedianInput.value = "";
  }

  var handleKeyChange = function() {
    if (jokeInput.value || comedianInput.value) {
      modifyJoke(tmpElement, jokeInput.value, comedianInput.value);
      jokeList.appendChild(tmpElement);
    }
  }

  var modifyJoke = function (el, newJoke, newComedian) {
    el.childNodes[0].innerHTML = newJoke + " <cite>" + newComedian + "</cite>";
  }



  jokeInput.oninput = handleKeyChange;
  comedianInput.oninput = handleKeyChange;
}

