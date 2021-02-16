
const {allUsuarios} = require('../../querys/querys')
const {connection} = require('../../querys/connectiondb');
const {authenticateToken} = require('../../utils/authenticateToken');

const getSaldo = async(req, res) => {

     const verify= authenticateToken({token: req.token})

        if(verify){
            try{

                  connection.query(allUsuarios, (err, result) => {
                   if(err){
                       res.send("Error" + err)
                   }else{
                   result.map(e => {
                       const c = Number(verify.user.celular)
                       const d = Number(verify.user.documento)
                       if(e.documento === d && e.celular === c){
                           res.status(200).json({text:e.cuenta})
                       }
                       
                   })
                }
                   
               });
               }catch(e){
                   console.log(e)
               }
        }else{
            res.sendStatus(403)
        }
    
    

}

module.exports = {
    getSaldo
}