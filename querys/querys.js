const allUsuarios = `SELECT * FROM usuarios;`


const newUser = ({nombre, email, celular, documento}) => {
    return`INSERT INTO usuarios (nombre, email, celular, documento) 
    VALUES ("${nombre}", "${email}", ${celular}, ${documento});`
}

/**
 * En primer lugar le paso el nombre de la tabla,
 * en segundo lugar el nombre de la column que quiero cambiar,
 * en tercer lugar el nuevo valor
 * en cuarto lugar lo que le sigue a la 
 * coondicion where (el nombre de la columna) y luego
 *  el valor que contiene 
 * @param {String} nameTable
 * @param {String} columnName 
 * @param {*} setValue 
 * @param {String}  nameColumnWhere 
 * @param {*} valueOfWhere 
 */
const updateUser = ({nameTable, columnName, setValue, nameColumnWhere, valueOfWhere}) => {
    return `UPDATE ${nameTable} SET ${columnName} = ${setValue} WHERE ${nameColumnWhere} = ${valueOfWhere};`
}
module.exports={
    allUsuarios,
    newUser,
    updateUser
}