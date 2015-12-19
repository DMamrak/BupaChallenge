module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		// TBD separate js and css collecting for performance improvement
		copy: {
			main: {
				files: [
					{
						cwd: 'bower_components/',
						expand: true,
						flatten: true,
						src: [
							'jquery/dist/jquery.min.js',
							'slick-carousel/slick/slick.min.js',
						],
						dest: 'js/lib/',
					},
					{
						cwd: 'bower_components/',
						expand: true,
						flatten: true,
						src: ['normalize-css/normalize.css'],
						dest: 'tmp/',
					},
				]
			}
		},
		sass: {
			global: {
				options: {
					sourceMap: true,
					sourceComments: false,
					outputStyle: 'expanded'
				},
				files: [{
					expand: true,
					cwd: 'sass/',
					src: ['*.scss'],
					dest: 'tmp/',
					ext: '.css'
				}]
			}
		},
		concat: {
			options: {
				separator: '\n\n',
			},
			dist: {
				src: [
					'tmp/normalize.css',
					'tmp/main.css',
				],
				dest: 'css/styles.css',
			},
		},
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
		clean: {
			css: ['tmp']
		},	
		watch: {
			styles: {
				files: ['sass/*.scss'],
				tasks: ['sass', 'concat', 'autoprefixer']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['copy', 'sass', 'concat', 'autoprefixer', 'clean']);
};