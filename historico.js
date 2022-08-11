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
      <div class="border rounded-pill historic-colors`;

      //Border Color
    switch (gameRecord.game) {
      case "memoria":
        historyItem += ` border-danger `;
        break;
      case "quatro":
        historyItem += ` border-warning `;
        break;
      case "galo":
        historyItem += ` border-primary `;
        break;
    } 

    //Common information
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
      </div>
      <div>          
      Time: ${gameRecord.time}
      </div>
    `;

    //Individul Information
    switch (gameRecord.game) {
      case "memoria":
        // historyItem += `<div>Winner: ${gameRecord.winner}</div>`;
        break;
      case "quatro":
        historyItem += `<div>Winner: ${gameRecord.winner}</div>`;
        break;
      case "galo":
        historyItem += `<div>Winner: ${gameRecord.winner}</div>`;
        break;
    } 

    historyItem += `
      </div>
    `;

    $("#history").append(
      historyItem
    );

  })
}