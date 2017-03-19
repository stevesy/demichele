module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		contentDir: 'content/',
		srcDir: 'content/assets/',
		distDir: 'content/public/',
		sassSrc: [
			'<%= contentDir %>assets/styles/*.scss',
			//excludes
			'!<%= contentDir %>assets/styles/*/*.scss',
			'!<%= contentDir %>assets/styles/_*.scss'
		],

		browserify: {
			dist: {
				options: {
					transform: [['babelify', { presets: 'es2015' }]],
					browserifyOptions: {
						debug: true
					}
				},
				files: {
					'<%= distDir %>js/site.js': '<%= srcDir %>scripts/site.js'
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
					'<%= distDir %>js/site.js': '<%= distDir %>js/site.js'
				}
			}
		},

		sass: {
			dist: {
				options: {
					style: 'compressed'
				},
				expand: true,
				flatten: true,
				src: '<%= sassSrc %>',
				dest: '<%= distDir %>css/',
				ext: '.css'
			}
		},

		postcss: {
			options: {
				processors: [
					require('autoprefixer') ({
						browsers: ['last 2 versions']
					})
				]
			},
			dist: {
				src: '<%= distDir %>css/site.css'
			}
		},

		watch: {
			css: {
				files: ['<%= srcDir %>styles/**/*.scss'],
				tasks: ['sass', 'postcss']
			},
			js: {
				files: ['Gruntfile.js', '<%= srcDir %>/**/*.js'],
				tasks: ['browserify', 'uglify']
			}
		}
	});

	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-postcss');
};