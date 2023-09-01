//we set a value at a certain time, and then when trying to retrieve we pass in the current time as well.
//we then retrieving, we look for most recent pair which was available at that time

//constraint: all timestamps set are strictly increasing. This means we can store the key-values in a list, and this list will have a strictly increasing timestamp
//this is useful as it allows us to then use binary search within those lists

class TimeMap {
    pairs: { [k: string]: { value: string, timestamp: number }[] } = {};

    constructor() {}

    set(key: string, value: string, timestamp: number): void {
        if (this.pairs[key] == undefined) {
            this.pairs[key] = [{ value: value, timestamp: timestamp }];
        }
        else {
            this.pairs[key].push({ value: value, timestamp: timestamp });
        }
    }

    get(key: string, timestamp: number): string {
        if (this.pairs[key] == undefined) return "";

        const values = this.pairs[key];

        //we are looking for the first timestamp in this array which is <= timestamp
        let [left, right] = [0, values.length- 1];
        while (left < right) {
            const midIndex = (left + right + 1) >> 1;
            const reference = values[midIndex];

            if (reference.timestamp <= timestamp) left = midIndex; //value, so we keep this as a candidate
            else right = midIndex - 1; //all items to right of reference will also be invalid
        }

        if (values[left].timestamp <= timestamp) return values[left].value;
        else return "";
    }
}