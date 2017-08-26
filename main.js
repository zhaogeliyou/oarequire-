require.config({
    waitSeconds: 0,
    paths: {
        mui: "./node_modules/muiv3/dist/js/mui",
        jquery: './node_modules/jquery/dist/jquery',
        text: './node_modules/requirejs-text/text',
        template: 'src/template'
    },
    shim: {
        "myCustomMod": {
            deps: [],
            exports: "mui"
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