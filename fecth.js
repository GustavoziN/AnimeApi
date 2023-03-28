const search = document.querySelector('#search');
const animesContainer = document.querySelector('#card-container');
const btn = document.querySelector('#btn');
const searchAnimeDictionary = new Map();
const largura = window.innerWidth
console.log(largura)


//generate seacrh of anime 
function getUrl(search) {
  return `https://api.jikan.moe/v4/anime?q=${search}&sfw`
}
 
 
btn.addEventListener('click', (event) => {
  if (search.disabled) {
    enableInputAndClearContainer(search, event.target);
    
  } else {
    searchAnimesAndFillContainer(search, event.target);
  
  }
})
 
 
function enableInputAndClearContainer(inputRef, buttonRef) {
  buttonRef.innerHTML = 'Buscar'
  inputRef.disabled = false
  deleteAnime(inputRef)
}
 
 
async function searchAnimesAndFillContainer(inputRef, buttonRef) {
  const alreadySearchedAnimeName = searchAnimeDictionary.get(inputRef.value);
 
  if(inputRef.value != '' && !alreadySearchedAnimeName) {
    buttonRef.innerHTML = 'limpar'
    const response = await fetch(getUrl(inputRef.value))
    const result = await response.json()
    console.log(result)
          inputRef.disabled = true
          const arrayAnimeList = result.data
          searchAnimeDictionary.set(inputRef.value, true) 
            for(const anime of arrayAnimeList) {
              // Destructuring object
              const {title, images: {
                jpg:{ large_image_url }
              }, synopsis} = anime
 
              //geting date of animes
              const card = document.createElement("div");
              card.classList.add("card", "card-position");
 
              const cardImage = document.createElement("img");
              cardImage.classList.add("card-img-top", "card-style");
              cardImage.src = large_image_url;
 
              const cardBody = document.createElement("div");
              cardBody.classList.add("card-body");
 
              const cardTitle = document.createElement("h5");
              cardTitle.classList.add("card-title");
              cardTitle.textContent = title;
 
              const cardDescription = document.createElement("p");
              cardDescription.classList.add("card-text");
              cardDescription.textContent = synopsis;
 
              const cardLink = document.createElement('p')
              cardLink.classList.add('btn', 'btn-primary')
              cardLink.textContent = 'watch now'
 
              cardBody.appendChild(cardTitle);
 
              card.appendChild(cardImage);
              card.appendChild(cardBody);
              card.appendChild(cardLink)
              animesContainer.appendChild(card);
 
            } 
         
    }
}
 
// delete a search animes
function deleteAnime(inputRef) {
  const { value: searchInputValue } = inputRef;
  searchAnimeDictionary.set(searchInputValue, false);
  inputRef.value = '';
  while (animesContainer.firstElementChild) {
    animesContainer.removeChild(animesContainer.firstElementChild);
  }
}



let arrayImage = ['https://static.crunchyroll.com/fms/landscape_poster/960x540/100/png/d7f1baa4-8034-436c-96ca-761cd492a4f9.webp', 
  'https://static.crunchyroll.com/fms/landscape_poster/960x540/100/png/36508058-53aa-46f3-a662-7d6142c0cf9b.webp', 
  'https://static.crunchyroll.com/fms/landscape_poster/960x540/100/png/8c2ff388-fafa-4a5e-a787-bee0292df82c.webp'
 ]


const slider = document.querySelector('.img-caurousel')

//control sliders
function prevSlide() {
  arrayImage.forEach((item , index)=>{
    if(slider.getAttribute("src") == item)
      if(index != 0)
         prevIndex = index-1;
      else
        prevIndex = arrayImage.length-1;
    });
   slider.setAttribute("src",arrayImage[prevIndex]);  
}


function nextSlide() {
  
  arrayImage.forEach((item , index)=>{
    if(slider.getAttribute("src") == item)
      if(index != arrayImage.length-1)
        nextIndex = index+1;
      else
       nextIndex = 0;
    });
   slider.setAttribute("src",arrayImage[nextIndex]);  
}


 


 
 
 
