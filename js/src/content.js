/*Funcion que actualiza el contenido al pinchar sobre una cancion*/

function updateContent(params) {
    var self = this;
    var id = $(self).data("songid"); //atributo songid
    console.log(params);
    console.log(params[1]);
    $.ajax({
        method: 'GET',
        url: "/api/canciones/" + id,
        success: function(data) {
            console.log("Canciones actualizadas", data);
            var html = "";
            html += "<br>";
            html += params[0] || data.lyrics;
            $('.lyrics-body').html(html);
            html = "";
            html += "<br>";

            var picture = params[1] || data.authorPicture;

            if (picture != undefined && picture != "")
                html += "<img src=" + picture + " alt=Caratula no cargada>";
            html += "<br>";
            html += params[2] || data.authorInfo;

            $('.author-info').html(html);

        },
        error: function() {
            alert("Se ha producido un error de GET SONG CLICK");
        }
    });
}

/*Funcion que reproduce una cancion al clickar en el boton play*/

function playSong() {
    var self = this;
    var id = $(self).data("songid"); //atributo songid
    $.ajax({
        method: 'GET', //No hace falta ponerlo, por defecto es GET
        url: "/api/canciones/" + id,

        success: function(data) {
            console.log("Canciones actualizadas", data);
            var html = "";
            //html += '<audio controls autoplay>';
            html += '<source src=' + data.songUrl + ' type="audio/ogg">';
            html += '<source src=' + data.songUrl + ' type="audio/mpeg">';
            html += 'Your browser does not support the audio element.';
            //html += '</audio>';

            $('audio').html(html); //innerHTML = html

            $('').html(html); //innerHTML = html

            actualSongGlobal = data;

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
