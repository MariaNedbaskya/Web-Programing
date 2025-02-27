function domainName(url) {  
    const cleanUrl = url.replace(/^(https?:\/\/)?(www\.)?/, '');  
    const domainWithTld = cleanUrl.split(/[\/\.]/)[0];  

    return domainWithTld;
}  
console.log(domainName("http://github.com/carbonfive/raygun")); 
console.log(domainName("http://www.zombie-bites.com"));        
console.log(domainName("https://www.cnet.com"));   