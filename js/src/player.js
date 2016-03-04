var random = 0; /*Random esta desactivado por defecto*/

$(document).ready(function() {
    /*En cuanto la página se carga, ya muestra la playlist actualizada*/

    /*Manejadores de eventos de los botones relativos a la barra de reproduccion de las canciones*/
    $(".web.footer").on("click", ".previous.button", previousSong);
    $(".web.footer").on("click", ".next.button", nextSong);
    $(".web.footer").on("click", ".random.button", function() {
        /*Comprobamos valor actual de random*/
        if (random == 0) {
            randomOn(); /*Lo activamos*/
        } else {
            randomOff(); /*Lo desactivamos*/
        }
    });
});

function nextSong() {
    console.log("nextSong");
    var c = getIndexActualSong();

    if (playlistGlobal[+c + 1] == undefined) {
        actualSongGlobal = playlistGlobal[0];
    } else {
        if (random == 0) {
            actualSongGlobal = playlistGlobal[+c + 1];
        } else {
            actualSongGlobal = playlistGlobal[Math.floor((Math.random() * playlistGlobal.length))];
        }
    }
    playSong(actualSongGlobal.id);
    console.log(actualSongGlobal.id);
};

function previousSong() {
    console.log("previousSong");
    var c = getIndexActualSong();

    if (playlistGlobal[+c - 1] == undefined) {
        actualSongGlobal = playlistGlobal[playlistGlobal.length - 1];
    } else
        actualSongGlobal = playlistGlobal[+c - 1];
    playSong(actualSongGlobal.id);
};

function displayActualSong() {
    var html = "";
    html += '<marquee behavior="scroll" direction="left">';
    html += actualSongGlobal.author + " - " + actualSongGlobal.name;
    html += '</marquee>';
    $('.displaySong').html(html);
}

function getIndexActualSong() {
    for (var c in playlistGlobal) {
        if (actualSongGlobal.id == playlistGlobal[c].id) {
            return parseInt(c);
        }
    }
}

function randomOn() {
    random = 1; /*Activamos random*/
     //$(".random.button").on("click",".random.button"
}

function randomOff() {
    random = 0; /*Desactivamos random*/
}
