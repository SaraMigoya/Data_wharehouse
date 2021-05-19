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


class regions extends Model {}
regions.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name:DataTypes.STRING,
}, {
    sequelize,
    modelName: "region"
});


class countries extends Model {}
countries.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    name:DataTypes.STRING,
}, {
    sequelize,
    modelName: "countrie"
});

class cities extends Model {}
cities.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    name:DataTypes.STRING,
}, {
    sequelize,
    modelName: "cities"
});


class companies extends Model {}
companies.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    name:DataTypes.STRING,
    address:DataTypes.STRING,
    email: DataTypes.STRING,
    tel: DataTypes.STRING,

}, {
    sequelize,
    modelName: "companie"
});


module.exports = { user, regions, countries, cities, companies}