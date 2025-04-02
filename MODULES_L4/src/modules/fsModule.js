const fs = require('fs').promises;
const path = require('path');

async function createDirectory(dirPath) {
  try {
    await fs.mkdir(dirPath, { recursive: true });
    return true;
  } catch (error) {
    console.error(`Error creating directory ${dirPath}:`, error);
    return false;
  }
}

async function createFile(filePath, content = '') {
  try {
    await fs.writeFile(filePath, content);
    return true;
  } catch (error) {
    console.error(`Error creating file ${filePath}:`, error);
    return false;
  }
}

async function readFile(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return content;
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return null;
  }
}

async function deleteFile(filePath) {
  try {
    await fs.unlink(filePath);
    return true;
  } catch (error) {
    console.error(`Error deleting file ${filePath}:`, error);
    return false;
  }
}

async function deleteDirectory(dirPath) {
  try {
    await fs.rm(dirPath, { recursive: true });
    return true;
  } catch (error) {
    console.error(`Error deleting directory ${dirPath}:`, error);
    return false;
  }
}

module.exports = {
  createDirectory,
  createFile,
  readFile,
  deleteFile,
  deleteDirectory
};