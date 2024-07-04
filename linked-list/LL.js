const LinkedList = () => {
    let listSize = 0;
    let listHead = null;

    function append(value) {
        let newNode = Node();
        newNode.value = value;

        if (listSize !== 0) {
            let currentTail = tail();
            currentTail.nextNode = newNode;
        } else {
            listHead = newNode;
        }
        

        listSize++;
    }

    function prepend(value) {
        let currentHead = head();

        let newNode = Node();
        newNode.value = value;
        newNode.nextNode = currentHead;

        listHead = newNode;

        listSize++;
    }

    function size() {
        return listSize;
    }

    function head() {
        return listHead;
    }

    function tail() {
        let current = head();

        while (current.nextNode !== null) {
            current = current.nextNode;
        }

        return current;
    }

    function at(index) {
        if (index > size()) return console.log('Index stated is larger than list size');

        let current = head();

        for (let i = 0; i < index; i++) {
            current = current.nextNode;
        }

        return current;
    }

    function pop() {
        if (listSize <= 0) return console.log('List is empty');

        let prev, current = head();

        while (current.nextNode !== null) {
            prev = current;
            current = current.nextNode;
        }

        prev.nextNode = null;

        listSize--;
    }

    function find(value) {
        let index = 0;
        let current = head();

        while (current.nextNode !== null) {
            if (current.value === value) return index;
            index++;
            current = current.nextNode;
        }

        return null;
    }

    function contains(value) {
        if (find(value) === null) return false;
        return true;
    }

    function toString() {
        let current = head()

        let text = '';

        while (current.nextNode !== null) {
            text += `( ${current.value} ) -> `;
            current = current.nextNode;
        }
        
        text += `( ${current.value} ) -> null`;

        console.log(text);
    }

    function insertAt(value, index) {
        if (index > listSize) return console.log('Index stated is larger than list size');
        let prev, current = head();

        while (index > 0) {
            prev = current;
            current = current.nextNode;
            index--;
        }

        let newNode = Node();
        newNode.value = value;
        newNode.nextNode = prev.nextNode;

        prev.nextNode = newNode;
        listSize++;
    }

    function removeAt(index) {
        if (index > listSize) return console.log('Index stated is larger than list size');
        
        let prev, current = head();
        let i = 0;

        if (index === 0) {
            listHead = current.nextNode;
            listSize--;
            return;
        }

        while (index > 0) {
            prev = current;
            current = current.nextNode;
            index--;
        }

        prev.nextNode = current.nextNode;
        listSize--;

    }

    return { 
        append, 
        prepend, 
        size, 
        head, 
        tail, 
        at, 
        pop, 
        find,
        contains,
        toString,
        insertAt,
        removeAt
    }
}

const Node = () => {
    let value = null;
    let nextNode = null;
    return { value, nextNode }
}


const ll = LinkedList();
ll.append(1);
ll.append(5);
ll.append(3);
ll.toString();

export default LinkedList;