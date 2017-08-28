define(['text!template/home/homeListTpl.html', '../home/email/sendEmail', 'mui'], function(homeListTpl, sendEmail, mui) {
    return function() {
        $(".content").html(homeListTpl);
        $(".send-email").on("tap", function() {
            offCanvasWrapper.offCanvas('close');
            sendEmail();
        })
        mui.init({
            swipeback: true
        });
        //侧滑容器父节点
        var offCanvasWrapper = mui('#offCanvasWrapper');
        //主界面容器
        var offCanvasInner = offCanvasWrapper[0].querySelector('.mui-inner-wrap');
        //左菜单容器
        var offCanvasSide = document.getElementById("offCanvasSideLeft");
        // 右菜单容器
        var offCanvasSideRight = document.getElementById("offCanvasSideRight");
        if (!mui.os.android) {
            // document.getElementById("move-togger").classList.remove('mui-hidden');
            var spans = document.querySelectorAll('.android-only');
            for (var i = 0, len = spans.length; i < len; i++) {
                spans[i].style.display = "none";
            }
        }
        //移动效果是否为整体移动
        var moveTogether = false;
        //侧滑容器的class列表，增加.mui-slide-in即可实现菜单移动、主界面不动的效果；
        var classList = offCanvasWrapper[0].classList;

        // classList.add('mui-slide-in');

        //左侧滑菜单界面支持区域滚动；
        mui('#offCanvasSideScrollLeft').scroll();

        //右侧滑菜单界面支持区域滚动；
        mui('#offCanvasSideScrollRight').scroll();
        mui('#offCanvasSideScroll').scroll();

        //主界面支持区域滚动；
        mui('#offCanvasContentScroll').scroll();
        //实现ios平台原生侧滑关闭页面；
        if (mui.os.plus && mui.os.ios) {
            mui.plusReady(function() { //5+ iOS暂时无法屏蔽popGesture时传递touch事件，故该demo直接屏蔽popGesture功能
                plus.webview.currentWebview().setStyle({
                    'popGesture': 'none'
                });
            });
            // offCanvasWrapper[0].addEventListener('hidden', function(e) { //菜单关闭完成事件
            //     plus.webview.currentWebview().setStyle({
            //         'popGesture': 'close'
            //     });
            // });
        }


        // mui('body').on('tap', '.mui-content', function() {
        if (mui('.mui-off-canvas-wrap').offCanvas().isShown('left')) {
            alert(9)
            mui('.mui-off-canvas-wrap').offCanvas().close();
        }

        // })
        document.querySelectorAll(".mui-title")[0].addEventListener("tap", function() {
            mui('#action-sheet-wrapper').popover('toggle');
        })

    }
})