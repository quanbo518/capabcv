$(function () {
    function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }

    var nUId = "";
    var download = GetQueryString('download');
    /*$('.myresume-tab ul ').on('click', 'li', function () {
    $(this).addClass('li-curr').siblings().removeClass('li-curr');
    if ($(this).hasClass('online')) {
    $('.online-resume').show();
    $('.down-resume').hide();
    }
    if ($(this).hasClass('down')) {
    $('.online-resume').hide();
    $('.down-resume').show();
    }
    });*/

    login();
    function login() {
        $.ajax({
            type: "get",
            async: true,
            url: "http://www.capabcv.com/usersget.ashx?useraction=userload",
            dataType: "jsonp",
            jsonp: "callback",
            success: function (data) {
                nUId = data.nId;
            },
            error: function () {
            },
            complete: function () {
                if (download != null) {
                    if (download == 'do') {
                        $('.sidebar-menu .menu-list:nth-of-type(3)').addClass('active-curr');
                        down_list();
                        $('.online-resume').empty();
                        $('.down-resume').show();
                        $('.down').show().addClass('li-curr');
                        $('.online').hide()
                    } else {
                        $('.down-resume').html('<div style="font-size: 16px;margin: 50px auto;text-align: center">对不起你无权访问该网页 </div>');
                        $('.online-resume').empty();
                        $('.down-resume').show();
                        $('.down').show().addClass('li-curr');
                        $('.online').hide()
                    }
                } else {
                    online();
                    $('.sidebar-menu .menu-list:nth-of-type(2)').addClass('active-curr');
                    $('.online-resume').show();
                    $('.down-resume').empty();
                    $('.down').hide();
                    $('.online').show().addClass('li-curr')
                }


            }
        });
    }

    function down_list(type) {
        $('.resume-content').empty();
        $.ajax({
            type: "get",
            async: false,
            url: "http://www.capabcv.com/userdownloadclass.ashx?downaction=userdownlistload",
            data: {type: 'sTableType'},
            dataType: "jsonp",
            jsonp: "callback",
            beforeSend: function () {
                // $('.resume-content').html('<div style="width:100%;text-align: center;font-size: 18px;margin: 50px 0;color:#999;">你还未下载该模板简历,快去下载吧</div>')
                // return
            },
            success: function (data) {
                var downList = data.UserDownInfoClass;
                var down_list = '';
                var downLen = [];
                downList.reverse();
                for (var i = 0; i < downList.length; i++) {
                    var sTableViewUrl = downList[i].sTableViewUrl.replace('.png', 'pic.png').replace('.jpg', 'pic.png');
                    var dtInTime = downList[i].dtInTime;
                    var sTableTitle = downList[i].sTableTitle;
                    var sTableType = downList[i].sTableType;
                    // var sTableViewUrl = 'modern_resume03pic.png';

                    if (!nUId) {
                        return
                    } else {
                        if (type == sTableType || !type) {
                            downLen.push(downList[i]);
                            down_list += '<div class="down-resume-list col-md-3 col-sm-4 col-xs-6">' +
                                '<div class="resume-list-top">' +

                                '<a href="http://www.capabcv.com/resumedownload/' + downList[i].nDownId + '.html" class="down-resume-img">' +
                                '<img src="http://www.capabcv.com/ResumeDocument/' + downList[i].sTableType + '/' + sTableViewUrl + '" alt="">' +
                                '</a>' +
                                '<div class="hover-down">' +
                                '<a href="http://www.capabcv.com/resumedownload/' + downList[i].nDownId + '.html" class="btn-down">下载</a>' +
                                '</div>' +
                                '</div>' +
                                '<div class="resume-list-bottom">' +
                                '<a href="http://www.capabcv.com/resumedownload/' + downList[i].nDownId + '.html" class="down-resume-name">' + sTableTitle + '</a>' +
                                '<p class="down-resume-time">' + dtInTime + '</p>' +
                                '</div>' +
                                '</div> '
                        }
                    }
                }
                $('.downResNum').html(downLen.length);
                if (!down_list) {
                     down_list = '<div style="width:100%;text-align: center;font-size: 18px;margin: 50px 0;color:#999;">你还未下载该模板简历,快去下载吧</div>'
                 }
                $('.resume-content').html(down_list)
            },
            error: function () {
                $('.resume-content ').html('<div style="width:100%;text-align: center;font-size: 18px;margin: 50px 0;color:#999;">你还未下载该模板简历,快去下载吧</div>')

            }

        })
    }

    var newArr = ['', 'ppt', 'word', 'wordeng', 'table', 'mail','cover'];
    $('.shop_down li').each(function (i) {
        $(this).click(function () {
            $(this).addClass('item-curr').siblings().removeClass('item-curr');
            down_list(newArr[i])
        })
    });
    function online() {
        var resumeData;
        $.ajax({
            type: "get",
            async: true,
            url: "http://www.capabcv.com/resumev2/Resumev2.ashx?resumeaction=resumeallinfoloadv2",
            dataType: "jsonp",
            jsonp: "callback",
            beforeSend: function () {
                $('.resume-box').html('<div style="text-align: center;margin-top: 50px;"><img src="../Images/loading.png" style="width: 40px;height: 40px;"></div>')
            },
            success: function (data) {
                resumeData = data.resumeinfo;
                // nUId = resumeData[0].nUId;
            },
            complete: function () {
                var onlineStr = '';
                $('.resume-box').empty();
                onlineStr += '<div class="resume-item col-md-3 col-sm-4 col-xs-6">' +
                    '                        <div class="iteminer">' +
                    '                            <div id="new_resume" class="icon-tianjia_1"></div>' +
                    '                            <p style="font-size: 16px;">新建简历</p>' +
                    '                        </div>' +
                    '                    </div>';
                if (!resumeData) {
                    onlineStr += '<div style="text-align: center;margin-top: 100px;font-size: 16px;">还没有创建简历<a href="http://www.capabcv.com/resumev2/formchoice.aspx" style="text-decoration: underline">去创建</a></div>'
                } else {
                    for (var i = 0; i < resumeData.length; i++) {
                        onlineStr += '<div class="resume-item  col-md-3 col-sm-4 col-xs-6">' +
                            '<div class="iteminer jiaobiao">' +
                            '<img class="itemimg" src="../Images/mycv-img.png">' +
                            '<div class="item-cover">' +
                            '<div class="coverIner">' +
                            '<div class="bg"></div>' +
                            '<div class="edit-cv" data-nid="' + resumeData[i].nId + '">编辑</div>' +
                            '<div class="remove-cv" data-nid="' + resumeData[i].nId + '">删除</div>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '<div class="cv-name-box"><span class="cv_name ac" data-nid="' + resumeData[i].nId + '">' + resumeData[i].sRTitle + '</span><i class="icon-bianji_1 cv_name_edit"></i></div>' +
                            '<div class="total ac"><i class="icon-gerenxinxi"></i><span>' + resumeData[i].dtIntime + '</span></div>' +
                            '</div>'
                    }
                }
                $('.resume-box').append(onlineStr)
            }
        })
    };

//点击编辑
    $('.online-resume').on('click', '.edit-cv', function (e) {
        e.stopPropagation();
        localStorage.removeItem('resumenId');
        localStorage.setItem('resumenId', $(this).attr('data-nId'));
        console.log(localStorage.getItem('resumenId'));
        /*  var time = setTimeout(function(){
         localStorage.removeItem('resumenId');
         clearTimeout(time);
         console.log(localStorage.getItem('resumenId'));
         },10000);*/
        window.location.href = 'http://www.capabcv.com/resumev2/resumetool.aspx';
        //     cookie.set('nId',$(this).attr('data-nId'),1)
    });
//点击删除
    $('.online-resume').on('click', '.remove-cv', function () {
        deleResume($(this).attr('data-nId'), $(this).parents('.resume-item'));
    });
    //点击新建
    $('.resume-box').on('click', '#new_resume', function () {
      window.location.href="http://www.capabcv.com/resumev2/formchoice.aspx"
        // addResume('15_9')
    })
    //修改名称
    $('.online-resume').on('click', '.cv_name_edit', function () {
        $(this).siblings('.cv_name').attr('contenteditable', 'true').css('border', '1px solid #ddd');

        $(this).siblings('.cv_name').blur(function () {
            $(this).removeAttr('contenteditable').css('border', 'none');
            var text = $(this).text();
            editName($(this).attr('data-nId'), text)
        })
        $(this).siblings('.cv_name').focus(function () {
            $(this).css('border-color', '#ddd')
        })
    });
//删除简历
    function deleResume(nRId, obj) {
        cvConfirm({
            title: '删除简历',
            content: '确认要删除简历吗？',
            content_html: "",
            ok: "确定",
            cancel: "取消",
            onOk: function () {
                $("body").removeClass("suggestModal");
                $("body").removeClass("modal-open");
                $.ajax({
                    url: "http://www.capabcv.com/resumev2/Resumev2.ashx?resumeaction=resumedelv2",
                    data: {'nRId': nRId},
                    type: "get",
                    dataType: "jsonp",
                    success: function (data) {
                        obj.fadeOut()
                    },
                    error: function () {
                        // remindShow("error, &nbsp;网络异常，请稍后重试！+++++");
                    },
                });
            },
            onCancel: function () {
                $("body").removeClass("suggestModal");
                $("body").removeClass("modal-open");
                $("#confirmModal").hide();
            }
        })
    };

    //添加简历
    function addResume(sTemplate) {
        $.ajax({
            url: "http://www.capabcv.com/resumev3/Resumev3.ashx?resumeaction=resumeadd",
            data: {'sTemplate': sTemplate},
            type: "get",
            dataType: "jsonp",
            success: function (data) {
                localStorage.removeItem('resumenId')
                localStorage.setItem('resumenId', data)
                window.location.href = 'http://www.capabcv.com/resumev2/resumetool.aspx'
            }

        })
    }

//修改名称
    function editName(nRId, sRTitle) {
        $.ajax({
            url: 'http://www.capabcv.com/ResumeV3/Resumev3.ashx?resumeaction=resumeinfo4setedit',
            data: {nRId: nRId, sRTitle: sRTitle},
            type: "get",
            dataType: "jsonp",
            success: function (data) {
                $("#cv_name").text(sRTitle);
            },
            error: function () {},
        });
    }

//确认弹框
    function cvConfirm(options) {
        var settings = {
            title: "操作提示标题",
            content: "操作提示内容",
            content_html: "",
            tips_modal_class: "confirm_modal",
            modal_class: "tips-modal-content",
            ok: "确定",
            cancel: "取消",
            onOk: null,
            onCancel: null
        };
        $.extend(settings, options);
        var html = '<div class="modal"  id="confirmModal">' +
            '<div class="modal-dialog">' +
            '<div class="modal-content" style="width: 500px;">' +
            '<div class="modal-header">' +
            '<span class="confirm_title"></span>' +
            '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
            '</div>' +
            '<div class="modal-body">' +
            '<span class="confirm_cont"></span>' +
            '</div>' +
            '<div class="modal-footer ac" style="text-align: center">' +
            '<button type="button" class="btn-cancel">关闭</button>' +
            '<button type="button" class="btn-confirm confirmOk" id="confirmOk">确认</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
        var $modal = $(html);
        $modal.find(".confirm_title").text(settings.title);
        $("#confirmModal").remove();
        if (settings.content_html == "") {
            $modal.find(".confirm_cont").text(settings.content);
        } else {
            $modal.find(".confirm_cont").remove();
            $modal.find(".modal-body").html(settings.content_html);
        }
        $modal.find("button.btn-confirm").text(settings.ok);
        $modal.find("button.btn-cancel").text(settings.cancel);
        $modal.appendTo("body");
        $('.modal').show().css('background', 'rgba(0,0,0,.3)');
        var $confirm_btn = $("#confirmModal").find("button.confirmOk");
        var $cancel_btn = $("#confirmModal").find("button.btn-cancel");
        if ($confirm_btn != null) {
            $confirm_btn.click(function () {
                if (settings.onOk && typeof settings.onOk == "function") {
                    if (settings.onOk() != false) {
                        confirm_modal_close();
                    }
                } else {
                    confirm_modal_close();
                }
                return false;
            });
        }
        if ($cancel_btn != null) {
            $cancel_btn.click(function (e) {
                e.stopPropagation();
                if (settings.onCancel && typeof settings.onCancel == "function") {
                    if (settings.onCancel() != false) {
                        confirm_modal_close();
                    }
                } else {
                    confirm_modal_close();
                }
                return false;
            });
        }
        $('.close').click(function () {
            confirm_modal_close();
        })

        //弹框关闭通用方法
        function confirm_modal_close() {
            // $modal.modal("hide");
            $modal.remove();
            $(".modal-backdrop:last").remove();
            $(".modal-backdrop:first").show();
            // $("body").removeClass("suggestModal");
            // $("body").removeClass("modal-open");
        }
    }


    /* var cookie = {
     set: function (key, val, time) {//设置cookie方法
     var date = new Date(); //获取当前时间
     date.setTime(date.getTime() + time * 60 * 1000); //格式化为cookie识别的时间
     console.log(date.setTime(date.getTime() + time  * 1000));
     document.cookie = key + "=" + val + ";expires=" + date.toGMTString();  //设置cookie
     alert(document.cookie);
     },


     get: function (key) {//获取cookie方法
     /!*获取cookie参数*!/
     var getCookie = document.cookie.replace(/[ ]/g, "");  //获取cookie，并且将获得的cookie格式化，去掉空格字符
     var arrCookie = getCookie.split(";")  //将获得的cookie以"分号"为标识 将cookie保存到arrCookie的数组中
     var tips;  //声明变量tips
     for (var i = 0; i < arrCookie.length; i++) {   //使用for循环查找cookie中的tips变量
     var arr = arrCookie[i].split("=");   //将单条cookie用"等号"为标识，将单条cookie保存为arr数组
     if (key == arr[0]) {  //匹配变量名称，其中arr[0]是指的cookie名称，如果该条变量为tips则执行判断语句中的赋值操作
     tips = arr[1];   //将cookie的值赋给变量tips
     break;   //终止for循环遍历
     }
     }
     return tips;
     },
     delete: function (key) { //删除cookie方法

     // cookie.set(key,"任意值",-1);
     var date = new Date(); //获取当前时间
     date.setTime(date.getTime() - 10000); //将date设置为过去的时间
     document.cookie = key + "=v; expires =" + date.toGMTString();//设置cookie
     }


     }*/

})
