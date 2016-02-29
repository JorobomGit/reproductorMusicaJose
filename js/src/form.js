$(document).ready(function() { // Cuando la página se ha cargado por completo


    $("#addSongButton").on("click", mostrarFormulario);

});

function mostrarFormulario() { // Cuando se intente enviar el formulario
    console.log("Mostrar formulario");
    var html="";
  	$('.lyrics-body').html(html); //innerHTML = html
}
