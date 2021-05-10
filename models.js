const conexion = require("./conexion")
const sequelize = conexion.sequelize
const { Model, DataTypes } = require('sequelize');

sequelize.define()

class user extends Model { }
user.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name:DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
}, {
    sequelize,
    modelName: "user"
});

module.exports = { user, /* productos, pedidos, detalle_pedidos, estados */}