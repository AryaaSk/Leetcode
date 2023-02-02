function longestCommonPrefix(strs: string[]): string {
    const prefixMap: { [k: string] : number } = {};

    for (const str of strs) {
        //Generate all possible prefixes from this string
        for (let i = 1; i != str.length + 1; i += 1) {
            const prefix = str.substring(0, i);
            if (prefixMap[prefix] == undefined) {
                prefixMap[prefix] = 1;
            }
            else {
                prefixMap[prefix] += 1;
            }
        }
    }

    //Want a prefix which is common among all the elements in array, therefore filter out prefixMap
    const highestPrefix = { prefix: "", length: 0 };
    for (const key in prefixMap) {
        if (prefixMap[key] == strs.length) {
            const prefix = key;
            if (prefix.length > highestPrefix.length) {
                highestPrefix.prefix = prefix;
                highestPrefix.length = prefix.length;
            }
        }
    }

    return highestPrefix.prefix;
};