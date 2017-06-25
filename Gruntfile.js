module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		modernizr: {
			dist: {
				'crawl': false,
				'customTests': [],
				'dest': 'website/public/js/modernizr.js',
				'tests': [
					'touchevents'
				],
				'options': [
					'html5shiv',
					'setClasses'
				],
				'uglify': true
			}
		},

		browserify: {
			dist: {
				options: {
					transform: [['babelify', { presets: 'es2015' }]],
					browserifyOptions: {
						debug: true
					}
				},
				files: {
					'website/public/js/site.js': 'website/assets/scripts/site.js'
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
					'website/public/js/site.js': 'website/public/js/site.js'
				}
			}
		},

		sass: {
			options: {
				sourceMap: true
			},
			dist: {
				files: {
					'website/public/css/site.css': 'website/assets/styles/site.scss'
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
				src: 'website/public/css/site.css'
			}
		},

		imagemin: {
			dist: {
				static: {
					options: {
						optimizationLevel: 3
					}
				},
				files: [{
					expand: true,
					cwd: 'website/assets/images/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'website/public/img/'
				}]
			}
		},

		copy: {
			fonts: {
				expand: true,
				cwd: 'website/assets/fonts/',
				src: '**',
				dest: 'website/public/fonts/',
			}
		},

		watch: {
			css: {
				files: ['website/assets/styles/**/*.scss'],
				tasks: 'sass'
			},
			js: {
				files: ['Gruntfile.js', 'website/assets/scripts/**/*.js'],
				tasks: 'browserify'
			}
		}
	});

	grunt.loadNpmTasks('grunt-modernizr');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-newer');
};