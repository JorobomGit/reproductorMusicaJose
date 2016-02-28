module.exports= function (grunt){

	// Configuración de Grunt
	var settings = {
		less: {
			style: {
				files:{//archivos a compilar
					"style.css": "less/style.less" //destino:origen
				}
			}
		},
		watch: {
			styles: {
				files: ["less/*.less"], //Observa cualquier cambio en archivos LESS
				tasks: ["less"], //ejecuta la compilación LESS
				options: {
					spawn: false // para que no se quede tostado
				}
			}
		}

	};

	//Cargamos configuración de Grunt
	grunt.initConfig(settings);

	//Cargamos plugins
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');

	//Definimos tareas disponibles para grunt-cli
	grunt.registerTask('default', ['less', 'watch']);
	grunt.registerTask('production', ['less']);



	
};