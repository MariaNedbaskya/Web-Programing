const express = require('express');  
const { getAllItems, getItem, createItem, updateItem, deleteItem } = require('../controllers/dataController');  

const router = express.Router();  

router.get('/items', getAllItems);  
router.get('/items/:id', getItem);  
router.post('/items', createItem);  
router.patch('/items/:id', updateItem);  
router.put('/items/:id', updateItem);  
router.delete('/items/:id', deleteItem);  

module.exports = router;  