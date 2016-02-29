$(document).ready(function() { // Cuando la página se ha cargado por completo


    $("#addSongButton").on("click", mostrarFormulario);




});

function mostrarFormulario() { // Cuando se intente enviar el formulario
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
    html += '<button type="submit" id="submitSong">Enviar canción</button>';
    html += '</div> <br>';

    html += "</form>";
    $('.lyrics-body').html(html); //innerHTML = html
    $('.author-info').html(""); //innerHTML = html
    $(".auto-focus").focus();
    $("form").on("submit", enviarCancion);
}

function enviarCancion() {

    //Realizamos un POST para enviar los datos de la cancion
    //Se envia de forma asincrona
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


                html += name + "-" + author + "<br>";

                //html += '<button data-serieid="' + id + '">Eliminar</button>';
            }
            $('.playlist').html(html); //innerHTML = html
        },
        error: function() {
            alert("Se ha producido un error de GET");
        }
    });
}
