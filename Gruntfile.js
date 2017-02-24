module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      coffee: {
        files: ['assets/coffeescript/{,*/}*.coffee'],
        tasks: ['coffee:dev']
      },
      compass: {
        files: ['assets/sass/{,*/}*.{scss,sass}'],
        tasks: ['compass:dev', 'cssmin:dev']
      }
    },
    connect: {
      dev: {
        options: {
          port: 9001,
          base: ''
        }
      },
      prod: {
        options: {
          port: 9001,
          base: '_site/',
          keepalive: true
        }
      }
    },
    coffee: {
      dev: {
        expand: true,
        flatten: true,
        cwd: 'assets/coffeescript/',
        src: ['*.coffee'],
        dest: 'assets/js/',
        ext: '.js'
      }
    },
    uglify: {
      options: {
        mangle: true
      },
      dev: {
          expand: true,                      // Enable dynamic expansion.
          cwd: 'assets/js/',                 // Src matches are relative to this path.
          src: ['*.js', '!*.min.js'],        // Actual pattern(s) to match.
          dest: 'assets/js/',                // Destination path prefix.
          ext: '.min.js'                     // Dest filepaths will have this extension.
        }
    },
    compass: {
      dev: {
        options: {
          cssDir: "assets/css",
          sassDir: "assets/sass",
          imagesDir: "assets/img",
          javascriptsDir: "assets/js"
        }
      }
    },
    cssmin: {
      dev: {
        expand: true,
        cwd: 'assets/css/',
        src: ['*.css', '!*.min.css', '!_*.css'],
        dest: 'assets/css/',
        ext: '.min.css'
      }
    },
    clean: {
      site: '_site'
    },
    copy: {
      html: {
        expand: true,
        cwd: '',
        src: ['*.html', '*/*.html'],
        dest: '_site/',
        flatten: false,
        filter: 'isFile'
      },
      css: {
        expand: true,
        cwd: 'assets/css',
        src: ['*.min.css', '_*.css'],
        dest: '_site/assets/css',
        flatten: true,
        filter: 'isFile'
      },
      js: {
        expand: true,
        cwd: 'assets/js',
        src: '*.min.js',
        dest: '_site/assets/js',
        flatten: true,
        filter: 'isFile'
      },
      img: {
        expand: true,
        cwd: 'assets/img',
        src: '*',
        dest: '_site/assets/img',
        flatten: true,
        filter: 'isFile'
      }
    },
    imagemin: {
      prod: {
        files: [{
            expand: true,
            cwd: 'assets/img',
            src: '{,*/}*.{png,jpg,jpeg}',
            dest: 'assets/img'
        }]
      }
    },
    htmlrefs: {
      prod: {
        expand: true,
        cwd: '_site',
        src: ['*.html', '*/*.html'],
        dest: '_site/',
        flatten: true,
        filter: 'isFile'      
      }
    }
  });

  // Load the plugins that provide the tasks
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-htmlrefs');

  // Default task(s)
  grunt.registerTask('dev', ['connect:dev', 'watch']);
  grunt.registerTask('prod', ['uglify', 'imagemin', 'clean', 'copy', 'htmlrefs', 'connect:prod']);

};