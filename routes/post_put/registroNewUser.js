const jwt = require('jsonwebtoken');

const {allUsuarios, newUser} = require('../../querys/querys')
const {connection} = require('../../querys/connectiondb');

const registroNewUser =  async (req, res) => {
    const user = {
        nombre: req.body.nombre,
        email: req.body.email,
        documento: req.body.documento,
        celular: req.body.celular
    }
    jwt.sign({user: user}, process.env.TOKEN_KEY, (err, token) =>{

        if(!err){
       
try{
   
    connection.query(allUsuarios, (err, result, fields) => {
        if(err){
            res.status(500).json({text: 'error'})
        }
        else{
        
            const queryAdd = newUser({user:user.nombre, email:user.email, 
                                      celular:user.celular, documento:user.documento})
                connection.query(queryAdd);
                res.status(200).json({
                    token,
                    text: 'success'
                })
        } 
    
    })
    

}catch(e){
    console.log(e.message)
}
        }else{
            res.status(500).json({text: 'error'})
        }
})
}

module.exports = {
    registroNewUser
}