module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// Extracting bower assets
		bower: {
			dev: {
				dest: 'tmp/',
				fonts_dest: 'fonts/',
				images_dest: 'img/',
				options: {
					keepExpandedHierarchy: false,
				},
			},
		},

		// Processing SCSS
		sass: {
			global: {
				options: {
					sourceMap: false,
					sourceComments: false,
					outputStyle: 'expanded',
				},
				files: [{
					expand: true,
					cwd: 'sass/',
					src: ['*.scss'],
					dest: 'tmp/',
					ext: '.css'
				}],
			},
		},

		// Concatenating CSS
		concat: {
			css: {
				options: {
					separator: '\n\n',
				},
				src: [
					'tmp/reset.css',
					'tmp/*.css',
					'tmp/main.css',
				],
				dest: 'css/styles.css',
			},
			js: {
				options: {
					separator: ';\n',
				},
				src: ['tmp/*.js'],
				dest: 'js/scripts.js'
			},
		},

		// Minifying scripts
		uglify: {
			js: {
				files: {
					'js/scripts.js': 'js/scripts.js',
				},
			}
		},

		// Autoprefixing CSS
		autoprefixer: {
			dist: {
				files: [{
					expand: true,
					cwd: 'css',
					src: ['*.css'],
					dest: 'css',
					ext: '.css'
				}],
			},
		},

		// Cleaning temporary files
		clean: {
			css: ['tmp'],
		},	

		// Watching changes
		watch: {
			styles: {
				files: ['sass/*.scss'],
				tasks: ['sass', 'concat:css', 'autoprefixer'],
			},
			scripts: {
				files: ['js/*.js'],
				tasks: ['concat:js'],
			},
		},
	});

	grunt.loadNpmTasks('grunt-bower');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['bower', 'sass', 'concat', 'autoprefixer', 'uglify', 'clean']);
};