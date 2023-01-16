export function unique(arr: any[]) {
    return Array.from(new Set(arr));
}

export function normalize(str: string) {
    return (str || '').trim().toLowerCase();
}

export function asciiToUpper(ch: number): number {
    return ch >= 97 && ch <= 122 ? ch & ~32 : ch;
}

export function reverse(obj: Record<any, any>) {
    const result: any = {};
    Object.keys(obj).forEach(key => {
        if (Array.isArray(obj[key])) {
            obj[key].forEach((value: any) => {
                result[value] = (result[value] || []).concat(key);
            });
        } else {
            result[obj[key]] = key;
        }
    });
    return result;
}

