


let email = document.getElementById("email")
let password = document.getElementById("password")
let repetePassword = document.getElementById("repete-password")
let invalid = document.getElementById("invalid")
let diferentPassword = document.getElementById("diferent-password")
let buttonLogin = document.getElementById("button-login")


buttonLogin.addEventListener("click", ()=>{
    login(email.value, password.value)
})

let login = async (email, password) =>{

    var data = {
        email,
        password
    }

    let searchApi = await fetch(`http://localhost:3000/users/login`, {
        method: "POST" ,
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    let res = await searchApi.json()
    if(res.exito){
        location.href = "../html/index.html"
    }
    else{
        invalid.removeAttribute("hidden")
    }
}
