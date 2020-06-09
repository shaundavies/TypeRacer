
export function setText() {
    var textStorage = [
        "The police believe that the 25-year-old driver of the truck killed the people. They suspect him of human being. However, maybe he is an alien afterall and Will Smith has to be called! ",

        "Why are you barking so loud? Bobby asked the dog. The dog looked at Bobby and replied meow. ",

        "The quick brown fox had jumped over the lazy dog. However, little did the fox know, on the otherside of the dog was the end of a balcony. ",

        "Mr. Owl! How many licks does it take to get to the tootsie roll center of a tootsie pop? Let's find out, one ah, two-who, ah three; crunch! ",

        "How fast can you type this phrase, my young typing sensai? One word, two words, three words, your typing to slow. Pick up the pace and snatch the grasshopper from my fist! ",

        "This phrase was randomly selected from a bank of typing phrases. Now realize that there are many to choose from, so if you had to type this phrase more than once; well you are a real one and I appreciate your support! ",

        "Robin Hood could split an arrow in twade. Turn your lover over to his charm and win the Princess Gwyn. Why do you think 'Little John' was so insecure around him? It wasn't the money he was taking. ",

        "If you see a double complete rainbow would you cry? This is now filler text to add more typing to this challenge. Congrats it is now over! "
    ];

    var thePhrase = Math.floor(Math.random() * textStorage.length);
    // console.log("the phrase value  " + thePhrase)
    return textStorage[thePhrase];
}

export function selectPhrase(thephrase) {
    var phrase = thephrase;
    var arrPhrase = [];
    for (var i = 0; i < phrase.length; i++) {
        var _slicePhrase = phrase.slice(i, i + 1);
        arrPhrase[i] = _slicePhrase;
    }
    return arrPhrase;
}
