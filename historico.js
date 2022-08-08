$(document).ready(function(){
  let M4G_string = localStorage.getItem("M4G");
  
  if (M4G_string) {
    console.log(M4G_string);
    $("#history").text(M4G_string);
    showHistory(JSON.parse(jsonHistory));
  }
})

function showHistory(jsonHistory) {
  jsonHistory.forEach(function(gameRecord){
    $("#history").append(`
      <div>

      </div>
    `);
  })
}