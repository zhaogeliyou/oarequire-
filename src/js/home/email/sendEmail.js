define(['text!template/home/email/sendEmailTpl.html', '../../comment/chooseUser', 'widget', 'iframeTransport', 'fileUpload', 'artEditor'], function(sendEmailTpl, chooseUser) {
    return function() {
        $('#sendEmailContent').remove();
        var $sendEmailTpl = $(sendEmailTpl)
            // 加载收件人模块
            .on('tap', '.addRecipient', function() {
                chooseUser();
            })
            // 弹出上传文件的选择框
            .on('tap', '.uploadBtn', function() {
                $(this).parent().find("input").click()
            });
        $(function() {
            $sendEmailTpl.stop(true, true).animate({ 'top': 0, 'opacity': 1 }).on('tap', '.email-send', function() {
                $sendEmailTpl.stop(true, true).animate({ 'top': '44px', 'opacity': 0 }, function() {
                    $sendEmailTpl.remove();
                })
            })
        })
        $('.content').append($sendEmailTpl);

        // 文本编辑器
        $('#content').artEditor({
            // imgTar: '#imageUpload',
            // limitSize: 5, // 兆
            showServer: false,
            // uploadUrl: '',
            data: {},
            // uploadField: 'image',
            placeholader: '<p>&nbsp;</p>',
            validHtml: ["br"],
            uploadSuccess: function(res) {
                // 这里是处理返回数据业务逻辑的地方
                // `res`为服务器返回`status==200`的`response`
                // 如果这里`return <path>`将会以`<img src='path'>`的形式插入到页面
                // 如果发现`res`不符合业务逻辑
                // 比如后台告诉你这张图片不对劲
                // 麻烦返回 `false`
                // 当然如果`showServer==false`
                // 无所谓咯
                return res.path;
            },
            uploadError: function(res) {
                //这里做上传失败的操作
                //也就是http返回码非200的时候
                console.log(res);
            }
        });

        // 点击按钮更改光标所在的元素(待续)


        // 文件提交
        $(function() {

            var ul = $('#upload ul');

            // Initialize the jQuery File Upload plugin
            $('#upload').fileupload({
                uploadUrl: 'upload-file.php',

                // This element will accept file drag/drop uploading
                // dropZone: $('#drop'),

                // This function is called when a file is added to the queue;
                // either via the browse button, or via drag/drop:
                add: function(e, data) {

                    // 点击发送按钮提交
                    $(".send").on('tap', function() {
                        data.submit()
                    })

                    var tpl = $('<li class="working"><p></p><span></span></li>');

                    // Append the file name and file size
                    tpl.find('p').html(data.files[0].name + '<b>×</b>')
                        .prepend('<i>' + formatFileSize(data.files[0].size) + '</i>');

                    // Add the HTML to the UL element
                    data.context = tpl.appendTo(ul);

                    // Initialize the knob plugin
                    // tpl.find('input').knob();

                    // Listen for clicks on the cancel icon
                    tpl.find('b').click(function() {

                        if (tpl.hasClass('working')) {
                            jqXHR.abort();
                        }

                        tpl.fadeOut(function() {
                            tpl.remove();
                        });

                    });

                    // Automatically upload the file once it is added to the queue
                    var jqXHR = data.submit();
                },

                progress: function(e, data) {

                    // Calculate the completion percentage of the upload
                    var progress = parseInt(data.loaded / data.total * 100, 10);

                    // Update the hidden input field and trigger a change
                    // so that the jQuery knob plugin knows to update the dial
                    data.context.find('input').val(progress).change();

                    if (progress == 100) {
                        data.context.removeClass('working');
                    }
                },

                fail: function(e, data) {
                    // Something has gone wrong!
                    data.context.addClass('error');
                }

            });


            // Prevent the default action when a file is dropped on the window
            // $(document).on('drop dragover', function(e) {
            //     e.preventDefault();
            // });

            // Helper function that formats the file sizes
            function formatFileSize(bytes) {
                if (typeof bytes !== 'number') {
                    return '';
                }

                if (bytes >= 1000000000) {
                    return (bytes / 1000000000).toFixed(0) + ' GB';
                }

                if (bytes >= 1000000) {
                    return (bytes / 1000000).toFixed(0) + ' MB';
                }

                return (bytes / 1000).toFixed(0) + ' KB';
            }
        });

    }
})