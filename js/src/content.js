/*Funcion que actualiza el contenido al pinchar sobre una cancion*/

function updateContent () {
	var self = this;
    var id = $(self).data("songid"); //atributo songid
	  $.ajax({
        method: 'GET', //No hace falta ponerlo, por defecto es GET
        url: "/api/canciones/" + id,
        //Por defecto el tipo es JSON
        success: function(data) {
            console.log("Canciones actualizadas", data);
            var html = "";
            html += "<br>";
            html += data.lyrics;
            $('.lyrics-body').html(html); //innerHTML = html
            html = "";
            html += "<br>";

            var picture = data.authorPicture;

            if(picture != undefined && picture != "")
            	html += "<img src=" + picture + " alt=Caratula no cargada>";
            html += "<br>";
            html += data.authorInfo;

            $('.author-info').html(html); //innerHTML = html

        },
        error: function() {
            alert("Se ha producido un error de GET SONG CLICK");
        }
    });
}

/*Funcion que reproduce una cancion al clickar en el boton*/

function playSong () {
	var self = this;
    var id = $(self).data("songid"); //atributo songid
	  $.ajax({
        method: 'GET', //No hace falta ponerlo, por defecto es GET
        url: "/api/canciones/" + id,
        //Por defecto el tipo es JSON
        success: function(data) {
            console.log("Canciones actualizadas", data);
            var html = "";
            html += "<br>";
            html += data.lyrics;
            $('.lyrics-body').html(html); //innerHTML = html
            html = "";
            html += "<br>";

            var picture = data.authorPicture;

            if(picture != undefined && picture != "")
            	html += "<img src=" + picture + " alt=Caratula no cargada>";
            html += "<br>";
            html += data.authorInfo;

            $('.author-info').html(html); //innerHTML = html

        },
        error: function() {
            alert("Se ha producido un error de GET SONG CLICK");
        }
    });
}