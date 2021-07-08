const express = require("express");
const models = require("../models")
const router = express.Router();
const { dataLogin, dataReceived, validateJwt } = require("../middlewares");


//POST
router.post("/", dataReceived, async (req, res) => {

 /* if (req.user.admin == false) {
        res.send("no estás autorizado para crear un nuevo usuario")
        return

    }
 */
    const { name, last_name, email, username, password, isAdmin } = req.body
    const newUser = {
        name,
        last_name,
        email,
        username,
        password,
        isAdmin
    }


    const usu = await models.user.create(newUser)
    if (usu) return res.status(200).json({exito: "se creo el usuario exitosamente", usu} );

    res.status(400).json({
        message: "No se pudo crear el usuario"
    })


})

.post("/login", dataLogin, (req, res) => {
    res.status(200).json({
        exito: {
            token: req.token,
            user: req.user
        }
    })
})



module.exports = router; 