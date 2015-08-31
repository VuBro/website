'use strict';
module.exports = function (grunt) {
    // Load all tasks
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({

        clean: ['dist', 'app/styles/css' ,'.tmp'],
        copy: {
            main: {
                expand: true,
                cwd: 'app/',
                src: ['**', '!**/*.css'],
                dest: 'dist/'
            },
            font: {
                expand: true,
                cwd: 'app/assets/vendor/font-awesome',
                src: ['fonts/**'],
                dest: 'dist/'
            }
        },
        useminPrepare: {
            html: ['app/index.html']
        },
        usemin: {
            html: ['dist/index.html']
        },
        uglify: {
            options: {
                report: 'min',
                mangle: false
            }
        },
        concat: {
            js: {
                src: [
                    'app/vendor/jquery/dist/jquery.min.js',
                    'app/vendor/bootstrap-sass-official/assets/javascripts/bootstrap.min.js'
                ],
                dest: 'dist/js/freifunk.js'
            }
        },
        compass: {
            dev: {
                options: {
                    sassDir: ['dist/styles/sass'],
                    cssDir: ['dist/styles/css'],
                    sourcemap: true,
                    environment: 'development'
                }
            },
            prod: {
                options: {
                    sassDir: ['dist/styles/sass'],
                    cssDir: ['dist/styles/css'],
                    environment: 'production'
                }
            },
            options: {
                importPath: ['app/vendor/bootstrap-sass-official/assets/stylesheets', 'app/vendor/font-awesome/scss']
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                '!Gruntfile.js',
                'app/js/**/*.js',
                '!app/js/**/*.min.js'
            ]
        },
        flow: {
            options: {
                style: 'color'
            },
            files: {
                file: 'app/modules/**/*.js'
            }
        },
        includereplace: {
            build: {
                options: {
                    includesDir: 'include'
                },
                files: [ {
                    src: '*.html', dest: 'dist/', expand: true, cwd: 'app/'
                }]
            }
        }
    });
    // Tell Grunt what to do when we type "grunt" into the terminal
    grunt.registerTask('default', ['dev']);
    grunt.registerTask('prod', [
        'clean',
        'copy:main',
        'includereplace',
        'copy:font',
        'compass:prod',
        'useminPrepare',
        'concat',
        'uglify',
//        'cssmin',
        'usemin'
    ]);
    grunt.registerTask('test', [
        'protractor'
    ]);
    grunt.registerTask('dev', [
        'clean',
        'jshint',
        'copy:main',
        'includereplace',
        'copy:font',
        'concat',
        'compass:dev'
    ]);
};
