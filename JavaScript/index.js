let arrow = document.getElementById("arrow")
let expand = document.getElementById("expand")
let addContact = document.getElementById("button-new-contact")
let backgroundBlack = document.getElementById("black")
let sectionNewContact = document.getElementById("section-new-contact")
let closenewContact  = document.getElementById("close")


arrow.addEventListener("click", () => {
    expand.classList.toggle("none")
    
})    

addContact.addEventListener("click", ()=>{
    sectionNewContact.classList.toggle("none")
    backgroundBlack.classList.toggle("none")
})

closenewContact.addEventListener("click", () =>{
    sectionNewContact.classList.toggle("none")
    backgroundBlack.classList.toggle("none")
})

