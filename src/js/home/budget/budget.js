define(['text!template/home/budget/budgetTpl.html', 'picker', 'mui'], function(budgetTpl, picker, mui) {
    return function() {
        $('#budget').remove();
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
                    $('#budget').remove();
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

            //点击主页时间按钮显示时间组件
            $budgetTpl.on('tap', 'button', function(e) {
                var _this = $(this)
                dtPicker.show(function(selectItems) {
                    _this.find('input').val(selectItems.y.value + '-' + selectItems.m.value + '-' + selectItems.d.value)
                })
            })


            //初始化侧滑彩当时间组件
            var dtPickerSlide = new mui.DtPicker({
                'type': 'datetime',
                beginDate: new Date(1917, 01, 01), //设置开始日期 
                endDate: new Date(), //设置结束日期 
                labels: ['Year', 'Mon', 'Day', 'Hour', 'Min'], //设置默认标签区域提示语 
            });

            //点击侧滑菜单时间按钮显示时间组件
            $budgetTpl.on('tap', '.slideDate', function(e) {
                var _this = $(this)
                dtPickerSlide.show(function(selectItems) {
                    _this.val(selectItems.y.value + '-' + selectItems.m.value + '-' + selectItems.d.value + ' ' + selectItems.h.value + ':' + selectItems.i.value)
                })
            })
        })
    }
})