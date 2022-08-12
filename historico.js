$(document).ready(function(){
  let M4G_string = localStorage.getItem("M4G");
   
  if (M4G_string) {
    // $("#history").append(M4G_string);
    showHistory(JSON.parse(M4G_string));
  }
})

function showHistory(M4G_json) {
  M4G_json.forEach(function(gameRecord){
    let historyItem = "";
    historyItem += `
      <div class="border rounded-pill historic-colors historic-info-container`;

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
      border-5 mt-3 p-3 ps-5 pe-5 align-items-center">
      <div class="historic-game-info">
        <h3>Jogo:</h3> 
        <div>${gameRecord.game}</div>
      </div>
      <div class="historic-data-info">       
        <h3>Data:</h3> 
        <div>${gameRecord.created}</div>
      </div>
      <div class="historic-data-info">       
        <h3>Horas:</h3> 
        <div>${gameRecord.hours}</div>
      </div>
      <div class="historic-players-info">          
        <h3>Players:</h3>
        <div> ${gameRecord.player}</div>
      </div>
      <div class= "historic-time-info">          
        <h3>Time:</h3>
        <div>${gameRecord.time}</div>
      </div>
    `;

    //Individul Information
    switch (gameRecord.game) {
      case "memoria":
        historyItem += 
        `<div class="delete-historic-div" data-id="${gameRecord.uuid}" onclick="deleteHistoricItem(this.dataset.id)">
        <i class='bx bx-x delete-history-btn'></i>
        </div>`
        break;
      case "quatro":
        historyItem += `<div class="historic-winner-info">
        <h3>Winner:</h3> 
        <div>${gameRecord.winner}</div>
        </div>
        <div class="delete-historic-div" data-id="${gameRecord.uuid}" onclick="deleteHistoricItem(this.dataset.id)">
        <i class='bx bx-x delete-history-btn'></i>
        </div>`;
        break;
      case "galo":
        historyItem += `<div>
        <h3>Winner:</h3>
        <div>${gameRecord.winner}</div>
        </div>
        <div class="delete-historic-div" data-id="${gameRecord.uuid}" onclick="deleteHistoricItem(this.dataset.id)">
        <i class='bx bx-x delete-history-btn'></i>
        </div>`;
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
deleteHistoricItem = (uuid) =>{
  if(confirm('Deseja mesmo excluir este histórico?')){
    let M4G_json = JSON.parse(localStorage.getItem("M4G"));
    const element =  M4G_json.filter(object => object.uuid != uuid)
    $("#history").empty();
    showHistory(element)
    localStorage.removeItem("M4G")
    localStorage.setItem("M4G",JSON.stringify(element))
  }
}
