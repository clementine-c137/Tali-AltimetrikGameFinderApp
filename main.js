window.onload = () => {
    console.log('page is fully loaded');
};
const urlKey = "https://api.rawg.io/api/games?key=c171203ffd95417e994a2949e49ca0f8";
//let searchBar = document.querySelector('.search-input');
let searchRequest = document.querySelector('.search-button');
let searchInput = document.querySelector('.search-input');
let spinner = document.querySelector('.spinner');
  //Load api + spinner
  
  async function loadRawg(urlKey) { 
    let response = await fetch(urlKey);
    let data = await response.json();
    //console.log(data);
    return data;
  };


 // Display cards
async function loadCards(urlKey) {
    let data = await loadRawg(urlKey);
    let ul = document.querySelector('.games-list');
    ul.innerHTML = "";
    //let cardsString = "";
    data.results.map((arr,i) => {
        arr = data.results[i];
        console.log(arr);
        ul.insertAdjacentHTML('beforeend', 
        `<li class="card-display">
            <img src="${arr.background_image}" class="background-img">
            <div class="card-info">
                <h2 class="game-title">${arr.name}</h2>
                    
                <div class="date-container">
                    <h3 class="release-date">Release date</h3>
                    <h3 class="rd-value">${released(arr)}<h3>
                </div>
                <div class="genres-container">
                    <h3 class="genres">Genres</h3>
                    <div class="values-container">
                    ${insertGenre(arr)}
                    </div>
                </div>
                <div class="platforms-container">
                    ${loadPlatforms(arr)}</div>
                    <h2 class="more-platforms"></h2>
                
                <h2 class="ranking">#${i+1}</h2>
                <button class="wish-list">
                    <img class="wl-icon" src="./img/wl.svg">
                </button>
                </div>
                
            </li>
            `)

        //openModal(arr);  
        });
        //ul.innerHTML = cardsString;
        spinner.style.display = "none"; 

     };

     loadCards(urlKey); 

searchRequest.addEventListener('click', () =>{
    if (searchInput != "") {
        let link = urlKey + `&search=${searchInput.value}`;
        console.log(link);
        loadCards(link); 
    }
});


 function released(arr) { 
    let release = new Date(arr.released);
    release = release.toDateString().split(' ').slice(1).join(' ');
    console.log(release);
    return release;
 }

 function insertGenre(arr) {
    let card = "";
    console.log(arr.genres.length);
    for (let j = 0; j < arr.genres.length; j++) {
        console.log(j);
        let genreValue = arr.genres[j];
        console.log(genreValue.name);
        
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
        console.log("dl;hkdflkh");
        let addIcon = (x) =>{
            console.log("guaaat");
            let icon = './img/' + x + '.svg';
            console.log(icon);
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
                        console.log("213233");
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
                        //addIcon('linux');
                        break;
                    case 8:
                        addIcon('switch');
                        break;
                    default:
                        console.log("dsd");
                        break;
                } 
        }
        
            return card;
    }

};

