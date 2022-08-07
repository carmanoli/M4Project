
/*
$(document).ready(() => {
  alert("click");
  $('#memoria').click(function(event){
    loadPage(event.target.id);
  });
})
*/

let url = location.href;

function loadPage(menuId) {
  $('#content').load(`${menuId}\\${menuId}.html`);
}
