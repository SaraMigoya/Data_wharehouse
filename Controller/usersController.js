const express = require("express");
const models = require("../models")
const router = express.Router();
const { dataLogin, validateJwt, dataReceived } = require("../middlewares");

router.post("/", validateJwt, dataReceived, async (req, res) => {

    if (req.user.admin == false) {
        res.send("no estás autorizado para acceder a esta información")
        return

    }

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
    if (usu) return res.status(200).json(usu);

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