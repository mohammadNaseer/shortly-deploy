  module.exports = function(grunt) {

    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      concat: {
        options: {
          separator: ';',
        },
        dist: {
          src: 'public/clint/*.js',
          dest: 'public/dist/scripts.js',
        },
        vendor: {
        src: ['public/lib/*.js'],
        dest: 'public/dist/vendor.js'
      }
    },

      mochaTest: {
        test: {
         options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
       script: 'server.js'
     }
   },

   uglify: {
    dist: {
      files: {
        'public/dist/scripts.min.js': ['public/dist/scripts.js'],
        'public/dist/vendor.min.js': ['public/dist/vendor.js']
      }
    }
  },
  jshint: {
      files: [
        'app/**/*.js', 'public/client/*.js', 'server.js', 'server-config.js'
      ],
      options: {
        force: 'true',
        jshintrc: '.jshintrc',
        ignores: [
          'public/lib/**/*.js',
          'public/dist/**/*.js'
        ]
      }
    },
        cssmin: {
          dist{
            files: {
              'public/dist/style.min.css' : ['public/style.css']
            }

          },

          watch: {
            scripts: {
              files: [
              'public/client/**/*.js',
              'public/lib/**/*.js',
              ],
              tasks: [
              'concat',
              'uglify'
              ]
            },
            css: {
             files: 'public/*.css',
             tasks: ['cssmin']
           }
         },

         shell: {
           prodServer: {
            command: 'git push azure master'
           }
         },
       });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-nodemon');

    

    grunt.registerTask('server-dev', function (target) {
     grunt.task.run([ 'nodemon', 'watch' ]);
   });

    ////////////////////////////////////////////////////
    // Main grunt tasks
    ////////////////////////////////////////////////////

    grunt.registerTask('test', [
      'mochaTest'
      ]);

    grunt.registerTask('build', [

      ]);

    grunt.registerTask('upload', function(n) {
     if (grunt.option('prod')) {
        // add your production server task here
        grunt.task.run(['shell:prodServer']);
      } else {
       grunt.task.run([ 'server-dev' ]);
     }
   });

    grunt.registerTask('deploy', function(n){
      if (grunt.option('prod')) {
        grunt.task.run([
   
          ]);
      } else {
       grunt.task.run([ 

        ]);
     }
      
    });


     



