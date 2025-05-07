const express = require('express');  
const bodyParser = require('body-parser');  
const dotenv = require('dotenv');  
const fs = require('fs');  
const path = require('path');  
const router = require('./src/routes/dataRoutes')

dotenv.config();  

const app = express();  
const PORT = process.env.PORT || 7349;  

app.use(bodyParser.json());  
app.use('/', router)

const dbPath = path.join(__dirname, '/src/db.json');  

const readDB = () => {  
    const data = fs.readFileSync(dbPath);  
    return JSON.parse(data);  
};  

app.get('/api/items', (req, res) => {  
    try {  
        const db = readDB();  
        res.json(db.items);  
    } catch (error) {  
        console.error(error);  
        res.status(500).send('Что-то пошло не так.');  
    }  
});  
 
app.listen(PORT, () => {  
    console.log(`Server on http://localhost:${PORT}`);  
});  

app.use((err, req, res, next) => {  
    console.error(err.stack);  
    res.status(500).send('Что-то пошло не так.');  
});  