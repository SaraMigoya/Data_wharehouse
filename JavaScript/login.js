
window.history.forward()


let global;

(function (global) { 

    if(typeof (global) === "undefined") {
        throw new Error("window is undefined");
    }

    var _hash = "!";
    var noBackPlease = function () {
        global.location.href += "#";

        // making sure we have the fruit available for juice (^__^)
        global.setTimeout(function () {
            global.location.href += "!";
        }, 50);
    };

    global.onhashchange = function () {
        if (global.location.hash !== _hash) {
            global.location.hash = _hash;
        }
    };

    global.onload = function () {            
        noBackPlease();

        // disables backspace on page except on input fields and textarea..
        document.body.onkeydown = function (e) {
            var Elm = e.target.nodeName.toLowerCase();
            if (e.which === 8 && (Elm !== 'input' && Elm  !== 'textarea')) {
                e.preventDefault();
            }
            // stopping event bubbling up the DOM tree..
            e.stopPropagation();
        };          
    }

})(window)



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

    const data = {
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
        // location.href = "../html/index.html"
        localStorage.setItem("token", JSON.stringify(res.exito.token));
        localStorage.setItem("user", JSON.stringify(res.exito.user));
        console.log(res.exito.user)
       
    }
    else{
        invalid.removeAttribute("hidden")
    }
}
