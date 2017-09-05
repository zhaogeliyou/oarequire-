define(['text!template/home/addressBook/userListTpl.html', 'mui'], function(userListTpl, mui) {
    return function($this) {
        //创建蒙版
        var mask = mui.createMask(function() {
            $('.new-address-book').stop().animate({ 'right': '-80%' }, 300)
        })

        var $userListTpl = $(userListTpl);
        $userListTpl.on('tap', 'img', function() {
            $('.new-address-book').stop().animate({ 'right': 0, 'z-index': 999 }, 200)
            mask.show()
        })

        $('.menu-close').on('tap', function() {
            mask.close();
        })
        $this.parent().parent().find('.list-content').html($userListTpl);
    }
})