var responses = ["What took you so long?\nI've been sitting here for seconds.\nCouldn't you have been any faster?\nI had all these code samples picked out, and you just decided to not show up.\nI mean, you were completely ignoring me.\nWhatever\nJust click on a link or something...\nI don't care.\n",
"Why hello there.\nWelcome!",
"Hmmm, I swear I've seen you before...\nHave we met?\nI may be mistaken.\nForget I mentioned it."];

// Function that checks if something is a keyword. Returns -1 if it is not.
function isKeyword (str, index) {
    for (var i = 0; i < keywords.length; i++) {
        if (str.substr(index, keywords[i].length) === keywords[i] &&
            !isAlphaNumeric(str[index - 1]) && !isAlphaNumeric(str[index + keywords[i].length])) return keywords[i];
    }
    return -1;
}

function isSingleLineComment (str, index) {
    if (str.substr(index, singleLineComment.length) === singleLineComment) {
        var newlineIndex = str.indexOf(newline, index);
        if (newLineIndex !== -1) {
            // Plus 1 to include the newline at the end
            return str.substring(index, newlineIndex + 1);
        }
    }
    // Return -1 if not comment
    return -1;
}
function isMultiLineComment (str, index) {
    if (str.substr(index, multiLineComment.length) === multiLineComment) {
        var indexOfEnd = str.indexOf(multiLineCommentEnd, index);
        if (indexOfEnd !== -1) {
            return str.substring(index, indexOfEnd + 1);
        }
    }
    return -1;
}
function isOperator (str, index) {
    for (var i = 0; i < operators.length; i++) {
        if (str.substr(index, operators[i].length) === operators[i]) {
            return operators[i];
        }
    }
    return -1;
}
function isString (str, index) {
    if (str[index] === '"' || str[index] === "'") {
        var indexMatchingQuote = str.indexOf(str[index], index);
        if (indexMatchingQuote !== -1) {
            return str.substring(index, indexMatchingQuote + 1);
        }
    }
    return -1;
}
function isSeperator (str, index) {
    for (var i = 0; i < seperators.length; i++) {
        if (str.substring(index, seperators[i].length) === seperators[i]) {
            return seperators[i];
        }
    }
    return -1;
}

function isFunction (str, index) {
    if (isAlpha(str[index]) || str[index] === "_" || str[index] === "$") {
        var indexOfSpace = str.indexOf(" ", index);
        var indexOfLeftParen = str.indexOf("(", index);
        var indexOfRightParen = str.indexOf(")", index);
        var indexOfNewline = str.indexOf("\n", index);
        if (indexOfLeftParen < indexOfNewline && indexOfRightParen < indexOfNewline)
    }
}
spanObject = {
    token: "Tokenname",
    count: "Count",
    color: "color"
};
function parseString (str) {
    var tokens = [];
    var i = 0;
    // var whitespaceObject = {
    //     tokenName: " ",
    //     tokenColor: "white",
    //     tokenCount: 0
    // }
    var whitespaceObject = null;
    while (i < str.length) {
        // Check for whitespace
        if (str[i] === " " && (whitespaceObject === null || whitespaceObject === undefined)) {
            whitespaceObject = {
                tokenName: " ",
                tokenColor: "white",
                tokenCount: 1
            };
        }
        else if (str[i] === " " && countWhitespace !== 0) {
            whitespaceObject.tokenCount += 1;
        }
        else if (str[i] !== " " && countWhitespace !== 0) {
            tokens.push(whitespaceObject);
            whitespaceObject = null;
        }
        else if ((var comment = isSingleLineComment(str, i)) !== -1) {
            tokens.push({
                tokenName: comment,
                tokenColor: commentColor,
                tokenCount: 1
            });
            i += comment.length;
        }
        else if ((var multiComment = isMultiLineComment(str, i)) !== -1) {
            tokens.push({
                tokenName: multiComment,
                tokenColor: commentColor,
                tokenCount: 1
            });
            i += multiComment.length;
        }
        else if ((var string = isString(str, i)) !== -1) {
            tokens.push({
                tokenName: string,
                tokenColor: stringColor,
                tokenCount: 1
            })
            i += string.length;
        }
        else if ((var functionText = isFunction(str, i)) !== -1) {

        }
        else if ((var operator = isOperator(str, i)) !== -1) {
            tokens.push({
                tokenName: operator,
                tokenColor: operatorColor,
                tokenCount: 1
            });
        }
        else if ((var seperator = isSeperator(str, i)) !== -1) {
            tokens.push({
                tokenName: seperator,
                tokenColor: seperatorColor,
                tokenCount: 1
            });
            i += seperator.length;
        }
        else if ((var keyword = isKeyword(str, i)) !== -1) {
            tokens.push({
                tokenName: keyword,
                tokenColor: keywordColor,
                tokenCount: 1
            });
            i += keyword.length;
        }
    }
}

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
var isAlphaNumeric = function(ch) {
    return isNumber(ch) || isAlpha(ch);
}
function htmlEscape(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}
function htmlUnescape(str){
    return str
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&');
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
var keywords = ["new", "for", "if", "else", "while", "break", "continue", "return", "class", "struct", "function", "goto", "static", "public", "private", "protected", "void"]; //...
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
var isSingleLineComment = false;
var commentColor = "grey";
var singleLineComment = "//";
var multiLineComment = "/*";
var multiLineCommentEnd = "*/";
var newline = "\n";
function setupTypewriter(t, content, codeSample) {
        var text = htmlUnescape (content.innerHTML);
        content.innerHTML = "";
        var isPlainText = true;
        var cursorPosition = 0;
        var typeSpeed = 100;
        var tempTypeSpeed = 0;
        var color = "white";
        var type = function() {
            var isPlainText = true;
            tempTypeSpeed = (Math.random() * typeSpeed) + 50;
            //Check for space
            if (text[cursorPosition] === " ") {
                console.log ("Space found");
                t.appendChild( document.createTextNode( '\u00A0' ) );
                cursorPosition += 1;
                isPlainText = false;
            }
            //Check for any characters that still need to be added
            else if (codeSample && leftToAdd != "") {
                addSpan (leftToAdd.slice(0,1), t, color);
                leftToAdd = leftToAdd.slice(1);
                cursorPosition += 1;
                isPlainText = false;
            }
            // Check to see if it is a commen
            //Check to see if it is a standalone int or float
            else if (codeSample && cursorPosition > 0 && !isString && leftToAdd === "" && !isAlpha (text[cursorPosition - 1]) && !isAlpha (text[cursorPosition + 1]) && isNumber(text[cursorPosition])) {
                addSpan (text[cursorPosition], t, numberColor);
                cursorPosition += 1;
                isPlainText = false;
            }
            else if (codeSample && text[cursorPosition] === "." && isNumber (text[cursorPosition - 1]) && isNumber (text[cursorPosition - 1])) {
                addSpan (text[cursorPosition], t, numberColor);
                cursorPosition += 1;
                isPlainText = false;
            }
            //Add the colored char that is part of the string
            else if (codeSample && isString && leftToAdd == "") {
                addSpan (text[cursorPosition], t, stringColor);
                if (text[cursorPosition] === stringMatchingQuote) {
                    isString = false;
                }
                isPlainText = false;
                cursorPosition += 1;
            }
            //Test to see if the line is beginning as a string
            else if (codeSample && (text[cursorPosition] === '"' || text[cursorPosition] === "'")) {
                isString = true;
                addSpan (text[cursorPosition], t, stringColor);
                stringMatchingQuote = text[cursorPosition];
                console.log ("Matching Quote: " + text[cursorPosition]);
                cursorPosition += 1;
                isPlainText = false;
            }
            else if (codeSample && leftToAdd == "") {
                for (i = 0; i < escapeCharacters.length; i++) {
                    if (text.slice (cursorPosition, cursorPosition + escapeCharacters[i].length) == escapeCharacters[i]) {
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
                        isPlainText = false;
                        break;
                    }
                }
                //Check for operators
                for (i = 0; i < operators.length; i++) {
                    if (text[cursorPosition] === operators[i]) {
                        if (operators[i] === "<") {
                            addSpan ("&lt;",t,operatorColor);
                        }
                        else if (operators[i] === ">") {
                            addSpan ("&gt;",t,operatorColor);
                        }
                        else {
                            addSpan (operators[i], t, operatorColor);
                        }

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
                    if (text.slice (cursorPosition, cursorPosition + primitiveTypes[i].length) === primitiveTypes[i] && !isAlpha(text[cursorPosition - 1]) && !isAlpha (text[cursorPosition + primitiveTypes[i].length])) {
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
                if (codeSample && isAlpha (text[cursorPosition]) && !isString && leftToAdd == "") {
                    console.log ("Function check");
                    var i = cursorPosition;
                    var paranthesis = cursorPosition;
                    var curlyBrace = cursorPosition;
                    var isFunction = false;
                    var isFunctionDeclaration = false;
                    var lastNonSpace = -1;
                    while (text[i] != "\n") {
                        //Checks to make sure there are no spaces in between the function letters
                        if (text[i] != " ") {
                            lastNonSpace = text[i];
                        }
                        console.log (lastNonSpace)
                        var spaces = checkSpaces (text.slice (cursorPosition, i));
                        if (text[i] === '(' && spaces <= 1 && (isAlpha (lastNonSpace) || isNumber (lastNonSpace))) {
                            paranthesis = i;
                            isFunction = true;

                        }
                        else if (text[i] === "{" && space <= 1 && (isAlpha (lastNonSpace) || isNumber (lastNonSpace))) {
                            curlyBrace = i;
                            isFunctionDeclaration = true;
                            break;
                        }
                        i++;
                    }
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
                color = plainTextColor;
                t.innerHTML += text[cursorPosition];
                cursorPosition += 1;

            }
            //Actual typewriter effect implemented
            if (cursorPosition < text.length) {
                setTimeout(type, tempTypeSpeed);
            }
            if (cursorPosition >= text.length - 1) {
                function resetTimer () {
                window.clearInterval(action);
                }
            }
        };

        return {
            type: type
        };
    }
    var typer = document.getElementById('typewriter');
    //First argument is the location of the text to be displayed. The second argument is the location of the text that you want to be displayed. The third
    //is a boolean value indicating whether it is a code sample and should be syntax highlighted or not.
    typewriter = setupTypewriter(typer, typer, true);

    typewriter.type();
