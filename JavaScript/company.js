

let sectionNewCompany = document.getElementById("section-new-company")
let closenewCompany = document.getElementById("close-company")
let addCompany = document.getElementById("button-new-company")
let backgroundBlack = document.getElementById("black-company")



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
  const inputName = document.getElementById("name")
  const inputAddress = document.getElementById("address")
  const inputEmail = document.getElementById("email")
  const inputTel = document.getElementById("tel")
  const saveCompany = document.getElementById("save-company")
  let ciudadId;
  
  let awaitCity = await callCities()
  
  awaitCity.forEach(element => {

    let selectCity = document.getElementById("select-city")
    let option = document.createElement("option")
    option.innerHTML = `${element.name}`
    selectCity.appendChild(option)
    
    selectCity.addEventListener("click", (e) => {
      
 
      let pais= e.target.value
      console.log(pais)

      if(pais == element.name){

        ciudadId = element.id
        console.log(ciudadId)
    
     }   
  
    })
  }); 

  
  saveCompany.addEventListener("click", async () => {
  
    postCompany(inputName.value, inputAddress.value, inputEmail.value, inputTel.value, ciudadId)
    location.href = "../html/company.html"
  
  })
}

choseCity()




async function createCompanies() {

  let awaitCompanies = await callCompanies()

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
 
    for (let i = 1; i < a.length; i++) {

      let td = document.createElement("td")
      td.innerHTML = `${a[i]}`
      tr2.appendChild(td)
      

      let iconDelete = document.createElement("i")
      let idCompany;
      if (i == 5) {
        td.innerHTML = `${a[i].name}`
        idCompany = `${a[0]}`
        iconDelete.className = "far fa-trash-alt"
        let iconEdit = document.createElement("i")
        iconEdit.className = "far fa-edit"
        tr2.appendChild(td)
        tr2.appendChild(iconEdit)
        tr2.appendChild(iconDelete)

      }
      //delete 
      iconDelete.addEventListener("click", () => {
         
          deleteCompany(idCompany)
          location.href = "../html/company.html" 
      
          })  
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


////DELETE

let deleteCompany = async (id) =>{

  var data = {
    id
  }

  let searchApi = await fetch(`http://localhost:3000/companies/${id}`, {
      method: "DELETE" ,
      body: JSON.stringify(data),
      headers: {
          'Content-Type': 'application/json'
      }
  })
  await searchApi.json()

} 