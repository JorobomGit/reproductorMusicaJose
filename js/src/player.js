$(document).ready(function() {

	/*En cuanto la página se carga, ya muestra la playlist actualizada*/
    reloadPlaylist();
 

 	/*Manejadores de eventos de los botones relativos a la barra de reproduccion de las canciones*/
    //$(".nextSong").on("click", nextSong);
    //$(".previousSong").on("click", previosusSong);
    //$(".texto")
    //$(".playlist").on("click", )

});


function displayActualSong(){
	var html = "";
	html += '<marquee behavior="scroll" direction="left">';
    html += actualSongGlobal.author + " - " + actualSongGlobal.name;
    html += '</marquee>';
    $('.displaySong').html(html);
    $('title').html(html);
}