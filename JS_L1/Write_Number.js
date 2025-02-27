function expandedForm(num) {  
    return num  
        .toString()  
        .split('')  
        .map((digit, index, arr) => {  
            const placeValue = Math.pow(10, arr.length - index - 1);  
            return digit !== '0' ? digit * placeValue : '';  
        })  
        .filter(part => part !== '') 
        .join(' + ');
}  
console.log(expandedForm(12));
console.log(expandedForm(45));
console.log(expandedForm(70304)); 