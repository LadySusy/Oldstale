  $.getJSON("../../news/index/scripts/lang.json", function(json){
  //Lenguaje por defecto de la página sessionStorage.setItem("lang", "idioma")"
  console.log(json)
  if(!localStorage.getItem("lang")){
    localStorage.setItem("lang", "en");
  }
  var lang = localStorage.getItem("lang");
  var doc = json;
  $('.lang').each(function(index, element){
    $(this).text(doc[lang][$(this).attr('key')]);
  });//Each

  $('.translate').click(function(){
    localStorage.setItem("lang", $(this).attr('id')) ;
    var lang = $(this).attr('id');
    var doc = json;
      $('.lang').each(function(index, element){
        $(this).text(doc[lang][$(this).attr('key')]);
      }); //Each
  }); //Funcion click
});//Get json AJAX