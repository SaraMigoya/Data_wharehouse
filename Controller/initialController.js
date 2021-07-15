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

/*     .post("/initialRegions", async (req,res) => {
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
            regionId: "1"

        },
        {
            name: "Colombia",
            regionId: "1"

        },
    
        {
            name: "Chile",
            regionId: "1"

        },
        {
            name: "Uruguay",
            regionId: "1"

        },
        {
            name: "México",
            regionId: "2"

        },
        {
            name: "Estados Unidos",
            regionId: "2"

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
            countrieId: "3"

        },
        {
            name: "Atacama",
            countrieId: "3"

        },
        {
            name: "Valparaíso",
            countrieId: "3"

        },
    
        {
            name: "Bogotá",
            countrieId: "2"

        },
        {
            name: "Medellín",
            countrieId: "2"

        },

        {
            name: "Montevideo",
            countrieId: "5"

        },
        {
            name: "Maldonado",
            countrieId: "5"

        }
    
    ]
    newsCities.forEach(e => {
        models.cities.create(e)
    });

    res.status(200).json({ message: "Ciudad creada con éxito!" })

}) */

module.exports = router