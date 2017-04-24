module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      dist: {
        files: {
          'dist/js/<%= pkg.name %>.js': [
            'src/<%= pkg.name %>.js'
          ]
        },
        options: {

        }
      }
    },
    uglify: {
      build: {
        src: 'dist/js/<%= pkg.name %>.js',
        dest: 'dist/js/<%= pkg.name %>.min.js'
      }
    },
    cssmin: {
      options: {
        mergeIntoShorthands: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'dist/css/<%= pkg.name %>.min.css': [ 'src/<%= pkg.name %>.css', 'node_modules/quill/dist/quill.core.css' ]
        }
      }
    },
    copy: {
      js: {
        files: [
          {
            src: [ 'dist/js/**' ],
            dest: 'demo/'
          }
        ]
      },
      css: {
        files: [
          {
            src: [ 'dist/css/**' ],
            dest: 'demo/'
          }
        ]
      }
    },
    connect: {
      server: {
        options: {
          port: 5000,
          hostname: '*',
          base: 'demo',
          keepalive: true
        }
      }
    },
    watch: {
      css: {
        files: [ 'src/<%= pkg.name %>.css' ],
        tasks: [ 'cssmin', 'copy:css' ]
      },
      js: {
        files: [ 'src/*.js', 'src/**/*.js' ],
        tasks: [ 'browserify', 'copy:js' ]
      },
      scripts: {
        files: [ 'dist/js/*.js', 'dist/css/*.css' ],
        options: {
          spawn: false,
          livereload: true
        },
        livereload: {
          host: 'localhost',
          port: 5000
        }
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', [ 'browserify', 'uglify', 'cssmin', 'copy' ]);

};
