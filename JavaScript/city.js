


var toggler = document.getElementsByClassName("caret");
var i;
let addRegion = document.getElementById("button-new-region")
let addCountry = document.getElementsByClassName("add-new-country")
let addCity = document.getElementsByClassName("button-add-city")
let sectionNewRegion = document.getElementById("section-new-region")
let sectionNewCountry = document.getElementById("section-new-country")
let backgroundBlack = document.getElementById("black-region")
let closeNewRegion = document.getElementById("close-region")
let closeNewCountry = document.getElementById("close-country")
let sectionCity = document.getElementById("section-city")


/*  for (i = 0; i < toggler.length; i++) {
  toggler[i].addEventListener("click", function() {
    this.parentElement.querySelector(".nested").classList.toggle("active");
    
    this.classList.toggle("caret-down");
  });
}
for (i = 0; i < addCountry.length; i++) {
  addCountry[i].addEventListener("click", () => {
    sectionNewCountry.classList.toggle("none")
    backgroundBlack.classList.toggle("none")
  });
}
for (i = 0; i < addCity.length; i++) {
  addCity[i].addEventListener("click", () => {
    sectionNewCountry.classList.toggle("none")
    backgroundBlack.classList.toggle("none")
  });
} 
 */
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


////
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


async function createP() {

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


      let citiesUl = document.createElement("ul")
      citiesUl.className = "nested city"
    

      e.cities.forEach(x => {

        console.log(e)
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
    // li hija de nested

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
      sectionNewCountry.classList.toggle("none")
      backgroundBlack.classList.toggle("none")
    });
  }


}
createP()


