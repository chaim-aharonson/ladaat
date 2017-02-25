/*!
 * @ Package for Responsive Boilerplate Micro Lib @!!!!!
 */
module.exports = function(grunt) {
    "use strict";

    // Time to execute each task, you can see at the end, after Grunt command on terminal
    require('time-grunt')(grunt);
    // Loading all Grunt-tasks module
    require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		// Copyright, Version number and date.
		banner: '/*!' +
			'* <%= pkg.name %> v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>. \n' +
			'* Author: <%= pkg.author %> - Licensed under MIT license.\n' +
			'*/\n',
		// Begining of tasks          
		// Starting lint JavaScript files
		jshint: {
			options: {
				browser: true,
				globals: {
					jQuery: true,
					console: true,
					module: true,
					document: true,
                    browser: true
				}
			},
			all: {
				files: {
					src: ['gruntfile.js', 'js/custom.js']
				}
			}
		},
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            files: {
                src: [ 'js/*.js' ],
                dest: 'js/',
                expand: true,
                flatten: true,
                ext: '.min.js'
            }
        },
        sassy: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'scss',
                    src: ['*.scss'],
                    dest: 'css/main.css',
                    ext: '.css'
                }]
            }
        },
		recess: {
			options: {
				compile: true,
				banner: '<%= banner %>'
			},
			base: {
				src: ['less/responsiveboilerplate.less'],
				dest: 'css/<%= pkg.name %>.css'
			},
			min: {
				options: {
					compress: true
				},
				src: ['less/responsiveboilerplate.less'],
				dest: 'css/<%= pkg.name %>.min.css'
			}
		},
        express: {
            all: {
                options: {
                    bases: ['.'],
                    port: 3001,
                    hostname: "0.0.0.0",
                    livereload: true
                }
            }
        },
		watch: {
			scripts: {
				files: ['Gruntfile.js', 'js/**/*.js', 'libs/**/*.js', 'css/**/*.css'],
				tasks: ['jshint','uglify'],
				options: {
					debounceDelay: 250
				}
			},
			recess: [
				{
					files: 'less/*.less',
					tasks: ['recess']
				},
                {
                    files: 'scss/*.scss',
                    tasks: ['sassy']
                }
            ]
		},
        open: {
            all: {
                path: 'http://localhost:3001/demo.html'
            },
			index: {
                path: 'http://localhost:3001/index.html'
            }
        }
	});
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    // Loading Grunt-tasks from node_modules folder
    //grunt.loadTasks('tasks');

    // Register tasks for development and production
	grunt.registerTask('default', ['jshint','uglify','recess']);
	// Register tasks for development using watch
    grunt.registerTask('dev', ['express','open:index','watch']);
    grunt.registerTask('sass', ['sassy']);

    // Register task to see the Demo page using localhost:3001
    grunt.registerTask('demo', ['express','open','watch']);
};