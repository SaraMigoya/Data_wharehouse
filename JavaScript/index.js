

let arrow = document.getElementById("arrow")
let expand = document.getElementById("expand")
let addContact = document.getElementById("button-new-contact")
let backgroundBlack = document.getElementById("black")
let sectionNewContact = document.getElementById("section-new-contact")
let closenewContact = document.getElementById("close")
let cancel = document.getElementById("cancel")


arrow.addEventListener("click", () => {
  expand.classList.toggle("none")

})

addContact.addEventListener("click", () => {
  sectionNewContact.classList.toggle("none")
  backgroundBlack.classList.toggle("none")
})

closenewContact.addEventListener("click", () => {
  sectionNewContact.classList.toggle("none")
  backgroundBlack.classList.toggle("none")
})
cancel.addEventListener("click", () => {
  sectionNewContact.classList.toggle("none")
  backgroundBlack.classList.toggle("none")
})




//// GET CONTACTS
let callContacts = async () => {

  let searchApi = await fetch(`http://localhost:3000/contacts`, {
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

//// GET REGIONS
let callRegions = async () => {

  let searchApi = await fetch(`http://localhost:3000/regions`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    }
  })

  let searchCompany = await fetch(`http://localhost:3000/companies`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    }
  })

  let resCompany = await searchCompany.json()

  let res = await searchApi.json()
  let obj = {
    companies: resCompany,
    regions: res
  }
  console.log(obj)
return obj
}


let name = document.getElementById("name")
const lastName = document.getElementById("lastname")
const position = document.getElementById("cargo")
const email = document.getElementById("email")
const company = document.getElementById("company")
const region = document.getElementById("region")
const country = document.getElementById("country")
const city = document.getElementById("city")
const address = document.getElementById("address")
let selectInteres = document.getElementById("interes-new-contact")
const userAccount = document.getElementById("user-account")
const canalContacto = document.getElementById("canal")
const saveContact = document.getElementById("save-contact")


let regionId;
let countryId;
let cityId;
let interes;
let companyId;

name.addEventListener("keyup", () =>{
  saveContact.classList.add("verde")
  cancel.innerHTML = "Eliminar contacto"
  cancel.classList.add("btn-cancel-red")
  btnAddChannel.classList.add("btb-new-contact-blue")

})
selectInteres.addEventListener("change", (e) =>{
  num = e.target.value
  console.log(num)
  if(num == "100%"){
    interes = "100%"
  }
  if(num == "75%"){
    interes = "100%"
  }
  if(num == "50%"){
    interes = "100%"
  }
  if(num == "25%"){
    interes = "100%"
  }
  if(num == "0%"){
    interes = "100%"
  }
})


///CARGAR REGIONES PAISES Y CIUDADES
async function choseRegions() {

  let objRegions = await callRegions();
  let arr = Object.values(objRegions)
  let awaitRegions = arr[1]
  let awaitCompanies = arr[0]


  awaitCompanies.forEach(element =>{
    let optionCompanies = document.createElement("option")
    optionCompanies.innerHTML = `${element.name}`

    company.addEventListener("change", (e) =>{
      console.log(e.target.value)
      if (e.target.value == element.name) {
        companyId = element.name
      }
    })

    company.appendChild(optionCompanies)
  })

  awaitRegions.allRegions.forEach(element => {

    let optionRegions = document.createElement("option")
    optionRegions.innerHTML = `${element.name}`

    region.addEventListener("change", (e) => {

      if (e.target.value == element.name) {

        regionId = element.id
        console.log(regionId)

        if (country.options.length > 1) {

          for (let i = country.options.length; i >= 1; i--) {
            country.remove(i);
          }
        }

        element.countries.forEach(e => {

          document.getElementById("country").disabled = false
          country.classList.remove("background-gray")
          let optionCountries = document.createElement("option")
          optionCountries.innerHTML = `${e.name}`
          country.appendChild(optionCountries)

          country.addEventListener("change", (event) =>{
            if (event.target.value == e.name) {
               countryId = e.id
               console.log(countryId)
               if (city.options.length > 1) {
      
                for (let i = city.options.length; i >= 1; i--) {
                  city.remove(i);
                }
              } 
              e.cities.forEach(x => {
                document.getElementById("city").disabled = false
                city.classList.remove("background-gray")
                address.classList.remove("background-gray")
                city.addEventListener("change", (e) =>{
                  if (e.target.value == x.name){
                    cityId = x.id
                    console.log(cityId)
                  }
                  
                })
                document.getElementById("city").disabled = false
                let optionCities = document.createElement("option")
                optionCities.innerHTML = `${x.name}`
                city.appendChild(optionCities)
              })
            }
          
      
            
          })

         
        });
      }


    })

    region.appendChild(optionRegions)

  });

}
choseRegions()


//CREAR CONTACTOS
async function createContacts() {

  let awaitContacts = await callContacts()

  let sectionContacts = document.getElementById("contacts")
  let div = document.createElement("div")
  let table = document.createElement("table-contacts")
  table.id = "table-contacts"
  let thead = document.createElement("thead")
  let tr = document.createElement("tr")
  let thCheckbox = document.createElement("th")
  let inputCheckbox = document.createElement("input")
  inputCheckbox.type = "checkbox"
  thCheckbox.appendChild(inputCheckbox)
  let thContact = document.createElement("th")
  let thCountry = document.createElement("th")
  let thCompany = document.createElement("th")
  let thPosition = document.createElement("th")
  let thInteres = document.createElement("th")
  let thActions = document.createElement("th")
  thContact.innerHTML = "Contacto"
  thCountry.innerHTML = "País/Región"
  thCompany.innerHTML = "Compañía"
  thPosition.innerHTML = "Cargo"
  thInteres.innerHTML = "Interés"
  thActions.innerHTML = "Acciones"
  let span = document.createElement("span")
  let arrow = document.createElement("i")
  arrow.className = "fas fa-exchange-alt"
  span.appendChild(arrow)
  let span2 = document.createElement("span")
  let arrow2 = document.createElement("i")
  arrow2.className = "fas fa-exchange-alt"
  span2.appendChild(arrow2)
  let span3 = document.createElement("span")
  let arrow3 = document.createElement("i")
  arrow3.className = "fas fa-exchange-alt"
  span3.appendChild(arrow3)
  let span4 = document.createElement("span")
  let arrow4 = document.createElement("i")
  arrow4.className = "fas fa-exchange-alt"
  span4.appendChild(arrow4)
  let span5 = document.createElement("span")
  let arrow5 = document.createElement("i")
  arrow5.className = "fas fa-exchange-alt"
  span5.appendChild(arrow5)

  let tbody = document.createElement("tbody")
  let a = []
  awaitContacts.forEach(element => {

    a = Object.values(element)


    let tr2 = document.createElement("tr")
    for (let i = 0; i < a.length; i++) {
      if (i == 0) {
        let tdCheckbox = document.createElement("input")
        tdCheckbox.type = "checkbox"
        tr2.appendChild(tdCheckbox)

      }
      if (i == 1) {

        let td = document.createElement("td")
        let divContact = document.createElement("div") //al final hacer hijo al divcontact de tr2
        divContact.className = "contact"
        let divName = document.createElement("div")
        divName.className = "name"
        divContact.appendChild(divName)
        let p1 = document.createElement("p")
        p1.innerHTML = a[0] + a[1]
        p1.className = "pName"
        let p = document.createElement("p")
        p.innerHTML = a[3]
        divName.appendChild(p1) 
        divName.appendChild(p)
        td.appendChild(divContact)
        tr2.appendChild(td)
      }
      
      if (i == 2) {
        let td = document.createElement("td")
        td.innerHTML = a[8].name
        tr2.appendChild(td)
      }
      if (i == 3) {
        let td = document.createElement("td")
        td.innerHTML = a[4]
        tr2.appendChild(td)
      }
      if (i == 4) {
        let td = document.createElement("td")
        td.innerHTML = a[2]
        tr2.appendChild(td)
      }
      if (i == 5) {
        let td = document.createElement("td")
        td.innerHTML = a[6]
        tr2.appendChild(td)
      }
      if (i == 7) {
        let td = document.createElement("td")
        td.innerHTML = a[7]
        tr2.appendChild(td)
      }
      if (i == 8) {
        let td = document.createElement("td")
        td.innerHTML = "..."
        td.className = "tdActions"
        let iconDelete = document.createElement("i")
        iconDelete.className = "far fa-trash-alt"
        iconDelete.id = "icon2"
        tr2.appendChild(td)
        tr2.appendChild(iconDelete)
      }

      tbody.appendChild(tr2)
    }

  });

  thead.appendChild(tr)
  table.appendChild(thead)
  thead.appendChild(tr)
  div.appendChild(table)
  table.appendChild(tbody)
  tr.appendChild(thCheckbox)
  tr.appendChild(thContact)
  thContact.appendChild(span)
  tr.appendChild(thCountry)
  thCountry.appendChild(span2)
  tr.appendChild(thCompany)
  thCompany.appendChild(span3)
  tr.appendChild(thPosition)
  thPosition.appendChild(span4)
  tr.appendChild(thInteres)
  thInteres.appendChild(span5)
  tr.appendChild(thActions)
  sectionContacts.appendChild(div)

}

createContacts()

//GUARDAR CONTACTO
saveContact.addEventListener("click", async () => {

  //postContact("name.value", "lastName.value", "position.value", "email.value", "companyId", "interes", "1", "6", "13")
  postContact(name.value, lastName.value, position.value, email.value, companyId, interes, regionId, countryId, cityId)

})
////AGREGAR CANAL

let btnAddChannel = document.getElementById("btn-add-channel")
let containerChannel = document.getElementById("container-channel")
let containerSelect = document.getElementById("container-select")
let containerUserAccount = document.getElementById("container-usser-account")
let arraychannels = ["Whatsapp", "Facebook", "Instagram", "Slack", "Email", "Mensaje"]
let preferencias = []

btnAddChannel.addEventListener("click", ()=>{
  //canal contactos
  let label = document.createElement("label")
  label.for = "canal"
  let div = document.createElement("div")
  let select = document.createElement("select")
  select.name = "canal"
  
  arraychannels.forEach(element => {
    let option = document.createElement("option")
    option.innerHTML = element
    
    select.appendChild(option)
  });
  label.innerHTML = "Canal de contacto"
  
  containerChannel.appendChild(label)
  containerChannel.appendChild(div)
  div.appendChild(select)

  // cuenta usuario
  let labelAccount = document.createElement("label")
  labelAccount.for = "user-account"
  labelAccount.innerHTML = "Cuenta de usuario"
  let div2 = document.createElement("div")
  let input = document.createElement("input")
  input.placeholder = "@ejemplo"
  div2.appendChild(input)

  containerUserAccount.appendChild(labelAccount)
  containerUserAccount.appendChild(div2)


})
//POST CONTACTOS
let postContact = async (name, last_name, position, email, company, interes, regionId, countrieId, cityId) => {

  var data = {
    name,
    last_name,
    position,
    email,
    company,
    interes,
    regionId,
    countrieId,
    cityId, 
 
  }

  let searchApi = await fetch(`http://localhost:3000/contacts`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  
  await searchApi.json()
  location.href = "../html/index.html"
}

////DELETE CONTACTOS

let deleteContact = async (id) => {

  var data = {
    id
  }

  let searchApi = await fetch(`http://localhost:3000/contacts/${id}`, {
    method: "DELETE",
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  await searchApi.json()

} 