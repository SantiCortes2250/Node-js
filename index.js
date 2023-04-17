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
const PORT = process.env.PORT || 4000;


//IMPORT ROUTES

app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/projects', require('./routes/projects'))
app.use('/api/tasks', require('./routes/tasks'))




// Define principal page

app.get('/', (req, res) =>{
    res.send('Hola mundo')
})
//GO APP

app.listen(PORT, () =>{
    console.log(`El servidor esta funcionando en el puerto ${PORT}`)
})