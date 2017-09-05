define(['text!template/home/notepad/notepadTpl.html', 'wangEditor', 'mui'], function(notepadTpl, E, mui) {
    return function() {
        $('#notepad').remove();
        var $notepadTpl = $(notepadTpl);
        $('.content').append($notepadTpl);
        $(function() {
            var gallery = mui('.mui-slider');
            gallery.slider({
                interval: 0 //自动轮播周期，若为0则不自动播放，默认为0；
            });
            $notepadTpl.stop().animate({ left: 0 }, 20)
                // 关闭按钮
                .on('tap', '.close', function() {
                    $notepadTpl.stop(true, true).animate({ left: '100%' }, 20)
                })

            // 点击编辑按钮编辑文本

            $(".editBtn").on('tap', function() {
                $(this).siblings().find('.w-e-toolbar').toggleClass('visible')
                $('.w-e-text').each(function(i, v) {
                    if ($(v).parent().siblings('.w-e-toolbar').hasClass('visible')) {
                        $(v).attr('contenteditable', true)
                    } else {
                        $(v).attr('contenteditable', false)
                    }
                })
            })

            // 初始化编辑器
            var editor = $('.article-content');
            editor.each(function(i, v) {
                var editor = new E(v)
                editor.customConfig.menus = [
                    'head',
                    'bold',
                    'italic',
                    'link'
                ];
                editor.create();
                $('.w-e-text').attr('contenteditable', false)
            })
        })
    }
})