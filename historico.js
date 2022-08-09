$(document).ready(function(){
  let M4G_string = localStorage.getItem("M4G");
   
  if (M4G_string) {
    
    showHistory(JSON.parse(M4G_string));
  }
})

function showHistory(M4G_json) {
  M4G_json.forEach(function(gameRecord){
    $("#history").append(`
      <div class="border rounded-pill border-primary border-3 mt-3 ps-5">
        <div>
          Jogo: ${gameRecord.game}
        </div>
        <div>       
        Data: ${gameRecord.created}
        </div>
        <div>          
        Players: ${gameRecord.player}
        </div>        
      </div>
    `);
  })
}