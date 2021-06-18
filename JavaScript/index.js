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

//// GET CONTACTS
let callContacts = async () => {

    let searchApi = await fetch(`http://localhost:3000/contacts`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    })
  
    let res = await searchApi.json()

  console.log(res)

  
    if (res) {
      return res
  
  
    }
    else {
      console.log("error")
    }
  }


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
    
      console.log(a)
      let tr2 = document.createElement("tr")
      for (let i = 0; i < a.length; i++) {
          if (i == 0){
            let tdCheckbox = document.createElement("input")
            tdCheckbox.type = "checkbox"
            tr2.appendChild(tdCheckbox)
             
          }
          if (i==1){

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
          if (i==2){
            let td = document.createElement("td")
            td.innerHTML = a[7].name
            tr2.appendChild(td)
          }
          if (i==3){
            let td = document.createElement("td")
            td.innerHTML = a[4]
            tr2.appendChild(td)
          }
          if (i==4){
            let td = document.createElement("td")
            td.innerHTML = a[2]
            tr2.appendChild(td)
          }
          if (i==5){
            let td = document.createElement("td")
            td.innerHTML = "100"
            tr2.appendChild(td)
          }
          if (i==6){
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



//POST
let postContact  = async (name, last_name, position, email, company, canal_contacto, cuenta_usuario, regionId, countrieId, cityId) => {

  var data = {
    name,
    last_name,
    position,
    email,
    company,
    canal_contacto,
    cuenta_usuario,
    regionId, 
    countrieId, 
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

let deleteContact = async (id) =>{

  var data = {
    id
  }

  let searchApi = await fetch(`http://localhost:3000/contacts/${id}`, {
      method: "DELETE" ,
      body: JSON.stringify(data),
      headers: {
          'Content-Type': 'application/json'
      }
  })
  await searchApi.json()

} 