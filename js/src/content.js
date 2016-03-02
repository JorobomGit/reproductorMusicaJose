/*Funcion que actualiza el contenido al pinchar sobre una cancion*/

function updateContent() {
    var self = this;
    var id = $(self).data("songid"); //atributo songid
    $.ajax({
        method: 'GET',
        url: "/api/canciones/" + id,
        success: function(data) {
            console.log("Canciones actualizadas", data);
            var html = "";
            html += "<br>";
            html += data.lyrics;
            $('.lyrics-body').html(html);
            html = "";
            html += "<br>";

            var picture = data.authorPicture;

            if (picture != undefined && picture != "")
                html += "<img src=" + picture + " alt=Caratula no cargada>";
            html += "<br>";
            html += data.authorInfo;

            $('.author-info').html(html);

        },
        error: function() {
            alert("Se ha producido un error de GET SONG CLICK");
        }
    });
}

/*Funcion que reproduce una cancion al clickar en el boton play*/
/*Dado un id*/
function playSong(id) {    

    $.ajax({
        method: 'GET', //No hace falta ponerlo, por defecto es GET
        url: "/api/canciones/" + id,

        success: function(data) {
            console.log("Canciones actualizadas", data);
            var html = "";

            html += '<source src=' + data.songUrl + ' type="audio/ogg">';
            html += '<source src=' + data.songUrl + ' type="audio/mpeg">';
            html += 'Your browser does not support the audio element.';

            $('audio').html(html); //innerHTML = html

            $('').html(html); //innerHTML = html

            actualSongGlobal = data;

            displayActualSong();

        },
        error: function() {
            alert("Se ha producido un error de PLAY SONG");
        }
    });
}


function defaultContent() {

    console.log("Contenido por defecto");
    var html = "";

    $('.lyrics-body').html(html);
    $('.author-info').html(html);
}
