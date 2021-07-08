

let name = document.getElementById("name")
let lastName = document.getElementById("lastname")
let email = document.getElementById("email")
let user = document.getElementById("user")
let password = document.getElementById("password")
let repetPassword = document.getElementById("repet-password")
let isAdmin = document.getElementById("isadmin")
let createdUser = document.getElementById("created-user")
let createdUser2 = document.getElementById("created-user2")
let buttonCreateUser = document.getElementById("button-create-user")



buttonCreateUser.addEventListener("click", ()=>{
    createUser(name.value, lastName.value, email.value, user.value, password.value, isAdmin.checked, repetPassword.value)
})


let createUser = async (name, last_name, email, username, password, isAdmin, repetedPassword ) =>{

    var data = {
        name, 
        last_name,
        email,
        username,
        password,
        isAdmin,
        repetedPassword

    }

    
    let api = await fetch (`http://localhost:3000/users`, {
        method: "POST" ,
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json', 
           // 'Authorization': 'Bearer ' + process.env.JWTPASSWORD
        } 
    })

    let res = await api.json()

    if(res.exito){
        
        createdUser.removeAttribute("hidden")
    } else{
        createdUser2.removeAttribute("hidden")
    }
  
}