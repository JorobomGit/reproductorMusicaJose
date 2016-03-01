$(document).ready(function() {

	/*En cuanto la página se carga, ya muestra la playlist actualizada*/
    reloadPlaylist();
 

 	/*Manejadores de eventos de los botones relativos al formulario de añadir y editar cancion*/
    $(".addSongButton").on("click", editForm);
    $(".playlist").on("click", ".deleteSong", deleteSong);
    $(".playlist").on("click", ".editSong", editSong);

    $(".lyrics-body").on("click", ".submitSong", sendSong);


});

/*Funcion relativa a la edicion del formulario*/
function editForm() {
    console.log("Mostrar formulario");
    var html = "";
    //Reemplazamos el codigo html de lyris e info author por nuestro formulario
    //TODO falta realizar la validacion de la URL y poner el lyrics como opcional
    html += "<form novalidate>";
    html += "<br> <div>";
    html += '<input type="text" name="name" id="name" placeholder="Nombre de la canción" required class="auto-focus">';
    html += '</div> <br>';
    html += "<div>";
    html += '<input type="text" name="author" id="author" placeholder="Autor">';
    html += '</div> <br>';
    html += "<div>";
    html += '<input type="text" name="songUrl" id="songUrl" placeholder="URL de la canción">';
    html += '</div> <br>';
    html += "<div>";
    html += '<input type="text" name="lyrics" id="lyrics" placeholder="Letra (opcional)">';
    html += '</div> <br>';
    html += "<div>";
    html += '<input type="text" name="authorInfo" id="authorInfo" placeholder="Información del autor (opcional)">';
    html += '</div> <br>';
    html += "<div>";
    html += '<input type="text" name="authorPicture" id="authorPicture" placeholder="Imagen del autor (opcional)">';
    html += '</div> <br>';
    html += "<div>";
    html += '<button type="submit" class="submitSong">Enviar canción</button>';
    html += '</div> <br>';
    html += "</form>";


    /*Actualizamos contenidos de HTML donde debe aparecer la nueva informacion*/
    $('.lyrics-body').html(html);
    $('.author-info').html("");
    $(".auto-focus").focus();

    return false;
}

/*Funcion relativa al envio de datos de la cancion
Lee los datos del formulario y los envia por metodo POST de forma asincrona*/
function sendSong() {

    var name = $.trim($("#name").val());
    var author = $.trim($("#author").val());
    var songUrl = $.trim($("#songUrl").val());
    var lyrics = $.trim($("#lyrics").val());
    var authorInfo = $.trim($("#authorInfo").val());
    var authorPicture = $.trim($("#authorPicture").val());

    $.ajax({
        method: 'POST',
        url: "/api/canciones/",
        data: JSON.stringify({
            name: name,
            author: author,
            songUrl: songUrl,
            lyrics: lyrics,
            authorInfo: authorInfo,
            authorPicture: authorPicture
        }),
        contentType: 'application/json',
        success: function() {
            alert("Guardado con éxito!");
            reloadPlaylist();
        },
        error: function() {
            alert("Se ha producido un error de POST");
        }
    });
    return false;
}

/*Funcion para mostrar la playlist
Utilizamos un metodo get y un bucle para mostrar todas las canciones*/
function reloadPlaylist() {
    $.ajax({
        method: 'GET', //No hace falta ponerlo, por defecto es GET
        url: "/api/canciones/",
        //Por defecto el tipo es JSON
        success: function(data) {
            console.log("Canciones actualizadas", data);
            var html = "";
            html += "Playlist actual<br><br>";
            for (var i in data) {
                var id = data[i].id;
                var name = data[i].name;
                var author = data[i].author;
                //var songUrl = data[i].songUrl;
                //var lyrics = data[i].lyrics || "";
                //var authorInfo = data[i].authorInfo || "";
                //var authorPicture = data[i].authorPicture || "";

                html += "<div>"
                html += name + "-" + author;

                html += '<button class="playSong" data-songid="' + id + '">Play</button>';
                html += '<button class="editSong" data-songid="' + id + '">Edit</button>';
                html += '<button class="deleteSong" data-songid="' + id + '">X</button>';
                html += "<br>";
                html += "</div>";
            }
            $('.playlist').html(html); //innerHTML = html

        },
        error: function() {
            alert("Se ha producido un error de GET");
        }
    });
}

/*Funcion para borrar una cancion, utilizamos metodo DELET y el id obtenido por data-songid*/
function deleteSong() {
    console.log("Elimino la cancion");
    var self = this;
    var id = $(self).data("songid"); //atributo songid
    $.ajax({
        method: 'DELETE',
        url: "/api/canciones/" + id,
        success: function() {
            alert("Borrado con éxito!");
            $(self).parent().remove();
            reloadPlaylist();
        },
        error: function() {
            alert("Se ha producido un error en DELETE");
        }
    });
}

/*Funcion para editar una cancion, se compone de un get para obtener los datos y un PUT para reemplazarlos*/
function editSong() {
    console.log("Edito la cancion");
    var self = this;
    var id = $(self).data("songid"); //atributo songid

    $.ajax({
        method: 'GET',
        url: "/api/canciones/" + id,
        success: function(data) {
            var html = "";

            var id = data.id;
            var name = data.name;
            var author = data.author;
            var songUrl = data.songUrl;
            var lyrics = data.lyrics || "";
            var authorInfo = data.authorInfo || "";
            var authorPicture = data.authorPicture || "";

            html += "<form novalidate>";
            html += "<br> <div>";
            html += '<input value="' + name + '" type="text" name="name" id="name" placeholder="Nombre de la canción" required class="auto-focus">';
            html += '</div> <br>';
            html += "<div>";
            html += '<input value="' + author + '" type="text" name="author" id="author" placeholder="Autor">';
            html += '</div> <br>';
            html += "<div>";
            html += '<input value="' + songUrl + '" type="text" name="songUrl" id="songUrl" placeholder="URL de la canción">';
            html += '</div> <br>';
            html += "<div>";
            html += '<input value="' + lyrics + '" type="text" name="lyrics" id="lyrics" placeholder="Letra (opcional)">';
            html += '</div> <br>';
            html += "<div>";
            html += '<input value="' + authorInfo + '" type="text" name="authorInfo" id="authorInfo" placeholder="Información del autor (opcional)">';
            html += '</div> <br>';
            html += "<div>";
            html += '<input value="' + authorPicture + '" type="text" name="authorPicture" id="authorPicture" placeholder="Imagen del autor (opcional)">';
            html += '</div> <br>';
            html += "<div>";
            html += '<button type="submit" class="updateSong">Actualizar canción</button>';
            html += '</div> <br>';
            html += '</form>';

            $('.lyrics-body').html(html); //innerHTML = html
            $('.author-info').html(""); //innerHTML = html
            $(".auto-focus").focus();
            $(".updateSong").on("click",
                function() {

                    var name = $.trim($("#name").val());
                    var author = $.trim($("#author").val());
                    var songUrl = $.trim($("#songUrl").val());
                    var lyrics = $.trim($("#lyrics").val());
                    var authorInfo = $.trim($("#authorInfo").val());
                    var authorPicture = $.trim($("#authorPicture").val());

                    $.ajax({
                        method: 'PUT',
                        url: "/api/canciones/" + id,
                        data: JSON.stringify({
                            name: name,
                            author: author,
                            songUrl: songUrl,
                            lyrics: lyrics,
                            authorInfo: authorInfo,
                            authorPicture: authorPicture
                        }),
                        contentType: 'application/json',
                        success: function() {
                            alert("Actualizado con éxito!");
                            reloadPlaylist();
                        },
                        error: function() {
                            alert("Se ha producido un error de PUT");
                        }
                    });
                    return false;
                });
        },
        error: function() {
            alert("Se ha producido un error de GET del PUT");
        }
    });
    return false;
}
