const express = require('express');
const conectDB = require('./config/db')
const cors = require('cors')

//create server

const app = express()


//Conect DB

conectDB()

//Habilite cors

app.use(cors())

//HABILITE express.json

app.use(express.json({ extended: true }));

//PORT OF APP
const port = process.env.port || 4000;


//IMPORT ROUTES

app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/projects', require('./routes/projects'))
app.use('/api/tasks', require('./routes/tasks'))




// Define principal page

app.get('/', (req, res) =>{
    res.send('servidor funcionando')
})
//GO APP

app.listen(port, '0.0.0.0', () =>{
    console.log(`El servidor esta funcionando en el puerto ${port}`)
})