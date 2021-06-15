let sectionNewCompany = document.getElementById("section-new-company")
let closenewCompany = document.getElementById("close-company")
let addCompany = document.getElementById("button-new-company")
let backgroundBlack = document.getElementById("black-company")

const inputName = document.getElementById("name")
const inputAddress = document.getElementById("address")
const inputEmail = document.getElementById("email")
const inputTel = document.getElementById("tel")
const selectCity = document.getElementById("select-city")
const saveCompany = document.getElementById("save-company")

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

//// GET CITIES
let callCities = async () => {

  let searchApi = await fetch(`http://localhost:3000/regions/cities`, {
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
callCities()

addCompany.addEventListener("click", () => {
  sectionNewCompany.classList.toggle("none")
  backgroundBlack.classList.toggle("none")
})

closenewCompany.addEventListener("click", () => {
  sectionNewCompany.classList.toggle("none")
  backgroundBlack.classList.toggle("none")
})


async function choseCity() {
  let awaitCity = await callCities()


  selectCity.addEventListener("click", () => {

    if (selectCity.options.length > 1) {
        for (let i = selectCity.options.length; i >= 1; i--) {
        selectCity.remove(i);
      } 
    }

    awaitCity.forEach(element => {

      let option = document.createElement("option")
      option.innerHTML = `${element.name}`
      option.id = "option2"
      selectCity.appendChild(option)
      
      if(option == element.name) {
         alert("hola")

     } 
    });

  })


}

choseCity()



async function createCompanies() {

  let awaitCompanies = await callCompanies()
  let awaitCity = await callCities()


  let sectionCompanies = document.getElementById("companies")
  let div = document.createElement("div")
  let table = document.createElement("table")
  table.id = "table-company"
  let thead = document.createElement("thead")
  let tr = document.createElement("tr")
  let thName = document.createElement("th")
  let thAddress = document.createElement("th")
  let thEmail = document.createElement("th")
  let thTel = document.createElement("th")
  let thCity = document.createElement("th")
  let thActions = document.createElement("th")
  thName.innerHTML = "Nombre"
  thAddress.innerHTML = "Dirección"
  thEmail.innerHTML = "Email"
  thTel.innerHTML = "Teléfono"
  thCity.innerHTML = "Ciudad"
  thActions.innerHTML = "Acciones"

  let tbody = document.createElement("tbody")

  let a = []
  awaitCompanies.forEach(element => {

    a = Object.values(element)

    let tr2 = document.createElement("tr")
    for (let i = 0; i < a.length; i++) {

      let td = document.createElement("td")
      td.innerHTML = `${a[i]}`
      tr2.appendChild(td)
      console.log(a)
      
       if (i == 4) {
        td.innerHTML = `${a[i].name}`
      } 
      if (i == 5) {
        td.innerHTML = "editar / eliminar"
      }

    }
    tbody.appendChild(tr2)
  });

  thead.appendChild(tr)
  table.appendChild(thead)
  div.appendChild(table)
  table.appendChild(tbody)
  tr.appendChild(thName)
  tr.appendChild(thAddress)
  tr.appendChild(thEmail)
  tr.appendChild(thTel)
  tr.appendChild(thCity)
  tr.appendChild(thActions)
  sectionCompanies.appendChild(div)


}

createCompanies()






//POST
let postCompany = async (name, address, email, tel, cityId) => {

  var data = {
    name,
    address,
    email,
    tel,
    cityId
  }

  let searchApi = await fetch(`http://localhost:3000/companies`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  console.log(searchApi)
  await searchApi.json()

}


async function save() {


  saveCompany.addEventListener("click", async () => {



    postCompany(inputName.value, inputAddress.value, inputEmail.value, inputTel, "2")


  })
}

save()
