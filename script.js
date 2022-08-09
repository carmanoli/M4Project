//Ligth/Dark theme
const checkbox = document.querySelector('#checkbox');

//Butons
const galoBtn = document.querySelector('#index-galo-btn');
const quatroBtn = document.querySelector('#index-quatro-btn');
const memoriaBtn = document.querySelector('#index-memoria-btn');
const historicBtn = document.querySelector('#index-historic-btn');

const iconImg = document.querySelector('#site-icon')


//Ligth/Dark Function
checkbox.addEventListener('change', () =>{
  document.body.classList.toggle('dark')
})

//Buttons Events
galoBtn.addEventListener('mouseenter', () =>{
  iconImg.src = "./images/galo-img.png"
})
galoBtn.addEventListener('mouseleave', () =>{
  iconImg.src = "./images/M4G.png"
})

quatroBtn.addEventListener('mouseenter', () =>{
  iconImg.src = "./images/quatro-img.png"
})
quatroBtn.addEventListener('mouseleave', () =>{
  iconImg.src = "./images/M4G.png"
})

memoriaBtn.addEventListener('mouseenter', () =>{
  iconImg.src = "./images/memoria-img.png"
})
memoriaBtn.addEventListener('mouseleave', () =>{
  iconImg.src = "./images/M4G.png"
})
historicBtn.addEventListener('mouseenter', () =>{
  iconImg.src = "./images/historico-img.png"
})
historicBtn.addEventListener('mouseleave', () =>{
  iconImg.src = "./images/M4G.png"
})

let quoteData;

$(document).ready(() => {
  getQuoteData();
})

function loadPage(htmlPage) {
  $('#content').load(`${htmlPage}`);
}

// =====================================================================
// Quotes
const quoteSettings = {
  "async": true,
  "crossDomain": true,
  "url": "https://type.fit/api/quotes",
  "method": "GET"
}

function getQuoteData(){
  $.ajax(quoteSettings)
  .done(function (response) {
    quoteData = JSON.parse(response);
    //console.log(quoteData);
  })
  .done(function () {
    let quote = JSON.stringify(quoteData[Math.floor(Math.random()*quoteData.length)].text);
    let author = JSON.stringify(quoteData[Math.floor(Math.random()*quoteData.length)].author);
    // alert (quote + " " + author);
    $('#scroll-text').text(quote + " " + author.replace(/['"]+/g, ''));

    // we have to reset marquee animation
    //$('#scroll-text').stop(true, true);
  });
}

// =====================================================================
// saveGameRecord
function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

/*
changed: "2022-08-08T10:32:07.928Z"
created: "2022-08-08T10:28:58.255Z"
game: "memoria"
gameSize: 12
playSate: "stopped"
player: ['carmanoli']
repeatedFlips: 2
time: 188
uuid: "600df383-7356-4f90-93cb-095bdbc2035f"
*/

function uniqueValues(value, index, self) {
  return self.indexOf(value) === index;
}

async function playerNames() {
  // returnan array of unique names
  console.log("playerNames()");
  let M4G_string = localStorage.getItem("M4G");
  M4G_json = JSON.parse(M4G_string);
  playersNames = [].concat.apply([], M4G_json.map(game => game.player)).filter(uniqueValues);
  console.log(JSON.stringify(playersNames));
  return playersNames;
}


function saveGameRecord(gameRecord){
  let M4G_string = localStorage.getItem("M4G");
  let M4G = [];
  if (M4G_string) {
    M4G = JSON.parse(M4G_string);
  }
  M4G.push(gameRecord)
  localStorage.setItem("M4G", JSON.stringify(M4G));
}

// =====================================================================

