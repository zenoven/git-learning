module.exports = function(grunt){

    // 项目配置
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        path: {                     // Metadata.
            base: '../',
            sass: '<%= path.base %>sass/',
            less: '<%= path.base %>less/',
            css: '<%= path.base %>css/',
            js: '<%= path.base %>js/',
            img: '<%= path.base %>img/',
        },
        watch: {
            sass: {
              files: [
                '<%= path.sass %>*.sass',
                '<%= path.sass %>*.scss'
              ],
              tasks: ['compass']
            },
            less: {
              files: [
                '<%= path.less %>*.less'
              ],
              tasks: ['less']
            },
            js: {
              files: ['<%= path.js %>*.js', 'Gruntfile.js'],
              tasks: ['uglify']
              // tasks: ['jshint','uglify']
            }
        },
        compass: {                  // compass任务
            dist: {                   // 一个子任务
                options: {              // 任务的设置
                    sassDir: '<%= path.sass %>',
                    cssDir: '<%= path.css %>',
                    outputStyle: 'expanded',
                    environment: 'production'
                }
            }
        },
        less: {
            development: {
                options: {
                    paths: ['<%= path.less %>']
                },
                // files: {
                //     "<%= path.css %>name1.css": "<%= path.less %>name1.less",
                //     "<%= path.css %>name2.css": "<%= path.less %>name2.less"
                // }
                files: [
                    {
                        expand: true,
                        cwd: '<%= path.less %>',
                        src: ['*.less'],
                        dest: '<%= path.css %>',
                        ext: '.css'
                    }
                ]
            }
        },
        jshint: {
            options: {
                curly:true,//如果为真，JSHint会要求你在使用if和while等结构语句时加上{}来明确代码块。        
                eqeqeq:true,//如果为真，JSHint会看你在代码中是否都用了===或者是!==，而不是使用==和!。
                immed:true,////如果为真，JSHint要求匿名函数的调用如下：(function(){//}());而不是(function(){}(//bla bla));
                latedef:true,
                newcap:true,//JSHint会要求每一个构造函数名都要大写字母开头。
                noarg:true,//如果为真，JSHint会禁止arguments.caller和arguments.callee的使用
                sub:true,//如果为真，JSHint会允许各种形式的下标来访问对象。
                undef:true,//如果为真，JSHint会要求所有的非全局变量，在使用前都被声明。
                boss:true,//如果为真，那么JSHint会允许在if，for，while里面编写赋值语句。
                eqnull:true,//JSHint会允许使用"== null"作比较
                browser:true,

                globals:{
                    //AMD
                    module: true,
                    require:true,
                    requirejs: true,
                    define: true,

                    //Environments
                    console: true,

                    //General Purpose Libraries
                    $: true,
                    jQuery:true,

                    //Testing
                    sinon: true,
                    describe:true,
                    it: true,
                    expect:true,
                    beforeEach: true,
                    afterEach: true
                }
            },
            all: ['Gruntfile.js', '<%= path.js %>*.js']
        },
        uglify: {               // 代码压缩
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: '<%= path.js %>function.js',
                dest: '<%= path.js %>function.min.js'
            }               
        }
    });

    // 加载Grunt任务插件
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // 默认任务
    grunt.registerTask('default', ['watch']);
}