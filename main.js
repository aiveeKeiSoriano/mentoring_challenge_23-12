const fs = require("fs");

function getSuggestions(keyStrokes, validWords, keyMap, createdWord) {
    if (keyStrokes.includes("1")) return [];
    if (!keyStrokes) {
        if (validWords.includes(createdWord)) return [createdWord]
        else return [];
    }
    const firstLetter = keyStrokes[0];
    const suggestions = []
    keyMap[firstLetter].forEach((choice) => {
        let result = getSuggestions(
            keyStrokes.substr(1),
            validWords,
            keyMap,
            createdWord + choice
        )
        suggestions.push(...result);
    });

    return suggestions;
}

function keypadToWords(keyStrokes) {

    const data = fs.readFileSync("english_words.txt", "utf8");
    const validWords = data.split("\n")

    const keyMap = {
        2: ["a", "b", "c"],
        3: ["d", "e", "f"],
        4: ["g", "h", "i"],
        5: ["j", "k", "l"],
        6: ["m", "n", "o"],
        7: ["p", "q", "r", "s"],
        8: ["t", "u", "v"],
        9: ["w", "x", "y", "z"],
    };

    return getSuggestions(keyStrokes, validWords, keyMap, '');
}

console.log(keypadToWords("6463"));
