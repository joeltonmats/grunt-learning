module.exports = function (grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),


        // minify js files -----------------------------------
        uglify: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            dev: {
                files: { 'dist/js/magic.min.js': ['src/js/magic.js', 'src/js/magic2.js'] }
            },
            production: {
                files: [{
                    expand: true,
                    src: ['app/assets/js/**/*.js', '!app/assets/js/**/*.min.js'],
                    dest: 'dist/assets',
                    cwd: '.',
                    rename: function (dst, src) {
                        src = (src.split('/')).slice(2).join('/');
                        return dst + '/' + src.replace('.js', '.min.js');
                    }
                }]
            }
        },

        // minify css files -----------------------------------
        cssmin: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            production: {
                files: [{
                    expand: true, cwd: 'app/assets/css', src: ['*.css', '!*.min.css'], dest: 'dist/assets/css', ext: '.min.css'
                }]
            }
        },

        // copy files -----------------------------------
        copy: {
            production: {
                files: [{ expand: true, cwd: './app', src: ['**'], dest: 'dist/' },],
            },
            optimizeImg: {
                files: [{ expand: true, cwd: './app/assets/images', src: ['**'], dest: 'dist/assets/images' },],
            }
        },

        // clean unecessary files -----------------------------------
        clean: {
            production: {
                src: ['dist/assets/js/**/*.js', 'dist/assets/css/**/*.css', '!dist/assets/js/**/*.min.js', '!dist/assets/css/**/*.min.css']
            }
        },

        replace: {
            production: {
                options: {
                    patterns:
                    [
                        { match: /\.css/g, replacement: '.min.css' },
                        { match: /<!-- Main Dev Scripts -->/, replacement: '<!-- Main Dev Scripts' },
                        { match: /<!-- End Dev Scripts -->/, replacement: 'End Dev Scripts -- > ' },
                        { match: /<!-- Main Prod Scripts/, replacement: '<!-- Main Prod Scripts -->' },
                        { match: /End Prod Scripts -->/, replacement: '<!-- End Prod Scripts -->' },
                    ]
                },
                files: [{ expand: true, flatten: true, src: ['app/index.html'], dest: 'dist/' }]
            }
        },

        responsive_images: {
            production: {
                options: {
                    sizes: [
                        {
                            width: 320,
                            name: 'small'
                        },
                        {
                            width: 640,
                            name: 'medium'
                        },
                        {
                            width: 800,
                            name: 'large'
                        }]
                },
                files: [{
                    expand: true,
                    src: ['**/*.{jpeg,gif,png}'],
                    cwd: 'app/assets/images/',
                    dest: 'app/assets/images/'
                }]
            }
        },

        watch: {
            // for stylesheets, watch css and less files 
            // only run less and cssmin stylesheets: { 
            files: ['app/index.html'],
            tasks: ['copy:production', 'cssmin:production', 'uglify:production', 'clean:production', 'replace:production']
        },

    });

    // LOAD GRUNT PLUGINS ========================================================
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-responsive-images');


    grunt.registerTask('default', ['uglify', 'cssmin', 'less']);

    grunt.registerTask('optimize-img', ['responsive_images:production', 'copy:optimizeImg']);

    grunt.registerTask('production',
        [
            'copy:production', 'cssmin:production',
            'clean:production', 'replace:production', 'uglify:production'
        ]);

};