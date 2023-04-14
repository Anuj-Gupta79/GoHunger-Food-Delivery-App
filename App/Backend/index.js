import express from 'express';
import mongodb from './db.js';

const app = express();
const PORT = 3001;

mongodb();

app.get('/', (req, res)=>{
    res.send("server is running fine");
})

app.listen(PORT, ()=> {
    console.log(`Port is listening on http://localhost:${PORT}`);
})