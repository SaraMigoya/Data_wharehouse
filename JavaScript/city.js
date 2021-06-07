



var toggler = document.getElementsByClassName("caret");
var i;
let addRegion = document.getElementById("button-new-region")
let addCountry = document.getElementsByClassName("add-new-country")
let addCity = document.getElementsByClassName("button-add-city")
let sectionNewRegion = document.getElementById("section-new-region")
let sectionNewCountry = document.getElementById("section-new-country")
let sectionNewCity = document.getElementById("section-new-city")
let backgroundBlack = document.getElementById("black-region")
let closeNewRegion = document.getElementById("close-region")
let closeNewCountry = document.getElementById("close-country")
let sectionCity = document.getElementById("section-city")




////eventos para agregar nuevos items

addRegion.addEventListener("click", () => {
  sectionNewRegion.classList.toggle("none")
  backgroundBlack.classList.toggle("none")
})
closeNewRegion.addEventListener("click", () => {
  sectionNewRegion.classList.toggle("none")
  backgroundBlack.classList.toggle("none")
})

closeNewCountry.addEventListener("click", () => {
  sectionNewCountry.classList.toggle("none")
  backgroundBlack.classList.toggle("none")
})


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
/* 
////GET PAÍSES
let callCountries = async () => {

  let searchApi = await fetch(`http://localhost:3000/regions/countries`, {
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

callCountries() */
////

async function createRegions() {

  let awaitRegions = await callRegion()


  awaitRegions.allRegions.forEach(element => {
  

    //regiones
    let containerRegions = document.getElementById("container-regions")
    let regionsUl = document.createElement("ul")
    regionsUl.className = "myUL"
    containerRegions.appendChild(regionsUl)
    let regionsLi = document.createElement("li")
    regionsLi.className = "region"
    regionsUl.appendChild(regionsLi)
    let titleRegion = document.createElement("span")
    titleRegion.className = "caret name-region"
    regionsLi.appendChild(titleRegion) //span
    titleRegion.innerHTML = `${element.name}`

    let countriesUl = document.createElement("ul")
    countriesUl.className = "nested"

    let btnNewCountrie = document.createElement("button")
    btnNewCountrie.className = "add-new-country"
    btnNewCountrie.innerHTML = "Agregar País"
    //let li = document.createElement("li")

    countriesUl.appendChild(btnNewCountrie)

    //obtengo el id de la region y agrego el país
    btnNewCountrie.addEventListener("click",() =>{
      let idRegion = element.id

      const saveCountry = document.getElementById("save-country")
      const inputCountry = document.getElementById("country")
      
      saveCountry.addEventListener ("click", async () => {
      
        postCountries (inputCountry.value, idRegion)
        location.href = "../html/city.html"
     
      })
    })

/*      // delete
      let btnDelete = document.getElementById("icon-delete")

      btnDelete.addEventListener("click",  () => {

         deleteCountry(element.id)
       }) */
                  
       

    element.countries.forEach(e => {

      ///países

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


      ////agregar ciudades
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
    

      e.cities.forEach(x => {

        let cityLI = document.createElement("li");
        cityLI.innerHTML = `${x.name}`
        citiesUl.appendChild(cityLI)
        /*  let divButtons = document.createElement("div")
       divButtons.className = "button-flex-direccion"
       cityLI.appendChild(divButtons) */


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

////DELETE

 let deleteCountry = async (id) =>{

  var data = {
    id
  }

  let searchApi = await fetch(`http://localhost:3000/regions/countries`, {
      method: "DELETE" ,
      body: JSON.stringify(data),
      headers: {
          'Content-Type': 'application/json'
      }
  })
  await searchApi.json()

} 





const inputRegion = document.getElementById("region")
const saveRegion = document.getElementById("save-region")

  async function newRegion (){

  saveRegion.addEventListener ("click", async () => {

     
      postRegions (inputRegion.value)
      location.href = "../html/city.html"

  })

}

newRegion()  

