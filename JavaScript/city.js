var toggler = document.getElementsByClassName("caret");
var i;
let addRegion = document.getElementById("button-new-region")
let addCountry = document.getElementsByClassName("add-new-country")
let addCity = document.getElementsByClassName("button-add-city")
let sectionNewRegion = document.getElementById("section-new-region")
let sectionNewCountry = document.getElementById("section-new-country")
let backgroundBlack = document.getElementById("black-region")
let closeNewRegion = document.getElementById("close-region")
let closeNewCountry = document.getElementById ("close-country")
let sectionCity = document.getElementById("section-city")


for (i = 0; i < toggler.length; i++) {
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

addRegion.addEventListener("click", () => {
  sectionNewRegion.classList.toggle("none")
  backgroundBlack.classList.toggle("none")
})
closeNewRegion.addEventListener("click", () => {
  sectionNewRegion.classList.toggle("none")
  backgroundBlack.classList.toggle("none")
})

closeNewCountry.addEventListener("click", () =>{
  sectionNewCountry.classList.toggle("none")
  backgroundBlack.classList.toggle("none")
})


////
