$(window).keypress(function(e) {
    if (e.keyCode === 0 || e.keyCode === 32) {
        //e.preventDefault()
        console.log('Space pressed');
    }
})


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
            console.log("Canciones actualizadas");
            var html = "";

            html += '<audio class="sliderAudio" controls autoplay>';
            html += '<source src=' + data.songUrl + ' type="audio/ogg">';
            html += '<source src=' + data.songUrl + ' type="audio/mpeg">';
            html += 'Your browser does not support the audio element.';
            html += '</audio>';

            $('.audioSrc').html(html); //innerHTML = html

            $('').html(html); //innerHTML = html

            actualSongGlobal = data;

            displayActualSong();
            $("audio").on("ended", nextSong);

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

function fuzzySearch(){
    console.log("Resultados de busqueda:");
    defaultContent();
    var resultados = null;
    var flag = 0; /*Bandera para controlar si ha encontrado al menos una coincidencia*/
    var html = "<br><h2>Resultados de busqueda:</h2>";
    html += '<br><br><br><br>';

    /*Recorremos todos los objetos a ver si coincide en algun campo*/
    for(var i in playlistGlobal){        
        /*tolowercase para ignorar mayusculas*/
        var coincidencia = JSON.stringify(playlistGlobal[i]).toLowerCase().indexOf($('#search').val()); 
        /*Convertimos a string nuestro objeto y vemos si contiene la subcadena a buscar*/
        if(coincidencia>-1){
            flag = 1;
            /*Encuentra coincidencias*/
            html += '<b>Cancion:</b> ' + playlistGlobal[i].name;
            html += '<br>';
            html += '<b>Coincidencia:</b><br>...';
            //Imprimimos los 150 caracteres siguientes
            for(var j=coincidencia; j<(coincidencia+150) && j<JSON.stringify(playlistGlobal[i]).length;j++)
                html += JSON.stringify(playlistGlobal[i])[j];
            html += '...<br><br><br>';
        }
    }
    if(flag == 0)
        html += 'Sin coincidencias';
    $('.lyrics-body').html(html);
}
