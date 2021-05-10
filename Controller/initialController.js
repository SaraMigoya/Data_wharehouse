const express = require("express");
const router = express.Router();
const models = require("../models");


router.post("/initialUsers", async (req,res) => {
    const newsUsers = [
        {
            name: "Sara",
            last_name: "Migoya",
            email: "sara@gmail.com",
            username: "SaraMi",
            password: "SaraM123/",
            isAdmin: "true"
        },
        {
            name: "Evaluador",
            username: "Evaluador",
            last_name: "Evaluador",
            email: "evaluador@gmail.com",
            password: "Evaluador123/",
            isAdmin: "false"
        }
    
    ]
    newsUsers.forEach(e => {
        models.user.create(e)
    });

    res.status(200).json({ message: "Usuario creado con éxito!" })

})


module.exports = router