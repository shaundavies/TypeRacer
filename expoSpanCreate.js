    // Invoke the span elements for each word and space
    export function wordSpanCreate(arrPhrase) {
        let count = 0;
        var spanDump = document.getElementById('highlight')
        for (let i = 0; i < arrPhrase.length; i++) {
            let temp = document.createElement('span');
            let temp2 = document.createElement('span');
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
    // wordSpanCreate();


    // Invoke the span elements for each letter
    export function letterSpanCreate(arrPhrase) {
        let count = 1;
        console.log(spanDump + ' spandump')
        for (let i = 0; i < arrPhrase.length; i++) {
            var spanDump = document.getElementById('word' + count)
            if (arrPhrase[i] != ' ') {
                let temp = document.createElement('span');
                temp.setAttribute("id", 'L' + i);
                temp.innerHTML = arrPhrase[i];
                spanDump.appendChild(temp);

            } else {
                count++;
            }
        }
    }
    // letterSpanCreate();