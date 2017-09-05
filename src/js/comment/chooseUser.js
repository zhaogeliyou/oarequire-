define(['text!template/home/email/chooseUserTpl.html'], function(chooseUserTpl) {
    return function(that) {
        $('#addRecipient').remove();
        var $chooseUserTpl = $(chooseUserTpl)
            // 关闭选择用户页面
            .on('tap', '.close', function() {
                $chooseUserTpl.stop().animate({ 'top': '20%', 'opacity': 0 }, function() {
                    $chooseUserTpl.remove()
                })
            })
            // 点击确定，将值赋给收件人
            .on('tap', '.confirm', function() {
                var sure = $chooseUserTpl.find('dd input');
                var arr = [];
                sure.each(function(i, v) {
                    if ($(v).prop('checked')) {
                        arr.push($(v).val())
                    }
                })
                if (that) {
                    that.find('input').val(arr);
                } else {
                    $('.recipient').find('input').val(arr);
                }
                $chooseUserTpl.stop().animate({ 'top': '20%', 'opacity': 0 }, function() {
                    $chooseUserTpl.remove()
                })
            });
        // 点击dt，展示或者收起dd
        var dt = $chooseUserTpl.find('dt');
        dt.on('tap', function() {
                $(this).parent().find("dd").fadeToggle(100);
            })
            // 如果dt选中，则所有选中
        dt.on('tap', 'input', function() {
                $(this).parent().siblings().find('input').prop('checked', !$(this).prop('checked'))
            })
            // 当dd改变时，如果dd都选中，则dt也选中，反之dt不选中


        // 选择用户页面打开时的动画
        $(function() {
            $chooseUserTpl.stop().animate({ 'top': 0, 'opacity': 1 })
        })

        // 将选择用户页面添加到页面中
        $('.content').append($chooseUserTpl);
    }
})