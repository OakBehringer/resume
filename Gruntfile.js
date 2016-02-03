module.exports = function(grunt) {

	grunt.initConfig({
		less: {
			main: {
				options: { compress: true },
				files: {
					'styles/main.css': 'styles/main.less'
				}
			}
		},
		watch: {
			main: {
				files: [
					'styles/main.less'
				],
				tasks: ['less']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default', ['less', 'watch']);

};