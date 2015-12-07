module.exports = function(grunt) {

	grunt.initConfig({
		less: {
			main: {
				options: { compress: true },
				files: {
					'public/styles/main.css': 'public/styles/main.less'
				}
			}
		},
		watch: {
			main: {
				files: [
					'public/styles/main.less'
				],
				tasks: ['less']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default', ['less', 'watch']);

};