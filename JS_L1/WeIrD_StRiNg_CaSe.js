function toWeirdCase(str) {  
    return str.split(' ').map(word => {  
        return Array.from(word).map((char, index) => {  
            return index % 2 === 0 ? char.toUpperCase() : char.toLowerCase();  
        }).join('');  
    }).join(' ');  
}  
console.log(toWeirdCase("String"));
console.log(toWeirdCase("Weird string case")); 