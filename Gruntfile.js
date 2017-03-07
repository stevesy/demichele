module.exports = function (grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		contentDir: 'content/',
		jsSrc: [
			'<%= contentDir %>js/**/*.js',
			//excludes
			'!<%= contentDir %>js/_libs/**/*.js'
		],
		sassSrc: [
			'<%= contentDir %>assets/styles/*.scss',
			//excludes
			'!<%= contentDir %>assets/styles/*/*.scss',
			'!<%= contentDir %>assets/styles/_*.scss'
		],

		sass: {
			dist: {
				options: {
					style: 'compressed'
				},
				expand: true,
				flatten: true,
				src: '<%= sassSrc %>',
				dest: '<%= contentDir %>public/css/',
				ext: '.css'
			}
		},

		watch: {
			sass: {
				files: '<%= contentDir %>assets/styles/*.scss',
				tasks: 'sass:dist'
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
};