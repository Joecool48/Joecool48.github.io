var responses = ["What took you so long?\nI've been sitting here for seconds.\nCouldn't you have been any faster?\nI had all these code samples picked out, and you just decided to not show up.\nI mean, you were completely ignoring me.\nWhatever\nJust click on a link or something...\nI don't care.\n",
"Why hello there.\nWelcome!",
"Hmmm, I swear I've seen you before...\nHave we met?\nI may be mistaken.\nForget I mentioned it."];

// Configuration Variables

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
//var isString = false;
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
//var isSingleLineComment = false;
var commentColor = "grey";
var singleLineComment = "//";
var multiLineComment = "/*";
var multiLineCommentEnd = "*/";
var newline = "\n";
var allowedNumCharsBefore = ["0x", "0"]; // etc
var allowedNumCharsAfter = ["f", "l"]; // etc

// To do list:
// 1. Fix number parsing so that it correctly rejects invalids
// 2. Add actual typewriter part









// Helper functions for parsing

function addSpan (text, color) {
    newSpan = document.createElement ("span");
    newSpan.setAttribute ("class", color);
    this.appendChild (newSpan);
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
function isValidOperand(ch) {
	if (isAlphaNumeric(ch) || ch === "_" || ch === "$") return true;
	return false;
}
// Function to check to see if typewriter should speed up and skip unimportant characters
function isTypewriterSkipChar(ch) {
    if (ch === " " || ch === "\n" || ch === "\t") return true;
    return false;
}
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
        if (newlineIndex !== -1) {
            return str.substring(index, newlineIndex);
        }
        else {
        	return str.substring(index, str.length);
        }
    }
    // Return -1 if not comment
    return -1;
}
function isMultiLineComment (str, index) {
    if (str.substr(index, multiLineComment.length) === multiLineComment) {
        var indexOfEnd = str.indexOf(multiLineCommentEnd, index + multiLineComment.length);
        if (indexOfEnd !== -1) {
            return str.substring(index, indexOfEnd + multiLineComment.length);
        }
    }
    return -1;
}
function isOperator (str, index) {
    for (var i = 0; i < operators.length; i++) {
        if (str.substr(index, operators[i].length) === operators[i] && isValidOperand(str[index - 1]) && isValidOperand(str[index + operators[i].length + 1])) {
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
        if (str.substr(index, seperators[i].length) === seperators[i]) {
            return seperators[i];
        }
    }
    return -1;
}

function isBoolean (str, index) {
    for (var i = 0; i < booleans.length; i++) {
        if (str.substr(index, booleans[i].length) === booleans[i]) {
            return booleans[i];
        }
    }
    return -1;
}

function isPrimitiveType (str, index) {
    for (var i = 0; i < primitiveTypes.length; i++) {
        if (str.substr(index, primitiveTypes[i].length) === primitiveTypes[i]) {
            return primitiveTypes[i];
        }
    }
    return -1;
}

function isSpecial (str, index) {
    for (var i = 0; i < specialValues.length; i++) {
        if (str.substr(index, specialValues[i].length) === specialValues[i]) {
            return specialValues[i];
        }
    }
    return -1;
}
// Number recognition still needs fixing
function isANumber (str, index) {
    console.log("In isNumber function");
    var position = index;
    var isValid = true;
    var beforeIndexStart = -1;
    var beforeIndexEnd = -1;
    var afterIndexStart = -1;
    var afterIndexEnd = -1;
    var numberStart = -1;
    var numberEnd = -1;
    while (isValid) {
        if (numberStart === -1 && isNumber(str[position])) {
            console.log("Number start:" + position);
            numberStart = position;
        }
        else {
            for (var i = 0; i < allowedNumCharsBefore.length; i++) {
                if (str.substr(position, allowedNumCharsBefore[i].length) === allowedNumCharsBefore[i]) {
                    if (beforeIndexStart !== -1) {
                        isValid = false;
                        break;
                    }
                    beforeIndexStart = position;
                    position += allowedNumCharsBefore[i].length;
                    beforeIndexEnd = position;
                    break;
                }
            }
            for (var i = 0; i < allowedNumCharsAfter.length; i++) {
                if (str.substr(position, allowedNumCharsAfter[i].length) === allowedNumCharsAfter[i]) {
                    if (afterIndexStart !== -1) {
                        isValid = false;
                        break;
                    }
                    afterIndexStart = position;
                    position += allowedNumCharsAfter[i].length;
                    afterIndexEnd = position;
                    break;
                }
            }
            // End of number
            if (!isNumber(str[position])) {
                if (numberStart === -1) {
                    console.log("Invalid number");
                    isValid = false;
                }
                else {
                    console.log("Number end at: " + position);
                    numberEnd = position;
                }
                break;
            }
        }
        position += 1;
    }
    // This part needs more work
    if (!isValid) return -1;
    else {
        var start = numberStart;
        var end = numberEnd;
        if (beforeIndexStart !== -1 && beforeIndexStart < numberStart) {
            start = beforeIndexStart;
        }
        if (afterIndexStart !== -1 && afterIndexStart > numberEnd) {
            end = afterIndexEnd;
        }
        // Is invalid if other characters are to the right or left
        if (isValidOperand(str[numberStart - 1]) || isValidOperand(str[numberEnd + 1])) return -1
        console.log("Numberstart = " + start);
        console.log("Numberend = " + end);
        return str.substring(start, end);
    }
}

function isFunction (str, index) {
    //Valid function name first character
    if (isAlpha(str[index]) || str[index] === "_" || str[index] === "$") {
        var indexOfSpace = str.indexOf(" ", index);
        var indexOfLeftParen = str.indexOf("(", index);
        var indexOfRightParen = str.indexOf(")", index);
        var indexOfNewline = str.indexOf("\n", index);
        console.log("IndexOfLeftParen = " + indexOfLeftParen);
        console.log("IndexOfRightParen = " + indexOfRightParen);
        console.log("IndexOfNewline = " + indexOfNewline);
        if (indexOfLeftParen < indexOfNewline && indexOfRightParen < indexOfNewline
            && (!isAlphaNumeric(str[index - 1]) && str[index - 1] !== "_" && str[index - 1] !== "$")) {
            var endIndex = index + 1;
            while (isAlphaNumeric(str[endIndex]) || str[endIndex] === "_" || str[endIndex] === "$") {
                endIndex++;
            }
            if (str[endIndex] === "(" && endIndex === indexOfLeftParen) {
                return str.substring(index, endIndex);
            }
            var countSpaces = endIndex;
            while (str[countSpaces] === " ") {
                countSpaces++;
            }
            if (str[countSpaces] === "(" && countSpaces === indexOfLeftParen) {
                return str.substring(index, endIndex);
            }
        }
        return -1;
    }
    return -1;
}

/* spanObject = {
    token: "Tokenname",
    count: "Count",
    color: "color"
}; */
function parseString (str) {
    var tokens = [];
    var i = 0;
    // var whitespaceObject = {
    //     tokenName: " ",
    //     tokenColor: "white",
    //     tokenCount: 0
    // }
    var comment, multiComment, string, functionText, boolean, primative, special, operator, number, seperator, keyword, number;
    while (i < str.length) {
        if ((comment = isSingleLineComment(str, i)) !== -1) {
            tokens.push({
                tokenName: comment,
                tokenColor: commentColor,
                tokenCount: 1
            });
            i += comment.length;
            console.log("Created single comment object");
        }
        else if ((multiComment = isMultiLineComment(str, i)) !== -1) {
            tokens.push({
                tokenName: multiComment,
                tokenColor: commentColor,
                tokenCount: 1
            });
            i += multiComment.length;
            console.log("Created multi comment object");
        }
        else if ((string = isString(str, i)) !== -1) {
            tokens.push({
                tokenName: string,
                tokenColor: stringColor,
                tokenCount: 1
            });
            i += string.length;
            console.log("Created string object");
        }
        else if ((functionText = isFunction(str, i)) !== -1) {
            tokens.push({
                tokenName: functionText,
                tokenColor: functionColor,
                tokenCount: 1
            });
            i += functionText.length;
            console.log("Created function object");
        }
        else if ((boolean = isBoolean(str, i)) !== -1) {
            tokens.push({
                tokenName: boolean,
                tokenColor: booleanColor,
                tokenCount: 1
            });
            i += boolean.length;
            console.log("Created boolean object");
        }
        else if ((primitive = isPrimitiveType(str, i)) !== -1) {
            tokens.push({
                tokenName: primitive,
                tokenColor: primitiveTypeColor,
                tokenCount: 1
            });
            i += primitive.length;
            console.log("Created primative object");
        }
        else if ((special = isSpecial(str, i)) !== -1) {
            tokens.push({
                tokenName: special,
                tokenColor: specialValueColor,
                tokenCount: 1
            });
            i += special.length;
            console.log("Created special object");
        }
        else if ((operator = isOperator(str, i)) !== -1) {
            tokens.push({
                tokenName: operator,
                tokenColor: operatorColor,
                tokenCount: 1
            });
            i += operator.length;
            console.log("Created operator object");
        }
        else if ((seperator = isSeperator(str, i)) !== -1) {
            tokens.push({
                tokenName: seperator,
                tokenColor: seperatorColor,
                tokenCount: 1
            });
            i += seperator.length;
            console.log("Created seperator object");
        }
        else if ((keyword = isKeyword(str, i)) !== -1) {
            tokens.push({
                tokenName: keyword,
                tokenColor: keywordColor,
                tokenCount: 1
            });
            i += keyword.length;
            console.log("Created keyword object");
        }
        /*else if ((number = isANumber(str, i)) !== -1) {
            console.log(typeof(number));
            tokens.push({
                tokenName: number.toString(),
                tokenColor: numberColor,
                tokenCOunt: 1
            });
            i += number.length;
            console.log("Created number object");
        }*/
        else {
        	tokens.push({
        		tokenName: str[i],
        		tokenColor: "white",
        		tokenCount: 1
        	});
        	console.log("Pushed other");
        	i += 1;
        }
    }
    return tokens;
}
    function setupTypewriter(documentObject) {
        var typewriter = {
            destinationDocumentObject: documentObject,
            typewriterSpeed: 100,
            isRunning: false,
            tokens: [],
            textColor: "white",
            syntaxHighlighting: true,
            charPosition: 0,
            currentToken: 0,
            setSpeed: function (newSpeed) {
                this.typewriterSpeed = newSpeed;
            },
            stop: function () {
                this.isRunning = false;
            },
            parseString: function (str) {
                this.tokens = [];
                var i = 0;
                var comment, multiComment, string, functionText, boolean, primative, special, operator, number, seperator, keyword, number;
                while (i < str.length) {
                    if ((comment = isSingleLineComment(str, i)) !== -1) {
                        this.tokens.push({
                            tokenName: comment,
                            tokenColor: commentColor
                        });
                        i += comment.length;
                        console.log("Created single comment object");
                    }
                    else if ((multiComment = isMultiLineComment(str, i)) !== -1) {
                        this.tokens.push({
                            tokenName: multiComment,
                            tokenColor: commentColor
                        });
                        i += multiComment.length;
                        console.log("Created multi comment object");
                    }
                    else if ((string = isString(str, i)) !== -1) {
                        this.tokens.push({
                            tokenName: string,
                            tokenColor: stringColor
                        });
                        i += string.length;
                        console.log("Created string object");
                    }
                    else if ((functionText = isFunction(str, i)) !== -1) {
                        this.tokens.push({
                            tokenName: functionText,
                            tokenColor: functionColor
                        });
                        i += functionText.length;
                        console.log("Created function object");
                    }
                    else if ((boolean = isBoolean(str, i)) !== -1) {
                        this.tokens.push({
                            tokenName: boolean,
                            tokenColor: booleanColor
                        });
                        i += boolean.length;
                        console.log("Created boolean object");
                    }
                    else if ((primitive = isPrimitiveType(str, i)) !== -1) {
                        this.tokens.push({
                            tokenName: primitive,
                            tokenColor: primitiveTypeColor
                        });
                        i += primitive.length;
                        console.log("Created primative object");
                    }
                    else if ((special = isSpecial(str, i)) !== -1) {
                        this.tokens.push({
                            tokenName: special,
                            tokenColor: specialValueColor
                        });
                        i += special.length;
                        console.log("Created special object");
                    }
                    else if ((operator = isOperator(str, i)) !== -1) {
                        this.tokens.push({
                            tokenName: operator,
                            tokenColor: operatorColor
                        });
                        i += operator.length;
                        console.log("Created operator object");
                    }
                    else if ((seperator = isSeperator(str, i)) !== -1) {
                        this.tokens.push({
                            tokenName: seperator,
                            tokenColor: seperatorColor
                        });
                        i += seperator.length;
                        console.log("Created seperator object");
                    }
                    else if ((keyword = isKeyword(str, i)) !== -1) {
                        this.tokens.push({
                            tokenName: keyword,
                            tokenColor: keywordColor
                        });
                        i += keyword.length;
                        console.log("Created keyword object");
                    }
                    else if ((number = isANumber(str, i)) !== -1) {
                        console.log(typeof(number));
                        this.tokens.push({
                            tokenName: number.toString(),
                            tokenColor: numberColor
                        });
                        i += number.length;
                        console.log("Created number object");
                    }
                    else {
                    	this.tokens.push({
                    		tokenName: str[i],
                    		tokenColor: "white"
                    	});
                    	console.log("Pushed other");
                    	i += 1;
                    }
                }
            },
            clearScreen: function () {
                this.destinationDocumentObject.innerHTML = "";
            },
            parseHtml: function(html) {
                this.parseString(htmlUnescape(html.innerHTML));
            },
            typeWaitTime: function () {
                return Math.round(Math.random() * this.typeSpeed) + 50;
            },
            skipTypeWaitTime: function () {
                return Math.round(Math.random() * this.typeSpeed / 2);
            },
            typeChar: function () {
                console.log("typeChar: " + typeof(this.tokens));
                if (this.currentToken < this.tokens.length) {
                    // Go to a new token
                    if (this.syntaxHighlighting) {
                        this.destinationDocumentObject.addSpan(this.tokens[currentToken][charPosition].tokenName, this.tokens[currentToken][charPosition].tokenColor);
                    }
                    else {
                        this.destinationDocumentObject.addSpan(this.tokens[currentToken][charPosition].tokenName, textColor);
                    }

                }
                charPosition += 1;
                if (this.charPosition >= this.tokens[currentToken].length) {
                    currentToken += 1;
                    charPosition = 0;
                }
                if (this.currentToken >= this.tokens.length) {
                    console.log("Reached end of token array");
                }
                else if (isTypewriterSkipChar(tokens[currentToken][charPosition].tokenName) && this.isRunning) {
                    setTimeout(this.typeChar, this.skipTypeWaitTime());
                }
                else if (this.isRunning) {
                    setTimeout(this.typeChar, this.typeWaitTime());
                }
            },
            type: function () {
                console.log("type: " + typeof(this.tokens));
                console.log("this: " + this.currentToken);
                this.typeChar();
                if (this.tokens === []) return;
                //setTimeout(this.typeChar, this.typeWaitTime());
            }
        };
        return typewriter;
    }
    var typewriter = setupTypewriter(document.getElementById("typewriter"));
    typewriter.parseString("helloThere()\n");
    typewriter.type();
