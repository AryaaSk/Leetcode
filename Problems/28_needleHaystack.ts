function strStr(haystack: string, needle: string): number {
    //look through haystack, create new string each time and use StartsWith() function
    let index = -1;

    for (let i = 0; i != haystack.length; i += 1) {
        const substring = haystack.substring(i, haystack.length);
        
        if (substring.startsWith(needle)) {
            index = i;
            break;
        }
    }

    return index;
};