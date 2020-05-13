

var seconds = 0;
var milli = 0;
var secondss = 0;


// Timer
var x = setInterval(function () {
    milli++;
    seconds++;
    secondss = Math.round(seconds / 10);
    if (milli > 9) { milli = 0; }
    document.getElementById("timer").innerHTML = "Time: " + secondss + "." + milli;
}, 100);

// Create String Array
var phrase = "The quick brown fox jumped over the lazy dog. ";
var arrPhrase = [];
for (var i = 0; i < phrase.length; i++) {
    var _slicePhrase = phrase.slice(i, i + 1);
    arrPhrase[i] = _slicePhrase;
}
console.log("arrphrase  " + arrPhrase);


// On Load Span Setup **************************************
// sCorrect: Correct word answers
// sOne: Correct letter answers within current word
// sTwo: Remaining letters within current word
// sThree: Incorrect letters
// sRemain: Remaining words
var spanControl = 0;
for (var y = 0; y < arrPhrase.length; y++) {
    if (arrPhrase[y] === ' ') {
        spanControl++;
        document.getElementById("sRemain").innerHTML += arrPhrase[y];
    } else if (spanControl > 0) {
        document.getElementById("sRemain").innerHTML += arrPhrase[y];
    } else if (y > 0 && spanControl === 0) {
        document.getElementById("sThree").innerHTML += arrPhrase[y];
    } else if (y === 0 && spanControl === 0) {
        document.getElementById("sTwo").innerHTML += arrPhrase[0];
    }
}

// KeyPress Trigger
var curLetter = 0;
var count = 0;
var count2 = 0;
var letterFlag = false;
var stringOne = document.getElementById("sOne").innerHTML;
var stringTwo = document.getElementById("sTwo").innerHTML;
var stringThree = document.getElementById("sThree").innerHTML;
var stringRemain = document.getElementById("sRemain").innerHTML;

var aaa = 0;
document.onkeydown = (e) => {
    aaa++;
    // console.log("testing " + aaa);
}

document.onkeyup = function (e) {
    var t0 = performance.now()

    console.log(e.keyCode);

    var a = String.fromCharCode(e.keyCode); // Convert Keycode to letter
    console.log(a) // Add shift as requirment for captial 
    var x = document.forms["myForm"]["fname"].value;

    if (e.keyCode > 64 || e.keyCode == 8 || e.keyCode == 16 || e.keyCode == 32) {
        // Interactive ***********************************************
        // If you get the correct Letter 
        if (x[x.length - 1] === arrPhrase[curLetter] && x[curLetter] === arrPhrase[curLetter]) {
            curLetter++;
            // count2 = 0;
            if (arrPhrase[curLetter] === ' ') {
            // if (stringRemain.charAt(0) === ' ') {

                document.getElementById("sCorrect").innerHTML += stringOne;
                stringThree = '';
                // console.log('curletter ' + curLetter)

                for (var v = curLetter; v < arrPhrase.length; v++) {
                    if (arrPhrase[v] === ' ' && count > 1) {
                        stringRemain = stringRemain.substring(count);
                        console.log(stringRemain + " loop thing stringremain")
                        console.log(count + " loop count stringremain")
                        count = 0;
                        break;
                    } else {
                        count++;
                        stringThree += arrPhrase[v];
                        console.log(stringThree + " loop thing stringthree")
                    }
                }
                console.log("running loop")
                if(stringThree.charAt(stringThree.length - 1) == stringRemain.charAt(0))
                {
                    stringRemain = stringRemain.substring(1);
                }


                stringOne = stringTwo.charAt(0);
                stringTwo = stringTwo.substring(1);
                stringTwo = stringThree.charAt(0);
                stringThree = stringThree.substring(1);
                document.getElementById("sOne").innerHTML = stringOne;
                document.getElementById("sTwo").innerHTML = stringTwo;
                document.getElementById("sThree").innerHTML = stringThree;
                document.getElementById("sRemain").innerHTML = stringRemain;


            } else {                                                                        // When typing correct letter and not a new word
                if (count2 === 0) {

                    // stringOne += arrPhrase[stringOne.length]

                    stringOne += stringTwo.charAt(0);
                    stringTwo = stringTwo.substring(1);
                    stringTwo = stringThree.charAt(0);
                    stringThree = stringThree.substring(1);
                    document.getElementById("sOne").innerHTML = stringOne;
                    document.getElementById("sTwo").innerHTML = stringTwo;
                    document.getElementById("sThree").innerHTML = stringThree;
                }
                console.log("correct letter")
            }



            document.getElementById("typearea").style.color = 'green';
            // stringC += arrPhrase[curLetter];
            stringE = phrase.substring(curLetter + 1);


            letterFlag = true;

            // for (var z = 0; z < arrPhrase.length; z++) {
            //     if (arrPhrase[z] === ' ') {
            //         spanControl++;
            //         // document.getElementById("sThree").innerHTML += arrPhrase[z];
            //     } else if (spanControl > 0) {
            //     }
            // }
            console.log("letter flag is True")


            document.getElementById("sTwo").style.backgroundColor = 'transparent'; // Display text in DOM


            // Create time stamp
            if (x[x.length - 1] === " ") {
                var newTimer = document.createElement("h2");
                newTimer.innerHTML = secondss + "." + milli;
                document.body.append(newTimer);
                seconds = 0;
                // document.getElementById("typearea").value = ''; // Come back to
            }
        }

        // When you hit backspace
        else if (e.keyCode === 8 && letterFlag === true) {
            if (curLetter > 0) {
                curLetter--;
                console.log("backspace and letterflag Is True")
            }

            // If you press backspace
            // If you get the incorrect letter
        }


        else if (e.keyCode === 8) {
            if (stringThree.charAt(0) === ' ')
            {
                stringRemain = stringThree + stringRemain;
                console.log("char catch works")
            }
            if (count2 > 1) {
                count2--;


                // stringRemain = stringThree.charAt(stringThree.length - 1) + stringRemain;
                // stringThree = stringThree.substring(0, stringThree.length - 1);
                stringThree = stringTwo.charAt(stringTwo.length - 1) + stringThree;
                stringTwo = stringTwo.substring(0, stringTwo.length - 1);

                if (stringTwo.charAt(stringTwo.length - 1) == ' ') {
                    // console.log("stringThree char 0 is empty string")
                    // console.log(stringThree + " stringThree")
                    stringRemain = stringThree + stringRemain;
                    stringThree = '';
                }

                document.getElementById("sTwo").innerHTML = stringTwo;
                document.getElementById("sThree").innerHTML = stringThree;
                document.getElementById("sRemain").innerHTML = stringRemain;
                // document.getElementById("sThree").innerHTML = stringThree;
                console.log("backspace and count2 is Zero")
                // document.getElementById("sTwo").style.backgroundColor = 'transparent'; // Display text in DOM
            } else if (count2 > 0){
                count2--;
            } 
        }


        else {  // Shift is never an incorrect letter
            if (e.keyCode != 16) { // If key is not shift and incorrect letter
                letterFlag = false;
                console.log("letter flag is False")
                var count3 = 0;
                if (count2 > 0 && count2 <= stringTwo.length) {             // count2 is greater than zero we have to start shifting strings
                    count2++;                                               // track the amount of incorrect keys 
                    stringTwo += stringThree.charAt(0);                     // string2 needs to keep expanding to collect incorrect string keys 
                    stringThree = stringThree.substring(1);                 // string3 needs to keep shrinking as it passes its keys to string2


                    document.getElementById("sTwo").innerHTML = stringTwo;
                    document.getElementById("sThree").innerHTML = stringThree;
                    console.log("wrong letter and count2 is Greater than Zero")


                }

                if (count2 === 0) // If more than one letter failure occurs adjust following span to become red
                {
                    count2++;
                    console.log("wrong letter and count2 is At Zero")
                }
                document.getElementById("sTwo").style.backgroundColor = 'red'; // Display text in DOM

                console.log("wrong letter")
            }
            

            if (stringThree == '') {                                        // if string3 has become empty
                // console.log("string three is empty")

                for (var f = curLetter + stringTwo.length; f < arrPhrase.length; f++) {     // fill string3 with the next word from stringRemain, through loop
                    if (arrPhrase[f] === ' ' && count3 > 1) {                               // if the loop hits a space in the string, break the loop
                        stringRemain = stringRemain.substring(count3);                      // to prevent double text remove stringRemain that is now in string3
                        // console.log(stringRemain + " string remain")
                        count3 = 0;                                                         // reset character count
                        break;
                    } else {
                        count3++;                                                           // track how many characters a word is
                        stringThree += arrPhrase[f];                                        // grab characters from array bank 
                    }
                }
                document.getElementById("sThree").innerHTML = stringThree;
                document.getElementById("sRemain").innerHTML = stringRemain;
                console.log("wrong letter and stringThree is empty")

            }


            document.getElementById("typearea").style.color = 'red';                    // html input change character colors
        }

        if (count2 === 0) {
            document.getElementById("sTwo").style.backgroundColor = 'transparent';          // Display text in DOM
        }

        console.log('')
        console.log('')
        console.log(count2 + "  count2")
        console.log(stringThree + "    string three")
        console.log(arrPhrase[curLetter] + " arrphrase currletter")
        // console.log(document.getElementById("typearea").value + " form")
    }
    var t1 = performance.now()
    console.log('');
    console.log('script to ' + (t1 - t0) + ' milliseconds to run');
}