$(document).ready(function() {

	/*En cuanto la página se carga, ya muestra la playlist actualizada*/
    reloadPlaylist();
 

 	/*Manejadores de eventos de los botones relativos a la barra de reproduccion de las canciones*/
    $(".nextSong").on("click", nextSong);
    $(".previousSong").on("click", previosusSong);
    //$(".texto")
    //$(".playlist").on("click", )


});
function nextSong(){
	console.log("nextSong");
	var c = getIndexActualSong();
	playlistGlobal = playlistGlobal[c+1];

};

function previousSong(){
	console.log("previousSong");

};

function getIndexActualSong(){
	
	for (var c in playlistGlobal){
		if(actualSongGlobal == playlistGlobal[c]){
			return c;
		}	
	}

};