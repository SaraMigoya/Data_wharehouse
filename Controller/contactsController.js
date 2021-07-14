const express = require("express");
const models = require("../models")
const router = express.Router();

//POST
router.post("/", async (req, res) => {

    const { name, last_name, position, email, company, interes, regionId, countrieId, cityId } = req.body;
    const newContact = {
        name,
        last_name,
        position,
        email,
        company,
        interes,
        regionId,
        countrieId,
        cityId
    }

    const country = await models.countries.findAll({
        where: { regionId: regionId }
    })

    if (country.length > 0) {

        const city = await models.cities.findAll({
            where: { countrieId: countrieId }
        })

        if (city.length > 0) {

            for (let i = 0; i < city.length; i++) {

                if (city[i].id == cityId) {
                    const contact = await models.contacts.create(newContact)

                    if (contact) {
                        return res.status(200).json({ exito: "El contacto fue creado exitosamente" })
                    }
                }

            }
        }
        else {
            return res.status(400).json({ message: "No se encontro ninguna ciudad con el id del pais" })
        }
    }
    else {
        return res.status(400).json({ message: "No se encontro ningun pais dentro de la región ingresada" })
    }



})

    // GET
    .get("/", async (req, res) => {

        /*         if (req.user.admin == false) {
                    res.send("no estás autorizado para crear un nuevo usuario")
                    return
        
                } */

        const allContacts = await models.contacts.findAll({
            attributes: ["name", "last_name", "position", "email", "company", "interes", "countrieId", "cityId", "company", "id"],
            include: [

                {

                    model: models.regions,
                    required: true,
                    attributes: ["name"]
                },
                {

                    model: models.countries,
                    required: true,
                    attributes: ["name"]
                },
                {

                    model: models.cities,
                    required: true,
                    attributes: ["name"]
                },
  /*               {

                    model: models.companies,
                    required: true,
                    attributes: ["name"]
                }, */

            ]
        })
        if (allContacts) return res.status(200).json(allContacts);
        return res.status(400).send({ status: "ERROR", message: error.message })


    })
    // GET SEARCH

    .get("/:search", async (req, res) => {

        /*         if (req.user.admin == false) {
                    res.send("no estás autorizado para crear un nuevo usuario")
                    return
        
                } */


        const contacts = await models.contacts.findAll({

            include: [

                {
                    model: models.regions,
                    attributes: ["name"],

                },

                {
                    model: models.countries,
                    attributes: ["name"],

                },
                {

                    model: models.cities,
                    attributes: ["name"]
                }


            ],

            where: { name: req.params.search },
        })

        if (contacts.length > 0) return res.status(200).json(contacts);
        else {
            const contacts = await models.contacts.findAll({

                include: [

                    {
                        model: models.regions,
                        attributes: ["name"],

                    },

                    {
                        model: models.countries,
                        attributes: ["name"],

                    },
                    {

                        model: models.cities,
                        attributes: ["name"]
                    }


                ],

                where: { last_name: req.params.search },

            })
            if (contacts.length > 0) return res.status(200).json(contacts);
            else {
                const contacts = await models.contacts.findAll({

                    include: [

                        {
                            model: models.regions,
                            attributes: ["name"],

                        },

                        {
                            model: models.countries,
                            attributes: ["name"],

                        },
                        {

                            model: models.cities,
                            attributes: ["name"]
                        }


                    ],

                    where: { position: req.params.search },

                })
                if (contacts.length > 0) return res.status(200).json(contacts)
                else {
                    const contacts = await models.contacts.findAll({

                        include: [

                            {
                                model: models.regions,
                                attributes: ["name"],

                            },

                            {
                                model: models.countries,
                                attributes: ["name"],

                            },
                            {

                                model: models.cities,
                                attributes: ["name"]
                            }


                        ],

                        where: { email: req.params.search },
                    })
                    if (contacts.length > 0) return res.status(200).json(contacts);
                    else {
                        const contacts = await models.contacts.findAll({

                            include: [

                                {
                                    model: models.regions,
                                    attributes: ["name"],

                                },

                                {
                                    model: models.countries,
                                    attributes: ["name"],

                                },
                                {

                                    model: models.cities,
                                    attributes: ["name"]
                                }


                            ],

                            where: { interes: req.params.search },
                        })
                        if (contacts.length > 0) return res.status(200).json(contacts);
                        else {
                            const contacts = await models.contacts.findAll({

                                include: [
                                    {

                                        model: models.regions,
                                        attributes: ["name"],

                                    },

                                    {

                                        model: models.countries,
                                        attributes: ["name"],
                                        where: { name: req.params.search }
                                    },
                                    {

                                        model: models.cities,
                                        attributes: ["name"]
                                    }
                                ],

                            })
                            if (contacts.length > 0) return res.status(200).json(contacts);
                            else {
                                const contacts = await models.contacts.findAll({

                                    include: [
                                        {

                                            model: models.regions,
                                            attributes: ["name"],
                                            where: { name: req.params.search }

                                        },

                                        {

                                            model: models.countries,
                                            attributes: ["name"]

                                        },
                                        {

                                            model: models.cities,
                                            attributes: ["name"]
                                        }
                                    ],

                                })
                                if (contacts.length > 0) return res.status(200).json(contacts);
                                else {
                                    const contacts = await models.contacts.findAll({

                                        include: [
                                            {

                                                model: models.regions,
                                                attributes: ["name"],

                                            },

                                            {
                                                model: models.countries,
                                                attributes: ["name"]

                                            },
                                            {
                                                model: models.cities,
                                                attributes: ["name"],
                                                where: { name: req.params.search }
                                            }
                                        ],

                                    })

                                    if (contacts.length > 0) return res.status(200).json(contacts);
                                    else {
                                        return res.status(400).json({ message: "No se encontro ningun pais dentro de la región ingresada" })
                                    }
                                }
                            }

                        }

                    }
                }
            }
        }

    })



    //PUT

    .put("/:id", async (req, res) => {

        /*         if (req.user.admin == false) {
                    res.send("no estás autorizado para crear un nuevo usuario")
                    return
        
                } */

        const updateContact = await models.contacts.update(req.body, {
            where: { id: req.params.id }
        })

        if (updateContact) return res.status(200).json({ messege: `el contacto ${req.body.name} fue actualizado con exito` })
        return res.status(400).json({ message: `No se encontro el contacto: ${req.params.id}` })
    })

    ///DELETE

    .delete("/:id", async (req, res) => {
        /*  if (req.user.admin == false) {
            res.send("no estás autorizado para crear un nuevo usuario")
            return

        } */

        const deleteContact = await models.contacts.destroy({
            where: { id: req.params.id }
        })
        if (deleteContact) return res.status(200).json({ messege: `el contacto fue eliminado con exito` })
        return res.status(400).json({

            message: `No se pudo eliminar el contactp con el ID: ${req.params.id}`
        })
    })


module.exports = router; 