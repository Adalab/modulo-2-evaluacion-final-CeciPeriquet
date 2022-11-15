"use strict";const searchInput=document.querySelector(".js-input"),searchBtn=document.querySelector(".js-btn"),cardsList=document.querySelector(".js-list"),favCardsList=document.querySelector(".js-fav-list"),favCardsSection=document.querySelector(".js-fav-cards"),resetButton=document.querySelector(".js-reset-btn");let charactersList=[],favouriteCharacters=[];function getData(){fetch("https://breakingbadapi.com/api/characters").then(e=>e.json()).then(e=>{charactersList=e,renderCharactersList()})}getData();const favouritesInLocalSt=JSON.parse(localStorage.getItem("favourites"));function renderCards(e){const t=document.createElement("li");t.classList.add("cards-list-item");const a=document.createElement("article");a.classList.add("card","js-card"),a.setAttribute("id",e.char_id);const r=document.createElement("img");r.setAttribute("src",e.img),r.setAttribute("alt","Picture of "+e.name),r.setAttribute("title",e.name),r.classList.add("card-img");const s=document.createElement("h3");s.classList.add("card-name");const c=document.createTextNode(e.name),n=document.createElement("p");n.classList.add("card-status");const d=document.createTextNode(e.status);s.appendChild(c),n.appendChild(d),a.appendChild(r),a.appendChild(s),a.appendChild(n),t.appendChild(a);return t}function renderCharactersList(){cardsList.innerHTML="";for(const e of charactersList)cardsList.appendChild(renderCards(e));cardListeners()}function handleClickCard(e){e.currentTarget.classList.add("selected");const t=parseInt(e.currentTarget.id);console.log(e.currentTarget);const a=charactersList.find(e=>e.char_id===t),r=favouriteCharacters.findIndex(e=>e.char_id===t);-1===r?favouriteCharacters.push(a):(favouriteCharacters.splice(r,1),e.currentTarget.classList.remove("selected")),localStorage.setItem("favourites",JSON.stringify(favouriteCharacters)),renderFavCharacters()}function cardListeners(){const e=document.querySelectorAll(".js-card");for(const t of e)t.addEventListener("click",handleClickCard)}function renderFavCard(e){const t=document.createElement("li");t.classList.add("cards-list-item");const a=document.createElement("article");a.classList.add("card","js-fav-card","selected"),a.setAttribute("id",e.char_id);const r=document.createElement("i");r.classList.add("fa-solid","fa-square-xmark");const s=document.createElement("img");s.setAttribute("src",e.img),s.setAttribute("alt","Picture of "+e.name),s.setAttribute("title",e.name),s.classList.add("card-img");const c=document.createElement("h3");c.classList.add("card-name");const n=document.createTextNode(e.name),d=document.createElement("p");d.classList.add("card-status");const i=document.createTextNode(e.status);c.appendChild(n),d.appendChild(i),a.appendChild(r),a.appendChild(s),a.appendChild(c),a.appendChild(d),t.appendChild(a);return t}function renderFavCharacters(){favCardsList.innerHTML="";for(const e of favouriteCharacters)favCardsList.appendChild(renderFavCard(e));favCardListeners()}function filterCards(){let e=searchInput.value.toLowerCase();cardsList.innerHTML="";const t=charactersList.filter(t=>t.name.toLowerCase().includes(e));for(const e of t)cardsList.appendChild(renderCards(e));""===e&&renderCharactersList()}function handleSearch(e){e.preventDefault(),filterCards(),cardListeners()}function handleResetInput(e){e.preventDefault(),""===searchInput.value.toLowerCase()&&renderCharactersList()}function handleClickFavCard(e){const t=parseInt(e.currentTarget.id);let a="";favouriteCharacters.find(e=>e.char_id===t);const r=favouriteCharacters.findIndex(e=>e.char_id===t);if(-1!==r){favouriteCharacters.splice(r,1);a=renderCards(charactersList.find(e=>e.char_id===t)),a.classList.remove("selected")}renderFavCharacters(),renderCharactersList(),localStorage.setItem("favourites",JSON.stringify(favouriteCharacters))}function favCardListeners(){const e=document.querySelectorAll(".js-fav-card");for(const t of e)t.addEventListener("click",handleClickFavCard)}function handleResetButton(){favCardsList.innerHTML="",favouriteCharacters=[],localStorage.setItem("favourites",favouriteCharacters);const e=document.querySelectorAll(".js-card");for(const t of e)t.classList.remove("selected")}null!==favouritesInLocalSt&&(favouriteCharacters=favouritesInLocalSt,renderFavCharacters()),searchBtn.addEventListener("click",handleSearch),searchInput.addEventListener("input",handleResetInput),resetButton.addEventListener("click",handleResetButton);