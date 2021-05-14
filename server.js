const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet")
const db = require("./conexion")
const models = require("./models")

const initialController = require("./Controller/initialController")
const usersController = require("./Controller/usersController")
const regionsController = require("./Controller/regionsController")

app.use(express.json())
app.use(cors());
app.use(helmet());
app.use("/init", initialController);
app.use("/users", usersController);
app.use ("/regions", regionsController);


db.init()
    .then(async () => {

        db.sequelize.sync({ force: false }).then(() => {
            console.log("Database Connected Succesfull…");
        }).catch(err => {
            console.log(err);
        });

        console.log('Conectado a la Base de Datos');
        app.set("port", process.env.PORT || 3000);
        app.listen(app.get("port"), () => {
            console.log("Server on port", app.get("port"))
        })

    }).catch((err) => {
        console.log('Error al conectar a la db', err);
    });


 //Associations

models.regions.hasMany(models.countries)
models.countries.belongsTo(models.regions) 

models.countries.hasMany(models.cities)
models.cities.belongsTo(models.countries)
