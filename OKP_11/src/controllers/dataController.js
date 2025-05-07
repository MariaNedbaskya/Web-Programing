const fs = require('fs');  
const path = require('path');  
const dbPath = path.join(__dirname, '../db.json');  

const readDB = () => {
    const data = fs.readFileSync(dbPath);  
    return JSON.parse(data); 
};

const writeDB = () => {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));  
};

const getAllItems = (req, res) => {
    const db = readDB();  
    res.json(db.items); 
};

const getItem = (req, res) => {  
    const db = readDB();  
    const item = db.items.find(i => i.id === parseInt(req.params.id));
    if (!item) {  
        return res.status(404).send('Нету элемента :(');  
    }  
    res.json(item);  
};  

const createItem = (req, res) => {  
    const db = readDB();  
    const { name, count, data } = req.body; 
    const newItem = { id: db.items.length + 1, name, count, data }; 
    db.users.push(newItem);  
    writeDB(db);  
    res.status(201).json(newItem);   
};  

const updateItem = (req, res) => {  
    const db = readDB();  
    const item = db.items.find(i => i.id === parseInt(req.params.id));
    if (!item) {  
        return res.status(404).send('Нету элемента :(');  
    }  
    if (req.body.name !== undefined) item.name = req.body.name;  
    if (req.body.count !== undefined) item.count = req.body.count;  
    if (req.body.data !== undefined) item.data = req.body.data;  
    
    writeDB(db);  
    res.json(item);  
};  

const deleteItem = (req, res) => {  
    const db = readDB();  
    const itemIndex = db.items.findIndex(i => i.id === parseInt(req.params.id));
    if (itemIndex === -1) {  
        return res.status(404).send('Нету элемента :(');  
    }  
    const deletedItem = db.items.splice(itemIndex, 1);  
    writeDB(db);  
    res.json(deletedItem);  
};  


module.exports = {
    getAllItems,
    getItem,
    createItem,
    updateItem,
    deleteItem,
};

