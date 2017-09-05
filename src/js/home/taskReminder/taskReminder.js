define(['text!template/home/taskReminder/taskreminderTpl.html', 'picker', 'mui'], function(budgetTpl, picker, mui) {
    return function() {
        $('#taskReminder').remove();
        $('.addBudgetMenu').remove()
        var $budgetTpl = $(budgetTpl)
        $('.content').append($budgetTpl)
        $(function() {
            // 创建蒙版
            var mask = mui.createMask(function() {
                $('.addBudgetMenu').animate({ 'left': '100%' });
            })

            // 页面加载时头部的动画
            $budgetTpl.find('header').animate({ 'left': '0' })

            // 注册关闭按钮事件
            .on('tap', '.close', function() {
                $budgetTpl.find('header').animate({ 'left': '250%' }, 1000, function() {
                    $('#taskReminder').remove();
                    $('.dtPicker').remove();
                    $('.mui-dtpicker').remove();
                })
            })

            // 注册新建按钮事件
            .on('tap', '.addBudget', function() {
                $('.addBudgetMenu').animate({ 'left': '20%' }, 300);
                mask.show()
            })

            // 注册右滑菜单关闭按钮
            $budgetTpl.on('tap', '.menuClose', function() {
                $('.addBudgetMenu').animate({ 'left': '100%' }, 300);
                mask.close();
            })


            //初始化主页时间组件
            var dtPicker = new mui.DtPicker({
                'type': 'date',
                beginDate: new Date(1917, 01, 01), //设置开始日期 
                endDate: new Date(), //设置结束日期 
                labels: ['Year', 'Mon', 'Day'], //设置默认标签区域提示语 
            });

            var dtPicker2 = new mui.DtPicker({
                'type': 'date',
                beginDate: new Date(1917, 01, 01), //设置开始日期 
                endDate: new Date(2100, 01, 01), //设置结束日期 
                labels: ['Year', 'Mon', 'Day'], //设置默认标签区域提示语 
            });

            //点击主页时间按钮显示时间组件
            $budgetTpl.on('tap', 'button.startTime', function(e) {
                var _this = $(this)
                dtPicker.show(function(selectItems) {
                    _this.find('input').val(selectItems.y.value + '-' + selectItems.m.value + '-' + selectItems.d.value)
                })
            })

            //点击主页时间按钮显示时间组件
            $budgetTpl.on('tap', 'button.endTime', function(e) {
                var _this = $(this)
                dtPicker2.show(function(selectItems) {
                    _this.find('input').val(selectItems.y.value + '-' + selectItems.m.value + '-' + selectItems.d.value)
                })
            })


            //初始化侧滑彩当时间组件
            var dtPickerSlide = new mui.DtPicker({
                'type': 'date',
                beginDate: new Date(1917, 01, 01), //设置开始日期 
                endDate: new Date(), //设置结束日期 
                labels: ['Year', 'Mon', 'Day'], //设置默认标签区域提示语 
            });

            //点击侧滑菜单时间按钮显示时间组件
            $budgetTpl.on('tap', '.slideDate', function(e) {
                var _this = $(this)
                dtPickerSlide.show(function(selectItems) {
                    _this.val(selectItems.y.value + '-' + selectItems.m.value + '-' + selectItems.d.value)
                })
                $('.mui-backdrop:last').css('z-index', '999');
            })
        })


        // 注册任务点击事件
        $budgetTpl.on('tap', '.process', function() {
            var mask = mui.createMask(function() {
                $('.task-pop').css({ 'z-index': '-1', transform: 'translate(-50%, 40%) scale(1.2)', opacity: 0 })
            }); //callback为用户点击蒙版时自动执行的回调；
            mask.show(); //显示遮罩

            // 注册任务弹框取消按钮点击事件
            $budgetTpl.on('tap', '.cancle', function() {
                mask.close();
            });

            // 注册任务弹框确认按钮点击事件
            $budgetTpl.on('tap', '.confirm', function() {
                var text = $(this).parent().siblings().find('input:checked').siblings().html();
                $('.process-select').html(text);
                mask.close();
            });

            // 选中的单选框内容变蓝色
            $budgetTpl.on('tap', '.mui-radio label', function() {
                $(this).addClass('current').parent().siblings().find('label').removeClass('current')
            })

            // 任务弹框动画
            $('.task-pop').css({ 'z-index': '10000', transform: 'translate(-50%, 40%) scale(1)', opacity: 1 })
        });
    }
})