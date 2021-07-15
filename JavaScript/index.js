

window.history.forward("../html/login.html")
const arrow = document.getElementById("arrow")
const expand = document.getElementById("expand")
const addContact = document.getElementById("button-new-contact")
const backgroundBlack = document.getElementById("black")
const sectionNewContact = document.getElementById("section-new-contact")
const sectionEditContact = document.getElementById("section-edit-contact")
const closenewContact = document.getElementById("close")
const closeEditContact = document.getElementById("close-edit-contact")
const cancel = document.getElementById("cancel")
const cancel2 = document.getElementById("cancel2")

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
const saveContact2 = document.getElementById("save-contact2")
let regionId;
let countryId;
let cityId;
let interes;
let companyId;

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


const a = document.getElementById("checkbox4")
const deleteContacts = document.getElementById("delete-contacts")
let icondel = document.getElementById("icon-delete")
let arrayIdContactos;
let checks = document.getElementsByClassName("checkbox2")

const btnAddChannel = document.getElementById("btn-add-channel")
const containerChannel = document.getElementById("container-channel")
const containerSelect = document.getElementById("container-select")
const containerUserAccount = document.getElementById("container-usser-account")
let arraychannels = ["Whatsapp", "Facebook", "Instagram", "Slack", "Email", "Mensaje"]
let preferencias = []
let users = JSON.parse(localStorage.getItem("user"))
if (users) {

  
  
  if (users.isadmin == false) {
    document.getElementById("htmlUsuarios").style = "display: none"
  }
}

let logOut = document.getElementById("log-out")
logOut.addEventListener("click", () => {
    localStorage.clear()
    location.href ="../html/login.html#!"
})

function addClose(evento, section) {

  evento.addEventListener("click", () => {
    section.classList.toggle("none")
    backgroundBlack.classList.toggle("none")
  })

}

addClose(addContact, sectionNewContact)
addClose(closenewContact, sectionNewContact)
addClose(cancel, sectionNewContact)
//addClose(cancel2, sectionEditContact)
addClose(closeEditContact, sectionEditContact)
let get = async (search) => {

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


name.addEventListener("keyup", () => {
  saveContact.classList.add("verde")
  cancel.innerHTML = "Eliminar contacto"
  cancel.classList.add("btn-cancel-red")
  btnAddChannel.classList.add("btb-new-contact-blue")

})


selectInteres.addEventListener("change", (e) => {
  num = e.target.value
  if (num == "100%") {
    interes = "100%"
  }
  if (num == "75%") {
    interes = "75%"
  }
  if (num == "50%") {
    interes = "50%"
  }
  if (num == "25%") {
    interes = "25%"
  }
  if (num == "0%") {
    interes = "0%"
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
async function createContacts() {
  let objRegions = await callRegions();
  let arr = Object.values(objRegions)
  let awaitRegions = arr[1]
  let awaitCompanies = arr[0]


  let awaitContacts = await callContacts()
  const tbody = document.createElement("tbody")
  tbody.className = "delete"

  let indicador = 0
  let a = []
  let contactosSelec;
  let orderName;
  const exchangeAlt = document.getElementById("exchange-alt")
  const exchangeAltCountry = document.getElementById("exchange-alt-country")
  const exchangeAltCompany = document.getElementById("exchange-alt-company")
  const exchangeAltposition = document.getElementById("exchange-alt-position")
  const exchangeAltinterest = document.getElementById("exchange-alt-interest")
  
  exchangeAltCountry.addEventListener("click", () =>{
    let cantidadAnterior = tbody.children.length
    console.log(awaitContacts)
    awaitContacts.sort(function (a, b) {

      if (a.countrie.name.toLowerCase() > b.countrie.name.toLowerCase()) {
        orderName = true
        return 1;
      }
      if (a.countrie.name.toLowerCase() < b.countrie.name.toLowerCase()) {
        orderName = false
        return -1;
      }
      return 0;

    });

    if (orderName == true) {
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
            } else {

              contactosSelec = contactosSelec.filter(function (i) { return i !== element.id })

              tr2.style = ""
            }

            document.getElementById("contact-selected").innerHTML = `${contactosSelec.length} seleccionados`

            if (contactosSelec.length == 0) {
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
          p1.innerHTML = `${a[0]}  ${a[1]}`
          p1.className = "pName"
          let p = document.createElement("p")
          p.innerHTML = a[3]
          divName.appendChild(p1)
          //divName.appendChild(p2)
          divName.appendChild(p)
          td.appendChild(divContact)
          tr2.appendChild(td)
        }
  
        if (i == 2) {
          let td = document.createElement("td")
          td.classListm = "delete"
          td.innerHTML = a[10].name
          let divContact = document.createElement("div") 
          let divName = document.createElement("div")
          divName.className = "name"
          divContact.appendChild(divName)
          let p = document.createElement("p")
          p.innerHTML = a[9].name
          divName.appendChild(p)
          td.appendChild(divContact)
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

          td.innerHTML = a[5]
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
            
              let idContact;
              let idContactEdit;

              iconDelete.addEventListener("click", () => {
                idContact = element.id
                deleteContact(idContact)
              })

      
              iconEdit.addEventListener("click", () => {
                idContactEdit = element.id
              
                document.getElementById("name2").value = element.name
                document.getElementById("lastname2").value = element.last_name
                document.getElementById("cargo2").value = element.position
                document.getElementById("email2").value = element.email
                document.getElementById("option-edit").innerHTML = element.company
                document.getElementById("option-edit2").innerHTML = element.region.name
                document.getElementById("option-edit3").innerHTML = element.countrie.name
                document.getElementById("option-edit4").innerHTML = element.city.name
                document.getElementById("option-edit5").innerHTML = element.interes

      
                awaitCompanies.forEach(element => {
                  let optionCompanies2 = document.createElement("option")
                  optionCompanies2.innerHTML = element.name
                  document.getElementById("company2").addEventListener("change", (e) => {
                    console.log(e.target.value)
                    if (e.target.value == element.name) {
                      companyId = element.name
                    }
                  })
      
                  document.getElementById("company2").appendChild(optionCompanies2)
                });
                awaitRegions.allRegions.forEach(element => {
      
                  let optionRegions = document.createElement("option")
                  optionRegions.innerHTML = `${element.name}`
      
                  document.getElementById("region2").addEventListener("change", (e) => {
      
                    if (e.target.value == element.name) {
      
                      regionId = element.id
                      console.log(regionId)
      
                      if (document.getElementById("country2").options.length > 1) {
      
                        for (let i = document.getElementById("country2").options.length; i >= 1; i--) {
                          document.getElementById("country2").remove(i);
                        }
                      }
      
                      element.countries.forEach(e => {
      
                        document.getElementById("country2").disabled = false
                        document.getElementById("country2").classList.remove("background-gray")
                        let optionCountries = document.createElement("option")
                        optionCountries.innerHTML = `${e.name}`
                        document.getElementById("country2").appendChild(optionCountries)
      
                        document.getElementById("country2").addEventListener("change", (event) => {
                          if (event.target.value == e.name) {
                            countryId = e.id
                            console.log(countryId)
                            if (document.getElementById("city2").options.length > 1) {
      
                              for (let i = document.getElementById("city2").options.length; i >= 1; i--) {
                                document.getElementById("city2").remove(i);
                              }
                            }
                            e.cities.forEach(x => {
                              document.getElementById("city2").disabled = false
                              document.getElementById("city2").classList.remove("background-gray")
                              address.classList.remove("background-gray")
                              document.getElementById("city2").addEventListener("change", (e) => {
                                if (e.target.value == x.name) {
                                  cityId = x.id
                                  console.log(cityId)
                                }
      
                              })
                              document.getElementById("city2").disabled = false
                              let optionCities = document.createElement("option")
                              optionCities.innerHTML = `${x.name}`
                              document.getElementById("city2").appendChild(optionCities)
                            })
                          }
      
                        })
      
      
                      });
                    }
      
      
                  })
      
                  document.getElementById("region2").appendChild(optionRegions)
      
                });
                let interest
                document.getElementById("interes-edit-contact").addEventListener("change", (e) => {
                  num = e.target.value
                  if (num == "100%") {
                    interest = "100%"
                  }
                  if (num == "75%") {
                    interest = "75%"
                  }
                  if (num == "50%") {
                    interest = "50%"
                  }
                  if (num == "25%") {
                    interest = "25%"
                  }
                  if (num == "0%") {
                    interest = "0%"
                  }
                })
                saveContact2.addEventListener("click", async () => {
                  console.log("hol")
                  putContact(idContactEdit, document.getElementById("name2").value, document.getElementById("lastname2").value, document.getElementById("cargo2").value, document.getElementById("email2").value, element.email.value, companyId, interest, regionId, countryId, cityId)
      
                })
              })
              cancel2.addEventListener("click",() => {
                deleteContact(idContactEdit)
              })
              addClose(iconEdit, sectionEditContact)
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

      for (let i = 0; i <= vueltas; i++) {
        console.log(indicador)
        if (i < vueltas) {
          tbody.firstChild.remove()
        }
        if (i == vueltas && indicador == 0) {
          indicador = 1

          tbody.firstChild.remove()


        }
        if (i == vueltas && indicador == 1) {
          console.log("no")
        }

      }
    });


  }) 

  exchangeAlt.addEventListener("click", () => {
    let cantidadAnterior = tbody.children.length


    awaitContacts.sort(function (a, b) {

      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        orderName = true
        return 1;
      }
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        orderName = false
        return -1;
      }
      return 0;

    });


    if (orderName == true) {

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
            } else {

              contactosSelec = contactosSelec.filter(function (i) { return i !== element.id })

              tr2.style = ""
            }

            document.getElementById("contact-selected").innerHTML = `${contactosSelec.length} seleccionados`

            if (contactosSelec.length == 0) {
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
          p1.innerHTML = `${a[0]}  ${a[1]}`
          p1.className = "pName"
          let p = document.createElement("p")
          p.innerHTML = a[3]
          divName.appendChild(p1)
          //divName.appendChild(p2)
          divName.appendChild(p)
          td.appendChild(divContact)
          tr2.appendChild(td)
        }
  
        if (i == 2) {
          let td = document.createElement("td")
          td.classListm = "delete"
          td.innerHTML = a[10].name
          let divContact = document.createElement("div") 
          let divName = document.createElement("div")
          divName.className = "name"
          divContact.appendChild(divName)
          let p = document.createElement("p")
          p.innerHTML = a[9].name
          divName.appendChild(p)
          td.appendChild(divContact)
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

          td.innerHTML = a[5]
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
              let idContactEdit;
              iconDelete.addEventListener("click", () => {
                deleteContact(idContact)
                idContact = element.id
              })
      
              iconEdit.addEventListener("click", () => {
                idContactEdit = element.id
                document.getElementById("name2").value = element.name
                document.getElementById("lastname2").value = element.last_name
                document.getElementById("cargo2").value = element.position
                document.getElementById("email2").value = element.email
                document.getElementById("option-edit").innerHTML = element.company
                document.getElementById("option-edit2").innerHTML = element.region.name
                document.getElementById("option-edit3").innerHTML = element.countrie.name
                document.getElementById("option-edit4").innerHTML = element.city.name
      
                awaitCompanies.forEach(element => {
                  let optionCompanies2 = document.createElement("option")
                  optionCompanies2.innerHTML = element.name
                  document.getElementById("company2").addEventListener("change", (e) => {
                    console.log(e.target.value)
                    if (e.target.value == element.name) {
                      companyId = element.name
                    }
                  })
      
                  document.getElementById("company2").appendChild(optionCompanies2)
                });
                awaitRegions.allRegions.forEach(element => {
      
                  let optionRegions = document.createElement("option")
                  optionRegions.innerHTML = `${element.name}`
      
                  document.getElementById("region2").addEventListener("change", (e) => {
      
                    if (e.target.value == element.name) {
      
                      regionId = element.id
                      console.log(regionId)
      
                      if (document.getElementById("country2").options.length > 1) {
      
                        for (let i = document.getElementById("country2").options.length; i >= 1; i--) {
                          document.getElementById("country2").remove(i);
                        }
                      }
      
                      element.countries.forEach(e => {
      
                        document.getElementById("country2").disabled = false
                        document.getElementById("country2").classList.remove("background-gray")
                        let optionCountries = document.createElement("option")
                        optionCountries.innerHTML = `${e.name}`
                        document.getElementById("country2").appendChild(optionCountries)
      
                        document.getElementById("country2").addEventListener("change", (event) => {
                          if (event.target.value == e.name) {
                            countryId = e.id
                            console.log(countryId)
                            if (document.getElementById("city2").options.length > 1) {
      
                              for (let i = document.getElementById("city2").options.length; i >= 1; i--) {
                                document.getElementById("city2").remove(i);
                              }
                            }
                            e.cities.forEach(x => {
                              document.getElementById("city2").disabled = false
                              document.getElementById("city2").classList.remove("background-gray")
                              address.classList.remove("background-gray")
                              document.getElementById("city2").addEventListener("change", (e) => {
                                if (e.target.value == x.name) {
                                  cityId = x.id
                                  console.log(cityId)
                                }
      
                              })
                              document.getElementById("city2").disabled = false
                              let optionCities = document.createElement("option")
                              optionCities.innerHTML = `${x.name}`
                              document.getElementById("city2").appendChild(optionCities)
                            })
                          }
      
                        })
      
      
                      });
                    }
      
      
                  })
      
                  document.getElementById("region2").appendChild(optionRegions)
      
                });
                saveContact2.addEventListener("click", async () => {
                  console.log("hol")
                  putContact(idContactEdit, document.getElementById("name2").value, document.getElementById("lastname2").value, document.getElementById("cargo2").value, document.getElementById("email2").value, element.email.value, companyId, interes, regionId, countryId, cityId)
      
                })
              })
              cancel2.addEventListener("click",() => {
                deleteContact(idContactEdit)
              })
              addClose(iconEdit, sectionEditContact)
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

      for (let i = 0; i <= vueltas; i++) {
        console.log(indicador)
        if (i < vueltas) {
          tbody.firstChild.remove()
        }
        if (i == vueltas && indicador == 0) {
          indicador = 1

          tbody.firstChild.remove()


        }
        if (i == vueltas && indicador == 1) {
          console.log("no")
        }

      }
    });

  })
  exchangeAltCompany.addEventListener("click", () =>{
    let cantidadAnterior = tbody.children.length
    console.log(awaitContacts)
    awaitContacts.sort(function (a, b) {

      if (a.company.toLowerCase() > b.company.toLowerCase()) {
        orderName = true
        return 1;
      }
      if (a.company.toLowerCase() < b.company.toLowerCase()) {
        orderName = false
        return -1;
      }
      return 0;

    });

    if (orderName == true) {
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
            } else {

              contactosSelec = contactosSelec.filter(function (i) { return i !== element.id })

              tr2.style = ""
            }

            document.getElementById("contact-selected").innerHTML = `${contactosSelec.length} seleccionados`

            if (contactosSelec.length == 0) {
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
          p1.innerHTML = `${a[0]}  ${a[1]}`
          p1.className = "pName"
          let p = document.createElement("p")
          p.innerHTML = a[3]
          divName.appendChild(p1)
          //divName.appendChild(p2)
          divName.appendChild(p)
          td.appendChild(divContact)
          tr2.appendChild(td)
        }
  
        if (i == 2) {
          let td = document.createElement("td")
          td.classListm = "delete"
          td.innerHTML = a[10].name
          let divContact = document.createElement("div") 
          let divName = document.createElement("div")
          divName.className = "name"
          divContact.appendChild(divName)
          let p = document.createElement("p")
          p.innerHTML = a[9].name
          divName.appendChild(p)
          td.appendChild(divContact)
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

          td.innerHTML = a[5]
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
              let idContact;
              let idContactEdit;
              iconDelete.addEventListener("click", () => {

                idContact = element.id
                deleteContact(idContact)
      
              })

      
              iconEdit.addEventListener("click", () => {
                idContactEdit = element.id
                document.getElementById("name2").value = element.name
                document.getElementById("lastname2").value = element.last_name
                document.getElementById("cargo2").value = element.position
                document.getElementById("email2").value = element.email
                document.getElementById("option-edit").innerHTML = element.company
                document.getElementById("option-edit2").innerHTML = element.region.name
                document.getElementById("option-edit3").innerHTML = element.countrie.name
                document.getElementById("option-edit4").innerHTML = element.city.name
      
                awaitCompanies.forEach(element => {
                  let optionCompanies2 = document.createElement("option")
                  optionCompanies2.innerHTML = element.name
                  document.getElementById("company2").addEventListener("change", (e) => {
                    console.log(e.target.value)
                    if (e.target.value == element.name) {
                      companyId = element.name
                    }
                  })
      
                  document.getElementById("company2").appendChild(optionCompanies2)
                });
                awaitRegions.allRegions.forEach(element => {
      
                  let optionRegions = document.createElement("option")
                  optionRegions.innerHTML = `${element.name}`
      
                  document.getElementById("region2").addEventListener("change", (e) => {
      
                    if (e.target.value == element.name) {
      
                      regionId = element.id
                      console.log(regionId)
      
                      if (document.getElementById("country2").options.length > 1) {
      
                        for (let i = document.getElementById("country2").options.length; i >= 1; i--) {
                          document.getElementById("country2").remove(i);
                        }
                      }
      
                      element.countries.forEach(e => {
      
                        document.getElementById("country2").disabled = false
                        document.getElementById("country2").classList.remove("background-gray")
                        let optionCountries = document.createElement("option")
                        optionCountries.innerHTML = `${e.name}`
                        document.getElementById("country2").appendChild(optionCountries)
      
                        document.getElementById("country2").addEventListener("change", (event) => {
                          if (event.target.value == e.name) {
                            countryId = e.id
                            console.log(countryId)
                            if (document.getElementById("city2").options.length > 1) {
      
                              for (let i = document.getElementById("city2").options.length; i >= 1; i--) {
                                document.getElementById("city2").remove(i);
                              }
                            }
                            e.cities.forEach(x => {
                              document.getElementById("city2").disabled = false
                              document.getElementById("city2").classList.remove("background-gray")
                              address.classList.remove("background-gray")
                              document.getElementById("city2").addEventListener("change", (e) => {
                                if (e.target.value == x.name) {
                                  cityId = x.id
                                  console.log(cityId)
                                }
      
                              })
                              document.getElementById("city2").disabled = false
                              let optionCities = document.createElement("option")
                              optionCities.innerHTML = `${x.name}`
                              document.getElementById("city2").appendChild(optionCities)
                            })
                          }
      
                        })
      
      
                      });
                    }
      
      
                  })
      
                  document.getElementById("region2").appendChild(optionRegions)
      
                });
                saveContact2.addEventListener("click", async () => {
                  console.log("hol")
                  putContact(idContactEdit, document.getElementById("name2").value, document.getElementById("lastname2").value, document.getElementById("cargo2").value, document.getElementById("email2").value,element.email.value, companyId, interes, regionId, countryId, cityId)
      
                })
              })
              cancel2.addEventListener("click",() => {
                deleteContact(idContactEdit)
              })
              addClose(iconEdit, sectionEditContact)
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

      for (let i = 0; i <= vueltas; i++) {
        console.log(indicador)
        if (i < vueltas) {
          tbody.firstChild.remove()
        }
        if (i == vueltas && indicador == 0) {
          indicador = 1

          tbody.firstChild.remove()


        }
        if (i == vueltas && indicador == 1) {
          console.log("no")
        }

      }
    });


  }) 
  exchangeAltposition.addEventListener("click", () =>{
    let cantidadAnterior = tbody.children.length
    console.log(awaitContacts)
    awaitContacts.sort(function (a, b) {

      if (a.position.toLowerCase() > b.position.toLowerCase()) {
        orderName = true
        return 1;
      }
      if (a.position.toLowerCase() < b.position.toLowerCase()) {
        orderName = false
        return -1;
      }
      return 0;

    });

    if (orderName == true) {
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
            } else {

              contactosSelec = contactosSelec.filter(function (i) { return i !== element.id })

              tr2.style = ""
            }

            document.getElementById("contact-selected").innerHTML = `${contactosSelec.length} seleccionados`

            if (contactosSelec.length == 0) {
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
          p1.innerHTML = `${a[0]}  ${a[1]}`
          p1.className = "pName"
          let p = document.createElement("p")
          p.innerHTML = a[3]
          divName.appendChild(p1)
          //divName.appendChild(p2)
          divName.appendChild(p)
          td.appendChild(divContact)
          tr2.appendChild(td)
        }
  
        if (i == 2) {
          let td = document.createElement("td")
          td.classListm = "delete"
          td.innerHTML = a[10].name
          let divContact = document.createElement("div") 
          let divName = document.createElement("div")
          divName.className = "name"
          divContact.appendChild(divName)
          let p = document.createElement("p")
          p.innerHTML = a[9].name
          divName.appendChild(p)
          td.appendChild(divContact)
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

          td.innerHTML = a[5]
          tr2.appendChild(td)
        }

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
            
              let idContact;
              let idContactEdit;
              iconDelete.addEventListener("click", () => {

                idContact = element.id

                deleteContact(idContact)
              })

      
              iconEdit.addEventListener("click", () => {
                idContactEdit = element.id
                document.getElementById("name2").value = element.name
                document.getElementById("lastname2").value = element.last_name
                document.getElementById("cargo2").value = element.position
                document.getElementById("email2").value = element.email
                document.getElementById("option-edit").innerHTML = element.company
                document.getElementById("option-edit2").innerHTML = element.region.name
                document.getElementById("option-edit3").innerHTML = element.countrie.name
                document.getElementById("option-edit4").innerHTML = element.city.name
      
                awaitCompanies.forEach(element => {
                  let optionCompanies2 = document.createElement("option")
                  optionCompanies2.innerHTML = element.name
                  document.getElementById("company2").addEventListener("change", (e) => {
                    console.log(e.target.value)
                    if (e.target.value == element.name) {
                      companyId = element.name
                    }
                  })
      
                  document.getElementById("company2").appendChild(optionCompanies2)
                });
                awaitRegions.allRegions.forEach(element => {
      
                  let optionRegions = document.createElement("option")
                  optionRegions.innerHTML = `${element.name}`
      
                  document.getElementById("region2").addEventListener("change", (e) => {
      
                    if (e.target.value == element.name) {
      
                      regionId = element.id
                      console.log(regionId)
      
                      if (document.getElementById("country2").options.length > 1) {
      
                        for (let i = document.getElementById("country2").options.length; i >= 1; i--) {
                          document.getElementById("country2").remove(i);
                        }
                      }
      
                      element.countries.forEach(e => {
      
                        document.getElementById("country2").disabled = false
                        document.getElementById("country2").classList.remove("background-gray")
                        let optionCountries = document.createElement("option")
                        optionCountries.innerHTML = `${e.name}`
                        document.getElementById("country2").appendChild(optionCountries)
      
                        document.getElementById("country2").addEventListener("change", (event) => {
                          if (event.target.value == e.name) {
                            countryId = e.id
                            console.log(countryId)
                            if (document.getElementById("city2").options.length > 1) {
      
                              for (let i = document.getElementById("city2").options.length; i >= 1; i--) {
                                document.getElementById("city2").remove(i);
                              }
                            }
                            e.cities.forEach(x => {
                              document.getElementById("city2").disabled = false
                              document.getElementById("city2").classList.remove("background-gray")
                              address.classList.remove("background-gray")
                              document.getElementById("city2").addEventListener("change", (e) => {
                                if (e.target.value == x.name) {
                                  cityId = x.id
                                  console.log(cityId)
                                }
      
                              })
                              document.getElementById("city2").disabled = false
                              let optionCities = document.createElement("option")
                              optionCities.innerHTML = `${x.name}`
                              document.getElementById("city2").appendChild(optionCities)
                            })
                          }
      
                        })
      
      
                      });
                    }
      
      
                  })
      
                  document.getElementById("region2").appendChild(optionRegions)
      
                });
                saveContact2.addEventListener("click", async () => {
                  console.log("hol")
                  putContact(idContactEdit, document.getElementById("name2").value, document.getElementById("lastname2").value, document.getElementById("cargo2").value, document.getElementById("email2").value, element.email.value, companyId, interes, regionId, countryId, cityId)
      
                })
              })
              cancel2.addEventListener("click",() => {
                deleteContact(idContactEdit)
              })
              addClose(iconEdit, sectionEditContact)
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

      for (let i = 0; i <= vueltas; i++) {
        console.log(indicador)
        if (i < vueltas) {
          tbody.firstChild.remove()
        }
        if (i == vueltas && indicador == 0) {
          indicador = 1

          tbody.firstChild.remove()


        }
        if (i == vueltas && indicador == 1) {
          console.log("no")
        }

      }
    });


  }) 
  exchangeAltinterest.addEventListener("click", () =>{
    let cantidadAnterior = tbody.children.length
    console.log(awaitContacts)
    awaitContacts.sort(function (a, b) {

      if (a.interes.toLowerCase() > b.interes.toLowerCase()) {
        orderName = true
        return 1;
      }
      if (a.interes.toLowerCase() < b.interes.toLowerCase()) {
        orderName = false
        return -1;
      }
      return 0;

    });

    if (orderName == true) {
      awaitContacts.reverse()

    }
    console.log(awaitContacts)
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
            } else {

              contactosSelec = contactosSelec.filter(function (i) { return i !== element.id })

              tr2.style = ""
            }

            document.getElementById("contact-selected").innerHTML = `${contactosSelec.length} seleccionados`

            if (contactosSelec.length == 0) {
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
          p1.innerHTML = `${a[0]}  ${a[1]}`
          p1.className = "pName"
          let p = document.createElement("p")
          p.innerHTML = a[3]
          divName.appendChild(p1)
          //divName.appendChild(p2)
          divName.appendChild(p)
          td.appendChild(divContact)
          tr2.appendChild(td)
        }
  
        if (i == 2) {
          let td = document.createElement("td")
          td.classListm = "delete"
          td.innerHTML = a[10].name
          let divContact = document.createElement("div") 
          let divName = document.createElement("div")
          divName.className = "name"
          divContact.appendChild(divName)
          let p = document.createElement("p")
          p.innerHTML = a[9].name
          divName.appendChild(p)
          td.appendChild(divContact)
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

          td.innerHTML = a[5]
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
              let idContactEdit;
              iconDelete.addEventListener("click", () => {

                idContact = element.id
                deleteContact(idContact)
              })
 
              iconEdit.addEventListener("click", () => {
                idContactEdit = element.id
                document.getElementById("name2").value = element.name
                document.getElementById("lastname2").value = element.last_name
                document.getElementById("cargo2").value = element.position
                document.getElementById("email2").value = element.email
                document.getElementById("option-edit").innerHTML = element.company
                document.getElementById("option-edit2").innerHTML = element.region.name
                document.getElementById("option-edit3").innerHTML = element.countrie.name
                document.getElementById("option-edit4").innerHTML = element.city.name
      
                awaitCompanies.forEach(element => {
                  let optionCompanies2 = document.createElement("option")
                  optionCompanies2.innerHTML = element.name
                  document.getElementById("company2").addEventListener("change", (e) => {
                    console.log(e.target.value)
                    if (e.target.value == element.name) {
                      companyId = element.name
                    }
                  })
      
                  document.getElementById("company2").appendChild(optionCompanies2)
                });
                awaitRegions.allRegions.forEach(element => {
      
                  let optionRegions = document.createElement("option")
                  optionRegions.innerHTML = `${element.name}`
      
                  document.getElementById("region2").addEventListener("change", (e) => {
      
                    if (e.target.value == element.name) {
      
                      regionId = element.id
                      console.log(regionId)
      
                      if (document.getElementById("country2").options.length > 1) {
      
                        for (let i = document.getElementById("country2").options.length; i >= 1; i--) {
                          document.getElementById("country2").remove(i);
                        }
                      }
      
                      element.countries.forEach(e => {
      
                        document.getElementById("country2").disabled = false
                        document.getElementById("country2").classList.remove("background-gray")
                        let optionCountries = document.createElement("option")
                        optionCountries.innerHTML = `${e.name}`
                        document.getElementById("country2").appendChild(optionCountries)
      
                        document.getElementById("country2").addEventListener("change", (event) => {
                          if (event.target.value == e.name) {
                            countryId = e.id
                            console.log(countryId)
                            if (document.getElementById("city2").options.length > 1) {
      
                              for (let i = document.getElementById("city2").options.length; i >= 1; i--) {
                                document.getElementById("city2").remove(i);
                              }
                            }
                            e.cities.forEach(x => {
                              document.getElementById("city2").disabled = false
                              document.getElementById("city2").classList.remove("background-gray")
                              address.classList.remove("background-gray")
                              document.getElementById("city2").addEventListener("change", (e) => {
                                if (e.target.value == x.name) {
                                  cityId = x.id
                                  console.log(cityId)
                                }
      
                              })
                              document.getElementById("city2").disabled = false
                              let optionCities = document.createElement("option")
                              optionCities.innerHTML = `${x.name}`
                              document.getElementById("city2").appendChild(optionCities)
                            })
                          }
      
                        })
      
      
                      });
                    }
      
      
                  })
      
                  document.getElementById("region2").appendChild(optionRegions)
      
                });
                saveContact2.addEventListener("click", async () => {
                  console.log("hol")
                  putContact(idContactEdit, document.getElementById("name2").value, document.getElementById("lastname2").value, document.getElementById("cargo2").value, document.getElementById("email2").value, element.email.value, companyId, interes, regionId, countryId, cityId)
      
                })
              })
              cancel2.addEventListener("click",() => {
                deleteContact(idContactEdit)
              })
              addClose(iconEdit, sectionEditContact)
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

      for (let i = 0; i <= vueltas; i++) {
        console.log(indicador)
        if (i < vueltas) {
          tbody.firstChild.remove()
        }
        if (i == vueltas && indicador == 0) {
          indicador = 1

          tbody.firstChild.remove()


        }
        if (i == vueltas && indicador == 1) {
          console.log("no")
        }

      }
    });


  }) 

////////////no tocar!!!!!
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
          } else {

            contactosSelec = contactosSelec.filter(function (i) { return i !== element.id })

            tr2.style = ""
          }

          document.getElementById("contact-selected").innerHTML = `${contactosSelec.length} seleccionados`

          if (contactosSelec.length == 0) {
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
        p1.innerHTML = `${a[0]}  ${a[1]}`
        p1.className = "pName"
        let p = document.createElement("p")
        p.innerHTML = a[3]
        divName.appendChild(p1)
        //divName.appendChild(p2)
        divName.appendChild(p)
        td.appendChild(divContact)
        tr2.appendChild(td)
      }

      if (i == 2) {
        let td = document.createElement("td")
        td.classListm = "delete"
        td.innerHTML = a[10].name
        let divContact = document.createElement("div") 
        let divName = document.createElement("div")
        divName.className = "name"
        divContact.appendChild(divName)
        let p = document.createElement("p")
        p.innerHTML = a[9].name
        divName.appendChild(p)
        td.appendChild(divContact)
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

        td.innerHTML = a[5]
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
        let idContact;
        let idContactEdit;
        iconDelete.addEventListener("click", () => {

          idContact = element.id

          deleteContact(idContact)
        })


        iconEdit.addEventListener("click", () => {
          idContactEdit = element.id
          document.getElementById("name2").value = element.name
          document.getElementById("lastname2").value = element.last_name
          document.getElementById("cargo2").value = element.position
          document.getElementById("email2").value = element.email
          document.getElementById("option-edit").innerHTML = element.company
          document.getElementById("option-edit2").innerHTML = element.region.name
          document.getElementById("option-edit3").innerHTML = element.countrie.name
          document.getElementById("option-edit4").innerHTML = element.city.name

          awaitCompanies.forEach(element => {
            let optionCompanies2 = document.createElement("option")
            optionCompanies2.innerHTML = element.name
            document.getElementById("company2").addEventListener("change", (e) => {
              console.log(e.target.value)
              if (e.target.value == element.name) {
                companyId = element.name
              }
            })

            document.getElementById("company2").appendChild(optionCompanies2)
          });
          awaitRegions.allRegions.forEach(element => {

            let optionRegions = document.createElement("option")
            optionRegions.innerHTML = `${element.name}`

            document.getElementById("region2").addEventListener("change", (e) => {

              if (e.target.value == element.name) {

                regionId = element.id
                console.log(regionId)

                if (document.getElementById("country2").options.length > 1) {

                  for (let i = document.getElementById("country2").options.length; i >= 1; i--) {
                    document.getElementById("country2").remove(i);
                  }
                }

                element.countries.forEach(e => {

                  document.getElementById("country2").disabled = false
                  document.getElementById("country2").classList.remove("background-gray")
                  let optionCountries = document.createElement("option")
                  optionCountries.innerHTML = `${e.name}`
                  document.getElementById("country2").appendChild(optionCountries)

                  document.getElementById("country2").addEventListener("change", (event) => {
                    if (event.target.value == e.name) {
                      countryId = e.id
                      console.log(countryId)
                      if (document.getElementById("city2").options.length > 1) {

                        for (let i = document.getElementById("city2").options.length; i >= 1; i--) {
                          document.getElementById("city2").remove(i);
                        }
                      }
                      e.cities.forEach(x => {
                        document.getElementById("city2").disabled = false
                        document.getElementById("city2").classList.remove("background-gray")
                        address.classList.remove("background-gray")
                        document.getElementById("city2").addEventListener("change", (e) => {
                          if (e.target.value == x.name) {
                            cityId = x.id
                            console.log(cityId)
                          }

                        })
                        document.getElementById("city2").disabled = false
                        let optionCities = document.createElement("option")
                        optionCities.innerHTML = `${x.name}`
                        document.getElementById("city2").appendChild(optionCities)
                      })
                    }

                  })


                });
              }


            })

            document.getElementById("region2").appendChild(optionRegions)

          });
          saveContact2.addEventListener("click", async () => {
            console.log("hol")
            putContact(idContactEdit, document.getElementById("name2").value, document.getElementById("lastname2").value, document.getElementById("cargo2").value, document.getElementById("email2").value, element.email.value, companyId, interes, regionId, countryId, cityId)

          })
        })
        cancel2.addEventListener("click",() => {
          deleteContact(idContactEdit)
        })
        
        addClose(iconEdit, sectionEditContact)
        tr2.appendChild(td)
        tr2.appendChild(iconDelete)
        tr2.appendChild(iconEdit)
      }
      tbody.appendChild(tr2)
    }

  });    
  

  inputSearch.addEventListener("keyup", async (e) => {
    let v = e.target.value
    if (e.keyCode === 13) {
      document.querySelector(".delete").remove()

      let a = await get(v)
      a.forEach(element => {
        const tbody2 = document.createElement("tbody")

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
              } else {

                contactosSelec = contactosSelec.filter(function (i) { return i !== element.id })

                tr2.style = ""
              }

              document.getElementById("contact-selected").innerHTML = `${contactosSelec.length} seleccionados`

              if (contactosSelec.length == 0) {
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

            deleteConfirm.addEventListener("click", () => {

              deleteContact(idContact)

            })

            addClose(iconEdit)
            tr2.appendChild(td)
            tr2.appendChild(iconDelete)
            tr2.appendChild(iconEdit)
          }
          tbody2.appendChild(tr2)
        }

        table.appendChild(tbody2)
      });


    }
    if (v == "") {
      location.href = "../html/index.html"
    }



  })



  thead.appendChild(tr)
  table.appendChild(thead)
  thead.appendChild(tr)
  div.appendChild(table)
  table.appendChild(tbody)
  sectionContacts.appendChild(div)
}

createContacts()



///checkbox
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

  let b = document.getElementById("section-alert")
  deleteContacts.addEventListener("click", () => {
          
    backgroundBlack.classList.toggle("none")
    b.classList.toggle("none")


    console.log(arrayIdContactos)
  })
  let deleteConfirm = document.getElementById("delete-confirm")
      
  deleteConfirm.addEventListener("click", () => {

    arrayIdContactos.forEach(element => {
  
      deleteContact(element)
    });

  })
  
})


//GUARDAR CONTACTO
saveContact.addEventListener("click", async () => {
  postContact(name.value, lastName.value, position.value, email.value, companyId, interes, regionId, countryId, cityId)

})

////AGREGAR CANAL

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



////busqueda

const inputSearch = document.getElementById("input")


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
let putContact = async (id, name, last_name, position, email, company, interes, regionId, countrieId, cityId) => {

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

  let searchApi = await fetch(`http://localhost:3000/contacts/${id}`, {
    method: "PUT",
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


