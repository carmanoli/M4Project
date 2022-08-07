
/*
$(document).ready(() => {
  alert("click");
  $('#memoria').click(function(event){
    loadPage(event.target.id);
  });
})
*/
function loadPage(menuId) {
  $('#content').load(`${menuId}\\${menuId}.html`);
}
