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
            console.log(err)
        }
        else{
        
            const queryAdd = newUser({user:user.nombre, email:user.email, 
                                      celular:user.celular, documento:user.documento})
                connection.query(queryAdd);
                res.json({
                    token,
                    text: 'Registro exitoso!'
                })
        } 
    
    })
    

}catch(e){
    console.log(e.message)
}
        }
})
}

module.exports = {
    registroNewUser
}