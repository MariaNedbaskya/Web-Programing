const os = require('os');

function getOSInfo() {
    return {
        platform: os.platform(),
        freeMemory: os.freemem(),
        totalMemory: os.totalmem(),
        homeDir: os.homedir(),
        hostname: os.hostname(),
        networkInterfaces: os.networkInterfaces()
    };
}

function checkFreeMemory() {
    const freeMemoryGB = os.freemem() / (1024 * 1024 * 1024);
    return freeMemoryGB > 4;
}

module.exports = {
    getOSInfo,
    checkFreeMemory
};