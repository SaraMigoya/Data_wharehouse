let sectionNewCompany = document.getElementById("section-new-company")
let closenewCompany = document.getElementById("close-company")
let addCompany = document.getElementById("button-new-company")
let backgroundBlack = document.getElementById("black-company")


addCompany.addEventListener("click", () => {
    sectionNewCompany.classList.toggle("none")
    backgroundBlack.classList.toggle("none")
})

closenewCompany.addEventListener("click", () => {
    sectionNewCompany.classList.toggle("none")
    backgroundBlack.classList.toggle("none")
})


//// GET REGIONES
let callCompanies = async () => {

    let searchApi = await fetch(`http://localhost:3000/companies`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    })
  
    let res = await searchApi.json()
   
   
    if (res) {
        return res
      
  
    }
    else {
      console.log("error")
    }
  }


async function createCompanies(){

    let awaitCompanies = await callCompanies()
    console.log(awaitCompanies)

    let sectionCompanies = document.getElementById("companies")
    let div = document.createElement("div")
    let table = document.createElement("table") //engloba toodo
    table.id = "table-company"
    let thead = document.createElement("thead")
    let tr = document.createElement("tr")

    let a = []
    awaitCompanies.forEach(element => {
       
        a = Object.values(element)
        console.log(a)
        a.forEach(e => {
            let th = document.createElement("th")
            th.innerHTML = `${e}`
           
            tr.appendChild(th)
        });
        
        
    });
    
    thead.appendChild(tr)
    table.appendChild(thead)
    div.appendChild(table)
    sectionCompanies.appendChild(div)
}

createCompanies()


//POST
/* let postCompany = async (name, address, email, tel) =>{

    var data = {
      name,
      address,
      email,
      tel,
      //cityId
    }
  
    let searchApi = await fetch(`http://localhost:3000/companies`, {
        method: "POST" ,
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    await searchApi.json()
  
  }

const inputName = document.getElementById("POST-name")
const inputAddress = document.getElementById("POST-address")
const inputEmail = document.getElementById("POST-email")
const inputTel = document.getElementById("POST-tel")
const selectCity = document.getElementById("city")
const saveCompany = document.getElementById("save-company")

console.log(inputName.value)
console.log(inputAddress.value)
async function newCompany() {

saveCompany.addEventListener("click", async () => {

        //postCompany(inputName.value, inputAddress.value, inputAddress.value, inputEmail.value, inputTel.value)
        location.href = "../html/company.html"

    })

}

newCompany()    */
