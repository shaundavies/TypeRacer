import {setText, selectPhrase} from '/expoTypePhrases.js'

var a = setText();
var b = selectPhrase(a);

console.log(localStorage.getItem("lastPhrase") + " this was the last phrase ahahahaah");
if (typeof(Storage) !== "undefined") {
    localStorage.setItem("lastPhrase", b);
} else {
    localStorage.setItem("lastPhrase", "null");
}
console.log(b[0]);
console.log(b);


console.log("testing is above")

function test() {
    return 'a';
}

var z = test();
console.log(z);


console.log('aa')