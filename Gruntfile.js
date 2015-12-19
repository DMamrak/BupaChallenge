module.exports = function(grunt) {
	grunt.initConfig({
		copy: {
			main: {
				files: [
					{
						cwd: 'bower_components/',
						expand: true,
						flatten: true,
						src: [
							'normalize-css/normalize.css',
						],
						dest: 'css/',
					},
				]
			}
		},
		/*
		sass: {
			dist: {
				files: [{
					expand: true,
					cwd: 'css',
					src: ['*.scss'],
					dest: 'css',
					ext: '.css'
				}]
			}
		},
		*/
		autoprefixer: {
			dist: {
				files: [{
					expand: true,
					cwd: 'css',
					src: ['*.css'],
					dest: 'css',
					ext: '.css'
				}]
			}
		},		
		watch: {
			styles: {
				files: ['css/*.css'],
				tasks: ['sass', 'autoprefixer']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-autoprefixer');
	//grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['copy', 'autoprefixer']);
};