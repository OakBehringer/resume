module.exports = function(grunt) {

	grunt.initConfig({
		'http-server': {
			main: {
        host: '0.0.0.0',
        port: 8484,
        runInBackground: true,
				cache: 0
			}
		},
		sass: {
			main: {
				options: {
					style: 'compressed'
				},
				files: {
					'styles/main.css': 'styles/main.scss'
				}
			}
		},
		watch: {
			options: {
				livereload: true
			},
      css: {
        files: [
          'styles/*.scss'
        ],
        tasks: ['sass']
      },
			html: {
				files: [
					'*.html'
				]
			}
		}
	});

	grunt.loadNpmTasks('grunt-http-server');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default', ['http-server', 'sass', 'watch']);

};