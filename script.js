let quoteData;

$(document).ready(() => {
  getQuoteData();



  
})

function loadPage(menuId) {
  $('#content').load(`${menuId}\\${menuId}.html`);
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
    console.log(quoteData);
  })
  .done(function () {
    let quote = JSON.stringify(quoteData[Math.floor(Math.random()*quoteData.length)].text);
    let author = JSON.stringify(quoteData[Math.floor(Math.random()*quoteData.length)].author);
    // alert (quote + " " + author);
    $('#scroll-text').text(quote + " " + author.replace(/['"]+/g, ''));

    // we have to reset marquee animation
    //$('#scroll-text').stop(true, true);

  })
  
  ;
}

