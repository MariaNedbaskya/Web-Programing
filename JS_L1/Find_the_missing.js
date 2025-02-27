function findMissing(arr) {  
    const n = arr.length;  
    const d = (arr[arr.length - 1] - arr[0]) / n;  
    for (let i = 1; i < n; i++) {  
        if (arr[i] - arr[i - 1] !== d) {   
            return arr[i - 1] + d;  
        }  
    }  
}  
const result = findMissing([1, 3, 5, 9, 11]);  
console.log(result); 