$(document).ready(function(){
  let M4G_string = localStorage.getItem("M4G");
  
  if (M4G_string) {
    console.log(M4G_string);
    $("#gameRecord").text(M4G_string);
  }
})
