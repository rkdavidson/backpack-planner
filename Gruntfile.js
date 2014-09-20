// Gruntfile.js
module.exports = function(grunt) {

  grunt.initConfig({

    // JS TASKS ================================================================
    // check all js files for errors
    jshint: {
      all: ['app/src/scripts/**/*.js']
    },

  // take all the js files and minify them into app.min.js
    uglify: {
      build: {
        files: {
          'app/dist/scripts/app.min.js': ['app/src/scripts/**/*.js', 'app/src/scripts/*.js']
        }
      }
    },

    // CSS TASKS ===============================================================
    // process the less file to main.css
    less: {
      build: {
        files: {
          'app/dist/styles/main.css': 'app/src/styles/style.less'
        }
      }
    },

  // take the processed main.css file and minify
    cssmin: {
      build: {
        files: {
          'app/dist/styles/style.min.css': 'app/dist/styles/main.css'
        }
      }
    },

    // COOL TASKS ==============================================================
    // watch css and js files and process the above tasks
    watch: {
      css: {
        files: ['app/src/styles/**/*.less'],
        tasks: ['less', 'cssmin']
      },
      js: {
        files: ['app/src/scripts/**/*.js'],
        tasks: ['jshint', 'uglify']
      }
    },

  // watch our node server for changes
    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

  // run watch and nodemon at the same time
    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      tasks: ['nodemon', 'watch']
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');

  grunt.registerTask('default', ['less', 'cssmin', 'jshint', 'uglify', 'concurrent']);

};