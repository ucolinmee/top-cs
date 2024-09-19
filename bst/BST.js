// NEW EDITS

class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array) {
        this.root = this.buildTree(this.sortAndRemoveDuplicates(array));
    }

    sortAndRemoveDuplicates(array) {
        return array.sort((a, b) => a - b).filter((item, index) => array.indexOf(item) === index);
    }

    buildTree(array, start = 0, end = array.length - 1) {
        if (start > end) return null;
        let mid = Math.floor((start + end) / 2);
        let root = new Node(array[mid]);

        root.left = this.buildTree(array, start, mid - 1);
        root.right = this.buildTree(array, mid + 1, end);

        return root;
    }

    insert(value, node = this.root) {
        if (node === null) return new Node(value);

        if (value < node.value) {
            node.left = this.insert(value, node.left);
        }
        else if (value > node.value) {
            node.right = this.insert(value, node.right);
        }

        return node;
    }

    deleteItem(value, node = this.root) {
        if (node === null) return node;

        if (value < node.value) {
            node.left = this.deleteItem(value, node.left);
        }
        else if (value > node.value) {
            node.right = this.deleteItem(value, node.right);
        }
        else {
            // Found node to be deleted
            if (node.left === null) return node.right;
            else if (node.right === null) return node.left;
            else {
                // Node to be deleted has left and right children
                const successorNode = this.inorderSuccessor(node.right);
                node.value = successorNode.value

                // Delete inorder successor
                node.right = this.deleteItem(successorNode.value, successorNode);
            }
        }
        return node;
    }

    inorderSuccessor(node) {
        while (node.left !== null) {
            node = node.left;
        }
        return node;
    }

    

    find(value, node = this.root) {
        if (node === null) return node;

        if (value < node.value) {
            node = this.find(value, node.left);
        } 
        else if (value > node.value) {
            node = this.find(value, node.right);
        }
        return node;
    }

    levelOrder(callback = null) {
        let queue = [this.root]; 
        let currentNode;
        let result = [];
        
        while (queue.length > 0) {
            currentNode = queue.shift();

            if (!callback) result.push(currentNode.value);
            else callback(currentNode);

            if (currentNode.left) queue.push(currentNode.left);
            if (currentNode.right) queue.push(currentNode.right);
        }

        return result;
    }

    inOrder(callback = null, result = [], node = this.root) {
        if (node === null) return node;

        this.inOrder(callback, result, node.left);

        if (!callback) {
            result.push(node.value);
        } else {
            result.push(callback(node.value));
        }
        
        this.inOrder(callback, result, node.right);
        return result;
    }

    preOrder(callback = null, result = [], node = this.root) {
        if (node === null) return node;

        if (!callback) {
            result.push(node.value);
        } else {
            result.push(callback(node.value));
        }

        this.preOrder(callback, result, node.left);
        this.preOrder(callback, result, node.right);
        return result;
    }

    postOrder(callback = null, result = [], node = this.root) {
        if (node === null) return node;

        this.postOrder(callback, result, node.left);
        this.postOrder(callback, result, node.right);

        if (!callback) {
            result.push(node.value);
        } else {
            result.push(callback(node.value));
        }

        return result;
    }

    height(value, current = this.find(value)) {
        if (current === null) return -1;

        let leftHeight = this.height(value, current.left);
        let rightHeight = this.height(value, current.right);
        let ans = Math.max(leftHeight, rightHeight) + 1;

        return ans;
    }

    depth(value) {
        if (!this.find(value)) return null;

        let currentNode = this.root;
        let count = 0;

        while (currentNode) {
            if (currentNode.value === value) return count;
            else {
                count++;
                if (value < currentNode.value) currentNode = currentNode.left;
                else currentNode = currentNode.right; 
            }
        }
        return null;
    }

    isBalanced() {
        let queue = [this.root];

        while (queue.length !== 0) {
            let currentNode = queue.shift();
            if (currentNode.left && currentNode.right) {
                let leftHeight = this.height(currentNode.left.value);
                let rightHeight = this.height(currentNode.right.value);
                if (Math.abs(leftHeight - rightHeight) > 1) return false;
            }

            if (currentNode.left) queue.push(currentNode.left);
            if (currentNode.right) queue.push(currentNode.right);
        }

        return true;
    }

    rebalance() {
        let treeArr = this.inOrder();
        treeArr = this.sortAndRemoveDuplicates(treeArr);
        this.root = this.buildTree(treeArr);

    }

    prettyPrint(node = this.root, prefix = "", isLeft = true) {
        if (node === null) {
            return;
          }
          if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
          }
          console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
          if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
          } 
    }

}

function getRandomNumbers(quantity) {
    result = [];
    for (let i = 0; i < quantity; i++) {
        result.push(Math.round(Math.random() * 100));
    }

    return result;
}

const tree = new Tree(getRandomNumbers(30));
// tree.prettyPrint();

console.log('Balanced: ', tree.isBalanced());
console.log('Pre order: ', tree.preOrder());
console.log('In order: ', tree.inOrder());
console.log('Post order: ', tree.postOrder());
console.log('Level order: ', tree.levelOrder());

console.log('Inserting values > 100...');
tree.insert(101);
tree.insert(153);
tree.insert(293);
tree.insert(123);
tree.insert(199);
console.log('Balanced: ', tree.isBalanced());

console.log('Rebalancing tree...');
tree.rebalance();
// tree.prettyPrint();

console.log('Balanced: ', tree.isBalanced());
console.log('Pre order: ', tree.preOrder());
console.log('In order: ', tree.inOrder());
console.log('Post order: ', tree.postOrder());
console.log('Level order: ', tree.levelOrder());
