require.config({
    waitSeconds: 0,
    paths: {
        mui: "./node_modules/muiv3/dist/js/mui",
        jquery: './node_modules/jquery/dist/jquery',
        text: './node_modules/requirejs-text/text',
        template: 'src/template',
        widget: './src/assets/fileUpload-master/src/main/webapp/js/jquery.ui.widget',
        iframeTransport: './src/assets/fileUpload-master/src/main/webapp/js/jquery.iframe-transport',
        fileUpload: './src/assets/fileUpload-master/src/main/webapp/js/jquery.fileupload',
        artEditor: './src/assets/artEditor-master/dist/index.min',
        wangEditor: './src/assets/wangEditor-3.0.8/release/wangEditor.min',
        picker: './node_modules/muiv3/plugin/picker/dist/js/mui.picker.min'
    },
    shim: {
        "mui": {
            deps: [],
            exports: "mui"
        },
        "widget": {
            deps: ['jquery'],
            exports: "widget"
        },
        "iframeTransport": {
            deps: ['jquery'],
            exports: "iframeTransport"
        },
        "fileUpload": {
            deps: ['widget'],
            exports: "fileUpload"
        },
        "artEditor": {
            deps: ['jquery'],
            exports: "artEditor"
        },
        "picker": {
            deps: ['mui'],
            exports: "picker"
        }
    }
})
require(['./src/js/home/homeList', './src/js/message/messageList', './src/js/application/applicationList', 'jquery'], function(homeList, messageList, applicationList) {
    $(".tabbar").on("click", "div", function() {
        // 给tarbar点击处添加.active设置字体颜色
        $(this).addClass("active").siblings().removeClass("active")

        // 将home模块添加到content容器中
        if ($(this).hasClass("home")) {
            homeList();
        }

        // 将message模块添加到content容器中
        else if ($(this).hasClass("message")) {
            messageList();
        }

        // 将application模块添加到content容器中
        else if ($(this).hasClass("application")) {
            applicationList();
        }
    })

    $(".tabbar .home").trigger("click")
})