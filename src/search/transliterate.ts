import { reverse } from './utils';

/**
 * Действующий ГОСТ 7.79-2000 транслитерации
 */

/* eslint-disable */
const mapping = {
    'а': ['a'],
    'б': ['b'],
    'в': ['v'],
    'г': ['g'],
    'д': ['d'],
    'е': ['e'],
    'ё': ['yo', 'e'],
    'ж': ['zh', 'g'],
    'з': ['z'],
    'и': ['i', 'y'],
    'й': ['j', 'y', 'i'],
    'к': ['k'],
    'л': ['l'],
    'м': ['m'],
    'н': ['n'],
    'о': ['o'],
    'п': ['p'],
    'р': ['r'],
    'с': ['s'],
    'т': ['t'],
    'у': ['u'],
    'ф': ['f'],
    'х': ['h', 'x', 'kh'],
    'ц': ['cz', 'c', 'ts'],
    'ч': ['ch', 'c'],
    'ш': ['sh'],
    'щ': ['shh', 'sch'],
    'ъ': ['\'\''],
    'ы': ['y', 'i'],
    'ь': ['\''],
    'э': ['e'],
    'ю': ['yu', 'u', 'ju'],
    'я': ['ya'],
    'ий': ['y'],
    'кс': ['x'],
    'ку': ['q'],
    ',': [','],
    '.': ['.'],
    ';': [';'],
    '\'': ['\''],
    '[': [']'],
    ']': [']'],
    '0': ['0'],
    '1': ['1'],
    '2': ['2'],
    '3': ['3'],
    '4': ['4'],
    '5': ['5'],
    '6': ['6'],
    '7': ['7'],
    '8': ['8'],
    '9': ['9'],

};
/* eslint-enable */

const fullMapping = Object.assign({}, mapping, reverse(mapping));

/**
 * Разложение строки на транслитные вариации (литералы)
 * Пример: Shodn   y   ak Shh   u   ka
 *         |||||   |   || |||   |   ||
 *         сходн [я,й] ак схх [у,ю] ка
 *         | |||   |   || | |   |   ||
 *         ш ---   -   -- ш -   -   --
 *         |||||   |   ||       |   ||
 *         -----   -   -- щ     -   --
 * Дальше символы спускаются в имеющиеся пробелы сверху вниз согласно схеме
 * @param {String} text
 * @return {Array<char>}
 */
export function transliterate(text: string) : any {
    text = text.toLowerCase();

    // Длинна максимального вхождения пример: Sch, shh - щ = 3
    const maxLiteral = 3;
    const result: string[][] = [];
    const margins: number[] = [];
    const copies: number[] = [];
    const textLength = text.length;

    // Инициализируий цикл (maxLiteral итераций)
    for (let i = 0; i < maxLiteral; i++) {
        result[i] = [];
        margins[i] = 0;
        copies[i] = 0;
    }

    for (let strPos = 0; strPos < textLength; strPos++) {
        for (let i = 0; i < maxLiteral; i++) {

            const subStr = text.substr(strPos, i + 1);

            if (fullMapping[subStr as keyof typeof fullMapping] && subStr.length === i + 1) {
                result[i].push(fullMapping[subStr as keyof typeof fullMapping]);
                margins[i] += subStr.length;
            } else {
                for (let deep = 1; deep <= i; deep++) {
                    if (result[i - deep][margins[i]]) {
                        result[i].push(result[i - deep][margins[i]]);
                        margins[i] += margins[i - deep] - margins[i];
                        copies[i]++;
                        break;
                    }
                }
            }
        }
    }

    return result.filter((item: any, index) => copies[index] !== item.length);
}

export function getPermutation(array: any[], prefix = '') {
    if (!array.length) {
        return prefix;
    }

    return array[0].reduce((result: string | any[], value: string): any => {
        return result.concat(getPermutation(array.slice(1), prefix + value));
    }, []);
}