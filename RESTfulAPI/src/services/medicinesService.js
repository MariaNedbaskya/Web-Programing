const db = require('../db/db');
const { generateId } = require('../utils/uuid');

const getAll = async () => {
  return db.getData('/medicines');
};

const getById = async (id) => {
  const medicines = await db.getData('/medicines');
  return medicines.find(m => m.id === id);
};

const create = async (medicineData) => {
  const medicines = await db.getData('/medicines');
  const newMedicine = {
    id: generateId(),
    ...medicineData
  };
  medicines.push(newMedicine);
  await db.saveData('/medicines', medicines);
  return newMedicine;
};

const update = async (id, medicineData) => {
  const medicines = await db.getData('/medicines');
  const index = medicines.findIndex(m => m.id === id);
  
  if (index === -1) return null;
  
  const updatedMedicine = {
    ...medicines[index],
    ...medicineData,
    id 
  };
  
  medicines[index] = updatedMedicine;
  await db.saveData('/medicines', medicines);
  return updatedMedicine;
};

const partialUpdate = async (id, medicineData) => {
  const medicines = await db.getData('/medicines');
  const index = medicines.findIndex(m => m.id === id);
  
  if (index === -1) return null;
  
  const updatedMedicine = {
    ...medicines[index],
    ...medicineData
  };

  updatedMedicine.id = medicines[index].id;
  
  medicines[index] = updatedMedicine;
  await db.saveData('/medicines', medicines);
  return updatedMedicine;
};

const deleteMedicine = async (id) => {
  const medicines = await db.getData('/medicines');
  const index = medicines.findIndex(m => m.id === id);
  
  if (index === -1) return false;
  
  medicines.splice(index, 1);
  await db.saveData('/medicines', medicines);
  return true;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  partialUpdate,
  delete: deleteMedicine
};