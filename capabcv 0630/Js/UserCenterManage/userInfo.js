$(function () {
    var nUId = "";
    var type="";
//点击编辑
    $('.basic').on('click', '.btn-editor', function (e) {
        if ($(this).text() == '编辑') {
            $(this).siblings('.out-box').slideDown()
            $(this).siblings('.basic-title').css('border-bottom', '1px dashed #e8e8e8')
            $(this).text('收起').css('background-position', ' right -48px')
        } else {
            $(this).siblings('.out-box').slideUp()
            $(this).text('编辑').css('background-position', 'right 12px')
            $(this).siblings('.basic-title').css('border', 'none')
        }
        $(this).parent().siblings().find('.out-box').slideUp()
        $(this).parent().siblings().find('.btn-editor').text('编辑').css('background-position', ' right 12px')
        $(this).parent().siblings().find('.basic-title').css('border', 'none')
    })
    login();

    function login() {
        var loginData = '';
        $.ajax({
            type: "get",
            async: true,
            url: "http://www.capabcv.com/usersget.ashx?useraction=userload",
            dataType: "jsonp",
            jsonp: "callback",
            success: function (data) {
                loginData = data;
                nUId = data.nId;
            },
            error: function () {
                // alert('信息获取失败，请检查是否登录！')
            },
            complete: function () {
                var log_pho = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
                $('.sidebar-menu .menu-list:first-child').addClass('active-curr')
                if (loginData) {
                    var sPhoto=loginData.sPhoto?loginData.sPhoto:"../Images/userPhoto";
                    // var sPhoto="../Images/userPhoto.png";

                    $('#nickName').val(loginData.sNick);
                    $('.userNick').val(loginData.sNick);
                    $('#usermemo').val(loginData.sSelfMemo);
                    $('#userlink').val(loginData.sBlogLink);
                    $(".nick-num .curr-num").html(loginData.sNick.length);
                    $(".memo-num .curr-num").html(loginData.sSelfMemo.length);
                    if (loginData.sSex) {
                        $("input[name='sex'][value=" + loginData.sSex + "]").attr("checked", true);
                    }
                    $('.preview .userPhoto,.photo-cont').attr('src', sPhoto);
                    if (log_pho.test(loginData.sTel)) {
                        $('.bind-phone').html(loginData.sTel)
                        $('.tel-num').html(loginData.sTel)
                        $('.success-bind').show()
                        $('.no-bind').hide()
                    }
                    console.log(getCaption(loginData.sEmail));
                    if (getCaption(loginData.sEmail)!='capabcv.com') {
                        $('.email-bind').html(loginData.sEmail)
                        $('.email-name').html(loginData.sEmail)
                        $('.success-email').show()
                        $('.no-email').hide()
                    }
                }
            }
        })
    }
//截取字符串
    function getCaption(obj){
        var index=obj.lastIndexOf("\@");
        obj=obj.substring(index+1,obj.length);
        return obj;
    }


    $('#saveMsg').click(function () {
        var nickName = $('#nickName').val(),
            usermemo = $('#usermemo').val(),
            sex = $("input[name='sex']:checked").val(),
            userlink = $('#userlink').val();
        var userInfo = {
            "sNick": nickName,
            "sSex": sex,
            // "sWeichat": wechat,
            "sBlogLink": userlink,
            "sSelfMemo": usermemo,
            // "sTelsign" : sTelsign,
            // "sEmailsign" : sEmailsign
        }

        if (nickName.length > 15 || usermemo.length > 200) {
            alertBox("信息填写有误，请完善后重新提交！","err");
            $("#ws_confirm").removeAttr("disabled");
            return false;
        }
        updateInfo(userInfo)
        $('.people_nick').html(nickName)
    });
    $('#newPass').on('keydown keyup', function () {
        var log_pass = /^(?![^A-Za-z]+$)(?![^0-9]+$)[\x21-x7e]{6,16}$/;

        if (!log_pass.test($(this).val())) {
            $('.pass-msg').show()
        } else {
            $('.pass-msg').hide()
            $(this).addClass('success')
        }
    })
    //修改密码
    $('#passSave').click(function () {
        var log_pass = /^(?![^A-Za-z]+$)(?![^0-9]+$)[\x21-x7e]{6,16}$/;
        var oldPass = $('#oldPass').val();
        var newPass = $('#newPass').val();
        if (!newPass || !oldPass) {
            alertBox("密码不能为空","err");
            return
        }
        if(!log_pass.test(newPass)){
            alertBox("大写字母、小写字母、数字和标点符号至少包含2种长度6-20","err");
            $('.pass-msg').show()
            return
        }
        $.ajax({
            url: "http://www.capabcv.com/usersget.ashx?useraction=userpassedit",
            data: {sPassed: oldPass, sNewPassed: newPass},
            dataType: 'jsonp',
            type: 'get',
            success: function (data) {
                if (data == 0) {
                    alertBox('修改成功', 'right')
                }
                if (data == 1) {
                    alertBox('当前密码不正确','err')
                }
            },
            error: function () {
            }
        })
    });
    $('.change-phone').click(function () {
        $('.success-bind').hide()
        $('.no-bind').show()
    })
    $('#change-email').click(function () {
        $('.success-email').hide()
        $('.no-email').show()
    })
//手机验证
    $('#userphone').on('keyup',function () {
        var log_pho = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
        var sTel = $(this).val();
        if(log_pho.test(sTel)){
            isRegister(sTel)
        }else{
            $(this).removeClass('success');
            $('.sms-cd-btn').removeClass('curr-bg').attr('disabled', 'disabled')
        }
        if($(this).val().length==11&&!log_pho.test(sTel)){
            $('.err-msg').show().html('请输入正确的手机号码');
        }
    });

//点击发送验证码
    $('.sms-cd-btn').on('click',function () {
     var sTel=$('#userphone').val();
            $.ajax({
                url: "http://www.capabcv.com/usersget.ashx?useraction=telcheckcodesend",
                data: {sTel: sTel},
                dataType: 'jsonp',
                type: 'get',
                success: function (data) {
                    if (data == 0) {
                        alert('发送成功')
                    }
                },
                error: function () {
                }
            })
               settime($(this))
    })
    //点击提交
    $('#bind-tel').on('click', function () {
        var sTel = $('#userphone').val();
        var Telcheck = $('.phone_yzm ').val();
        if(!Telcheck){
            alertBox('请输入验证码')
        }
            $.ajax({
                url: "http://www.capabcv.com/usersget.ashx?useraction=userteleditbycheck",
                data: {sTel: sTel,Telcheck:Telcheck},
                dataType: 'jsonp',
                type: 'get',
                success: function (data) {
                    if (data == 0) {
                        $('.bind-phone').html(sTel)
                        $('.tel-num').html(sTel)
                        $('.success-bind').hide()
                        $('.no-bind').show()
                        alertBox('绑定成功','right')
                    }
                    if(data==1){
                        $('.err-msg').show().html('该手机号码已经绑定');
                    }
                    if(data==7){
                        alertBox('验证码不正确','err')
                    }
                },
                error: function () {
                }
            })

    });
    //修改邮箱
    $('#bind-email').click(function () {
        var log_ema = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/;//对邮箱正则
        var sEmail = $('#useremail').val()
        if (!sEmail) {
            alertBox('请输入邮箱','err')
            return
        }
        $.ajax({
            url: "http://www.capabcv.com/usersget.ashx?useraction=useremailedit",
            data: {sEmail: sEmail},
            dataType: 'jsonp',
            type: 'get',
            success: function (data) {
                if (log_ema.test(sEmail)) {
                    if (data == 0) {
                        $('.email-bind').html(sEmail)
                        $('.email-name').html(sEmail)
                        $('.success-email').show()
                        $('.no-email').hide()
                        alertBox('修改成功', 'right')
                    }
                    if (data == 1) {
                        alertBox('该邮箱已被注册,请更换新的邮箱','err')
                    }
                } else {
                    alertBox('请输入正确的邮箱','err')
                }
            },
            error: function () {
            }
        })
    })
//修改信息
    function updateInfo(datas) {
        // $.ajax({
        //     	type: "get",
        //     	async: false,
        //     	url: "http://www.capablist.com/usersget.ashx?useraction=userinfoedit",
        //         data: datas,
        //         dataType: "jsonp",
        //     	jsonp: "callback",
        $.ajax({
            type: "post",
            url: "/usersget.ashx?useraction=userinfoeditpost",
            data: datas,
            async: false,
            dataType: "json",
            jsonp: "callback",
            success: function (data) {
                // history.go(0)
                alertBox('保存成功','right')

            },
            error: function () {
            },
            complete: function () {
            }
        });
    }
    photoUpLode()
    //上传头像
    function photoUpLode() {
        $(".photo-change,#againUpLoad,.up-img").click(function (e) {
            $("#photoModal").modal("show");
            $("#imgBox").append(' <p>请上传大小1M以内的JPG、PNG图片</p>');
            $("#headPhoto").click();
        });
        var $image = $('#imgBox img'),
            options = {
                aspectRatio: 1 / 1,
            };
        $image.cropper(options);
        var $inputImage = $('#headPhoto'),
            URL = window.URL || window.webkitURL,
            blobURL;
        var picdata = "";
        if (URL) {
            $('#headPhoto').on('change', function () {
                picdata = $(this).data();
                var files = this.files,
                    file;
                if (files && files.length) {
                    file = files[0];
                    var files_type = file.type.split('/')[0];
                    if (files_type != 'image') {
                        alertBox("格式错误，请上传JPG、PNG图片","err");
                        $inputImage.val('');
                        return;
                    }
                    if (file.size > 1048576) {
                        alertBox("图片过大，请上传大小为1M以内的图片","err");
                        $inputImage.val('');
                        return;
                    }
                    $("#imgBox > img").siblings().remove();
                    blobURL = URL.createObjectURL(file);
                    $image.one('built.cropper', function () {
                        URL.revokeObjectURL(blobURL); // Revoke when load complete
                    }).cropper('reset', true).cropper('replace', blobURL);
                    $inputImage.val('');
                } else {
                    return;
                }
            });
        } else {
            // $inputImage.parent().remove();
        }

        // 确认裁剪
        $('#photoOk').unbind();
        $('#photoOk').on('click', function () {
            if (!$('.cropper-view-box > img').attr("src")) {
                alertBox("您还未上传要裁剪得头像",'err');
                return;
            }
            $("#photoModal").modal("hide");
            var result = $image.cropper("getCroppedCanvas", picdata.option);
            $('#imgBox > img').attr("src", "");
            $('#imgBox > img').cropper('destroy');
            $(".photo-pre > img").attr('src', result.toDataURL("image/png"));

            // $.ajax({
            //     url: "http://www.capabcv.com/usersget.ashx?useraction=userinfoalledit",
            //     data: {'sPhoto': result.toDataURL("image/png")},
            //     dataType: 'jsonp',
            //     type: 'get',
            //     success: function (data) {
            //         alertBox('修改成功');
            //         $(".photo-cont").attr('src', result.toDataURL("image/png"));
            //         $(".preview img").attr('src', result.toDataURL("image/png"));
            //         $(".user-head").attr('src', result.toDataURL("image/png"));
            //
            //     },
            //     error: function () {
            //         alertBox("网络异常，请稍后重试；上传头像");
            //     },
            // });
            $.ajax({
                type: "post",
                url: "/usersget.ashx?useraction=userinfoeditpost",
                data: {"sPhoto": result.toDataURL("image/png")},
                dataType: "json",
                async: false,
                success: function (data) {
                    alertBox('修改成功','right');
                    $(".photo-cont").attr('src', result.toDataURL("image/png"));
                    $(".preview .userPhoto").attr('src', result.toDataURL("image/png"));
                    $(".user-head").attr('src', result.toDataURL("image/png"));
                },
                error: function () {
                    alertBox("网络异常，请稍后重试；上传头像",'err');
                },
            });
        })
    }
    $("#nickName").on('keydown keyup', function (e) {
        $(".nick-num .curr-num").html($("#nickName").val().trim().length);
      /*  if ($(".nick-num .curr-num").html() == 0) {
            $("#nickName").css({"border": "1px solid red"});
            $(".nick-num .curr-num").css({"color": "red"});
            $(".nick .points-write").html("昵称不能为空！").show();
        } else*/
            if ($(".nick-num .curr-num").html() < 16) {
            $("#nickName").css({"border": "1px solid #e8e8e8"});
            $(".nick-num .curr-num").css({"color": "#999"});
            $(".nick.points-write").hide();
        } else {
            $("#nickName").css({"border": "1px solid red"});
            $(".nick-num .curr-num").css({"color": "red"});
            $(".nick .points-write").html("昵称不能多于15字！").show();
        }
    })
    //微信号字数
    $("#wechat_id").on('keydown keyup', function (e) {
        $(".wechat-num .curr-num").html($("#wechat_id").val().trim().length);
        if ($(".wechat-num .curr-num").html() > 25) {
            $("#wechat_id").css({"border": "1px solid red"});
            $(".wechat-num .curr-num").css({"color": "red"});
            $("#info-edit .wechat-content .points-write").show();
        } else {
            $("#wechat_id").css({"border": "1px solid #e8e8e8"});
            $(".wechat-num .curr-num").css({"color": "#999"});
            $("#info-edit .wechat-content .points-write").hide();
        }
    })
    //描述字数
    $("#usermemo").on('keydown keyup', function (e) {
        $(".memo-num .curr-num").html($("#usermemo").val().trim().length);
        if ($(".memo-num .curr-num").html() > 200) {
            $("#usermemo").css({"border": "1px solid red"});
            $(".memo-num .curr-num").css({"color": "red"});
            $(".memo .points-write").show();
        } else {
            $("#usermemo").css({"border": "1px solid #e8e8e8"});
            $(".memo-num .curr-num").css({"color": "#999"});
            $(".memo .points-write").hide();
        }
    })
    //报错弹框
    function alertBox(text, type) {
        $(".errorBox p").html(text);
        if(type=='err'){
            $('.errorBox img').removeAttr('src')
            $('.errorBox img').attr('src', '../Images/error-msg.png');
        }
            if(type=='right'){
                $('.errorBox img').removeAttr('src')
            $('.errorBox img').attr('src', '../Images/right.png');
        }
        $(".cover").fadeIn(200);
        $(".errorBox").fadeIn(200);
        var mleft = ($('.errorBox').width() + 24) / 2;
        $('.errorBox').css({'margin-left': -mleft, 'left': '50%'});
        $('#goTop').css({display: "none", "z-Index": -1});
        setTimeout(function () {
            $(".cover").fadeOut(200);
            $(".errorBox").fadeOut(200);
            $(".goTop").show();
            $('#goTop').css({display: "black", "z-Index": 1});
        }, 1000);
        return;
    }
    //绑定验证
    function isRegister(username) {
        var rightData = "";
        $.ajax({
            type: "get",
            async: false,
            url: "http://www.capabcv.com/usersget.ashx?useraction=useristrue",
            data: {"sEmail": username},
            dataType: "jsonp",
            jsonp: "callback",
            success: function (data) {
                rightData = data;

            },
            complete: function () {
                if (rightData == 0) {
                    $('.err-msg').show().html('该手机已被绑定');
                    $('#userphone').removeClass('success');
                    $('.sms-cd-btn').removeClass('curr-bg').attr('disabled', 'disabled')
                } else if (rightData == 1) {
                    $('.err-msg').html('').hide();
                    $('#userphone').addClass('success');
                    if($('.sms-cd-btn').hasClass('no-click')){
                        $('.sms-cd-btn').removeClass('curr-bg').attr('disabled', 'disabled')
                        return
                    }else{
                        $('.sms-cd-btn').addClass('curr-bg').removeAttr('disabled');
                    }

                }

            }
        })
    }


    var countdown = 60;
//定时器
    function settime(obj) {

        if (countdown == 0) {
            obj.removeAttr("disabled").addClass('curr-bg');
            obj.val("获取验证码");
            countdown = 60;
            obj.removeClass('no-click');
            return;
        } else {
            obj.attr("disabled", "disabled").removeClass('curr-bg');
            obj.val(countdown + "s后重新发送");
            countdown--;
            obj.addClass('no-click')
        }
        setTimeout(function () {
            settime(obj)
        }, 1000)
    };

})