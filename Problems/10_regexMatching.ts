//https://leetcode.com/problems/regular-expression-matching/submissions/

function isMatch(s: string, p: string): boolean {
    //go through p, and check if s is matching, repeat until you find something wrong
    const regex = p;
    const test = s.split(''); //convert to list to make easy modifications

    let i = 1;
    while (i != regex.length) {
        const lastLetter = regex[i - 1];
        const letter = regex[i];
        const testLetter = test[0];
        if (testLetter == undefined) {
            break; //finished checking
        }

        let failed = true;
        let extraInfo = "";

        if (letter == test[0]) {
            failed = false;
        }
        else if (letter == "*" && (lastLetter == testLetter || lastLetter == ".")) {
            failed = false;
        }
        else if (letter == ".") {
            failed = false;
        }

        if (letter == "*" && !(lastLetter == testLetter || lastLetter == ".")) {
            //s = 'aab', p = 'c*a*b*'
            failed = false;
            extraInfo = "nothingWildcard";
        }

        if (failed == true) {
            return false;
        }

        if (letter != "*") {
            if (extraInfo != "nothingWildcard") {
                i += 1;
            }
        }
        test.splice(0, 1);
    }

    if (test.length == 0) {
        return true;
    }
    else {
        return false; //regex was not enough to cover text
    }
};

//May try later, only have 169/353 matches, I believe I have got upto 352/353 before (in python - time limit), however this problem seems to be very complicated