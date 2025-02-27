function canExpressAsSumOfCubes(n) {  
    const cubeSums = {};  
    for (let a = 1; a < Math.cbrt(n) + 1; a++) {  
        for (let b = a + 1; b < Math.cbrt(n) + 1; b++) {  
            const sum = Math.pow(a, 3) + Math.pow(b, 3);  
            if (sum > n) break;  

            if (sum === n) {  
                const pair = [a, b];  
                const key = pair.sort((x, y) => x - y).join(',');  
                if (!cubeSums[key]) {  
                    cubeSums[key] = pair;  
                }  
            }  
        }  
    }  
    const uniquePairs = Object.keys(cubeSums);  
    if (uniquePairs.length >= 2) {  
        const usedNumbers = new Set();  
        for (const key of uniquePairs) {  
            const [x, y] = key.split(',').map(Number);  
            usedNumbers.add(x);  
            usedNumbers.add(y);  
        }  
        return usedNumbers.size === uniquePairs.length * 2;
    }  
    return false;  
}  
console.log(canExpressAsSumOfCubes(1729)); 
console.log(canExpressAsSumOfCubes(42));  