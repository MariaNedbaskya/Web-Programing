const express = require('express');  
const bodyParser = require('body-parser');  
const dotenv = require('dotenv');  
const fs = require('fs');  
const path = require('path');  

dotenv.config();  

const app = express();  
const PORT = process.env.PORT || 7349;  

app.use(bodyParser.json());  

const dbPath = path.join(__dirname, 'db.json');  

const readDB = () => {  
    const data = fs.readFileSync(dbPath);  
    return JSON.parse(data);  
};  

app.get('/api/users', (req, res) => {  
    try {  
        const db = readDB();  
        res.json(db.users);  
    } catch (error) {  
        console.error(error);  
        res.status(500).send('Что-то пошло не так при чтении данных.');  
    }  
});  
 
app.listen(PORT, () => {  
    console.log(`Server on http://localhost:${PORT}`);  
});  

app.use((err, req, res, next) => {  
    console.error(err.stack);  
    res.status(500).send('Что-то пошло не так!');  
});  