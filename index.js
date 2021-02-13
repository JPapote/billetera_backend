const {app} = require('./_app')
const port = process.env.PORT || process.env.PUERTO

app.listen(port, () => console.log(`Escuchando puerto, ${port}`))