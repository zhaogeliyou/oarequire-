define(['text!template/home/addressBook/addressBookListTpl.html', '../../comment/chooseUser.js', './userList', 'picker', 'mui'], function(addressBookListTpl, chooseUser, userList, picker, mui) {
    return function() {
        $('#addressBook').remove();
        $('.new-address-book').remove();
        var $addressBookListTpl = $(addressBookListTpl);
        $('.content').append($addressBookListTpl);

        $(function() {
            // 创建蒙版
            var mask = mui.createMask(function() {
                $('.new-address-book').stop().animate({ 'right': '-80%' }, 300)
            })
            var mask2 = mui.createMask(function() {
                $classify.css({ 'z-index': -1 })
            })
            var $popup = $('.pop-up')
            var $classify = $('.classify');
            var $gender = $('.gender')

            // 存储分类按钮的值
            // var classifyValue = '';

            // 初始化弹窗位置
            $popup.css({ 'z-index': -1, 'top': '-150%', 'transform': 'translate(-50% ,-50%)' })

            // 初始化搜索框位置
            $('.addressBook-search').css({ 'top': '84%' })

            // 添加页面进入时的动画
            $addressBookListTpl.css("z-index", 1).stop().animate({ top: '-100%', opacity: 1 }, 300, function() {
                $popup.css({ 'z-index': -1, 'top': '50%', 'transform': 'translate(-50% ,-50%)' })
                $('.addressBook-search').css({ 'top': '82%' })
            })

            // 注册列表刷新按钮
            .on('tap', '.getUser', function() {
                var $this = $(this);
                userList($this);
            })

            // 注册关闭按钮事件
            .on('tap', '.close', function() {
                // $addressBookListTpl.stop().animate({ top: '-80%', opacity: 0, 'z-index': 0 }, 300)
                $addressBookListTpl.css('display', 'none')
            })

            // 注册菜单新建按钮
            .on('tap', '.addBook', function() {
                $('.new-address-book').stop().animate({ 'right': 0, 'z-index': 999 }, 200)
                mask.show()
            })

            // 注册菜单关闭按钮
            .on('tap', '.menu-close', function() {
                $('.new-address-book').stop().animate({ 'right': '-80%' }, 200)
                mask.close()
            })

            // 注册新建侧滑菜单分类按钮事件
            .on('tap', '.classifyBtn', function() {
                // classifyValue = $(this).find('input').val();
                mask2.show();
                $('.mui-backdrop:last').css('z-index', 999)
                $classify.animate({ 'z-index': 1000 }, 100)
            })

            // 注册新建侧滑菜单性别按钮事件
            .on('tap', '.genderBtn', function() {
                mask2.show();
                $('.mui-backdrop:last').css('z-index', 999)
                $gender.animate({ 'z-index': 1000 }, 100)
            })

            // 注册侧滑菜单选择用户按钮
            .on('tap', '.recipient', function() {
                var that = $(this);
                chooseUser(that);
            })

            // 注册弹窗确认与取消按钮事件
            $popup.on('tap', '.cancle', function() {
                    $popup.css({ 'z-index': -1 })
                    mask2.close();
                })
                // 分类确认
            $classify.on('tap', '.confirm', function() {
                var classifyValue = $classify.find('input:checked').siblings().html();
                $('.classifyBtn').find('input').val(classifyValue)
                $classify.css({ 'z-index': -1 })
                mask2.close();
            })

            // 性别确认
            $gender.on('tap', '.confirm', function() {
                var genderValue = $gender.find('input:checked').siblings().html();
                console.log(genderValue)
                $('.genderBtn').find('input').val(genderValue)
                $gender.css({ 'z-index': -1 })
                mask2.close();
            })

            // 选中的单选框内容变蓝色
            $('.mui-radio').on('tap', function() {
                $(this).find("label").addClass('current').parent().siblings().find('label').removeClass('current')
            })

            //初始化主页时间组件
            var dtPicker = new mui.DtPicker({
                'type': 'date',
                beginDate: new Date(1917, 01, 01), //设置开始日期 
                endDate: new Date(), //设置结束日期 
                labels: ['Year', 'Mon', 'Day'], //设置默认标签区域提示语 
            });

            //点击主页时间按钮显示时间组件
            $addressBookListTpl.on('tap', '.datapop', function(e) {
                var _this = $(this)
                dtPicker.show(function(selectItems) {
                    _this.find('input').val(selectItems.y.value + '-' + selectItems.m.value + '-' + selectItems.d.value)
                })
                $('.mui-backdrop:last').css('z-index', '999');
            })
        })
    }
})