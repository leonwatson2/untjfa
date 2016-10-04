module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			options:{
				style:'condensed',
				sourcemap:'auto'
			},
			css: {
				files: [{
		        expand: true,
		        cwd: 'style/sass',
		        src: '*.scss',
		        dest: 'style/css/',
		        ext: '.css'
		      }]
			}
		},
		watch: {
			css: {
				files: 'style/sass/*.scss',
				tasks: ['sass']
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default',['watch']);
}