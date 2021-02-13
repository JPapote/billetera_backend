const nodemailer = require('nodemailer')

const {generarToken} = require('../../utils/generarToken')
const {allUsuarios,  updateUser} = require('../../querys/querys')
const {connection} = require('../../querys/connectiondb');
const {authenticateToken} = require('../../utils/authenticateToken');

var t = ''
const envioToken = async (req, res) => {

   const verify = authenticateToken({token:req.token})
        
   if(verify){
            const tokenDePago = generarToken();
            try{
            connection.query(allUsuarios, (err, result, fields) => {
                if(err){
                    console.log(err)
                }else{
                    result.map(e => {
        
                        if(e.email === verify.user.email){

                            const transporter = nodemailer.createTransport({
                                host: 'smtp.ethereal.email',
                                port: 587,
                                secure:false,
                                auth: {
                                    user: process.env.USER_NODEMAILER,
                                    pass: process.env.PASS_NODEMAILER
                                }
                            });
                        
                              transporter.sendMail({
                                from: 'Remitente', 
                                to: verify.user.email, 
                                subject: "Hello ✔", 
                                text: `tu id es = ${e.id} y tu token es = ${tokenDePago}` 
                                
                              }, (err, resp) => {
                                  if(err){
                                      console.log(err)
                                      res.status(500).json({text:err.message})
                                  }else{
                                      t = tokenDePago
                                      res.status(200).json({text: 'Token enviado'})
                                  }
                                
                              })
                            }        
                        })
                    
                }
            })
        }catch(e){
                console.log(e)
            }

        }
        else{
            res.sendStatus(403)
        }
    
   
    
}

const updateData = async (req, res) => {
    const verify = authenticateToken({token: req.token})
  
       
        if(verify){
    const {cuenta, id, tokenDePago, valor} = req.body;

try{
if(!valor){

     connection.query(allUsuarios, (err, result, fields) => {
         let n = 0;  
        if(err){
            console.log(err)
        }
        result.map(e => {
          const i = Number(id)
            if(e.id != i || tokenDePago != t ){
                
                res.status(500).json({tex:'El id o el token no es valido'})
            }
            else if(e.cuenta === 0){
                res.status(500).json({tex:'cuenta sin dinero'})

            }
            else{
                n = e.cuenta - Number(cuenta)
                if(n > 0){
            const updateQuery = updateUser({nameTable:'usuarios', columnName:'cuenta', 
                                            setValue:n, nameColumnWhere:'id', valueOfWhere:id}) 
             connection.query(updateQuery);

        res.status(200).send({text:'Cuenta Pagada!'})
                }else{
                      res.status(500).json({text:'Su dinero es insuficiente!'})

                }
            }
        })

    
    })
}else {
    connection.query(allUsuarios, (err, result, fields) => {
      
        
        if(err){
            console.log(err)
        }
        
        result.map( e =>{
           const c = Number(verify.user.celular)
           const d = Number(verify.user.documento)
        if(e.documento === d && e.celular === c){
           
           const n = e.cuenta =+ Number(valor) 
     
             const updateQuery = updateUser({nameTable:'usuarios', columnName:'cuenta', setValue: n, 
                                             nameColumnWhere:'documento', valueOfWhere: d}) 
              connection.query(updateQuery)
             
             res.status(200).send({text:'Saldo agreditado!'})
            

        }

        })
        
})
}
}catch(e){
    console.log(e.message)
}
        }else{
            res.sendStatus(403)

        }
        

}

module.exports = {
    
    envioToken,
    updateData
}