import { reverse } from "./utils";

/**
 * Действующий ГОСТ 7.79-2000 транслитерации
 */

/* eslint-disable */
const mapping = {
    'q': 'й',
    'w': 'ц',
    'e': 'у',
    'r': 'к',
    't': 'е',
    'y': 'н',
    'u': 'г',
    'i': 'ш',
    'o': 'щ',
    'p': 'з',
    '[': 'х',
    '{': 'Х',
    ']': 'ъ',
    '}': 'Ъ',
    '|': '/',
    '`': 'ё',
    '~': 'Ё',
    'a': 'ф',
    's': 'ы',
    'd': 'в',
    'f': 'а',
    'g': 'п',
    'h': 'р',
    'j': 'о',
    'k': 'л',
    'l': 'д',
    ';': 'ж',
    ':': 'Ж',
    "'": 'э',
    '"': 'Э',
    'z': 'я',
    'x': 'ч',
    'c': 'с',
    'v': 'м',
    'b': 'и',
    'n': 'т',
    'm': 'ь',
    ',': 'б',
    '<': 'Б',
    '.': 'ю',
    '>': 'Ю',
    '@': '"',
    '#': '№',
    '$': ';',
    '^': ':',
    '&': '?',
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
    '6': '6',
    '7': '7',
    '8': '8',
    '9': '9',
    '0': '0'
};
/* eslint-enable */

const fullMapping = Object.assign({}, mapping, reverse(mapping));

export default function (query: string): string {
    if (!query) {
        return query;
    }

    const result: string[] = [];
    const split = query.split('');
    split.forEach(char => {
        result.push(fullMapping[char as keyof typeof fullMapping] || char);
    });

    return result.join('');
}