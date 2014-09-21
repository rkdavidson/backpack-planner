// Gruntfile.js
module.exports = function(grunt) {

  // Config & Variables
  // =============================================================================

  var dirs = {
    src: 'app/src',
    dist: 'app/dist',
    views: 'app/views'
  };

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    dirs: dirs,

    // JS / Scripts
    // =============================================================================
    // check all js files for errors
    jshint: {
      all: ['<%= dirs.src %>/scripts/**/*.js']
    },

    // take all the js files and minify them into app.min.js
    uglify: {
      dev: {
        files: {
          '<%= dirs.dist %>/scripts/app.js': ['<%= dirs.src %>/scripts/**/*.js', '<%= dirs.src %>/scripts/*.js']
        },
        options: {
          mangle: false,
          banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                  '<%= grunt.template.today("yyyy-mm-dd") %>' +
                  '============================================================ */'
        }
      }
    },

    // CSS / Styles
    // =============================================================================
    // process the sass file to main.css
    sass: {
      dist: {
        files: {
          '<%= dirs.dist %>/styles/main.css': '<%= dirs.src %>/styles/main.scss'
        },
        options: {
          quiet: true
        }
      }
    },

    // take the processed main.css file and minify
    cssmin: {
      build: {
        files: {
          '<%= dirs.dist %>/styles/main.min.css': '<%= dirs.dist %>/styles/main.css'
        }
      }
    },

    // Server & Devops
    // =============================================================================

    concat: {
      vendor: {
        src: [
          'node_modules/angular/lib/angular.js',
          'node_modules/angular-resource/lib/angular-resource.js'
        ],
        dest: 'app/dist/scripts/vendor.js',
        options: {
          banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                  '<%= grunt.template.today("yyyy-mm-dd") %>' +
                  '============================================================ */'
        }
      }
    },

    watch: {
      css: {
        files: ['<%= dirs.src %>/styles/**/*.scss', '<%= dirs.src %>/styles/**/*.sass'],
        tasks: ['sass']
      },
      js: {
        files: ['<%= dirs.src %>/scripts/**/*.js'],
        tasks: ['jshint', 'uglify']
      },
      html: {
        files: ['<%= dirs.views %>/**/*.html']
      },
      options: {
        livereload: true
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
      tasks: [
        'nodemon',
        'watch'
      ]
    }

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');

  grunt.registerTask('default', [
    'sass',
    'cssmin',
    'jshint',
    'concat:vendor',
    'uglify:dev',
    'concurrent'
  ]);

};