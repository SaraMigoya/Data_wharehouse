let sectionNewCompany = document.getElementById("section-new-company")
let closenewCompany  = document.getElementById("close-company")
let addCompany = document.getElementById("button-new-company")
let backgroundBlack = document.getElementById("black-company")


addCompany.addEventListener("click", () =>{
    sectionNewCompany.classList.toggle("none")
    backgroundBlack.classList.toggle("none")
}) 
 
closenewCompany.addEventListener("click", () =>{
    sectionNewCompany.classList.toggle("none")
    backgroundBlack.classList.toggle("none")
    })