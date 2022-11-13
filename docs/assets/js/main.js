"use strict";const searchInput=document.querySelector(".js-input"),searchBtn=document.querySelector(".js-btn"),cardsList=document.querySelector(".js-list"),favCardsList=document.querySelector(".js-fav-list");let charactersList=[],favouriteCharacters=[];function getData(){fetch("https://breakingbadapi.com/api/characters").then(r=>r.json()).then(r=>{charactersList=r,renderCharactersList()})}getData();const favouritesInLocalSt=JSON.parse(localStorage.getItem("favourites"));function renderCards(r){return`<li class='cards-list-item'>\n      <article class='card js-card' id='${r.char_id}'>\n        <img src='${r.img}' alt='Picture of ${r.name}' title='${r.name}' class='card-img' />\n        <h3 class='card-name'>${r.name}</h3>\n        <p class='card-status'>${r.status}</p>\n      </article>\n    </li>`}function renderCharactersList(){let r="";for(const a of charactersList)r+=renderCards(a);cardsList.innerHTML=r,cardListeners()}function filterCards(){const r=searchInput.value.toLowerCase();cardsList.innerHTML="";const a=charactersList.filter(a=>a.name.toLowerCase().includes(r));for(const r of a){const a=renderCards(r);cardsList.innerHTML+=a}}function handleSearch(r){r.preventDefault(),filterCards()}function cardListeners(){const r=document.querySelectorAll(".js-card");for(const a of r)a.addEventListener("click",handleClickCard)}function handleClickCard(r){const a=parseInt(r.currentTarget.id),e=charactersList.find(r=>r.char_id===a);-1===favouriteCharacters.findIndex(r=>r.char_id===a)&&(favouriteCharacters.push(e),localStorage.setItem("favourites",JSON.stringify(favouriteCharacters))),renderFavCharacters()}function renderFavCard(r){return`<li class='cards-list-item'>\n      <article class='card js-fav-card selected' id='${r.char_id}'>\n        <i class='fa-solid fa-square-xmark'></i>  \n        <img src='${r.img}' alt='Picture of ${r.name}' title='${r.name}' class='card-img' />\n        <h3 class='card-name'>${r.name}</h3>\n        <p class='card-status'>${r.status}</p>\n      </article>\n    </li>`}function renderFavCharacters(){let r="";for(const a of favouriteCharacters)r+=renderFavCard(a);favCardsList.innerHTML=r,favCardListeners()}function handleClickFavCard(r){const a=parseInt(r.currentTarget.id),e=(favouriteCharacters.find(r=>r.char_id===a),favouriteCharacters.findIndex(r=>r.char_id===a));-1!==e&&favouriteCharacters.splice(e,1)}function favCardListeners(){const r=document.querySelectorAll(".js-fav-card");for(const a of r)a.addEventListener("click",handleClickFavCard)}null!==favouritesInLocalSt&&(favouriteCharacters=favouritesInLocalSt,renderFavCharacters()),searchBtn.addEventListener("click",handleSearch);