const express = require("express");
const router = express.Router();
const models = require("../models");

//USERS
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

//REGIONS

    .post("/initialRegions", async (req,res) => {
    const newsRegions = [
        {
            name: "Sudamérica",

        },
        {
            name: "Norteamérica",

        }
    
    ]
    newsRegions.forEach(e => {
        models.regions.create(e)
    });

    res.status(200).json({ message: "Región creado con éxito!" })

})

    .post("/initialCountries", async (req,res) => {
    const newsCountries = [
        {
            name: "Argentina",
            regionId: "2"

        },
        {
            name: "Colombia",
            regionId: "2"

        },
    
        {
            name: "Chile",
            regionId: "2"

        },
        {
            name: "Uruguay",
            regionId: "2"

        },
        {
            name: "México",
            regionId: "1"

        }
    
    ]
    newsCountries.forEach(e => {
        models.countries.create(e)
    });

    res.status(200).json({ message: "País creado con éxito!" })

})

    .post("/initialCities", async (req,res) => {
    const newsCities = [
        {
            name: "Buenos Aires",
            countrieId: "1"

        },
        {
            name: "Córdoba",
            countrieId: "1"

        },

        {
            name: "Santiago",
            countrieId: "4"

        },
        {
            name: "Atacama",
            countrieId: "4"

        },
        {
            name: "Valparaíso",
            countrieId: "4"

        },
    
        {
            name: "Bogotá",
            countrieId: "3"

        },
        {
            name: "Medellín",
            countrieId: "3"

        },

        {
            name: "Montevideo",
            countrieId: "2"

        },
        {
            name: "Maldonado",
            countrieId: "2"

        }
    
    ]
    newsCities.forEach(e => {
        models.cities.create(e)
    });

    res.status(200).json({ message: "Ciudad creada con éxito!" })

})

module.exports = router