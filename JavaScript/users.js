let name = document.getElementById("name")
let lastName = document.getElementById("lastname")
let email = document.getElementById("email")
let user = document.getElementById("user")
let password = document.getElementById("password")
let repetPassword = document.getElementById("repet-password")
let isAdmin = document.getElementById("isadmin")
let createdUser = document.getElementById("created-user")
let buttonCreateUser = document.getElementById("button-create-user")


buttonCreateUser.addEventListener("click", ()=>{
    createUser(name.value, lastName.value, email.value, user.value, password.value, isAdmin.value, repetPassword.value)
})


let createUser = async (name, last_name, email, user, password, isAdmiin, repetedPassword ) =>{

    var data = {
        name, 
        last_name,
        email,
        user,
        password,
        isAdmiin,
        repetedPassword

    }

    let Api = await fetch(`https://localhost:3000/users/`, {
        method: "POST" ,
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    let res = await Api.json()
    if(res.exito){
        
        createdUser.removeAttribute("hidden")
    } else{}
  
}