function whatCentury(year) {  
    const century = Math.ceil(year / 100);  
    const suffix = (century % 100 >= 11 && century % 100 <= 13)   
        ? 'th'  
        : ['th', 'st', 'nd', 'rd'][century % 10] || 'th';  

    return `${century}${suffix}`;  
}  
console.log(whatCentury("1999")); 
console.log(whatCentury("2011")); 
console.log(whatCentury("2154")); 
console.log(whatCentury("2259")); 
console.log(whatCentury("1124")); 
console.log(whatCentury("2000"));  
module.exports = whatCentury;