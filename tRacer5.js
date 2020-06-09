import { setText, selectPhrase } from '/expoTypePhrases.js'
// import { _timer } from '/expoTimer.js'
import { wordSpanCreate, letterSpanCreate } from '/expoSpanCreate.js'

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
                // console.log("final wpm " + finalWPM1);
                clearInterval(x);
                timertoggle = true;
            }
        }, 100);
    }

    function timer2(finalWPM) {
        var count = 0;
        var time = document.getElementById("timer");
        var x = setInterval(function () {
            // console.log("running still");
            if (count <= finalWPM) {
                count++;
                // console.log(count + " why are you running")
                time.innerHTML = count;
            } else {
                time.innerHTML = "Final Time: " + finalWPM + " Words Per Minute";
                clearInterval(x);
            }
        }, 50);
    }

    // GAME PREP -------------------------------------------------------------------

    // Create String Array
    var _setText = setText();                                                               // Module from typePhrases
    var arrPhrase = selectPhrase(_setText);


    // Invoke the span elements for each word and space
    wordSpanCreate(arrPhrase);

    // Invoke the span elements for each letter
    letterSpanCreate(arrPhrase);

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
    var cc = 0;
    var wrongLetterbool = false;
    var bb = 0;
    var bbtog = false;


    // Element changes prior to game run
    function racePrep() {
        document.getElementById("timer").innerHTML = "Time: 0.0";                   // Placeholder text for the stop watch
        document.getElementById("word" + curWord).style.textDecoration = 'underline';
        var input = document.getElementById("typearea");
        input.focus();                                                              // Force HTML to have input field already selected
    }
    racePrep();

    console.log(document.getElementById("word" + 3).childElementCount + " word length")

    // On keyUp
    document.onkeyup = (e) => {
        // End game check
        if (endGame === false) {                                                    // Game is over prevent code from running
            var x = document.forms["myForm"]["fname"].value;                        // Grab data from Form element
            if (e.keyCode > 64 || e.keyCode === 8 || e.keyCode === 32) {            // Prevent Shift caps lock and other characters from giving false negative
                // Game Logic--(Correct Inputs) ---------
                console.log(bbtog+ " bbtog")
                if (bbtog === false) {
                    if (x[cc] === arrPhrase[curLetter]) {                        // User's input matches the character in string sequence
                        // if (x[x.length - 1] === arrPhrase[curLetter]) {                        // User's input matches the character in string sequence
                        console.log("top")
                        curLetter++;
                        cc++;
                        wrongLetterbool = false;
                        bb = 0;
                        // End of Game -----------
                        if (curLetter > arrPhrase.length - 1) {                         // The current letter counter is greater than the amount of characters in the typing string
                            endGame = true;                                             // ** Stop code from running
                            endtimer = true;
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
                                document.getElementById("typearea").value = '';
                                cc = 0;
                                console.log("something happened2")
                            }

                            if (flag === false) {                                       // If flag is false we are still in an element needing style changes
                                // Change previous letter input text color
                                document.getElementById("L" + (curLetter - 1)).style.color = 'LimeGreen';
                            } else { flag = false; }
                        }
                    }

                    //Game logic--(Wrong Inputs) ---------
                    else {                                                              // User's input does not matche the character in the string sequence
                        // (Delete) is handeled is on-key-down
                        if (e.keyCode !== 8 && String.fromCharCode(e.keyCode) != arrPhrase[curLetter] && wrongLetterbool === false) {                                          // User's input isn't delete.
                            wrongLetter++;                                              // Every incorrect input increases number

                            if (arrPhrase[(curLetter - 1) + wrongLetter] != ' ')        // If the previous current letter was supposed to be a space; in the intended type string
                            {
                                // Change previous letter input text color
                                document.getElementById("L" + (curLetter + (wrongLetter - 1))).style.color = 'blue';
                            }
                        }
                        else if (e.keyCode !== 8 && String.fromCharCode(e.keyCode) != arrPhrase[curLetter]) {                                    // Needs work fix for deletion of correct letter *****************************
                            bb++;
                            console.log("abc " + bb)
                            document.getElementById("L" + (curLetter + (bb))).style.color = 'LightCoral';
                            if (x.length > 0) {
                                console.log("in proper area")
                                // curLetter--;
                                if (arrPhrase[curLetter] !== ' ') {
                                    // document.getElementById("L" + (curLetter)).style.color = 'black';
                                }
                            }
                        }
                    }
                } else if (bbtog === true) {
                    if (x[cc] === arrPhrase[curLetter + bb]) {                        // User's input matches the character in string sequence
                        // if (x[x.length - 1] === arrPhrase[curLetter]) {                        // User's input matches the character in string sequence
                        console.log("bbtog is true top portion")
                        // curLetter++;
                        // cc++;
                        // wrongLetterbool = false;
                        // bb = 0;
                        // End of Game -----------
                        // if (curLetter > arrPhrase.length - 1) {                         // The current letter counter is greater than the amount of characters in the typing string
                        //     endGame = true;                                             // ** Stop code from running
                        //     endtimer = true;
                        // }
                        // // Game is not over
                        // else {
                        //     // CSS style changes ---------
                        //     let flag = false;                                           // Boolean to check if current span is a Spacer
                        //     if (arrPhrase[curLetter - 1] === ' ') {                     // If the previous current letter was a space
                        //         curWord++;
                        //         flag = true;                                            // If the previous letter was a space we dont want to attempt an element search this iteration. Element CSS is null, Spacer span

                        //         // Underline Current Word and remove underline from previous word
                        //         document.getElementById("word" + curWord).style.textDecoration = 'underline';
                        //         document.getElementById("word" + (curWord - 1)).style.textDecoration = 'none';

                        //         // Testing
                        //         document.getElementById("typearea").value = '';
                        //         cc = 0;
                        //         console.log("something happened2")
                        //     }

                        //     if (flag === false) {                                       // If flag is false we are still in an element needing style changes
                        //         // Change previous letter input text color
                        //         document.getElementById("L" + (curLetter - 1)).style.color = 'LimeGreen';
                        //     } else { flag = false; }
                        // }
                        bbtog = false;
                    }

                    //Game logic--(Wrong Inputs) ---------
                    else {                                                              // User's input does not matche the character in the string sequence
                    console.log("bottom")
                    console.log(x.length + " xlen")
                    if(arrPhrase[curLetter - 1] != ' '){    
                    curLetter--;  
                    cc--;  
                }
                console.log("tog going false")
                bbtog = false;
                    
                    // (Delete) is handeled is on-key-down
                        // if (e.keyCode !== 8 && String.fromCharCode(e.keyCode) != arrPhrase[curLetter] && wrongLetterbool === false) {                                          // User's input isn't delete.
                        //     // wrongLetter++;                                              // Every incorrect input increases number

                        //     // if (arrPhrase[(curLetter - 1) + wrongLetter] != ' ')        // If the previous current letter was supposed to be a space; in the intended type string
                        //     // {
                        //     //     // Change previous letter input text color
                        //     //     document.getElementById("L" + (curLetter + (wrongLetter - 1))).style.color = 'LightCoral';
                        //     // }
                        // }
                        // else if (e.keyCode !== 8 && String.fromCharCode(e.keyCode) != arrPhrase[curLetter]) {                                    // Needs work fix for deletion of correct letter *****************************
                        //     bb++;
                        //     console.log("abc " + bb)
                        //     document.getElementById("L" + (curLetter + (bb - 1))).style.color = 'LightCoral';
                        //     if (x.length > 0) {
                        //         console.log("in proper area")
                        //         // curLetter--;
                        //         if (arrPhrase[curLetter] !== ' ') {
                        //             // document.getElementById("L" + (curLetter)).style.color = 'black';
                        //         }
                        //     }
                        // }
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
                console.log("Current Letter number " + curLetter)
                console.log("form letter " + x.length)
                console.log("cc letter " + cc)
                console.log("bb letter " + bb)
                console.log("wrong Letter Count " + wrongLetter)

            }
        }
    }

    // On keyDown
    document.onkeydown = (e) => {   
        var x = document.forms["myForm"]["fname"].value.length                                                // User can hold delete to remove incorrect text
        console.log(x + " x value delete")
        // Game Logic--(Removing Wrong Inputs) ---------
        if (e.keyCode > 64 || e.keyCode === 8 || e.keyCode === 32) {
            if (beginGame === false) {     // Run timer only after a valid key press
                timer();
                beginGame = true                                                        // Run timer command once
            }
            // console.log(finalWPM1 + " wordsget");
            if (timertoggle === true) {
                timer2(finalWPM1);
            }
        }
        if (e.keyCode === 8 && wrongLetter != 0) {                                  // User's input is (Delete) and the wrong letter counter is greater than Zero
            wrongLetter--;                                                          // Every delete input decreases number

            // CSS style changes
            if (arrPhrase[(curLetter) + wrongLetter] != ' ') {                      // If the previous current letter was supposed to be a space; in the intended type string
                // Change previous letter input text color
                document.getElementById("L" + (curLetter + (wrongLetter))).style.color = 'pink';
            }
        } else if (e.keyCode === 8 && wrongLetter == 0 && document.getElementById("word" + curWord).childElementCount > 0 && x > 0) {
            bb--;
            bbtog = true;
            console.log("abc " + bb)
            document.getElementById("L" + (curLetter)).style.color = 'black';
            wrongLetterbool = true;
        }


    }

    // Script performance run timer - End
    var t1 = performance.now()
    console.log('script to ' + (t1 - t0) + ' milliseconds to run');

})