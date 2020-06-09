class time {
    constructor(finalWPM, elementId, boolControl) {
        this.finalWPM = finalWPM;
        this.elementId = elementId;                     // elements innerhtml thats being altered
        this.boolControl = boolControl;
        this.a = 0;
        this.b = 0;
    }

    test() {
        // for (var i = 0; i < 10; i++) {
        //     this.a++;
        //     console.log(this.a);
        // }
        // return this.a;

        return new Promise(resolve => {
            var x = setInterval(() => {
                this.a++;
                console.log(this.a);
                if (this.a > 10) {
                    resolve('shouldnt be here yet');
                    console.log(this.a);
                    clearInterval(x);
                }
            }, 100);
        });
    }
    test2() {

        return new Promise(resolve => {
            var x = setInterval(() => {
                this.b++;
                console.log(this.b);
                if (this.b > 10) {
                    resolve('shouldnt be here yet');
                    console.log(this.b);
                    clearInterval(x);
                }
            }, 100);
        });
    }


    gameTimer() {
        let milli = 0;
        let seconds = 0;
        let secondss = 0;
        var x = setInterval(() => {
            if (milli < 6) {
                // if (this.boolControl === false) {
                this.a++;
                milli++;
                seconds++;
                secondss = Math.round(seconds / 10);
                if (milli > 9) { milli = 0; }
                console.log(this.a + " a");
                // this.elementId.innerHTML = "Time: " + secondss + "." + milli;
            } else {
                this.finalWPM = Math.round((9 / secondss) * 60);                       // Formula to calculate the Words Per Minute type speed
                // let finalWPM = Math.round((curWord / secondss) * 60);                       // Formula to calculate the Words Per Minute type speed
                console.log("final wpm " + this.finalWPM);
                clearInterval(x);
                return 1;
            }
        }, 100)
        // return this.finalWPM;
    }


    endGameTimer(finalWPM) {
        var count = 0;
        var x = setInterval(function () {
            console.log("running still");
            if (count <= finalWPM) {
                count++;
                this.elementId.innerHTML = count;
            } else {
                this.elementId.innerHTML = "Final Time: " + finalWPM + " Words Per Minute";
            }
        }, 50);
    }
}
console.log("opening text");
bb = false;
let b = new time(0, 0, 0);
async function testcall() {
    if (bb === false) {

        console.log("begin");
        const result = await b.test();
        console.log(result + " this is the result");
        bb = true;
    }
    console.log("second")
    const resultt = await b.test2();
    console.log(resultt + " this is the result");
    console.log("finished");
}

testcall();


console.log("closing text");
// let b = new time(0, 0, 0);
// let c = b.gameTimer();
// console.log(c + " c");
// console.log();
// console.log();
// let v = b.test();
// console.log(v + " v");


// function timer() {
//     var seconds = 0;
//     var milli = 0;
//     var secondss = 0;
//     var count = 0;
//     var x = setInterval(function () {
//         if (endGame === false) {
//             milli++;
//             seconds++;
//             secondss = Math.round(seconds / 10);
//             if (milli > 9) { milli = 0; }
//             document.getElementById("timer").innerHTML = "Time: " + secondss + "." + milli;
//         } else {
//             let finalWPM = Math.round((curWord / secondss) * 60);                       // Formula to calculate the Words Per Minute type speed
//             console.log("adadasd")
//             clearInterval(x);
//             return finalWPM;
//             // if (count < finalWPM) {
//             //     count++;
//             //     document.getElementById("timer").innerHTML = count;
//             // } else {
//             //     document.getElementById("timer").innerHTML = "Final Time: " + finalWPM + " Words Per Minute";
//             //     console.log("test");
//             //     clearInterval(x);
//             // return finalWPM;
//             // }
//         }
//     }, 100);
// }