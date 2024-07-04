class Node {
    constructor(key, value, next = null) {
        this.key = key;
        this.value = value;
        this.next = next;
    }
}

class HashMap {
    constructor(capacity = 16, loadFactor = 0.75) {
        this.capacity = capacity;
        this.loadFactor = loadFactor;
        this.buckets = Array.from({length: this.capacity}, () => null);
        this.length = 0;
    }

    // takes a key and produces a hash code with it
    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
            hashCode = hashCode % this.capacity;
        }

        return hashCode;
    }

    // Takes a key and a value that is assigned to this key. If a key
    // already exists, then the old value is overwritten.
    set(key, value) {
        let hashCode = this.hash(key);
        
        if (((this.length + 1) / this.capacity) > this.loadFactor) {
            const entries = this.entries();

            this.clear();
            this.capacity *= 2;
            this.buckets = Array.from({length: this.capacity}, () => null);

            for (let i = 0; i < entries.length; i++) {
                this.set(entries[i][0], entries[i][1]);
            }
        }

        if (!this.buckets[hashCode]) {
            // Create node in empty bucket
            this.buckets[hashCode] = new Node(key, value);
            this.length++;
        } else {
            let headNode = this.buckets[hashCode];
            while (headNode.next !== null) {
                // key already exists, old value is overwritten
                if (headNode.key === key) headNode.value = value;
                break;
            }
            // new node appended to bucket
            headNode.next = new Node(key, value);
            this.length++;
        }
    }

    get(key) {
        if (!this.has(key)) return null;

        let headNode = this.buckets[this.hash(key)];
        while (headNode) {
            if (headNode.key === key) return headNode;
        }
    }

    has(key) {
        let hashCode = this.hash(key);
        if (!this.buckets[hashCode]) return false;

        let headNode = this.buckets[hashCode];
        while (headNode) {
            if (headNode.key === key) return true;
            headNode = headNode.next;
        }
        return false;
    }

    remove(key) {
        if (!this.has(key)) return false;

        let hashCode = this.hash(key);
        let headNode = this.buckets[hashCode];

        let temp = null;
        while (headNode) {
            if (headNode.key == key) {
                // if key is found at head of linked list
                if (temp === null) {
                    this.buckets[hashCode] = headNode.next; 
                } 
                // if key is found at any other position of linked list
                else {
                    temp.next = headNode.next;
                }
            }
            temp = headNode;
            headNode = headNode.next;
        }
        this.length--;
    }

    clear() {
        this.buckets = Array.from({length: this.capacity}, () => null)
    }

    keys() {
        const result = [];

        const entries = this.entries();
        entries.forEach((entry) => result.push(entry[0]));

        return result;
    }

    values() {
        const result = [];

        const entries = this.entries();
        entries.forEach((entry) => result.push(entry[1]));

        return result;
    }

    entries() {
        const result = [];
        for (let i = 0; i < this.buckets.length; i++) {
            let headNode = this.buckets[i];
            while (headNode) {
                result.push([headNode.key, headNode.value]);
                headNode = headNode.next;
            }
        }
        return result;
    }
}


const test = new HashMap();

test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')