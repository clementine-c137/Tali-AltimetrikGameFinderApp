window.onload = () => {
    console.log('page is fully loaded');
  };


const urlKey = "https://api.rawg.io/api/games?key=c171203ffd95417e994a2949e49ca0f8";
let cardDisplay = document.querySelector('.card-display');
let modalBg = document.querySelector('modal-bg');


const loadRawg = async function() {
    let cardsContainer = document.querySelector('.cards-container');
    let spinner = document.createElement('div');

    cardsContainer.appendChild(spinner);
    spinner.classList.add('spinner');
    const response = await fetch(urlKey, {
        method: 'GET',

    }).then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        console.log('Success:', data.parent_platforms);

       let ul = document.querySelector('.games-list');
       ul.innerHTML = "";
       let cardsString = "";
       //let card = ""; 
      
       data.results.map((arr,i) => {
            arr = data.results[i];
            
           //let cardsString = ""; 
           let card = "";
           const first = async function() {
            console.log("first");
           card = `
            <li class="card-display" onclick="()">
                <img src="${arr.background_image}" class="background-img">
                <div class="card-info">
                    <h2 class="game-title">${arr.name}</h2>
                    
                    <div class="date-container">
                        <h3 class="release-date">Release date</h3>
                        `;
                        let release = new Date(arr.released);
                        release = release.toDateString().split(' ').slice(1).join(' ');
                        console.log(release);
                       card += `
                        <h3 class="rd-value">${release}<h3> 
                        
                    </div>
                    <div class="genres-container">
                        <h3 class="genres">Genres</h3>
                        <div class="values-container">
                        `;
                           
                    for (let j = 0; j < arr.genres.length; j++) {
                        //console.log(j);
                        let genreValue = arr.genres[j];
                        //console.log(genreValue.name);
                        
                        if (j < arr.genres.length - 1) { /*Hablamos de un problema que tuve en el loop del genero y 
                            Euge me mostro su codigo antes que hiciera esta condicion entonces ya me dio la idea*/
                            card += `<h3 class="genres-value">${genreValue.name},&nbsp;</h3>` ;
                        } else {
                           card += `<h3 class="genres-value">${genreValue.name}</h3>` ;
                        }
                    };
                    card += `
                        </div>
                    </div>
                    <div class="platforms-container">
                        
                    </div>
                    <h2 class="more-platforms"></h2>
                    <h2 class="ranking">#${i+1}</h2>
                    <button class="wish-list">
                    <img class="wl-icon" src="./img/wl.svg">
                    </button>

                </div>
            </li>
            `;
          
          
            
              
            }; 
                console.log("sec");
                const tali = async function() {
                    
                    await first();
                    loadPlatforms(arr, i);
                    console.log("pppppppffff");
                } 
                tali(arr);
             cardsString += card; 
                 
       });

            //ul.innerHTML += card;  

       //console.log(cardsString);
        ul.innerHTML = cardsString;
       spinner.style.display = "none"; 

       /*for (let i=0; i< ul.length; i++) {
        
        let item = document.getElementsByClassName('.card-display');  
        //`<ul>${item[i]}</ul>`
        console.log(item);
        item[i].addEventListener('click', () => {
            console.log("FEDE");
            modalBg.classList.add('bg-active');
        });
       };*/
       
    }); 
    //ul.innerHTML = cardsString;

   /* window.addEventListener('load', () => {

        
        let item = document.querySelectorAll('.card-display'); 
        console.log(cards); 
        item.addEventListener('click', () => {
                console.log("FEDE");
                modalBg.classList.add('bg-active');
            });
           
      });*/
}
loadRawg();





    const loadPlatforms = (arr,i) => {
        //console.log(arr.parent_platforms);
        let platforms = arr.parent_platforms; 
        //let platform = document.createElement('div');
        //platform.classList.add('platforms-container');

        if (platforms) {
            console.log("dl;hkdflkh");
            const addIcon = (x) =>{
 
                let icon = document.createElement('object');
                icon.classList.add('platform-icon');

                icon.setAttribute('data', './img/' + x + '.svg');
                icon.setAttribute('type', 'image/svg+xml');

                platform = document.getElementsByClassName('platforms-container')[i];
                platform.appendChild(icon);

                console.log(platforms.length);

                //let icon = './img/' + x + '.svg';
               
                /*console.log(icon);
                card += `<object class=platform-icon" data = "${icon}" type="image/svg+xml">
                        </object>` ;
                document.getElementsByClassName('platforms-container')[i].innerHTML += card;*/
            };
            
                for (let k = 0; k < platforms.length; k++) {
                    console.log("213233");
                    //console.log(platforms[i].id);
                    //console.log(platforms[i]);
                    //console.log(platforms[i].platform.id);
                    count = ""; 
                    switch (platforms[k].platform.id) {
                        case 2:
                            addIcon('ps');
                            count ++;
                            break;
                        case 3:
                            addIcon('xbox');
                            count ++;
                            break;
                        case 1:
                            addIcon('pc');
                            count ++;
                            break;
                        case 4:
                            addIcon('apple');
                            count ++;
                            break;
                        case 5:
                            addIcon('android');
                            count ++;
                            break;
                        case 6:
                            addIcon('apple');
                            count ++;
                            break;
                        case 7:
                            //addIcon('linux');
                            count ++;
                            break;
                        case 8:
                            addIcon('switch');
                            count ++;
                            break;
                        default:
                            console.log("dsd");
                            count ++;
                            break;
                    }
                    
                    if (count > 3) {
                     //let flag = document.createElement('label');
                     //flag.classList.add('platform-icon');
                     //flag.appendChild('+' +count-3);
                     document.querySelector('.more-platforms').innerHTML = '+' + count-3;  
                    }
                };
            
                return addIcon;


        }
        /*icon.addEventListener('load', function(){*/
            let a = document.querySelectorAll('.platforms-container');
            let svgDoc = a.contentDocument;
            let aItem = svgDoc.getElementById('Capa_1');
            aItem.setAttribute('fill', '#FFFFFF');
        /*});*/
      
    }

    /* <svg id="mac" fill="white" viewBox="0 0 900 1000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 304.998 304.998"><path d="M702 960c-54.2 52.6-114 44.4-171 19.6-60.6-25.3-116-26.9-180 0-79.7 34.4-122 24.4-170-19.6-271-279-231-704 77-720 74.7 4 127 41.3 171 44.4 65.4-13.3 128-51.4 198-46.4 84.1 6.8 147 40 189 99.7-173 104-132 332 26.9 396-31.8 83.5-72.6 166-141 227zM423 237C414.9 113 515.4 11 631 1c15.9 143-130 250-208 236z"/></svg>*/
    
