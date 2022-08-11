$(document).ready(function(){
  //localStorage.clear();
  let M4G_string = localStorage.getItem("M4G");
   
  if (M4G_string) {
    $("#history").append(M4G_string);
    showHistory(JSON.parse(M4G_string));
  }
})

function showHistory(M4G_json) {
  M4G_json.forEach(function(gameRecord){
    let historyItem = "";
    historyItem += `
      <div class="border rounded-pill`;

    switch (gameRecord.game) {
      case "memoria":
        historyItem += ` border-danger `;
        break;
      case "quatro":
        historyItem += ` border-warning `;
        break;
      case "memoria":
        historyItem += ` border-primary `;
        break;
        } 

    historyItem += `
      border-5 mt-3 p-3 ps-5">
      <div>
        Jogo: ${gameRecord.game}
      </div>
      <div>       
      Data: ${gameRecord.created}
      </div>
      <div>          
      Players: ${gameRecord.player}
      </div>`;
    
    if (gameRecord.game) {
    historyItem += `
      <div>          
      Time: ${gameRecord.time}
      </div>
      `;
    }

    historyItem += `
      </div>
    `;

    $("#history").append(
      historyItem
    );

  })
}