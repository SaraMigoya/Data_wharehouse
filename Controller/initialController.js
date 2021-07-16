const express = require("express");
const router = express.Router();
const models = require("../models");

//USERS
router.post("/users", async (req,res) => {
    const newsUsers = [
        {
            name: "Sara",
            last_name: "Migoya",
            email: "sara@gmail.com",
            username: "SaraMi",
            password: "SaraM123/",
            isAdmin: "false"
        },
        {
            name: "Evaluador",
            username: "Evaluador",
            last_name: "Evaluador",
            email: "evaluador@gmail.com",
            password: "Evaluador123/",
            isAdmin: "true"
        }
    
    ]
    newsUsers.forEach(e => {
        models.user.create(e)
    });

    res.status(200).json({ message: "Usuario creado con éxito!" })

})
    .post("/contacts", async (req,res) => {
    const newsUsers = [
        {
            name: "Sofía",
            last_name: "Gonzalez",
            position: "developer",
            email: "sofia@gmail.com",
            company: "Globant",
            interes: "100%",
            regionId: 1,
            countrieId: 1,
            cityId: 2
        },
        {
            name: "Laura",
            last_name: "Fernandez",
            position: "developer",
            email: "laura@gmail.com",
            company: "Acámica",
            interes: "100%",
            regionId: 1,
            countrieId: 1,
            cityId: 2
        
        }
    
    ]
    newsUsers.forEach(e => {
        models.contacts.create(e)
    });

    res.status(200).json({ message: "Contacto creado con éxito!" })

})
    .post("/companies", async (req,res) => {
    const newsCompanies = [
        {
            name: "Globant",
            address: "19 N787",
            email: "rrhh@globant.com",
            tel: "01134455",
            cityId: 1
        },
        {
            name: "Acámica",
            address: "Humboldt 1967",
            email: "rrhh@acamica.com",
            tel: "01134455",
            cityId: 1
        }
    
    ]
    newsCompanies.forEach(e => {
        models.companies.create(e)
    });

    res.status(200).json({ message: "Compañía creada con éxito!" })

})

//REGIONS

     .post("/regions", async (req,res) => {
    const newsRegions = [
        {
            id: 1,
            name: "Sudamérica",

        },
        {
            id: 2,
            name: "Norteamérica",

        }
    
    ]
    newsRegions.forEach(e => {
        models.regions.create(e)
    });

    res.status(200).json({ message: "Región creado con éxito!" })

})

    .post("/countries", async (req,res) => {
    const newsCountries = [
        {
            id: 1,
            name: "Argentina",
            regionId: "1"

        },
        {
            id: 2,
            name: "Colombia",
            regionId: "1"

        },
    
        {
            id: 3,
            name: "Chile",
            regionId: "1"

        },
        {
            id: 4,
            name: "Uruguay",
            regionId: "1"

        },
        {
            id: 5,
            name: "México",
            regionId: "2"

        },
        {
            id:6,
            name: "Estados Unidos",
            regionId: "2"

        }
    
    ]
    newsCountries.forEach(e => {
        models.countries.create(e)
    });

    res.status(200).json({ message: "País creado con éxito!" })

})

    .post("/cities", async (req,res) => {
    const newsCities = [
        {
            id: 1,
            name: "Buenos Aires",
            countrieId: "1"

        },
        {
            id: 2,
            name: "Córdoba",
            countrieId: "1"

        },

        {
            id: 3,
            name: "Santiago",
            countrieId: "3"

        },
        {
            id: 4,
            name: "Atacama",
            countrieId: "3"

        },
        {
            id: 5,
            name: "Valparaíso",
            countrieId: "3"

        },
    
        {
            id: 6,
            name: "Bogotá",
            countrieId: "2"

        },
        {
            id: 8,
            name: "Medellín",
            countrieId: "2"

        },

        {
            id: 9,
            name: "Montevideo",
            countrieId: "5"

        },
        {
            id: 10,
            name: "Maldonado",
            countrieId: "5"

        },
        {
            id: 11,
            name: "Florida",
            countrieId: "6"

        }
    
    ]
    newsCities.forEach(e => {
        models.cities.create(e)
    });

    res.status(200).json({ message: "Ciudad creada con éxito!" })

}) 

module.exports = router