module.exports = function(grunt) {

	grunt.initConfig({
		less: {
			main: {
				options: { compress: true },
				files: {
					'src/ak-text-fadein.css': 'src/ak-text-fadein.less'
				}
			}
		},
		watch: {
			main: {
				files: [
					'src/ak-text-fadein.less'
				],
				tasks: ['less']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default', ['less', 'watch']);

};