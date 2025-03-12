const fileUtils = require('./modules/fileUtils');
const dirUtils = require('./modules/dirUtils');
const noiseUtils = require('./modules/noiseUtils');

fileUtils.writeFileSync('./test.txt', 'Hello, World 123!');
fileUtils.readFileSync('./test.txt');
noiseUtils.cleanFileSync('./test.txt');
dirUtils.createDirSync('./new-folder');
dirUtils.listFilesSync(__dirname);