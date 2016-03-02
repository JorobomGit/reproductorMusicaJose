$(document).ready(function() {
	/*En cuanto la página se carga, ya muestra la playlist actualizada*/
 
 	/*Manejadores de eventos de los botones relativos a la barra de reproduccion de las canciones*/
    $(".web.footer").on("click", ".previous.button", previousSong);
    $(".web.footer").on("click", ".next.button", nextSong);
    //$(".texto")
    //$(".playlist").on("click", )
});

function nextSong(){
	console.log("nextSong");
	var c = getIndexActualSong();

	if(playlistGlobal[+c+1] == undefined)
		actualSongGlobal = playlistGlobal[0];
	else
		actualSongGlobal = playlistGlobal[+c+1];
	playSong(actualSongGlobal.id);
	console.log(actualSongGlobal.id);
};

function previousSong(){
	console.log("previousSong");
	var c = getIndexActualSong();
	
	if(playlistGlobal[+c-1] == undefined){
		actualSongGlobal = playlistGlobal[playlistGlobal.length-1];
	}else
		actualSongGlobal = playlistGlobal[+c-1];
	playSong(actualSongGlobal.id);
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
        if(actualSongGlobal.id == playlistGlobal[c].id){
            return c;
        }
    }
}