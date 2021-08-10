window.onload = (event) => {
    console.log('page is fully loaded');
    let ul = document.querySelector('.games-list');
    ul.innerHTML = "";
  };
const urlKey = "https://api.rawg.io/api/games?key=c171203ffd95417e994a2949e49ca0f8";

/*const loadRawg = async function() {
    console.log("pff");
    const response = await fetch(urlKey, {
        method: 'GET',

    }).then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        const catalog =  JSON.parse(data);
        catalog.forEach(element => {
            let ul = document.getElementsByClassName('games-list');
            let li = document.getElementsByClassName('card-display');
            ul.appendchild(li);
        });
    
    });
}*/

/*function loadRawg () {
     fetch(urlKey, {
        method: 'GET',

    }).then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        const catalog =  JSON.parse(data, Array);
        let ul = document.getElementsByClassName('games-list')[0];
        catalog.forEach(ul => {
            
            let li = document.createElement('li');
            li.className = 'card-display';
            ul.appendchild(li);
        });
    
    });
}*/
let cardDisplay = document.querySelector('.card-display')


const loadRawg = async function() {
    console.log("pff");
    const response = await fetch(urlKey, {
        method: 'GET',

    }).then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        //data = JSON.parse(data.results);
        
        Object.entries(data).forEach( li => {
          
            li = document.createElement('li');
            li.className = cardDisplay;
           ul.appendchild(li);

       });
   
        }); 
      
        
    
}
loadRawg();