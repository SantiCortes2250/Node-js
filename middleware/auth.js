const jwt = require('jsonwebtoken')

module.exports = function(req, res, next){
    //read token of header
    const token = req.header('x-auth-token');

    console.log(token)


    //validate if token dont exist
    if(!token){
        return res.status(401).json({msg:'No token, invalid permission'})
    }

    //validate token


    try {
        const verified = jwt.verify(token, process.env.SECRET)
        req.user = verified.user;
        next()
        
    } catch (error) {
        return res.status(401).json({msg:'Invalid Token'})
        
    }
}