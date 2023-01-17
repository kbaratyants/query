import Trie from "./tree";
import { normalize } from "./utils";
import mapKeys from "./keyboard-mapping";
import { transliterate } from "./transliterate";

// Символы сравнения
const allowedChars = /[^0-9A-Za-zА-Яа-яЁё@]/g;
const allowedMappedChars = /[^0-9A-Za-zА-Яа-яЁё><;',><.:"@}{[\]]/g;

// поддерживаем букву ё
const eRegular = /ё/g;
const eReplace = 'е';

// interface IMatch {
//     matches: string[];
//     weight: number;
//     queryWord: string;
//     matchesRanges: number[];
// }

interface IWordVariations {
    words: Trie;
    eWords: Trie;
    mappedWords: Trie;
    transliteratedWords: Trie;
    transliteratedMappedWords: Trie;
}

export default class Query {
    query: string;
    queryWordsVariants: IWordVariations;

    constructor(text: string = '') {
        this.query = '';

        this.queryWordsVariants = { words: new Trie() , mappedWords: new Trie(), eWords: new Trie(), transliteratedWords: new Trie(), transliteratedMappedWords: new Trie() };
        this.update(text);
    }

    get IsEmpty() : boolean {
        return !this.query;
    }

    getWordMatch() {
    }

    // getMatch(string: string) { 
    // Обход IWordVariants и поиск совпадений
    // }

    // findMatches(queries: string[]) : IMatch {
    //     return { matches: [], weight: 0, queryWord: '', matchesRanges: [] };
    // }

    // Для теста
    transliterate(word: string) {
        return transliterate(word);
    }

    update(text: string = '') : boolean {
        if (text !== this.query) {
            this.query = normalize(text);
            this.queryWordsVariants = { words: new Trie() , mappedWords: new Trie(), eWords: new Trie(), transliteratedWords: new Trie(), transliteratedMappedWords: new Trie() };
            if (this.query.length > 2) {
                this.query.split(allowedMappedChars)
                .filter(Boolean)
                .forEach(queryWord => {
                    const mapped = mapKeys(queryWord).toLowerCase();

                    transliterate(mapped).forEach((item: string) => this.queryWordsVariants.transliteratedMappedWords.insert(item));
                    this.queryWordsVariants.mappedWords.insert(mapped);
                })
            }

            this.query.split(allowedChars)
            .filter(Boolean)
            .forEach(queryWord => {
                this.queryWordsVariants.words.insert(queryWord);
                this.queryWordsVariants.eWords.insert(queryWord.replace(eRegular, eReplace));
                transliterate(queryWord).forEach((item: string) => this.queryWordsVariants.transliteratedWords.insert(item));
            });

            return true;
        }

        return false;
    }

    // applySearch(target: string) : IMatch {
    //     return { matches: [], weight: 0, queryWord: '', matchesRanges: [] };
    // }

    // scoringSort() {

    // }
}