$(function () {
    function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
    var passType = GetQueryString('passType');
        if (passType != null) {
                if (passType == "success") {
                    $('.sign-main').html(' <div class="sign-main-title">找回密码</div>' +
                        '<p class="" style="text-align: center;margin-bottom: 20px;font-size: 16px;">您已经成功设置密码，请使用新密码登录</p>' +
                        '<div class="passcard-btns register-btn">' +
                        '<a href="./login.html?loginType=pwd" type="button"  class="sign-sub yzm-curr login-btn" style="display: inline-block;font-size: 16px;">马上登录</a>' +
                        '</div>')
                } else {
                    $('.sign-main').html(' <div class="sign-main-title"></div>' +
                        '<p class="" style="text-align: center;margin-bottom: 20px;font-size: 16px;">对不起你无权访问该网页</p>' +
                        '<div class="passcard-btns register-btn">' +
                        '<a href="http://www.capabcv.com" type="button"  class="sign-sub yzm-curr" style="display: inline-block;font-size: 16px;">进入领贤简历</a>' +
                        '</div>')
                }
            }
           /* else{
                $('.sign-main').html(' <div class="sign-main-title"></div>' +
                    '<p class="" style="text-align: center;margin-bottom: 20px;font-size: 16px;">对不起你无权访问该网页</p>' +
                    '<div class="passcard-btns register-btn">' +
                    '<a href="http://www.capabcv.com" type="button"  class="sign-sub yzm-curr" style="display: inline-block;font-size: 16px;">进入领贤简历</a>' +
                    '</div>')
            }*/
    $('.login-btn').on('click', function () {
        localStorage.removeItem('typeLogIn');
        localStorage.setItem('typeLogIn', 'passId');
        window.location.href = './login.html'
    });
    $('#drag').drag();
    $('.get-username').blur(function () {
        var userVal = $(this).val();
        if (!userVal) {
            $('.sign-phone-msg').show().html('请输入手机号')
        }
        if ($('.drag_text').text() == '验证通过') {
            if ($(this).val() != "") {
                $('.get-yzm').show();
            }
            /* else if ($(this).hasClass('success')) {
                 $('.get-cd-btn').addClass('yzm-curr').removeAttr('disabled')
             } else {
                 $('.get-cd-btn').removeClass('yzm-curr').attr('disabled', 'disabled')
             }*/
        }
    });
    $('.get-username').keyup(function () {
        var log_pho = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
        if (log_pho.test($(this).val())) {
            getRegister($(this).val())
        } else {
            $('.sign-phone-msg').show().html('请输入正确的手机号')
            $('.get-cd-btn').removeClass('yzm-curr').attr('disabled', 'disabled')
        }
        if ($('.drag_text').text() == '验证通过') {
            $('.get-yzm').show();
        }
    })

    $('.phone_yzm').blur(function () {
        if ($('.phone_yzm').val() == "") {
            $('.get-yzm-msg').show().text('请输入验证码')
        } else {
            $('.get-yzm-msg').hide()
        }
    });
//点击验证码
    $('.get-cd-btn').click(function () {
        var sTel = $('.get-username').val();
        bindcodesend(sTel);
        settime($(this))
    })
//修改密码
    var sent_pass = /^(?![^A-Za-z]+$)(?![^0-9]+$)[\x21-x7e]{6,20}$/;
    $('#setPassword').blur(function () {
        var passVal = $(this).val();
        if (passVal == "") {
            $('.form-pass-msg').show().text('请输入密码长高度6-20');
            $(this).css('border-color', '#f75234').removeClass('success')
        }
    }).keyup(function () {
        if ($(this).val().length > 6 && !sent_pass.test($(this).val())) {
            $('.form-pass-msg').show().text('大写字母、小写字母、数字和标点符号至少包含2种');
            $(this).css('border-color', '#f75234').removeClass('success')
        } else if ($(this).val().length < 6) {
            $('.form-pass-msg').show().text('密码长度6-20');
            $(this).css('border-color', '#f75234').removeClass('success')
        } else if (sent_pass.test($(this).val())) {
            $('.form-pass-msg').hide();
            $(this).css('border-color', '#ccc').addClass('success')
        }
    });
    $('#confirmPassword').blur(function () {
        var confirmVal = $(this).val();
        var newPass = $('#setPassword').val();
        if (newPass != "") {
            if (confirmVal != newPass) {
                $('.form-confirm-msg').show().text('两次密码输入不一致');
                $(this).css('border-color', '#f75234').removeClass('success')
            }
        }
        /*
        if(confirmVal==""){
            $('.form-confirm-msg').show().text('两次密码输入不一致');
            $(this).css('border-color','#f75234').removeClass('success')
        */
    }).keyup(function () {
        var confirmVal = $(this).val();
        var newPass = $('#setPassword').val();
        if (confirmVal != "") {
            if (confirmVal == newPass && $('#setPassword').hasClass('success')) {
                $('.form-confirm-msg').hide();
                $(this).css('border-color', '#ccc').addClass('success');
                $('.next-pass-sent').addClass('yzm-curr').removeAttr('disabled')
            } else {
                $('.form-confirm-msg').show().text('两次密码输入不一致');
                $(this).css('border-color', '#f75234').removeClass('success');
                $('.next-pass-sent').removeClass('yzm-curr').attr('disabled', 'disabled')
            }
        } else {
            $('.form-confirm-msg').hide();
            $(this).css('border-color', '#ccc')
        }
    });

//点击下一步
    $('.next-pass-sent').click(function () {
        var log_pho = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
        var Telcheck = $('#InputYzmT').val();
        var sTel = $('.get-username').val();
        var sNewPassed = $('#confirmPassword').val();
        console.log(sNewPassed, sTel);
        if (!Telcheck) {
            alertBox('验证码不能为空', 'err');
            return
        }
        if (!sTel) {
            alertBox('手机号码不能为空', 'err');
            return
        }
        if (!log_pho.test(sTel)) {
            alertBox('手机号码不正确', 'err');
            return
        }
        revisePss(sTel, Telcheck, sNewPassed)
    });
    $('.form-control').focus(function () {
        $(this).css({'background': '#fff', 'border-color': '#ccc'})
    });
    function revisePss(sTel, Telcheck, sNewPassed) {
        $.ajax({
            url: "http://www.capabcv.com/usersget.ashx?useraction=userpasseditbycheck",
            data: {sTel: sTel, Telcheck: Telcheck, sNewPassed: sNewPassed},
            dataType: 'jsonp',
            type: 'get',
            success: function (data) {
                if (data == 0) {
                    alertBox('修改成功', 'right');
                        window.location.href = "./getpassword.html?passType=success";
                }
                if (data == 1) {
                    alertBox('该手机号码不存在', 'err')
                }
                if (data == 7) {
                    $('.get-yzm-msg').show().text('验证码错误');
                    alertBox('验证码错误', 'err')
                }
            },
            error: function () {
            }
        })
    }
})