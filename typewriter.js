var responses = ["What took you so long?\nI've been sitting here for seconds.\nCouldn't you have been any faster?\nI had all these code samples picked out, and you just decided to not show up.\nI mean, you were completely ignoring me.\nWhatever\nJust click on a link or something...\nI don't care.\n",
"Why hello there.\nWelcome!",
"Hmmm, I swear I've seen you before...\nHave we met?\nI may be mistaken.\nForget I mentioned it."];


function setupTypewriter(t, text) {
        var HTML = t.innerHTML;
        t.innerHTML = "";
        var cursorPosition = 0,
            //tag = "",
            //writingTag = false,
            //tagOpen = false,
            typeSpeed = 100,
        tempTypeSpeed = 0;

        var type = function() {
            //tag.innerHTML += text[cursorPosition];
            if (true) {
                if (text[cursorPosition] === " ") {
                    tempTypeSpeed = 0;
                }
                else {
                    tempTypeSpeed = (Math.random() * typeSpeed) + 50;
                }
                t.innerHTML += text[cursorPosition];
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

            cursorPosition += 1;
            if (cursorPosition < text.length) {
                console.log (text[cursorPosition])
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

    typewriter = setupTypewriter(typewriter, responses[0]);

    typewriter.type();