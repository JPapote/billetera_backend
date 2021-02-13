const jwt = require('jsonwebtoken');


const authenticateToken = ({token}) => {
    
    return jwt.verify(token, process.env.TOKEN_KEY, (error, authData) => {
     if(error){
        return false
     }else{
         return authData
    }
    })
}

module.exports = {
    authenticateToken
}