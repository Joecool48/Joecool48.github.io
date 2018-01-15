var responses = ["What took you so long?\nI've been sitting here for seconds.\nCouldn't you have been any faster?\nI had all these code samples picked out, and you just decided to not show up.\nI mean, you were completely ignoring me.\nWhatever\nJust click on a link or something...\nI don't care.\n",
"Why hello there.\nWelcome!",
"Hmmm, I swear I've seen you before...\nHave we met?\nI may be mistaken.\nForget I mentioned it."];
function addSpan (text, element, color) {
    newSpan = document.createElement ("span");
    newSpan.setAttribute ("class", color);
    console.log (newSpan);
    element.appendChild (newSpan);
    newSpan.innerHTML = text;
}
var seperators = [";", ",",".", ":", "[", "]", "{", "}"];
var seperatorColor = "white";
var keywords = ["new", "for", "if", "else", "while", "break", "continue", "return"]; //...
var keywordColor = "red";
var stringColor = "yellow";
//Figure out how to implement escape characters correctly
var escapeCharacters = ["\n", "\t", "\'", "\"", "\\"];
var escapeCharacterColor = "violet";
var operators = ["=", "+", "-", "!", "*", "/", "%", "|", "&", "~", "^", "<", ">"];
var operatorColor = "red";
var leftToAdd = "";
var isString = false;
var numberColor = "violet"
var stringMatchingQuote = undefined;
var booleans = ["true", "false", "True", "False"];
var booleanColor = "magenta";
var specialValues = ["null", "undefined"];
var specialValueColor = "violet";
var primitiveTypes = ["int", "char", "bool", "boolean", "float", "double", "short", "long", "byte"];
var primitiveTypeColor = "green";
function setupTypewriter(t, text, codeSample) {
        var isPlainText = true;
        var isAlpha = function(ch){
            return /^[A-Z]$/i.test(ch);
        }
        var isNumber = function (num) {
            return /^[0-9]$/i.test(num);
        }
        var cursorPosition = 0,
            //tag = "",
            //writingTag = false,
            //tagOpen = false,
        typeSpeed = 100,
        tempTypeSpeed = 0;
        color = "white"
        var type = function() {
            isPlainText = true;
            //tag.innerHTML += text[cursorPosition];
                //if (text[cursorPosition] === " ") {
                //    tempTypeSpeed = 0;
                //}
                tempTypeSpeed = (Math.random() * typeSpeed) + 50;
                if (!codeSample) {
                    t.innerHTML += text[cursorPosition];
                    cursorPosition += 1;
                }
            // if (writingTag === true && text[cursorPosition] === ">") {
            //     tempTypeSpeed = (Math.random() * typeSpeed) + 50;
            //     writingTag = false;
            //     if (tagOpen) {
            //         var newSpan = document.createElement("span");
            //         t.appendChild(newSpan);
            //         newSpan.innerHTML = tag;
            //         tag = newSpan.firstChild;
            //     }
            // }

            //Check for any characters that still need to be added
            if (leftToAdd != "") {
                console.log (leftToAdd);
                addSpan (leftToAdd.slice(0,1), t, color);
                leftToAdd = leftToAdd.slice(1);
                cursorPosition += 1;
                isPlainText = false;
            }
            //Check to see if it is a standalone int or float            
            else if (cursorPosition > 0 && !isString && leftToAdd === "" && !isAlpha (text[cursorPosition - 1]) && !isAlpha (text[cursorPosition + 1]) && isNumber(text[cursorPosition])) {
                console.log (text[cursorPosition])
                addSpan (text[cursorPosition], t, numberColor);
                cursorPosition += 1;
                isPlainText = false;
            }
            else if (text[cursorPosition] === "." && isNumber (text[cursorPosition - 1]) && isNumber (text[cursorPosition - 1])) {
                addSpan (text[cursorPosition], t, numberColor);
                cursorPosition += 1;
                isPlainText = false;
            }
            //Check for space
            else if (text[cursorPosition] === " ") {
                console.log ("Space found");
                t.innerHTML += " ";
                cursorPosition += 1;
                isPlainText = false;
            }
            //Add the colored char that is part of the string
            else if (isString && leftToAdd == "") {
                addSpan (text[cursorPosition], t, stringColor);
                if (text[cursorPosition] === stringMatchingQuote) {
                    isString = false;
                }
                isPlainText = false;
                cursorPosition += 1;
            }
            //Test to see if the line is beginning as a string
            else if (text[cursorPosition] === '"' || text[cursorPosition] === "'") {
                isString = true;
                addSpan (text[cursorPosition], t, stringColor);
                stringMatchingQuote = text[cursorPosition];
                console.log ("Matching Quote: " + text[cursorPosition]);
                cursorPosition += 1;
                isPlainText = false;
            }
            //Check for keywords
            else if (codeSample && leftToAdd == "") {
                console.log ("Meme");
                console.log (isPlainText);
                for (i = 0; i < escapeCharacters.length; i++) {
                    if (text.slice (cursorPosition, cursorPosition + escapeCharacters[i].length) === escapeCharacters[i]) {
                        console.log ("Found " +  escapeCharacters[i]);
                        addSpan (escapeCharacters[i].slice (0,1),t,escapeCharacterColor);
                        cursorPosition += 1;
                        leftToAdd += escapeCharacters[i].slice (1);
                        color = escapeCharacterColor;
                        isPlainText = false;
                        break;
                    }
                }
                for (i = 0; i < keywords.length; i++) {
                    if (text.slice (cursorPosition, cursorPosition + keywords[i].length) === keywords[i]) {
                        color = keywordColor;
                        addSpan (keywords[i].slice(0,1),t,keywordColor);
                        leftToAdd = keywords[i].slice (1);
                        cursorPosition += 1;
                        console.log ("Found " + keywords[i]);
                        isPlainText = false;
                        break;
                    }
                }
                //Check for operators
                for (i = 0; i < operators.length; i++) {
                    if (text[cursorPosition] === operators[i]) {
                        addSpan (operators[i], t, operatorColor);
                        cursorPosition += 1;
                        isPlainText = false;
                        break;
                    }
                }
                //Check for seperators
                for (i = 0; i < seperators.length; i++) {
                    if (text[cursorPosition] === seperators[i]) {
                        addSpan (seperators[i], t, seperatorColor);
                        cursorPosition += 1;
                        isPlainText = false;
                        break;
                    }
                }
                for (i = 0; i < booleans.length; i++) {
                    if (text.slice (cursorPosition, cursorPosition + booleans[i].length) === booleans[i]) {
                        console.log ("Found " +  booleans[i]);
                        addSpan (booleans[i].slice (0,1),t,booleanColor);
                        cursorPosition += 1;
                        leftToAdd += booleans[i].slice (1);
                        color = booleanColor;
                        isPlainText = false;
                        break;
                    }
                }
                for (i = 0; i < specialValues.length; i++) {
                    if (text.slice (cursorPosition, cursorPosition + specialValues[i].length) === specialValues[i]) {
                        console.log ("Found " +  specialValues[i]);
                        addSpan (specialValues[i].slice (0,1),t,specialValueColor);
                        cursorPosition += 1;
                        leftToAdd += specialValues[i].slice (1);
                        color = specialValueColor;
                        isPlainText = false;
                        break;
                    }
                }
                for (i = 0; i < primitiveTypes.length; i++) {
                    if (text.slice (cursorPosition, cursorPosition + primitiveTypes[i].length) === primitiveTypes[i]) {
                        console.log ("Found " +  primitiveTypes[i]);
                        addSpan (primitiveTypes[i].slice (0,1),t,primitiveTypeColor);
                        cursorPosition += 1;
                        leftToAdd += primitiveTypes[i].slice (1);
                        color = primitiveTypeColor;
                        isPlainText = false;
                        break;
                    }
                }
            }
            if (isPlainText) {
                console.log ("It's plain text")
                t.innerHTML += text[cursorPosition];
                cursorPosition += 1;

            }
            //Actual typewriter effect implemented
            if (cursorPosition < text.length) {
                setTimeout(type, tempTypeSpeed);
            }
            if (cursorPosition >= text.length - 1) {
                function resetTimer() {
                window.clearInterval(action);
                }
            }
        };

        return {
            type: type
        };
    }

    var typer = document.getElementById('typewriter');

    typewriter = setupTypewriter(typewriter, "int i = 0;\n for (int i = 0; i < str.length(); i++) {\n    String s = str.substring(0,5);\n} \n", true);

    typewriter.type();