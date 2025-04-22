const fs = require('fs').promises;
const path = require('path');

const DB_PATH = path.join(__dirname, './db.json');

let data = null;

const loadData = async () => {
  if (data === null) {
    try {
      const fileContent = await fs.readFile(DB_PATH, 'utf-8');
      data = JSON.parse(fileContent);
    } catch (error) {
      data = { medicines: [], orders: [] };
      await saveData();
    }
  }
  return data;
};

const saveData = async () => {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
};

const getData = async (path) => {
  await loadData();
  const pathParts = path.split('/').filter(p => p);
  let current = data;
  
  for (const part of pathParts) {
    if (current[part] === undefined) {
      throw new Error(`Path ${path} not found in database`);
    }
    current = current[part];
  }
  
  return current;
};

const saveDataAtPath = async (path, newData) => {
  await loadData();
  const pathParts = path.split('/').filter(p => p);
  let current = data;
  
  for (let i = 0; i < pathParts.length - 1; i++) {
    const part = pathParts[i];
    if (current[part] === undefined) {
      current[part] = {};
    }
    current = current[part];
  }
  
  current[pathParts[pathParts.length - 1]] = newData;
  await saveData();
};

module.exports = {
  getData,
  saveData,
  saveDataAtPath
};