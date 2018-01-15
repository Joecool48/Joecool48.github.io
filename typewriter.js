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
var isAlpha = function(ch){
    return /^[A-Z]$/i.test(ch);
}
var isNumber = function (num) {
    return /^[0-9]$/i.test(num);
}
//A function that counts the number of spaces in a line of text ignoring multiple between letters;
//So, "Hi      my          name is      bob" returns 4
function checkSpaces (text) {
    var spaceOccurences = 0;
    var ignoreSpaces = false;
    for (i = 0; i < text.length; i++) {
        if (text[i] == " " && !ignoreSpaces) {
            spaceOccurences += 1;
            ignoreSpaces = true;
        }
        else if (isAlpha(text[i]) || isNumber (text[i])) {
            ignoreSpaces = false;
        }
    }
    return spaceOccurences;
}
var plainTextColor = "white";
var seperators = [";", ",",".", ":", "[", "]", "{", "}", "(", ")"];
var seperatorColor = "white";
var functionColor = "blue";
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
var primitiveTypeColor = "magenta";
var otherTypes = ["String", "string"];
var otherTypeColor = "blue";
var functionDeclarationColor = "green"
var declarationParameterColor = "orange";
function setupTypewriter(t, text, codeSample) {
        var isPlainText = true;
        var cursorPosition = 0,
            //tag = "",
            //writingTag = false,
            //tagOpen = false,
        typeSpeed = 100,
        tempTypeSpeed = 0;
        color = "white"
        var type = function() {
            var isPlainText = true;
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
                // for (i = 0; i < specialValues.length; i++) {
                //     if (text.slice (cursorPosition, cursorPosition + specialValues[i].length) === specialValues[i]) {
                //         console.log ("Found " +  specialValues[i]);
                //         addSpan (specialValues[i].slice (0,1),t,specialValueColor);
                //         cursorPosition += 1;
                //         leftToAdd += specialValues[i].slice (1);
                //         color = specialValueColor;
                //         isPlainText = false;
                //         break;
                //     }
                // }
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
                for (i = 0; i < otherTypes.length; i++) {
                    if (text.slice (cursorPosition, cursorPosition + otherTypes[i].length) === otherTypes[i] && !isAlpha(text[cursorPosition - 1]) && !isAlpha (text[cursorPosition + otherTypes[i].length])) {
                        console.log ("Found " +  otherTypes[i]);
                        addSpan (otherTypes[i].slice (0,1),t,otherTypeColor);
                        cursorPosition += 1;
                        leftToAdd += otherTypes[i].slice (1);
                        color = otherTypeColor;
                        isPlainText = false;
                        break;
                    }
                }
                //Find function declarations by searching for parenthesis next to a character for a function.
                //Also searches for the left curply brace to indicate a declaration of a function.
                if (isAlpha (text[cursorPosition]) && !isString && leftToAdd == "") {
                    console.log ("Function check");
                    var i = cursorPosition;
                    var paranthesis = cursorPosition;
                    var curlyBrace = cursorPosition;
                    var isFunction = false;
                    var isFunctionDeclaration = false;
                    //Not exactly sure how to check for this well, but this should work for now
                    while (i < 50 + cursorPosition) {
                        //Checks to make sure there are no spaces in between the function letters
                        var spaces = checkSpaces (text.slice (cursorPosition, i));
                        console.log (text[i]);
                        if (text[i] == '(' && spaces <= 1) {
                            paranthesis = i;
                            isFunction = true;
                            
                        }
                        else if (text[i] == "{" && spaces <= 1) {
                            curlyBrace = i;
                            isFunctionDeclaration = true;
                            break;
                        }
                        i++;
                    }
                    console.log ("Is function: " + isFunction + " Is declaration " + isFunctionDeclaration);
                    if (isFunction && isFunctionDeclaration) {
                        console.log ("Is declaration")
                        isPlainText = false;
                        addSpan (text[cursorPosition],t,functionDeclarationColor);
                        cursorPosition += 1;
                        leftToAdd = text.slice (cursorPosition,paranthesis);
                        color = functionDeclarationColor;
                    }
                    else if (isFunction) {
                        console.log ("Is function")
                        isPlainText = false;
                        addSpan (text[cursorPosition],t,functionColor);
                        cursorPosition += 1;
                        leftToAdd = text.slice (cursorPosition,paranthesis);
                        color = functionColor;
                    }

                }
            }
            if (isPlainText) {
                console.log ("It's plain text")
                color = plainTextColor;
                t.innerHTML += text[cursorPosition];
                leftToAdd = "";
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

    typewriter = setupTypewriter(typewriter, "int lookImAFunction () {\n    for (int i = 0; i < str.length (); i++) {\nString s = str.substring (0,55);\n}\n}\n 'Hi there, Im a string' function ();\nreturn 73.0045;    ", true);

    typewriter.type();