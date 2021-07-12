
let arrow = document.getElementById("arrow")
let expand = document.getElementById("expand")
let addContact = document.getElementById("button-new-contact")
let backgroundBlack = document.getElementById("black")
let sectionNewContact = document.getElementById("section-new-contact")
let closenewContact = document.getElementById("close")
let cancel = document.getElementById("cancel")

function addClose (evento) {

  evento.addEventListener("click", () => {
    sectionNewContact.classList.toggle("none")
    backgroundBlack.classList.toggle("none")
  })
  
}
addClose(addContact)
addClose(closenewContact)
addClose(cancel)
let get = async (search)=>{

  let searchApi = await fetch(`http://localhost:3000/contacts/${search}`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    }
  })
  let res = await searchApi.json()
  

  if (res) {
  console.log(res)
    return res

  }
  else {
    console.log("error")
  }
}

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
  return obj
}

///NEW CONTACT SECTION
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

name.addEventListener("keyup", () => {
  saveContact.classList.add("verde")
  cancel.innerHTML = "Eliminar contacto"
  cancel.classList.add("btn-cancel-red")
  btnAddChannel.classList.add("btb-new-contact-blue")

})

selectInteres.addEventListener("change", (e) => {
  num = e.target.value
  console.log(num)
  if (num == "100%") {
    interes = "100%"
  }
  if (num == "75%") {
    interes = "100%"
  }
  if (num == "50%") {
    interes = "100%"
  }
  if (num == "25%") {
    interes = "100%"
  }
  if (num == "0%") {
    interes = "100%"
  }
})

///CARGAR REGIONES PAISES Y CIUDADES
async function choseRegions() {

  let objRegions = await callRegions();
  let arr = Object.values(objRegions)
  let awaitRegions = arr[1]
  let awaitCompanies = arr[0]


  awaitCompanies.forEach(element => {
    let optionCompanies = document.createElement("option")
    optionCompanies.innerHTML = `${element.name}`

    company.addEventListener("change", (e) => {
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

          country.addEventListener("change", (event) => {
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
                city.addEventListener("change", (e) => {
                  if (e.target.value == x.name) {
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
const sectionContacts = document.getElementById("contacts")
const div = document.getElementById("div")
const table = document.getElementById("table-contacts")
const thead = document.getElementById("thead")
const tr = document.getElementById("tr-titles")
const thContact = document.getElementById("th-contact")
const thCountry = document.getElementById("th-country")
const thCompany = document.getElementById("th-company")
const thPosition = document.getElementById("th-position")
const thInteres = document.getElementById("th-interes")
const thActions = document.getElementById("th-actions")

async function createContacts() {
 
  let awaitContacts = await callContacts()
  const tbody = document.createElement("tbody")
 
  let indicador = 0
  let a = []
  let contactosSelec;
  const exchangeAlt = document.getElementById("exchange-alt")
  
  let orderName
  exchangeAlt.addEventListener("click", () =>{
    let cantidadAnterior = tbody.children.length

  
    awaitContacts.sort(function (a, b) {
     
      if (a.name.toLowerCase() > b.name.toLowerCase()){
       orderName = true
        return 1;
      } 
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        orderName = false
        return -1;
      } 
      return 0;
      
    }); 

    if(orderName==true) {
      
      awaitContacts.reverse()

    }
    awaitContacts.forEach(element => {

      a = Object.values(element)
      contactosSelec = []
      let tr2 = document.createElement("tr")
    
 
      for (let i = 0; i < a.length; i++) {
  
        if (i == 0) {
          let tdCheckbox = document.createElement("input")
          tdCheckbox.type = "checkbox"
          tdCheckbox.id = element.id
          tdCheckbox.classList = "checkbox2 check"
          tr2.appendChild(tdCheckbox)
  
          tdCheckbox.addEventListener("click", (e) => {
            document.getElementById("contact-selected").removeAttribute("hidden")
            if (e.target.checked == true) {
  
              contactosSelec.push(element.id)
        
              tr2.style = "background: rgb(213 235 255)"
            }else{
  
              contactosSelec = contactosSelec.filter(function(i) { return i !== element.id })
      
              tr2.style = ""
            }
  
            document.getElementById("contact-selected").innerHTML = `${contactosSelec.length} seleccionados`
  
              if(contactosSelec.length == 0){
                document.getElementById("contact-selected").toggleAttribute("hidden")
                //tr2.classList.remove("checked")
              } 
          })
  
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
          td.classListm = "delete"
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
        /*      if (i == 7) {
               let td = document.createElement("td")
               td.innerHTML = a[7]
               tr2.appendChild(td)
             } */
        if (i == 8) {
          let td = document.createElement("td")
          
          td.innerHTML = "..."
          tr2.appendChild(td)
          td.className = "tdActions"
          let iconDelete = document.createElement("i")
          let iconEdit = document.createElement("i")
          iconDelete.className = "fas fa-trash"
          iconDelete.id = "icon2"
          iconEdit.className = "fas fa-pen"
          iconEdit.id = "icon3"
          let b = document.getElementById("section-alert")
           let idContact;
          iconDelete.addEventListener("click", () => {
  
         backgroundBlack.classList.toggle("none")
            b.classList.toggle("none")
             idContact = element.id
          })
          let deleteConfirm = document.getElementById("delete-confirm")
        
          deleteConfirm.addEventListener("click", ()=>{
            
            deleteContact(idContact)
  
          }) 
  
        addClose(iconEdit)
          tr2.appendChild(td)
          tr2.appendChild(iconDelete)
          tr2.appendChild(iconEdit)
        }
        tbody.appendChild(tr2)
      }
      let nuevaCantidad = tbody.children.length


        let vueltas = nuevaCantidad - cantidadAnterior
        // console.log("vueltas", vueltas)
        parseInt(vueltas)
      
        for (let i = 0; i <= vueltas; i++){
          console.log(indicador)
          if(i < vueltas){
              tbody.firstChild.remove()
          }
          if(i == vueltas && indicador == 0){
              indicador = 1
       
              tbody.firstChild.remove()
       
              
          }
          if(i == vueltas && indicador == 1){
              console.log("no")
          }
          
      }
    });

   }) 
   

  awaitContacts.forEach(element => {

    a = Object.values(element)
    contactosSelec = []
    let tr2 = document.createElement("tr")
    tr2.classList = "delete"
   
    for (let i = 0; i < a.length; i++) {

      if (i == 0) {
        let tdCheckbox = document.createElement("input")
        tdCheckbox.type = "checkbox"
        tdCheckbox.id = element.id
        tdCheckbox.classList = "checkbox2 check"
        tr2.appendChild(tdCheckbox)

        tdCheckbox.addEventListener("click", (e) => {
          document.getElementById("contact-selected").removeAttribute("hidden")
          if (e.target.checked == true) {

            contactosSelec.push(element.id)
      
            tr2.style = "background: rgb(213 235 255)"
          }else{

            contactosSelec = contactosSelec.filter(function(i) { return i !== element.id })
    
            tr2.style = ""
          }

          document.getElementById("contact-selected").innerHTML = `${contactosSelec.length} seleccionados`

            if(contactosSelec.length == 0){
              document.getElementById("contact-selected").toggleAttribute("hidden")
              //tr2.classList.remove("checked")
            } 
        })

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
        td.classListm = "delete"
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
      /*      if (i == 7) {
             let td = document.createElement("td")
             td.innerHTML = a[7]
             tr2.appendChild(td)
           } */
      if (i == 8) {
        let td = document.createElement("td")
        
        td.innerHTML = "..."
        tr2.appendChild(td)
        td.className = "tdActions"
        let iconDelete = document.createElement("i")
        let iconEdit = document.createElement("i")
        iconDelete.className = "fas fa-trash"
        iconDelete.id = "icon2"
        iconEdit.className = "fas fa-pen"
        iconEdit.id = "icon3"
        let b = document.getElementById("section-alert")
         let idContact;
        iconDelete.addEventListener("click", () => {

       backgroundBlack.classList.toggle("none")
          b.classList.toggle("none")
           idContact = element.id
        })
        let deleteConfirm = document.getElementById("delete-confirm")
      
        deleteConfirm.addEventListener("click", ()=>{
          
          deleteContact(idContact)

        }) 

      addClose(iconEdit)
        tr2.appendChild(td)
        tr2.appendChild(iconDelete)
        tr2.appendChild(iconEdit)
      }
      tbody.appendChild(tr2)
    }
    
  });
 
  thead.appendChild(tr)
  table.appendChild(thead)
  thead.appendChild(tr)
  div.appendChild(table)
  table.appendChild(tbody)
  sectionContacts.appendChild(div)
}

createContacts()

let a = document.getElementById("checkbox4")
let deleteContacts = document.getElementById("delete-contacts")
let icondel = document.getElementById("icon-delete")
let arrayIdContactos;
let checks = document.getElementsByClassName("checkbox2")



a.addEventListener("click", (e) => {
let arrayIdContactos = []

  if (e.target.checked == true) {

    for (let i = 0; i < checks.length; i++) {
      arrayIdContactos.push(checks[i].id)
      checks[i].checked = true;
    }
    deleteContacts.classList.remove("delete-contact")
    icondel.classList.remove("delete-contact")

    console.log(arrayIdContactos)
    if (arrayIdContactos == 0) {

      deleteContacts.classList.add("delete-contact")
    }

  }

  else {

    for (let i = 0; i < checks.length; i++) {
      checks[i].checked = false;
  
    }
    deleteContacts.classList.add("delete-contact")
  }

})

deleteContacts.addEventListener("click", () => {
  arrayIdContactos.forEach(element => {

    deleteContact(element)
  });
})

//GUARDAR CONTACTO
saveContact.addEventListener("click", async () => {
  postContact(name.value, lastName.value, position.value, email.value, companyId, interes, regionId, countryId, cityId)

})
////AGREGAR CANAL

let btnAddChannel = document.getElementById("btn-add-channel")
let containerChannel = document.getElementById("container-channel")
let containerSelect = document.getElementById("container-select")
let containerUserAccount = document.getElementById("container-usser-account")
let arraychannels = ["Whatsapp", "Facebook", "Instagram", "Slack", "Email", "Mensaje"]
let preferencias = []

btnAddChannel.addEventListener("click", () => {
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



////

  const inputSearch= document.getElementById("input")

  inputSearch.addEventListener("keyup", async (e)=>{
    const tbody = document.createElement("tbody")
    let v = e.target.value
    let a = await get(v)
    if(e.keyCode===13) {
      a.forEach(element => {

        a = Object.values(element)
        contactosSelec = []
        let tr2 = document.createElement("tr")
      
   
        for (let i = 0; i < a.length; i++) {
    
          if (i == 0) {
            let tdCheckbox = document.createElement("input")
            tdCheckbox.type = "checkbox"
            tdCheckbox.id = element.id
            tdCheckbox.classList = "checkbox2 check"
            tr2.appendChild(tdCheckbox)
    
            tdCheckbox.addEventListener("click", (e) => {
              document.getElementById("contact-selected").removeAttribute("hidden")
              if (e.target.checked == true) {
    
                contactosSelec.push(element.id)
          
                tr2.style = "background: rgb(213 235 255)"
              }else{
    
                contactosSelec = contactosSelec.filter(function(i) { return i !== element.id })
        
                tr2.style = ""
              }
    
              document.getElementById("contact-selected").innerHTML = `${contactosSelec.length} seleccionados`
    
                if(contactosSelec.length == 0){
                  document.getElementById("contact-selected").toggleAttribute("hidden")
                  //tr2.classList.remove("checked")
                } 
            })
    
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
            td.classListm = "delete"
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
          /*      if (i == 7) {
                 let td = document.createElement("td")
                 td.innerHTML = a[7]
                 tr2.appendChild(td)
               } */
          if (i == 8) {
            let td = document.createElement("td")
            
            td.innerHTML = "..."
            tr2.appendChild(td)
            td.className = "tdActions"
            let iconDelete = document.createElement("i")
            let iconEdit = document.createElement("i")
            iconDelete.className = "fas fa-trash"
            iconDelete.id = "icon2"
            iconEdit.className = "fas fa-pen"
            iconEdit.id = "icon3"
            let b = document.getElementById("section-alert")
             let idContact;
            iconDelete.addEventListener("click", () => {
    
           backgroundBlack.classList.toggle("none")
              b.classList.toggle("none")
               idContact = element.id
            })
            let deleteConfirm = document.getElementById("delete-confirm")
          
            deleteConfirm.addEventListener("click", ()=>{
              
              deleteContact(idContact)
    
            }) 
    
          addClose(iconEdit)
            tr2.appendChild(td)
            tr2.appendChild(iconDelete)
            tr2.appendChild(iconEdit)
          }
          tbody.appendChild(tr2)
        }
      
            
      
      });
      thead.appendChild(tr)
      table.appendChild(thead)
      thead.appendChild(tr)
      div.appendChild(table)
      table.appendChild(tbody)
      sectionContacts.appendChild(div)
    }



  })



/*  let search2 = document.getElementById("search")
search2.addEventListener("click", (e)=>{
    let v = e.target.value
   
    getContactSearch(v)
}) */
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
  location.href = "../html/index.html"

} 


