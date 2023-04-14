const mongoose = require('mongoose')

require('dotenv').config({ path: 'variables.env'});


//conect DB

const conectDB = async () =>{
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            // usenewurlparse: true,
            // useUnifiedTopology: true,
            // useFindAndModify: false
        })
        console.log('DB conected')
    } catch (error) {
        console.log(error)
        process.exit(1)
        
    }

}

module.exports = conectDB;