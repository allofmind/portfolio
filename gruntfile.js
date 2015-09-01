module.exports = function(grunt) {

  grunt.initConfig({
    watch: {
      express: {
        files:  [ "server/**/*.js" ],
        tasks:  [ "express:dev" ],
        options: {
          spawn: false
        }
      },
      styles: {
        files:  [ "**/*.sass" ],
        tasks:  [ "sass:dist" ],
        options: {
          spawn: false
        }
      },
    },
    express: {
      dev: {
        options: {
          script: "server/index.js",
          spawn: false
        }
      },
      prod: {
        options: {
          script: "server/index.js",
          node_env: "production",
          spawn: false
        }
      }
    },
    sass: {
      dist: {
        options: {
          noCache: true,
          spawn: false,
          sourcemap: "none"
        },
        files: [ {
          expand: true,
          cwd: "./",
          src: [ "**/*.sass" ],
          dest: "./",
          ext: ".css"
        } ]
      }
    }
  });

  grunt.loadNpmTasks("grunt-express-server");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-sass");

  grunt.registerTask("dev", [ "sass:dist", "express:dev", "watch" ]);

};