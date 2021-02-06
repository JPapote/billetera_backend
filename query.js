const nodemailer = require('nodemailer')
const mysql      = require('mysql');


const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'epayco',
  password : '123456',
  database : 'registrousuarios'
});
 
connection.connect();

const getQuery = `SELECT * FROM usuarios;`

const generarToken = () => {
    let randomString = ""
    const caracteres = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ123456789abcchdefghijklllmnñopqrstuvwxyz"

    for(let i = 0; i < 6; i++){
        randomString += caracteres.charAt(Math.floor(Math.random() * caracteres.length))

    }

    return randomString
}

const getData = async(req, res) => {
    const {documento, celular}  = req.body
    

    try{

     connection.query(getQuery, (err, result) => {
        if(err){
            res.send("Error" + err)
        }
        result.map(e => {
            const c = Number(celular)
            const d = Number(documento)
            if(e.documento === d && e.celular === c){
                res.status(200).json({text:e.cuenta})
            }
            
        })
        
    });
    }catch(e){
        console.log(e)
    }

}

const postData = async (req, res) => {
    
    const {nombre, email, documento, celular} = req.body
try{
   
    connection.query(getQuery, (err, result, fields) => {
        if(err){
            console.log(err)
        }
        else{
        
            const queryAdd = `INSERT INTO usuarios (nombre, email, celular, documento) VALUES ("${nombre}", "${email}", ${celular}, ${documento});`
                connection.query(queryAdd);
                res.status(200).json({text: 'Registro exitoso!!'})
        } 
    
    })
    

}catch(e){
    console.log(e.message)
}
    
}
var t = ''
const envioToken = async (req, res) => {
    const {email} = req.body

    const token = generarToken();
    try{
    connection.query(getQuery, (err, result, fields) => {
        if(err){
            console.log(err)
        }else{
            result.map(e => {

                if(e.email === email){
                    const transporter = nodemailer.createTransport({
                        host: 'smtp.ethereal.email',
                        port: 587,
                        secure:false,
                        auth: {
                            user: 'trent.champlin@ethereal.email',
                            pass: 'dz5E216Qr3SHpZSEyJ'
                        }
                    });
                
                      transporter.sendMail({
                        from: 'Remitente', 
                        to: email, 
                        subject: "Hello ✔", 
                        text: `tu id es = ${e.id} y tu token es = ${token}` 
                        
                      }, (err, resp) => {
                          if(err){
                              console.log(err)
                              res.status(500).json({text:err.message})
                          }else{
                              t = token
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

const updateData = async (req, res) => {
    const {cuenta, id, token, valor, documento, celular} = req.body;

try{
if(!valor){
    console.log("valor1" + t)

     connection.query(getQuery, (err, result, fields) => {
         let n = 0;  
        if(err){
            console.log(err)
        }
        result.map(e => {
          const i = Number(id)
            if(e.id != i || token != t ){
                console.log(e.id)
                res.status(500).json({tex:'El id o el token no es valido'})
            }
            else if(e.cuenta === 0){
                res.status(500).json({tex:'cuenta sin dinero'})

            }
            else{
                n = e.cuenta - Number(cuenta)
                if(n > 0){
            const updateQuery = `UPDATE usuarios SET cuenta = ${n} WHERE id= ${id};`
             connection.query(updateQuery);

        res.status(200).send({text:'Cuenta Pagada!'})
                }else{
                      res.status(500).json({text:'Su dinero es insuficiente!'})

                }
            }
        })

    
    })
}else {
    connection.query(getQuery, (err, result, fields) => {
        let n = 0
        if(err){
            console.log(err)
        }
        
       const a = result.map( e =>{
           const c = Number(celular)
           const d = Number(documento)
        if(e.documento === d && e.celular === c){

            n = e.cuenta =+ Number(valor) 
           
             const updateQuery = `UPDATE usuarios SET cuenta = ${n} WHERE documento= ${d};`
             connection.query(updateQuery);
         
             
             res.status(200).send({text:'Saldo agreditado!'})
            

        }

        })
        
})
}
}catch(e){
    console.log(e.message)
}

}

module.exports = {
    getData,
    postData,
    envioToken,
    updateData
}