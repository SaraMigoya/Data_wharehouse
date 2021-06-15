const express = require("express");
const models = require("../models")
const router = express.Router();
const { validateJwt } = require("../middlewares");


//POST
router.post("/", async (req, res) => {
/*     if (req.user.admin == false) {
        res.send("no estás autorizado para crear un nuevo usuario")
        return
    }
     */
    const { name } = req.body
    const newRegion = {
        name,
    }

    const region = await models.regions.create(newRegion)
    if (region) return res.status(200).json({ exito: "la región se creó exitosamente", region });

    res.status(400).json({
        message: "No se pudo crear el usuario"
    })


})

    .post("/countries", async (req, res) => {
/*         if (req.user.admin == false) {
            res.send("no estás autorizado para crear un nuevo usuario")
            return

        } */

        const { name, regionId } = req.body
        const newCountry = {
            name,
            regionId

        }

        const country = await models.countries.create(newCountry)
        if (country) return res.status(200).json({ exito: "El país se creó exitosamente", country });

        res.status(400).json({
            message: "No se pudo crear el país"
        })


    })
    .post("/cities",  async (req, res) => {
        

        /* if (req.user.admin == false) {
            res.send("no estás autorizado para crear un nuevo usuario")
            return

        }
 */
        const { name, countrieId } = req.body
        const newCity = {
            name,
            countrieId

        }

        const city = await models.cities.create(newCity)
        if (city) return res.status(200).json({ exito: "La ciudadse creó exitosamente", city });

        res.status(400).json({
            message: "No se pudo crear la ciudad"
        })


    })


    // GET
    .get("/", async (req, res) => {

/*         if (req.user.admin == false) {
            res.send("no estás autorizado para crear un nuevo usuario")
            return

        } */

        const allRegions = await models.regions.findAll({
            attributes: ["name","id"],
            include: [

                {
                    model: models.countries,
                    required: false,
                    attributes: ["name", "id"],
                    include: [
                        {
                            model:models.cities,
                            required: false,
                            attributes: ["name","id" ],
                        }
                    ]
                }

            ]
        });
        if (allRegions.length > 0) return res.status(200).json( {exito: "operación exitosa", allRegions});
        return res.status(400).json({message: "error. no se pudo traer info"})



    })

    .get("/countries", validateJwt, async (req, res) => {
        
        if (req.user.admin == false) {
            res.send("no estás autorizado para crear un nuevo usuario")
            return

        }

        const allCountries = await models.countries.findAll({
            attributes: ["name"],
            include: [
                {
                    model: models.regions,
                    required: true,
                    attributes: ["name"]
                },
                            
                   {
                    model: models.cities,
                    required: true,
                    attributes: ["name"] 
                }    
 
            ]
        });
        
        if (allCountries) return res.status(200).json(allCountries);
        return res.status(400).json({message: "error. no se pudo traer info"})

    })
    .get("/cities", async (req, res) => {
        
/*         if (req.user.admin == false) {
            res.send("no estás autorizado para crear un nuevo usuario")
            return

        } */

        const allCities = await models.cities.findAll({
            attributes: ["name"],
        });
        
        if (allCities) return res.status(200).json(allCities);
        return res.status(400).json({message: "error. no se pudo traer info"})

    })

    //PUT

    .put("/:id", validateJwt, async (req, res) => {

        if (req.user.admin == false) {
            res.send("Sólo un administrador puede realizar altas y/o modificar regiones")
            return
        }

        const updateRegion = await models.regions.update(req.body, {
            where: { id: req.params.id }
        })


        if (updateRegion) return res.status(200).json({ messege: `${req.body.name} fue actualizado con exito` })
        return res.status(400).json({ message: `No se encontro la región con el ID: ${req.params.id}` })
    })

    .put("/countries/:id", validateJwt, async (req, res) => {

        if (req.user.admin == false) {
            res.send("Sólo un administrador puede realizar altas y/o modificar países")
            return
        }

        const updateCountry = await models.countries.update(req.body, {
            where: { id: req.params.id }
        })


        if (updateCountry) return res.status(200).json({ messege: `${req.body.name} fue actualizado con exito` })
        return res.status(400).json({ message: `No se encontro el país con el ID: ${req.params.id}` })
    })

    .put("/cities/:id", validateJwt, async (req, res) => {

        if (req.user.admin == false) {
            res.send("Sólo un administrador puede realizar altas y/o modificar ciudades")
            return
        }

        const updateCity = await models.cities.update(req.body, {
            where: { id: req.params.id }
        })


        if (updateCity) return res.status(200).json({ messege: `${req.body.name} fue actualizado con exito` })
        return res.status(400).json({ message: `No se encontro la ciudad con el ID: ${req.params.id}` })
    })

    //DELETE
/* 
    .delete("/:id", validateJwt, async (req, res) => {

        if (req.user.admin == false) {
            res.send("Sólo un administrador puede realizar altas y/o modificar")
            return
        }

        const deleteRegion = await models.regions.destroy({
            where: { id: req.params.id }
        })
        if (deleteRegion) return res.status(200).json({ messege: `La región fue eliminado con exito` })
        return res.status(400).json({
            message: `No se pudo eliminar la regiono con el ID: ${req.params.id}`
        })
    }) */


    .delete("/countries/:id", async (req, res) => {

 /*        if (req.user.admin == false) {
            res.send("Sólo un administrador puede realizar altas y/o modificar")
            return
        } */

        await models.cities.destroy({
            where: { countrieId: req.params.id }
        })

        const deleteCountry = await models.countries.destroy({
            where: { id: req.params.id }
        })

        if (deleteCountry) return res.status(200).json({ messege: `El país fue eliminado con exito` })
        return res.status(400).json({
            message: `No se pudo eliminar el país con el ID: ${req.params.id}`
        })
    })

    .delete("/cities/:id", async (req, res) => {

/*         if (req.user.admin == false) {
            res.send("Sólo un administrador puede realizar altas y/o modificar")
            return
        }
 */
        const deleteCity = await models.cities.destroy({
            where: { id: req.params.id }
           
        })
 

        if (deleteCity) return res.status(200).json({ messege: `la ciudad fue eliminado con exito` })
        return res.status(400).json({
 
            message: `No se pudo eliminar la ciudad con el ID: ${req.params.id}`
        })
    })


module.exports = router; 