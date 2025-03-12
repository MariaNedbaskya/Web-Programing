const fs = require('fs');
const path = require('path');

function cleanFileSync(filePath) {
    let data = fs.readFileSync(filePath, 'utf8');
    data = data.replace(/\d+/g, ''); 
    data = data.toLowerCase(); 
    fs.writeFileSync(filePath, data);
    console.log(`Файл ${filePath} очищен от шума.`);
}

function cleanFileAsync(filePath, callback) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return callback(err);
        data = data.replace(/\d+/g, '');
        data = data.toLowerCase();
        fs.writeFile(filePath, data, (err) => {
            if (err) return callback(err);
            console.log(`Файл ${filePath} очищен от шума.`);
            callback(null);
        });
    });
}

module.exports = {
    cleanFileSync,
    cleanFileAsync
};