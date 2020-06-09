// Timer
// All variables located on main javascript page
export function _timer(finalWPM1, timertoggle, curWord, endtimer) {
    let milli = 0;
    let seconds = 0;
    let secondss = 0;
    var x = setInterval(function () {
        if (endtimer === false) {
            milli++;
            seconds++;
            secondss = Math.round(seconds / 10);
            if (milli > 9) { milli = 0; }
            document.getElementById("timer").innerHTML = "Time: " + secondss + "." + milli;
            console.log("intersting")
        } else {
            console.log("intersting 2")
            finalWPM1 = Math.round((curWord / secondss) * 60);                       // Formula to calculate the Words Per Minute type speed
            clearInterval(x);
            timertoggle = true;
        }
    }, 100);
}

function timer2(finalWPM) {
    let count = 0;
    var time = document.getElementById("timer");
    var x = setInterval(function () {
        if (count <= finalWPM) {
            count++;
            time.innerHTML = count;
        } else {
            time.innerHTML = "Final Time: " + finalWPM + " Words Per Minute";
            clearInterval(x);
        }
    }, 50);
}