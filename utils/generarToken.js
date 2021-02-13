const generarToken = () => {
    let randomString = ""
    const caracteres = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ123456789abcchdefghijklllmnñopqrstuvwxyz"

    for(let i = 0; i < 6; i++){
        randomString += caracteres.charAt(Math.floor(Math.random() * caracteres.length))

    }

    return randomString
}

module.exports = {
    generarToken
}