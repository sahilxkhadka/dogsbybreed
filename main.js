async function Start() {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/list/all")
    const data = await response.json()
    createBreedList(data.message)
  }
  catch (e) {
    alert("An error occured")
  }
}

let timer
let deleteFirstPhotoDelay

Start()

function createBreedList(breedList) {
  document.getElementById("breed").innerHTML = `
    <select onchange = "loadByBreed(this.value)">
      <option>Choose a dog breed</option>
      ${Object.keys(breedList).map(breed => {
        return `<option>${breed}</option>`
      })}
    </select>
  `
}
const loadByBreed =async (breed) => {
  if (breed !== "Choose a dog breed") {
    const respons = await fetch(`https://dog.ceo/api/breed/${breed}/images`)
    const data = await respons.json()
    createSlideShow(data.message)
  }
}

function createSlideShow(images) {
  let currentPosition =  0
  clearInterval(timer)
  clearTimeout(deleteFirstPhotoDelay)
  if (images.length > 1) {
    document.getElementById("slideshow").innerHTML = `
    <div class="slide" style="background-image: url('${images[0]}')">>/div>
    <div class="slide" style="background-image: url('${images[1]}')"></div>
    `
    timer = setInterval(nextSlide, 3000)
    currentPosition += 2
  } else {
    document.getElementById("slideshow").innerHTML = `
    <div class="slide" style="background-image: url('${images[0]}')"></div>
    <div class="slide"></div>
    `
  }


  function nextSlide() {
    document.getElementById("slideshow").insertAdjacentHTML("beforeend", `<div class="slide" style="background-image: url('${images[currentPosition]}')"></div>` )
    deleteFirstPhotoDelay =  setTimeout(() => {
      document.querySelector(".slide").remove()
    }, 3000)
    if (currentPosition + 1 >= images.length)
      currentPosition = 0
    else 
      currentPosition++
  }
}