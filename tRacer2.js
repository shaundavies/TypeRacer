

window.addEventListener('load', function () {                                               // Wait for page to be fully loaded

    // Script performance run timer - Begin
    var t0 = performance.now()

    var finalWPM1 = 0;
    // Timer
    function timer() {
        var seconds = 0;
        var milli = 0;
        var secondss = 0;
        var x = setInterval(function () {
            if (endtimer === false) {
                milli++;
                seconds++;
                secondss = Math.round(seconds / 10);
                if (milli > 9) { milli = 0; }
                document.getElementById("timer").innerHTML = "Time: " + secondss + "." + milli;
            } else {
                finalWPM1 = Math.round((curWord / secondss) * 60);                       // Formula to calculate the Words Per Minute type speed
                console.log("final wpm " + finalWPM1);
                clearInterval(x);
                timertoggle = true;
            }
        }, 100);
    }

    function timer2(finalWPM) {
        var count = 0;
        var time = document.getElementById("timer");
        var x = setInterval(function () {
            console.log("running still");
            if (count <= finalWPM) {
                count++;
                console.log(count + " why are you running")
                time.innerHTML = count;
            } else {
                time.innerHTML = "Final Time: " + finalWPM + " Words Per Minute";
            }
        }, 50);
    }

    function prepTextColor() { // Take from wordTally
        var wordLength = [];
        for (var i = 0; i < wordTally - 1; i++) {                                           // Make wordTally zero based
            wordLength[i] = document.getElementById('word' + (i + 1)).childElementCount;    // Word spans start at 1
            console.log(wordLength[i])
        }
        return wordLength;
    }

    // GAME PREP -------------------------------------------------------------------

    // Create String Array
    var phrase = "The quick brown fox jumped over the lazy dog. ";
    var arrPhrase = [];
    function stringArr() {
        for (var i = 0; i < phrase.length; i++) {
            var _slicePhrase = phrase.slice(i, i + 1);
            arrPhrase[i] = _slicePhrase;
        }
        console.log("arrphrase  " + arrPhrase);
    }
    stringArr();

    // Invoke the span elements for each word and space
    function wordSpanCreate() {
        var count = 0;
        var spanDump = document.getElementById('highlight')
        for (var i = 0; i < arrPhrase.length; i++) {
            var temp = document.createElement('span');
            var temp2 = document.createElement('span');
            if (arrPhrase[i] === ' ') {
                count++;
                // Create Word span
                temp.setAttribute("id", 'word' + count);
                temp.innerHTML = arrPhrase[i];
                spanDump.appendChild(temp);

                // Create Space Span
                temp2.setAttribute("id", "space" + count);
                temp2.innerHTML = arrPhrase[i];
                spanDump.appendChild(temp2);
            }
        }
    }
    wordSpanCreate();

    var wordTally = 0;
    // Invoke the span elements for each letter
    function letterSpanCreate() {
        var count = 1;
        console.log(spanDump + ' spandump')
        for (var i = 0; i < arrPhrase.length; i++) {
            var spanDump = document.getElementById('word' + count)
            if (arrPhrase[i] != ' ') {
                var temp = document.createElement('span');
                temp.setAttribute("id", 'L' + i);
                temp.innerHTML = arrPhrase[i];
                spanDump.appendChild(temp);

            } else {
                count++;
                wordTally = count;
            }
        }
    }
    letterSpanCreate();

    // -------------------------------------------------------------------
    // GAME PLAY -------------------------------------------------------------------

    // KeyCode Function Global Variables
    var curLetter = 0;                                                                  // Current letter counter in String 
    var curWord = 1;                                                                    // Current word counter in String
    var wrongLetter = 0;                                                                // Counter for how many wrong letters have been pressed
    var beginGame = false;                                                              // If true the game has started and prevent reseting of values
    var endGame = false;                                                                // If true the game has ended and prevent code from running
    var endtimer = false;
    var timertoggle = false;

    // Element changes prior to game run
    function racePrep() {
        document.getElementById("timer").innerHTML = "Time: 0.0";                   // Placeholder text for the stop watch
        document.getElementById("word" + curWord).style.textDecoration = 'underline';
        var input = document.getElementById("typearea");
        input.focus();                                                              // Force HTML to have input field already selected
    }
    racePrep();



    var WL = prepTextColor();
    console.log(WL[2] + " a");

    var WLt = 0;
    // On keyUp
    document.onkeyup = (e) => {
        // End game check
        if (endGame === false) {                                                    // Game is over prevent code from running
            var x = document.forms["myForm"]["fname"].value;                        // Grab data from Form element
            if (e.keyCode > 64 || e.keyCode === 8 || e.keyCode === 32) {            // Prevent Shift caps lock and other characters from giving false negative
                // Game Logic--(Correct Inputs) ---------
                if (x[curLetter] === arrPhrase[curLetter]) {                        // User's input matches the character in string sequence
                    curLetter++;

                    // End of Game -----------
                    if (curLetter > arrPhrase.length - 1) {                         // The current letter counter is greater than the amount of characters in the typing string
                        endGame = true;                                             // ** Stop code from running
                        endtimer = true;
                        // timer2(timer);
                    }
                    // Game is not over
                    else {
                        // CSS style changes ---------
                        let flag = false;                                           // Boolean to check if current span is a Spacer
                        if (arrPhrase[curLetter - 1] === ' ') {                     // If the previous current letter was a space
                            curWord++;
                            flag = true;                                            // If the previous letter was a space we dont want to attempt an element search this iteration. Element CSS is null, Spacer span

                            // Underline Current Word and remove underline from previous word
                            document.getElementById("word" + curWord).style.textDecoration = 'underline';
                            document.getElementById("word" + (curWord - 1)).style.textDecoration = 'none';
                            // Testing
                            WLt = 0;
                            WL[curWord - 1];
                            console.log("math problem " + WL[curWord - 1])
                            console.log("math problem " + curWord)
                        }

                        if (flag === false) {                                       // If flag is false we are still in an element needing style changes
                            // Change previous letter input text color
                            // document.getElementById("L" + (curLetter - 1)).style.color = 'LimeGreen';
                            // document.getElementById("L" + (curLetter - 1)).style.color = "rgba(0,"+ (Math.min(128, 255 / (WL[curWord] / curLetter))) +",0,1)";
                            WLt++;
                            document.getElementById("L" + (curLetter - 1)).style.color = "rgba(0," + (255 * (WLt / WL[curWord - 1])) + ",0,1)";
                            // document.getElementById("typearea").style.color = "rgba(0,"+ (255 * (WLt / WL[curWord - 1])) +",0,1)";
                        } else { flag = false; }
                    }
                }

                //Game logic--(Wrong Inputs) ---------
                else {                                                              // User's input does not matche the character in the string sequence
                    // (Delete) is handeled is on-key-down
                    if (e.keyCode !== 8) {                                          // User's input isn't delete.
                        wrongLetter++;                                              // Every incorrect input increases number

                        if (arrPhrase[(curLetter - 1) + wrongLetter] != ' ')        // If the previous current letter was supposed to be a space; in the intended type string
                        {
                            // Change previous letter input text color
                            document.getElementById("L" + (curLetter + (wrongLetter - 1))).style.color = 'LightCoral';
                        }
                    }
                }


                // TEMP*****************************
                if (wrongLetter != 0) {                                             // Change text colors for wrong answers
                    document.getElementById("typearea").style.backgroundColor = 'LightCoral';
                } else {
                    document.getElementById("typearea").style.backgroundColor = 'transparent';
                }

                // Console Log inputs
                console.log("Current Letter " + arrPhrase[curLetter])
                console.log("wrong Letter Count " + wrongLetter)
            }
        }
    }

    // On keyDown
    document.onkeydown = (e) => {                                                   // User can hold delete to remove incorrect text
        // Game Logic--(Removing Wrong Inputs) ---------
        if (e.keyCode > 64 || e.keyCode === 8 || e.keyCode === 32) {
            if (beginGame === false) {     // Run timer only after a valid key press
                // timerStates();
                timer();
                beginGame = true                                                        // Run timer command once
            }
            console.log(finalWPM1 + " wordsget");
            if (timertoggle === true) {
                timer2(finalWPM1);
            }
        }
        if (e.keyCode === 8 && wrongLetter != 0) {                                  // User's input is (Delete) and the wrong letter counter is greater than Zero
            wrongLetter--;                                                          // Every delete input decreases number

            // CSS style changes
            if (arrPhrase[(curLetter) + wrongLetter] != ' ') {                      // If the previous current letter was supposed to be a space; in the intended type string
                // Change previous letter input text color
                document.getElementById("L" + (curLetter + (wrongLetter))).style.color = 'black';
            }
        }
    }

    // Script performance run timer - End
    var t1 = performance.now()
    console.log('script to ' + (t1 - t0) + ' milliseconds to run');

})






// SCRAPS*******************************************************************

// // Test example for appending html elements at id location
// var test = document.createElement('span');                  // Invoke an HTML element
// test.innerHTML = 'testing';                                 // Fill invokation with data
// var test2 = document.getElementById("highlight");           // Locate html id location
// test2.appendChild(test);                                    // Append invoke at location
