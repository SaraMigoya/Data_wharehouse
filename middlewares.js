require("dotenv").config();
require("dotenv").config();
const jwt = require("jsonwebtoken");
var jwtClave = process.env.JWTPASSWORD
var codeToken;
const models = require("./models");

const dataLogin = async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        res.status(400).json({
            error: 'faltan campos'
        })
    }
    let access = await validateUser(email, password)
    if (access) {
        req.token = access.codeToken
        req.user = access.dataUser
        next();
    }

    else {
        res.status(401).json({

            error: "email o password invalidas"

        })
    }
}

const validateUser = async (email, password) => {
    const userSelected = await models.user.findOne({
        where: { email: email }
    })
    if (userSelected) {
        if (userSelected.password == password.trim()) {
            codeToken = generatedToken(userSelected.username, userSelected.isAdmin)
            const dataUser = { name: userSelected.username, isadmin: userSelected.isAdmin }
                                                          
            return { codeToken, dataUser };
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}


function generatedToken(name, isAdmin) {

    const payload = {
        nameUser: name,
        admin: isAdmin,
    }

    var token = jwt.sign(payload, jwtClave);
    console.log(token)
    return token
}

function validatekeyCode(password) {
    if (password.length >= 8) {
        var mayuscula = false;
        var minuscula = false;
        var numero = false;
        var symbol = false;

        for (var i = 0; i < password.length; i++) {
            if (password.charCodeAt(i) >= 65 && password.charCodeAt(i) <= 90) {
                mayuscula = true;
            }
            else if (password.charCodeAt(i) >= 97 && password.charCodeAt(i) <= 122) {
                minuscula = true;
            }
            else if (password.charCodeAt(i) >= 48 && password.charCodeAt(i) <= 57) {
                numero = true;
            }
            else {
                symbol = true;
            }
        }
        if (mayuscula == true && minuscula == true && symbol == true && numero == true) {
            return true;
        }
    }
    return false;
}

function validateEmail(value) {

    if (/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(value)) {
        return true
    } else {
        return false
    }
}

const validateJwt = (req, res, next) => {

    const codeToken = req.headers.authorization.split(' ')[1];

    jwt.verify(codeToken, jwtClave, (err, decoded) => {
        if (err) {
            res.send('No está autorizado');
        }
        req.user = decoded;
        next()
    });
}


const dataReceived = (req, res, next) => {
    const { name, last_name, email, username, password, repetedPassword} = req.body;
    if (!name || !last_name || !email || !username || !password || ! repetedPassword) {
        return res.status(400).json({
            error: 'faltan campos'
        })
    }
 
    if (validateEmail(email) === false) {
        return res.status(400).json({
            error: 'Email incorrecto'
        })
    }

    if (validatekeyCode(password) === false) {
        return res.status(400).json({
            error: 'Password incorrecto'
        })
    }
    if(password != repetedPassword) {
        return res.status(400).json({
            error: "las contraseñas no coinciden"
        })
    }
    

    next()
}

module.exports = {dataLogin, validatekeyCode, validateEmail, generatedToken, validateUser, validateJwt, dataReceived}
