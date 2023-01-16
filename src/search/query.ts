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
    queryWords: Trie;
    queryEWords: Trie;
    queryMappedWords: Trie;
    queryTransliteratedWords: Trie;
    queryTransliteratedMappedWords: Trie;
}

export default class Query {
    query: string;
    queryWordsVariants: IWordVariations;

    constructor(text: string = '') {
        this.query = '';

        this.queryWordsVariants = { queryWords: new Trie() , queryMappedWords: new Trie(), queryEWords: new Trie(), queryTransliteratedWords: new Trie(), queryTransliteratedMappedWords: new Trie() };
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

    update(text: string = '') : boolean {
        if (text !== this.query) {
            this.query = normalize(text);
            this.queryWordsVariants = { queryWords: new Trie(), queryMappedWords: new Trie(), queryEWords: new Trie(), queryTransliteratedWords: new Trie(), queryTransliteratedMappedWords: new Trie() };
            if (this.query.length > 2) {
                this.query.split(allowedMappedChars)
                .filter(Boolean)
                .forEach(queryWord => {
                    const mapped = mapKeys(queryWord).toLowerCase();

                    this.queryWordsVariants.queryTransliteratedMappedWords.insert(transliterate(mapped));
                    this.queryWordsVariants.queryMappedWords.insert(mapped);
                })
            }

            this.query.split(allowedChars)
            .filter(Boolean)
            .forEach(queryWord => {
                this.queryWordsVariants.queryWords.insert(queryWord);
                this.queryWordsVariants.queryEWords.insert(queryWord.replace(eRegular, eReplace));
                this.queryWordsVariants.queryTransliteratedWords.insert(transliterate(queryWord));
            });

            return true;
        }

        return false;
    }

    // applySearch(target: string) : IMatch {
    //     return { matches: [], weight: 0, queryWord: '', matchesRanges: [] };
    // }

    scoringSort() {

    }
}