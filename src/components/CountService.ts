import { syllable } from "syllable";

export function countChars(str: string) {
    return str.length;
}

export function countLines(str: string) {
    if (str.length === 0) {
        return 0;
    }
    return str.split("\n").length;
}

export function countPages(str: string) {
    const numWords = countWords(str);
    return numWords % 500
}

export function countSentences(str: string) {
    if (str.length === 0) {
        return 0;
    }
    return str.split(".").length;
}

export function countSyllables(str: string) {
    return syllable(str);
}

export function countWords(str: string) {
    if (str.length === 0) {
        return 0;
    }
    const token_arr = str.split(" ").map((str: string) => {
        const punctuation = /[.,?!]/g;
        const newStr = str.replace(punctuation, "");
        return newStr.split("\n");
    });
    let count = 0;
    for (const val of token_arr) {
        if (val.length === 1) {
            count += 1;
        } else if (val.length > 1) {
            for (const elem of val) {
                if (elem != "") {
                    count += 1
                }
            }
        }
    }
    return count;
}