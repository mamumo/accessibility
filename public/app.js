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

  // var queryParams = window.location.search.substr(1).split("&");
  // if(queryParams != "") {
  //   queryParams.forEach(function(queryParam){

  //     var param = queryParam.split("=");
  //     var fieldName = param[0];
  //     var fieldValue = param[1];

  //     if(fieldName == "joke-text-input") {
  //       if(fieldValue =="") {
  //        addErrorMessage(fieldName, "Please add a joke");
  //       }
  //     }

  //       if(fieldName == "comedian-text-input") {
  //         if(fieldValue =="") {
  //           addErrorMessage(fieldName, "Please add a comedian");
  //         }
  //     }
  //   });
  // }

  var errorsContainer = document.getElementById('error-box');
  var errors = document.getElementById('error-list');

  var jokeList = document.getElementById('joke-list');
  var form = document.getElementById('joke-form');
  var jokeInput = document.getElementById('joke-text-input');
  var comedianInput = document.getElementById('comedian-text-input');
  var tmpElement = createJoke("", "");

  // setup existing jokes
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

    var errorsFound = false;
    
    if(jokeInput.value == "") {
      addErrorMessage("joke-text-input", "Joke field cannot be empty");
      errorsFound = true;
    }

    if(comedianInput.value == "") {
      addErrorMessage("comedian-text-input", "Comedian field cannot be empty");
      errorsFound = true;
    }

    if(errorsFound) {
      handleValidationErrors();
    } else {
      form.submit();  
    }
  }

  var handleValidationErrors = function(){
    var errorHeader = document.createElement("span");
    var errorHeaderText = document.createTextNode("Form has validation errors");
    errorHeader.appendChild(errorHeaderText);
    errorHeader.setAttribute("id", "error-header");
    errorHeader.setAttribute("tabindex", "1");
    errorHeader.setAttribute("role", "heading");
    errorHeader.setAttribute("aria-level", "1");
    errorsContainer.insertBefore(errorHeader, errorsContainer.firstChild);
    window.scrollTo(0, 0);
    errorHeader.focus();
  };

  var resetForm = function() {
    errors.innerHTML = "";
    jokeInput.value = "";
    comedianInput.value = "";
    var errorHeader = document.getElementById("error-header");
    if(errorHeader != null) {
      errorHeader.remove();
    }
  }

  var addErrorMessage = function(fieldName,errorMessage){
    var li = document.createElement("li");
    var label = document.createElement("label");
    var textnode = document.createTextNode(errorMessage);
    li.appendChild(label);
    li.setAttribute("role", "listitem")
    label.htmlFor = fieldName;
    label.appendChild(textnode);
    label.setAttribute("role", "link")
    label.setAttribute("aria-labelledby", fieldName);
    errors.appendChild(li);
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

