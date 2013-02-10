
module.exports = function(grunt) {
	var proc = require('child_process');

    // ターゲットとするファイルを定義する
    // ワイルドカードつかのはミスとかバグにつながりそうなので
    // 一個ずつかきましょうか。。？
    // 依存関係も明確になるし
    var sassFiles = [];
    var jsFiles = [
			'js/plugins.js',
			'js/three.js',
			// 'js/sample.js'
			'js/sample_load_blender.js'
    ];

    //タスクを初期化する
    grunt.initConfig({

        // grunt-contrib-concatに関する設定
        // ↑で定義したcssFilesのファイルを結合し
        // cssフォルダ下にall.cssとして出力する
        concat: {
            // css: {
            //     src: cssFiles,
            //     dest: "./css/all.css"
            // }
            js:{
				src: jsFiles,
				dest: "js/all.js"
            }
        },

        // grunt-contrib-mincssに関する設定
        // cssフォルダ下のall.cssをcompressし、all.min.cssとして出力する。
        mincss: {
            compress: {
                files: {
                    "css/all.min.css": ["css/all.css"]
                }
            }
        },

        // jshintで文法チェックしてからminifyしてくれる
        uglify: {
            my_target: {
                files: {
                    'js/all.min.js': jsFiles
                }
            }
        },

        //compass
        compass: {                  // Task
			dist: {                   // Target
				options: {              // Target options
					sassDir: 'sass',
					cssDir: 'css'
				}
			}
		},


        // grunt-contrib-watchに関する設定
        // ↑で定義したcssFilesのファイルを監視し、
        // 変更があった場合にtasksに定義されるタスクが実行される
        watch: {

            compass : {
                files: sassFiles,
                tasks: ["compass", "notify"]
            },

            jsmin :{
                files: jsFiles,
                tasks: ["concat", "uglify", "notify"]
                // growlへの通知をONにする場合は
                // さらにnotifyというタスクを追記する
            }
        }

    });

	// notifyは無理やりkgwが作ったもの
    // ***growlのcliToolが必要です***
    grunt.registerTask('notify','run growlnotify', function(){
        proc.exec("growlnotify -t grunt -m 'termination!!!!'");
    });

    //インストールしたモジュールをロードする
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-mincss');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    //コマンドラインでgruntだけ入力し実行した場合に
    //ここでは↑で定義したwatchタスクを実行するという設定
    //カスタムで定義できます。
    grunt.registerTask("default", "watch");
};