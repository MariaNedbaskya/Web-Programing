const fs = require('fs');
const path = require('path');

function writeFileSync(filePath, data) {
    fs.writeFileSync(filePath, data);
    console.log(`Файл ${filePath} успешно записан.`);
}

function writeFileAsync(filePath, data, callback) {
    fs.writeFile(filePath, data, (err) => {
        if (err) return callback(err);
        console.log(`Файл ${filePath} успешно записан.`);
        callback(null);
    });
}

function readFileSync(filePath) {
    const data = fs.readFileSync(filePath, 'utf8');
    console.log(`Данные из файла ${filePath}:`, data);
    return data;
}

function readFileAsync(filePath, callback) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return callback(err);
        console.log(`Данные из файла ${filePath}:`, data);
        callback(null, data);
    });
}

function updateFileSync(filePath, newData) {
    fs.writeFileSync(filePath, newData);
    console.log(`Файл ${filePath} успешно обновлен.`);
}

function updateFileAsync(filePath, newData, callback) {
    fs.writeFile(filePath, newData, (err) => {
        if (err) return callback(err);
        console.log(`Файл ${filePath} успешно обновлен.`);
        callback(null);
    });
}

function clearFileSync(filePath) {
    fs.writeFileSync(filePath, '');
    console.log(`Файл ${filePath} успешно очищен.`);
}

function clearFileAsync(filePath, callback) {
    fs.writeFile(filePath, '', (err) => {
        if (err) return callback(err);
        console.log(`Файл ${filePath} успешно очищен.`);
        callback(null);
    });
}

function copyFileSync(sourcePath, targetPath) {
    fs.copyFileSync(sourcePath, targetPath);
    console.log(`Файл скопирован из ${sourcePath} в ${targetPath}.`);
}

function copyFileAsync(sourcePath, targetPath, callback) {
    fs.copyFile(sourcePath, targetPath, (err) => {
        if (err) return callback(err);
        console.log(`Файл скопирован из ${sourcePath} в ${targetPath}.`);
        callback(null);
    });
}

module.exports = {
    writeFileSync,
    writeFileAsync,
    readFileSync,
    readFileAsync,
    updateFileSync,
    updateFileAsync,
    clearFileSync,
    clearFileAsync,
    copyFileSync,
    copyFileAsync
};