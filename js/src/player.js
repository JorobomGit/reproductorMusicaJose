$(document).ready(function() {
	/*En cuanto la página se carga, ya muestra la playlist actualizada*/
 
 	/*Manejadores de eventos de los botones relativos a la barra de reproduccion de las canciones*/
    $(".nextSong").on("click", nextSong);
    $(".previousSong").on("click", previousSong);
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

function displayActualSong(){
	var html = "";
	html += '<marquee behavior="scroll" direction="left">';
    html += actualSongGlobal.author + " - " + actualSongGlobal.name;
    html += '</marquee>';
    $('.displaySong').html(html);
}

function getIndexActualSong(){
    
    for (var c in playlistGlobal){
        if(actualSongGlobal == playlistGlobal[c]){
            return c;
        }    
    }
}
