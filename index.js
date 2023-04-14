const express = require('express');
const conectDB = require('./config/db')

//create server

const app = express()


//Conect DB

conectDB()

//PORT OF APP
const PORT = process.env.PORT || 4000;



// Define principal page

app.get('/', (req, res) =>{
    res.send('Hola mundo')
})
//GO APP

app.listen(PORT, () =>{
    console.log(`El servidor esta funcionando en el puerto ${PORT}`)
})