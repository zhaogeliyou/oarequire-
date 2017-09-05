define(['text!template/home/transaction/newTransactionTpl.html', 'text!template/home/transaction/table/costTabTpl.html', 'text!template/home/transaction/table/projectTabTpl.html', 'text!template/home/transaction/table/entertainTabTpl.html', 'text!template/home/transaction/table/budgetTabTpl.html', '../../comment/chooseUser', 'widget', 'iframeTransport', 'fileUpload', 'artEditor'], function(newTransactionTpl, costTabTpl, projectTabTpl, entertainTabTpl, budgetTabTpl, chooseUser) {
    return function() {
        $('#sendEmailContent').remove();
        var $tableContent = '';
        var $newTransactionTpl = $(newTransactionTpl)
            // 加载办理模块
            .on('tap', '.addRecipient', function() {
                chooseUser();
            })
            // 弹出上传文件的选择框
            .on('tap', '.uploadBtn', function() {
                $(this).parent().find("input").click()
            });
        $(function() {
                $tableContent = $('.tableContent').html(costTabTpl);
                $newTransactionTpl.stop(true, true).animate({ 'top': 0, 'opacity': 1 }).on('tap', '.email-send', function() {
                    $newTransactionTpl.stop(true, true).animate({ 'top': '44px', 'opacity': 0 }, function() {
                        $newTransactionTpl.remove();
                    })
                })
            })
            // 将新页面追加到content处
        $('.content').append($newTransactionTpl);
        // 注册流程点击事件
        $newTransactionTpl.on('tap', '.process', function() {
            var mask = mui.createMask(function() {
                $('.process-pop').css({ 'z-index': '-1', transform: 'translate(-50%, 40%) scale(1.2)', opacity: 0 })
            }); //callback为用户点击蒙版时自动执行的回调；
            mask.show(); //显示遮罩

            // 注册流程弹框取消按钮点击事件
            $newTransactionTpl.on('tap', '.cancle', function() {
                mask.close();
            });

            // 注册流程弹框确认按钮点击事件
            $newTransactionTpl.on('tap', '.confirm', function() {
                var text = $(this).parent().siblings().find('input:checked').siblings().html();
                var code = $(this).parent().siblings().find('input:checked').siblings().attr('code');


                // 根据选择的流程切换表格
                $('.process-select').html(text);
                if (code == '0001') {
                    $tableContent.html(costTabTpl);
                } else if (code == '0002') {
                    $tableContent.html(projectTabTpl);
                } else if (code == '0003') {
                    $tableContent.html(entertainTabTpl);
                } else if (code == '0004') {
                    $tableContent.html(budgetTabTpl);
                }
                mask.close();
            });

            // 选中的单选框内容变蓝色
            $newTransactionTpl.on('tap', '.mui-radio', function() {
                $(this).find("label").addClass('current').parent().siblings().find('label').removeClass('current')
            })

            // 流程弹框动画
            $('.process-pop').css({ 'z-index': '10000', transform: 'translate(-50%, 40%) scale(1)', opacity: 1 })
        });




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
                    console.log(data)

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