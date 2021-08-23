window.onload = () => {
    load();
};
const urlKey = "https://api.rawg.io/api/games?key=c171203ffd95417e994a2949e49ca0f8";
//let searchBar = document.querySelector('.search-input');

let searchRequest = document.querySelector('.search-button');
let searchInput = document.querySelector('.search-input');
let spinner = document.querySelector('.spinner');
let ul = document.querySelector('.games-list');
let buttonGrid = document.querySelector('.grid-view-btn')
let buttonFlex = document.querySelector('.flex-view-btn');
let modalBg = document.querySelector('.modal-bg'); 
let logout = document.querySelector('.logout-button');

function load () {
    console.log('loaded');
    loadCards(urlKey); 
    buttonFlex.addEventListener('click', loadFlex);
    buttonGrid.addEventListener('click', loadGrid);

}

//Load api + spinner
  
  async function loadRawg(urlKey) { 
    let response = await fetch(urlKey);
    let data = await response.json();
    return data;
  };


 // Display cards
async function loadCards(urlKey) {
    let data = await loadRawg(urlKey);
    ul.innerHTML = "";
    //let cardsString = "";
    data.results.map((arr,i) => {
        arr = data.results[i];
        console.log(arr);
        ul.insertAdjacentHTML('beforeend', 
        `<li class="card">
            <div class="card__img">
                <img src="${arr.background_image || './img/image-not-found.jpg'}" class="background-img">
            </div>
            <div class="card-info">
                <h2 class="game-title">${arr.name}</h2>
                    
                <div class="date-container" id="card-info">
                    <h3 class="release-date">Release date</h3>
                    <h3 class="rd-value">${released(arr)}<h3>
                </div>
                <div class="genres-container" id="card-info">
                    <h3 class="genres">Genres</h3>
                    <div class="values-container">
                    ${insertGenre(arr)}
                    </div>
                </div>
                <div class="platforms-container">
                    ${loadPlatforms(arr)}
                </div>
                   
                <h2 class="ranking">#${i+1}</h2>
                <button class="wish-list">
                    <img class="wl-icon" src="./img/wl.svg">
                </button>
                <div class="game-description" style="display:none">${loadDescription(arr)}</div>
            </div>    
               
            </li>
            `);  
            loadDescription(arr)
        });
        
        openModal(data);  
        spinner.style.display = "none"; 
     };



searchInput.addEventListener('keyup', (e) =>{
    
    if (searchInput != "" && e.keyCode === 13) {
        let link = urlKey + `&search=${searchInput.value}`;
        loadCards(link); 
    }
});

searchRequest.addEventListener('click', () =>{
    if (searchInput != "") {
        let link = urlKey + `&search=${searchInput.value}`;
        loadCards(link); 
    }
});


 function released(arr) { 
    let release = new Date(arr.released);
    release = release.toDateString().split(' ').slice(1).join(' ');
    return release;
 }

 function insertGenre(arr) {
    let card = "";
    for (let j = 0; j < arr.genres.length; j++) {
        let genreValue = arr.genres[j];
        
        if (j < arr.genres.length - 1) { /*Hablamos de un problema que tuve en el loop del genero y 
            Euge me mostro su codigo antes que hiciera esta condicion entonces ya me dio la idea*/
            card += `<h3 class="genres-value">${genreValue.name}, &nbsp</h3>`;
        } else {
           card += `<h3 class="genres-value">${genreValue.name}</h3>`;
        }  
    };
    return card; 
}

 function loadPlatforms(arr) {
    let platforms = arr.parent_platforms; 

    if (platforms) {
        let addIcon = (x) =>{
            let icon = './img/' + x + '.svg';
            card += `<img src="${icon}" class="platform-icon">`;
            return card;
        }

        let card = ""; 
        for (let k = 0; k < platforms.length; k++) {
                
                 
                switch (platforms[k].platform.id) {
                    case 2:
                        addIcon('ps');
                        break;
                    case 3:
                        addIcon('xbox');
                        break;
                    case 1:
                        addIcon('pc');
                        break;
                    case 4:
                        addIcon('apple');
                        break;
                    case 5:
                        addIcon('android');
                        break;
                    case 6:
                        addIcon('apple');
                        break;
                    case 7:
                        addIcon('linux');
                        break;
                    case 8:
                        addIcon('switch');
                        break;
                    default:
                        break;
                } 
        }
        
            return card;
    }

};



   function loadFlex() { 
    ul.classList.remove('games-list');
    ul.classList.add('gl-flex');
    let li = document.querySelectorAll('.card');
    li.forEach(element => {
        //element.classList.remove('card');
        element.classList.add('card--flex');
        
    });

 };


 function loadGrid() { 
    ul.classList.remove('gl-flex');
    ul.classList.add('games-list');
    let li = document.querySelectorAll('.card--flex');
    li.forEach(element => {
        element.classList.remove('card--flex');
        //element.classList.add('card');
    });

 };

function openModal(data) {
    let li = document.querySelectorAll('.card');
    let modal = document.querySelector('.modal');
    
    li.forEach((element, i) => {
        element.addEventListener('click', () => {
            modalBg.classList.add('bg-active');
            arr = data.results[i];
            modal.insertAdjacentHTML('beforeend',
            `<div class="modal-main" style="background-image: 
                url('${arr.background_image}');">
                <div class="game-info">
                    <div class="platforms-container--modal">
                    ${loadPlatforms(arr)}
                    </div>
                    <h2 class="game-title--modal">${arr.name}</h2>
                    <div class="general-info--modal">
                        <h3 class="rd--modal">${released(arr)}</h3>
                        <h3><span id="rank--modal">#${i+1}</span> TOP GAMES</h3>
                    </div>
                    <div class"buy-me">
                        <img src="./img/buy.svg">
                        <img src="./img/wl-modal.svg">
                    </div>
                    <div class="game-description"></div>
                </div> 
                <div class="game-screenshot">
                    <button class="exit"></button>
                    <ul class="screenshot-display">
                       
                    </ul>
                </div> 
            </div>`
            );
            loadDescription(arr);
            loadShots(arr);
            closeModal (modal);
        });
    });

};

async function loadDescription(arr) {
        let id =arr.id;
        let dataId = await loadRawg(`https://api.rawg.io/api/games/${id}?key=c171203ffd95417e994a2949e49ca0f8`)
        let description =document.querySelectorAll('.game-description');

        description.forEach(element => {
            element.insertAdjacentHTML('beforeend', `${dataId.description}`);    
        }); 
        console.log(dataId.description);      
}

function loadShots (arr) {
      
     let ul = document.querySelector('.screenshot-display') ;
        
            ul.insertAdjacentHTML('beforeend',
            `<li class="shots-display">
                    ${insert(arr)}
                </li>`) ; 
             
            function insert (arr) {
                let card = "";
                for (let j = 1; j<6; j++) {
                    let img = arr.short_screenshots[j].image;
                    if (img) {  
                        card += `<img src="${img}" class="img${j}">`
                    } else {
                        card += `<p class="no-description">Sorry, no description was found :(</p>`
                    };
                };
                return card;
            };

}

function closeModal (modal) {
    let li = document.querySelectorAll('.card');
    li.forEach((exit) => {
        exit = document.querySelector('.exit');
        exit.addEventListener('click', () => {
            modal.innerHTML = "";
            modalBg.classList.remove('bg-active');
        });
        modalBg.addEventListener('click', () => {
            modal.innerHTML = "";
            modalBg.classList.remove('bg-active');
        });
    });
}

    
logout.addEventListener('click', () => {
    window.location = 'Login.html';
})


