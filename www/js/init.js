document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    (function($){
  $(function(){
    $('.sidenav').sidenav();
    $('.tabs').tabs({ "swipeable": true });
  });
})(jQuery);

$("#searchbutton").click(function() {
  song = $('#search').val();
  $.ajax({
    method: "GET",
    url: "https://musicbrainz.org/ws/2/artist?query="+song,
    dataType: "json",
  }).done(function(mensaje){
    showResults(mensaje);
  }).fail(function(){
    alert("Error");
  });
});

function showResults(result) {
  $('.collection:first-of-type').empty();
  var music = result["artists"];
  for (let index = 0; index < music.length; index++) {
    const element = music[index];
    $('.collection:first-of-type').append('<li id="'+element["id"]+'" class="collection-item">'+element["name"]+'<a href="#!" class="secondary-content"><i class="material-icons">format_list_bulleted</i></a></li>');
  }

  $('.secondary-content').click(function() {
    datos = $(this).parent();
    texto = datos.clone().children().remove().end().text();
    var tabs = document.getElementById("tabs");
    var instancia = M.Tabs.getInstance(tabs);
    instancia.select("test-swipe-2");
    $.ajax({
      method: "GET",
      url: "https://musicbrainz.org/ws/2/artist/"+datos.attr("id"), 
      dataType: "json",
    }).done(function(mensaje){
        details(mensaje);
    }).fail(function(){
        alert("Error");
    });
  });


}
  function details(informacion) {
    $('#myTableId tbody').empty();
    console.log(informacion);
    $('<td>'+informacion["name"]+'</td>').appendTo('#myTableId tbody');
    $('<td>'+informacion["type"]+'</td>').appendTo('#myTableId tbody');
    $('<td>'+informacion["disambiguation"]+'</td>').appendTo('#myTableId tbody');
    $('<td>'+informacion["area"]["sort-name"]+'</td>').appendTo('#myTableId tbody');
    $('<td>'+informacion["country"]+'</td>').appendTo('#myTableId tbody');
    $('<td>'+informacion["begin-area"]["sort-name"]+'</td>').appendTo('#myTableId tbody');
    $('<td>'+informacion["life-span"]["begin"]+'</td>').appendTo('#myTableId tbody');
  }
}