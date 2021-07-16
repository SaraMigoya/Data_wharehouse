
var toggler = document.getElementsByClassName("caret");
var i;
const addRegion = document.getElementById("button-new-region")
const addCountry = document.getElementsByClassName("add-new-country")
const addCity = document.getElementsByClassName("button-add-city")
const sectionNewRegion = document.getElementById("section-new-region")
const sectionNewCountry = document.getElementById("section-new-country")
const sectionNewCity = document.getElementById("section-new-city")
const backgroundBlack = document.getElementById("black-region")
const closeNewRegion = document.getElementById("close-region")
const closeNewCity = document.getElementById("close-city")
const sectionEditCountry = document.getElementById("section-edit-country")
const closeNewCountry = document.getElementById("close-country")

const sectionCity = document.getElementById("section-city")
const inputRegion = document.getElementById("region")
const saveRegion = document.getElementById("save-region")
const users = JSON.parse(localStorage.getItem("user"))


//// GET REGIONES
let callRegion = async () => {

  let searchApi = await fetch(`http://localhost:3000/regions`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    }
  })

  let res = await searchApi.json()

  if (res.exito) {
    return res

  }
  else {
    console.log("error")
  }
}

callRegion()

if(users){

  if(users.isadmin == false){
    document.getElementById("htmlUsuarios").style = "display: none"
  }

}

////eventos para agregar nuevos items

function addClose(evento, section) {

evento.addEventListener("click", () => {

  section.classList.toggle("none")
  backgroundBlack.classList.toggle("none") 
})

}

const cancel2 = document.getElementById("cancel-edit-country")
const cancelcountry = document.getElementById("cancel-country")
const cancelCity = document.getElementById("cancel-city")
const closeEditCountry = document.getElementById("close-country2")
const closeNewCity2 = document.getElementById("close-city2")
const sectionEditCity = document.getElementById("section-edit-city")
const cancel3 = document.getElementById("cancel-edit-city")

addClose(cancel3, sectionEditCity)
addClose(closeNewCity2, sectionEditCity)
addClose(closeNewCity, sectionNewCity)
addClose(cancelCity, sectionNewCity)
addClose(closeNewCountry, sectionNewCountry)
addClose(closeEditCountry, sectionEditCountry)
addClose(addRegion, sectionNewRegion)
addClose(cancel2, sectionEditCountry)
addClose(closeNewRegion, sectionNewRegion)
addClose (cancelcountry, sectionNewCountry)
addClose(document.getElementById("cancel-region"), sectionNewRegion )

async function createRegions() {

  let awaitRegions = await callRegion()

  awaitRegions.allRegions.forEach(element => {
  
    //crear regiones
    let containerRegions = document.getElementById("container-regions")
    let regionsUl = document.createElement("ul")
    regionsUl.className = "myUL"
    containerRegions.appendChild(regionsUl)
    let regionsLi = document.createElement("li")
    regionsLi.className = "region"
    regionsUl.appendChild(regionsLi)
    let titleRegion = document.createElement("span")
    titleRegion.className = "caret name-region"
    regionsLi.appendChild(titleRegion)
    titleRegion.innerHTML = `${element.name}`
    let countriesUl = document.createElement("ul")
    countriesUl.className = "nested"
    let btnNewCountrie = document.createElement("button")
    btnNewCountrie.id = "div-new-country"
    btnNewCountrie.innerHTML = "Agregar país"

    addClose(btnNewCountrie, sectionNewCountry)
    countriesUl.appendChild(btnNewCountrie)

    //agregar paises nuevo
    btnNewCountrie.addEventListener("click",() =>{
      let idRegion = element.id

      const saveCountry = document.getElementById("save-country")
      const inputCountry = document.getElementById("country")
      
      saveCountry.addEventListener ("click", async () => {
      
        postCountries (inputCountry.value, idRegion)
        location.href = "../html/city.html"
     
      })
    })


    element.countries.forEach(e => {

      ///crear países

      let country = document.createElement("li")
      countriesUl.appendChild(country)
      let countryTitle = document.createElement("span")
      countryTitle.className = "caret country"
      country.appendChild(countryTitle)
      let divButtons = document.createElement("div")
      divButtons.className = "button-flex-direccion"
      country.appendChild(divButtons)
      let btnEdit = document.createElement("button")
      let btnDelete = document.createElement("button")
      btnDelete.id =  "btn-delete"
      let iconEdit = document.createElement("i")
      iconEdit.className = "far fa-edit"
      let iconDelete = document.createElement("i")
      iconDelete.className = "far fa-trash-alt"
      let btnNewCity = document.createElement("button")
      btnNewCity.className = "button-add-city"
      btnNewCity.innerHTML = "Agregar ciudad"
      btnEdit.appendChild(iconEdit)
      btnDelete.appendChild(iconDelete)
      divButtons.appendChild(btnEdit)
      divButtons.appendChild(btnDelete)
      divButtons.appendChild(btnNewCity)
 

      countryTitle.innerHTML = `${e.name}`

      // delete countries
       btnDelete.addEventListener("click", () => {
        let deteleId = e.id
       
         deleteCountry(deteleId)
         location.href = "../html/city.html"
  
       })  
       
       let saveEditCountry = document.getElementById("save-edit-country")

       btnEdit.addEventListener("click", ()=>{
          let id = e.id 

          saveEditCountry.addEventListener("click", ()=>{
            putCountries(id, document.getElementById("edit-country2").value )
          })

        })

        addClose(btnEdit, sectionEditCountry)
       
      ////post countries
      btnNewCity.addEventListener("click",() =>{
        let idCity = e.id

        const saveCity = document.getElementById("save-city")
        const inputCity = document.getElementById("city")
        
        saveCity.addEventListener ("click", async () => {
          postCities (inputCity.value, idCity)
          location.href = "../html/city.html"
       
        }) 
      }) 
      
      let citiesUl = document.createElement("ul")
      citiesUl.className = "nested city"
      
      //crear ciudades
      e.cities.forEach(x => {

        let cityLI = document.createElement("li");
        cityLI.innerHTML = `${x.name}`
        citiesUl.appendChild(cityLI)
        let divButtons = document.createElement("div")
        divButtons.className = "button-flex-direccion"
        let btnEdit = document.createElement("button")
        let btnDelete = document.createElement("button")
        btnDelete.id =  "btn-delete"
        let iconEdit = document.createElement("i")
        iconEdit.className = "far fa-edit"
        let iconDelete = document.createElement("i")
        iconDelete.className = "far fa-trash-alt"

        btnEdit.appendChild(iconEdit)
        btnDelete.appendChild(iconDelete)
        divButtons.appendChild(btnEdit)
        divButtons.appendChild(btnDelete)
        
        citiesUl.appendChild(divButtons)
        
      // delete cities
       iconDelete.addEventListener("click", () => {
       
        deleteCity(x.id)
        location.href = "../html/city.html"
  
       })  
       
       btnEdit.addEventListener("click", () =>{
         let id = x.id
         document.getElementById("save-edit-city").addEventListener("click", ()=>{
 
           putCities(id, document.getElementById("input-edit-city").value )
         })
         
        })
    
        addClose(iconEdit, sectionEditCity)

      });  

      country.appendChild(citiesUl)
      countriesUl.appendChild(country)


    });
    regionsLi.appendChild(countriesUl)

  });


  for (i = 0; i < toggler.length; i++) {
    toggler[i].addEventListener("click", function () {
      this.parentElement.querySelector(".nested").classList.toggle("active");
      this.classList.toggle("caret-down");
    });
  }
  //// 
  for (i = 0; i < addCountry.length; i++) {
    addCountry[i].addEventListener("click", () => {
      sectionNewCountry.classList.toggle("none")
      backgroundBlack.classList.toggle("none")
    });
  }
  for (i = 0; i < addCity.length; i++) {
    addCity[i].addEventListener("click", () => {
      sectionNewCity.classList.toggle("none")
      backgroundBlack.classList.toggle("none")
    });
  }


}
createRegions()

//////CRUD REGIONES PAÍSES Y CIUDADES

let postRegions = async (name) =>{

  var data = {
    name
  }

  let searchApi = await fetch(`http://localhost:3000/regions`, {
      method: "POST" ,
      body: JSON.stringify(data),
      headers: {
          'Content-Type': 'application/json'
      }
  })
  await searchApi.json()

}


let postCountries = async (name, regionId) =>{

  var data = {
    name,
    regionId
  }

  let searchApi = await fetch(`http://localhost:3000/regions/countries`, {
      method: "POST" ,
      body: JSON.stringify(data),
      headers: {
          'Content-Type': 'application/json'
      }
  })
  await searchApi.json()

}

 let postCities = async (name, countrieId) =>{

  var data = {
    name,
    countrieId
  }

  let searchApi = await fetch(`http://localhost:3000/regions/cities`, {
      method: "POST" ,
      body: JSON.stringify(data),
      headers: {
          'Content-Type': 'application/json'
      }
  })
  await searchApi.json()

} 

let putCountries = async (id, name) =>{

  var data = {
    name
  }

  let searchApi = await fetch(`http://localhost:3000/regions/countries/${id}`, {
      method: "PUT" ,
      body: JSON.stringify(data),
      headers: {
          'Content-Type': 'application/json'
      }
  })
  await searchApi.json()
  location.href = "../html/city.html"

}

let putCities = async (id, name) =>{

  var data = {
    name
  }

  let searchApi = await fetch(`http://localhost:3000/regions/cities/${id}`, {
      method: "PUT" ,
      body: JSON.stringify(data),
      headers: {
          'Content-Type': 'application/json'
      }
  })
  await searchApi.json()
  location.href = "../html/city.html"

}



////DELETE

 let deleteCountry = async (id) =>{

  var data = {
    id
  }

  let searchApi = await fetch(`http://localhost:3000/regions/countries/${id}`, {
      method: "DELETE" ,
      body: JSON.stringify(data),
      headers: {
          'Content-Type': 'application/json'
      }
  })
  await searchApi.json()

} 
//city
  let deleteCity = async (id) =>{

  var data = {
    id
  }

  let searchApi = await fetch(`http://localhost:3000/regions/cities/${id}`, {
      method: "DELETE" ,
      body: JSON.stringify(data),
      headers: {
          'Content-Type': 'application/json'
      }
  })
  await searchApi.json()

} 


  async function newRegion (){

  saveRegion.addEventListener ("click", async () => {

      postRegions (inputRegion.value)
      location.href = "../html/city.html"

  })

}

newRegion()  

