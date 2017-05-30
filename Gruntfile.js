module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		browserify: {
			dist: {
				options: {
					transform: [['babelify', { presets: 'es2015' }]],
					browserifyOptions: {
						debug: true
					}
				},
				files: {
					'public/js/site.js': 'assets/scripts/site.js'
				}
			}
		},

		uglify: {
			my_target: {
				options: {
					sourceMap: true,
					quoteStyle: 1,
				},
				files: {
					'public/js/site.js': 'public/js/site.js'
				}
			}
		},

		sass: {
			options: {
				sourceMap: true
			},
			dist: {
				files: {
					'public/css/site.css': 'assets/styles/site.scss'
				}
			}
		},

		postcss: {
			options: {
				processors: [
					require('autoprefixer') ({
						browsers: ['last 2 versions']
					}),
					require('cssnano')
				]
			},
			dist: {
				src: 'public/css/site.css'
			}
		},

		watch: {
			css: {
				files: ['assets/styles/**/*.scss'],
				tasks: 'sass'
			},
			js: {
				files: ['Gruntfile.js', 'assets/scripts/**/*.js'],
				tasks: 'browserify'
			}
		}
	});

	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-contrib-watch');
};