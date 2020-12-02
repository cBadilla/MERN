const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {

    //Leer el toquen del header
    const token = req.header('x-auth-token');

    //  // Website you wish to allow to connect
    //  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4000");

    //  // Request methods you wish to allow
    //  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    //  // Request headers you wish to allow
    //  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    //  // Set to true if you need the website to include cookies in the requests sent
    //  // to the API (e.g. in case you use sessions)
    //  res.setHeader('Access-Control-Allow-Credentials', true);

    //Revisar el toquen
    if (!token) {
        return res.status(401).json({ msg: 'No hay token, permiso no válido' })
    }

    //Validar el toquen
    try {
        const cifrado = jwt.verify(token, process.env.SECRETA);
        req.usuario = cifrado.usuario;
        //Para pasar al siguiente middleware
        next();

    } catch (error) {
        res.status(401).json({ msg: 'Token no válido' })
    }
}