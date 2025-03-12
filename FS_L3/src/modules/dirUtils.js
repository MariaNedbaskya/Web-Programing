const fs = require('fs');
const path = require('path');
function createDirSync(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`Папка ${dirPath} успешно создана.`);
    } else {
        console.log(`Папка ${dirPath} уже существует.`);
    }
}

function createDirAsync(dirPath, callback) {
    fs.mkdir(dirPath, { recursive: true }, (err) => {
        if (err) return callback(err);
        console.log(`Папка ${dirPath} успешно создана.`);
        callback(null);
    });
}

function removeDirSync(dirPath) {
    if (fs.existsSync(dirPath)) {
        fs.rmdirSync(dirPath, { recursive: true });
        console.log(`Папка ${dirPath} успешно удалена.`);
    } else {
        console.log(`Папка ${dirPath} не существует.`);
    }
}

function removeDirAsync(dirPath, callback) {
    fs.rm(dirPath, { recursive: true }, (err) => {
        if (err) return callback(err);
        console.log(`Папка ${dirPath} успешно удалена.`);
        callback(null);
    });
}

function listFilesSync(basePath) {
    const ignoreList = ['node_modules', '.git', '.env', '.gitignore'];
    const files = [];

    function walk(dir) {
        const items = fs.readdirSync(dir);
        for (const item of items) {
            const fullPath = path.join(dir, item);
            const stat = fs.statSync(fullPath);
            if (stat.isDirectory() && !ignoreList.includes(item)) {
                walk(fullPath);
            } else if (stat.isFile() && !ignoreList.includes(item)) {
                files.push(fullPath);
            }
        }
    }

    walk(basePath);
    console.log('Список файлов:', files);
    return files;
}

function listFilesAsync(basePath, callback) {
    const ignoreList = ['node_modules', '.git', '.env', '.gitignore'];
    const files = [];

    function walk(dir, done) {
        fs.readdir(dir, (err, items) => {
            if (err) return done(err);
            let pending = items.length;
            if (!pending) return done(null);

            items.forEach((item) => {
                const fullPath = path.join(dir, item);
                fs.stat(fullPath, (err, stat) => {
                    if (err) return done(err);
                    if (stat.isDirectory() && !ignoreList.includes(item)) {
                        walk(fullPath, done);
                    } else if (stat.isFile() && !ignoreList.includes(item)) {
                        files.push(fullPath);
                    }
                    if (!--pending) done(null);
                });
            });
        });
    }

    walk(basePath, (err) => {
        if (err) return callback(err);
        console.log('Список файлов:', files);
        callback(null, files);
    });
}

function clearProjectSync(basePath) {
    const ignoreList = ['node_modules', '.git', '.env', '.gitignore'];
    const files = listFilesSync(basePath);

    files.forEach((file) => {
        fs.unlinkSync(file);
        console.log(`Файл ${file} удален.`);
    });

    console.log('Все файлы и папки удалены, кроме служебных.');
}

function clearProjectAsync(basePath, callback) {
    const ignoreList = ['node_modules', '.git', '.env', '.gitignore'];

    listFilesAsync(basePath, (err, files) => {
        if (err) return callback(err);

        let pending = files.length;
        if (!pending) return callback(null);

        files.forEach((file) => {
            fs.unlink(file, (err) => {
                if (err) return callback(err);
                console.log(`Файл ${file} удален.`);
                if (!--pending) callback(null);
            });
        });
    });
}

module.exports = {
    createDirSync,
    createDirAsync,
    removeDirSync,
    removeDirAsync,
    listFilesSync,
    listFilesAsync,
    clearProjectSync,
    clearProjectAsync
};