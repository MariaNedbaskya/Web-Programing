require('dotenv').config();

const firstName = process.env.FIRST_NAME;
const lastName = process.env.LAST_NAME;
const groupNumber = process.env.GROUP_NUMBER;
const listNumber = process.env.LIST_NUMBER;

console.log(`Имя: ${firstName}`);
console.log(`Фамилия: ${lastName}`);
console.log(`Номер группы: ${groupNumber}`);
console.log(`Номер по списку: ${listNumber}`);

const osFunctions = require('./os/index');

const mode = process.env.MODE;

if (mode === 'admin') {
    const osInfo = osFunctions.getOSInfo();
    console.log('Информация о ОС:', osInfo);

    const isMemoryEnough = osFunctions.checkFreeMemory();
    console.log('Свободной памяти больше 4GB:', isMemoryEnough);
} else {
    console.log('Доступ запрещен. Требуется режим admin.');
}