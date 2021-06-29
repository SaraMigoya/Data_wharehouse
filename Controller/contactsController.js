const express = require("express");
const models = require("../models")
const router = express.Router();

//POST
 router.post("/", async (req, res) => {

    const {name, last_name, position, email, company, canal_contacto, cuenta_usuario, regionId, countrieId, cityId, interes}= req.body;
    const newContact = {
        name, 
        last_name,
        position,
        email, 
        company,
        canal_contacto,
        cuenta_usuario,
        regionId, 
        countrieId, 
        cityId, 
        interes
    }

    const country = await models.countries.findAll({
        where: {regionId: regionId}
    })


    if(country.length > 0){

        const city = await models.cities.findAll({
            where:{countrieId: countrieId}
        })
        
        if(city.length >0){

            for(let i = 1; i < city.length ; i++){
                
                if (city[i].id == cityId){
                    const contact = await models.contacts.create(newContact)
                    if(contact) {
                        return res.status(200).json(contact)
                    }             
                }
            }

            return res.status(400).json({message: "la ciudad ingresada no existe en el pais"})
            
        }
        else{
            return res.status(400).json({message: "No se encontro ninguna ciudad con el id del pais"}) 
        }
    }
    else{
        return res.status(400).json({message: "No se encontro ningun pais dentro de la región ingresada"})
    }

  

}) 
/* router.post("/", async (req, res) => {

    const {name, last_name, position, email, company, id_region, id_country, id_city, canal_contacto, cuenta_usuario}= req.body;
    const newContact = {
        name, 
        last_name,
        position,
        email, 
        company,
        canal_contacto,
        cuenta_usuario
    }

    const country = await models.countries.findAll({
        where: {regionId: id_region}
    })


    if(country.length > 0){

        const city = await models.cities.findAll({
            where:{countrieId: id_country}
        })
        
        if(city.length > 0){

            for(let i = 0; i < city.length ; i++){
                
                if (city[i].id == id_city){
                    const contact = await models.contacts.create(newContact)
                    await models.contacts.update({cityId: id_city}, {
                        where: {cityId: null},
             
                    }) 
                    await models.contacts.update({countrieId: id_country}, {
                        
                        where: {countrieId: null},
                 
                    }) 
                    await models.contacts.update({regionId: id_region}, {
               
                        where: {regionId: null},
                    }) 
                    if(contact) {
                        return res.status(200).json({exito: "El contacto fue creado exitosamente", contact})
                    }             
                }
            }

            return res.status(400).json({message: "la ciudad ingresada no existe en el pais"})
            
        }
        else{
            return res.status(400).json({message: "No se encontro ninguna ciudad con el id del pais"}) 
        }
    }
    else{
        return res.status(400).json({message: "No se encontro ningun pais dentro de la región ingresada"})
    }

  

}) */

    // GET
    .get("/", async (req, res) => {

/*         if (req.user.admin == false) {
            res.send("no estás autorizado para crear un nuevo usuario")
            return

        } */

        const allContacts = await models.contacts.findAll({
            attributes: ["name", "last_name", "position", "email", "company", "countrieId", "cityId", "company", "position", "interes"],
            include: [

                {
        
                    model: models.countries,
                    required: true,
                    attributes: ["name"]
                },
                {
        
                    model: models.cities,
                    required: true,
                    attributes: ["name"]
                }

            ]
        })
        if (allContacts) return res.status(200).json(allContacts);
        return res.status(400).send({ status: "ERROR", message: error.message })


    })

    //PUT

    .put("/:id", async (req, res) =>{

/*         if (req.user.admin == false) {
            res.send("no estás autorizado para crear un nuevo usuario")
            return

        } */

        const updateContact = await models.contacts.update(req.body, {
            where: {id: req.params.id}
        })

        if (updateContact) return res.status(200).json({ messege: `el contacto ${req.body.name} fue actualizado con exito`})
        return res.status(400).json({ message: `No se encontro el contacto: ${req.params.id}` })
    })

///DELETE

    .delete("/:id", async (req,res) =>{
        /*         if (req.user.admin == false) {
            res.send("no estás autorizado para crear un nuevo usuario")
            return

        } */

        const deleteContact = await models.contacts.destroy( {
            where: {id: req.params.id}
        })
        if(deleteContact) return res.status(200).json({ messege: `el contacto fue eliminado con exito` })
        return res.status(400).json({
 
            message: `No se pudo eliminar el contactp con el ID: ${req.params.id}`
        })
    })


module.exports = router; 