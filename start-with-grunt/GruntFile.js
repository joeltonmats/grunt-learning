module.exports = function (grunt) {

    // ===========================================================================
    // CONFIGURE GRUNT ===========================================================
    // ===========================================================================
    grunt.initConfig({

        // get the configuration info from package.json ----------------------------
        // this way we can use things like name and version (pkg.name)
        pkg: grunt.file.readJSON('package.json'),


        // all of our configuration will go here

        // configure jshint to validate js files -----------------------------------
        jshint: {
            options: {
                reporter: require('jshint-stylish') // use jshint-stylish to make our errors look and read good
            },

            // when this task is run, lint the Gruntfile and all js files in src
            build: ['Gruntfile.js', 'src/**/*.js']
        },

        uglify: {
            options: {
                banner: '/\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n/\n'
            },
            dev: {
                files: { 'dist/js/magic.min.js': ['src/js/magic.js', 'src/js/magic2.js'] }
            },
            production: {
                files: { 'dist/js/magic.min.js': 'src/**/*.js' }
            }
        },

        less: {
            build: {
                files: {
                    'dist/css/pretty.css': 'src/css/pretty.less'
                }
            }
        },

        cssmin: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            build: {
                files: {
                    'dist/css/style.min.css': 'src/css/style.css'
                }
            }
        },

        watch: {
            // for stylesheets, watch css and less files 
            // only run less and cssmin stylesheets: { 
            files: ['src/**/*.css', 'src/**/*.less'],
            tasks: ['less', 'cssmin']
        },

        // for scripts, run jshint and uglify 
        scripts: {
            files: 'src/**/*.js', tasks: ['jshint', 'uglify']
        }

    });

    // ===========================================================================
    // LOAD GRUNT PLUGINS ========================================================
    // ===========================================================================
    // we can only load these if they are in our package.json
    // make sure you have run npm install so our app can find these
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['uglify', 'cssmin', 'less']);

    // this task will only run the dev configuration 
    grunt.registerTask('dev', [/* 'jshint:dev', */ 'uglify:dev'/* , 'cssmin:dev', 'less:dev' */]);

    // only run production configuration 
    grunt.registerTask('production', ['jshint:production', 'uglify:production', 'cssmin:production', 'less:production']);

};