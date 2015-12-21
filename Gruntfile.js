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
			options: {
				sourceMap: false,
				outputStyle: 'expanded',
			},
			dist: {
				files: {
					'css/custom.css': 'sass/main.scss'
				},
			},
		},

		// Concatenating CSS
		concat: {
			css: {
				options: {
					separator: '\n\n',
				},
				src: ['tmp/*.css'],
				dest: 'css/vendor.css',
			},
			js: {
				options: {
					separator: ';\n',
				},
				src: ['tmp/*.js'],
				dest: 'js/vendor.js'
			},
		},

		// Minifying scripts
		uglify: {
			js: {
				files: {
					'js/vendor.js': 'js/vendor.js',
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

		// Minifying vendor CSS
		cssmin: {
			options: {
				shorthandCompacting: true,
				roundingPrecision: -1,
			},
			target: {
				files: {
					'css/vendor.css': 'css/vendor.css',
				},
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
				tasks: ['sass', 'autoprefixer'],
			},
		},
	});

	grunt.loadNpmTasks('grunt-bower');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['bower', 'concat', 'cssmin', 'sass', 'autoprefixer', 'uglify', 'clean']);
};