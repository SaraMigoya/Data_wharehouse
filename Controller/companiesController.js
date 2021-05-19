const express = require("express");
const models = require("../models")
const router = express.Router();
const { dataCompanie, validateJwt } = require("../middlewares");


//POST
router.post("/", dataCompanie, validateJwt, async (req, res) => {
/* 
    if (req.user.admin == false) {
           res.send("no estás autorizado para crear un nuevo usuario")
           return
   
       } */
   
       const { name, address, email, tel, cityId} = req.body;

       const newCompany = {
           name,
           address,
           email,
           tel,
           cityId
           
       }
   
       
       const company = await models.companies.create(newCompany)
     
   /*     await models.companies.update({cityId: city_id}, {
           where: {cityId: null}
       }) */

       if (company) return res.status(200).json({exito: "se creo la compañía exitosamente", company} );
   
       res.status(400).json({
           message: "Lo sentimos. No se pudo crear la companía."
       })
   
   
   })
//// GET
   .get ("/", async (req, res) =>{

  /*   if (req.user.admin == false) {
        res.send("no estás autorizado para crear un nuevo usuario")
        return

    }
 */
        const companies = await models.companies.findAll();
        if (companies.length > 0) return res.status(200).json(companies);
        res.status(400).json({
            message: "No se encontraron companies registrados con esos datos"
        })

   })

////PUT


    .put('/:id', async (req, res) => {

        const updateCompany = await models.companies.update(req.body, {
            where: { id: req.params.id }
        });
     

        if (updateCompany) return res.status(201).json({ message: "Actualizado con exito" });
        res.status(400).json({
            message: `No se pudo actualizar : ${req.params.name}`
        });

    })


   module.exports = router; 