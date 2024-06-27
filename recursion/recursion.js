function fibs(num) {
    const fibsArr = [];

    for (let i = 0; i < num; i++) {
        if (i === 0) fibsArr.push(0);
        else if (i === 1) fibsArr.push(1);
        else fibsArr.push(fibsArr[i-1] + fibsArr[i-2]);
    }

    return fibsArr;
}

function fibsRec(num, arr = [0, 1]) {
    if (num === 1) {
        return [0];
    }
    if (num === 2) {
        return arr;
    }
    else {
        arr.push(arr[arr.length - 1] + arr[arr.length - 2]);
        fibsRec(num - 1, arr);
    } 
    return arr;
}

function mergeSort(array) {
    let arrLength = array.length;
    if (arrLength <= 1) return array;

    let mid = Math.floor(arrLength / 2);

    const leftHalf = array.slice(0, mid );
    const rightHalf = array.slice(mid);

    const sortedLeft = mergeSort(leftHalf);
    const sortedRight = mergeSort(rightHalf);
    return merge(sortedLeft, sortedRight);
}

function merge(L, R) {
    let i = 0;
    let j = 0;

    const result = [];

    while (i < L.length && j < R.length) {
        if (L[i] < R[j]) result.push(L[i++]);
        else result.push(R[j++]);
    }

    while (i < L.length) result.push(L[i++]);
    while (j < R.length) result.push(R[j++]);

    return result;
}

const arr1 = [3, 2, 1, 13, 8, 5, 0, 1];
const arr2 = [105, 79, 100, 110]
console.log(mergeSort(arr1));
console.log(mergeSort(arr2));