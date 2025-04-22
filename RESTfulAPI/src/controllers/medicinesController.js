const medicinesService = require('../services/medicinesService');

const getAllMedicines = async (req, res) => {
  try {
    const medicines = await medicinesService.getAll();
    res.json(medicines);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMedicineById = async (req, res) => {
  try {
    const medicine = await medicinesService.getById(req.params.id);
    if (medicine) {
      res.json(medicine);
    } else {
      res.status(404).json({ error: 'Medicine not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createMedicine = async (req, res) => {
  try {
    const newMedicine = await medicinesService.create(req.body);
    res.status(201).json(newMedicine);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateMedicine = async (req, res) => {
  try {
    const updatedMedicine = await medicinesService.update(req.params.id, req.body);
    if (updatedMedicine) {
      res.json(updatedMedicine);
    } else {
      res.status(404).json({ error: 'Medicine not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const partialUpdateMedicine = async (req, res) => {
  try {
    const updatedMedicine = await medicinesService.partialUpdate(req.params.id, req.body);
    if (updatedMedicine) {
      res.json(updatedMedicine);
    } else {
      res.status(404).json({ error: 'Medicine not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteMedicine = async (req, res) => {
  try {
    const success = await medicinesService.delete(req.params.id);
    if (success) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Medicine not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllMedicines,
  getMedicineById,
  createMedicine,
  updateMedicine,
  partialUpdateMedicine,
  deleteMedicine
};