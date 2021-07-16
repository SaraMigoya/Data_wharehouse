const express = require("express");
const models = require("../models")
const router = express.Router();
const { dataCompanie} = require("../middlewares");


//POST
router.post("/", dataCompanie, async (req, res) => {

       const { name, address, email, tel, cityId} = req.body;

       const newCompany = {
           name,
           address,
           email,
           tel,
           cityId 
           
       }
   
       
       const company = await models.companies.create(newCompany)
     

       if (company) return res.status(200).json(company);
   
       res.status(400).json({
           message: "Lo sentimos. No se pudo crear la companía."
       })
   
   
   })
//// GET
   .get ("/", async (req, res) =>{

        const companies = await models.companies.findAll({
            attributes: ["id","name", "address", "email", "tel"],
            include: [

                {
                    model: models.cities,
                    required: false,
                    attributes: ["name"]
                }

            ]
        });


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
            message: `No se pudo actualizar : ${req.params.id}`
        });

    })

    .delete ("/:id", async (req, res) =>{

        const deleteCompany = await models.companies.destroy({
            where: {id: req.params.id}
        });

        if (deleteCompany) return res.status(201).json({message: "eliminado con exito" });
        res.status(400).json({
            message: `No se pudo elimnar : ${req.params.id}`

        })
    })


   module.exports = router; 