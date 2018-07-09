$(function () {
    function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }

    var ReUrl = GetQueryString('ReUrl');
    console.log(ReUrl);
    var loginType = GetQueryString('loginType');
    if (loginType != null) {
        if (loginType == 'pwd') {
            $('.log-write').show();
            $('.log-quick').hide();
            $('.icon-btn ').removeClass('icon-pc').addClass('icon-weixin')
        } else {

        }
    }
    // localStorage.getItem('typeLogIn');
    /*if (localStorage.getItem('typeLogIn')) {
        $('.log-write').show();
        $('.log-quick').hide()
        $('.icon-btn ').removeClass('icon-pc').addClass('icon-weixin')
    }*/
    //记住用户名密码
    $('.form-control').focus(function () {
        $(this).css({'background': '#fff', 'border-color': '#ccc'})
    });
    $('.form-control').blur(function () {
        $(this).css('background', '#f4f4f4')
    });
//点击切换
    $('.tab-list').each(function () {
        $(this).on('click', function () {
            $(this).addClass('tab-curr').siblings().removeClass('tab-curr');
            if ($(this).hasClass('tab-pass')) {
                $('.login-pass').show();
                $('.login-sms').hide()
            }
            if ($(this).hasClass('tab-sms')) {
                $('.login-sms').show();
                $('.login-pass').hide();
            }
        })
    });

    $('.login-switch').on('click', '.icon-btn', function () {
        if ($(this).hasClass('icon-weixin')) {
            localStorage.removeItem('typeLogIn');
            $(this).removeClass('icon-weixin').addClass('icon-pc');
            $('.log-write').hide();
            $('.log-quick').show();

        } else if ($(this).hasClass('icon-pc')) {
            $(this).removeClass('icon-pc').addClass('icon-weixin');
            $('.log-write').show();
            $('.log-quick').hide();
        }
    });

    $('.pass-login-tab').click(function () {
        $('.log-quick').hide();
        $('.log-write').show();
        $('.icon-btn').removeClass('icon-pc').addClass('icon-weixin');
        $('.tab-pass').addClass('tab-curr').siblings().removeClass('tab-curr');
        $('.login-pass').show();
        $('.login-sms').hide()
    });

    $('#username,#password').keyup(function (e) {
        if (e.keyCode == 32 || e.keyCode == 13) return;
        var userVal = $('#username').val();
        var passVal = $('#password').val();
        if (userVal != '' && passVal != '') {
            $('.pass-login-sub').removeAttr('disabled').addClass('yzm-curr')
        }
        else {
            $('.pass-login-sub').attr('disabled', 'disabled').removeClass('yzm-curr')
        }
    });
    $('#username').blur(function () {
        var log_pho = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
        var pho_val = $(this).val();
        loginRegister1(pho_val)
    });

//点击密码登录
    $('.pass-login-sub ').click(function () {
        passLogin();
    });
//短信登录
    signVerify();
    function signVerify() {
        $('.login-phone').blur(function () {
            var log_pho = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
            var pho_val = $(this).val();
            if (!log_pho.test(pho_val)) {
                $('.error-msg').show();
                $('.err-sms-msg').html('请输入正确的手机号');
            }
        });
        $('.login-phone').keyup(function (e) {
            var log_pho = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
            var pho_val = $(this).val();
            if (log_pho.test(pho_val)) {
                loginRegister(pho_val)
            } else {
                $('.sms-cd-btn').removeClass('yzm-curr').attr('disabled', 'disabled')
            }
            if ($('.sms-cd-btn').hasClass('no-click')) {
                $('.sms-cd-btn').removeClass('yzm-curr').attr('disabled', 'disabled')
            }
        });
        //点击验证码
        $('.sms-cd-btn').on('click', function () {
            var pho_val = $('.login-phone').val();
            logincodesend(pho_val);
        });
        //验证码
        $('.phone_yzm').keyup(function () {
            if ($('.login-phone').hasClass('success-curr') && $(this).val() != "") {
                $('.sms-login-sub').addClass('yzm-curr').removeAttr('disabled')
            } else {
                $('.sms-login-sub').removeClass('yzm-curr').attr('disabled', 'disabled')
            }
        }).blur(function () {
            if ($('.login-phone').hasClass('success-curr') && $(this).val() != "") {
                $('.sms-login-sub').addClass('yzm-curr').removeAttr('disabled')
            } else {
                $('.sms-login-sub').removeClass('yzm-curr').attr('disabled', 'disabled')
            }
        });
        //点击登录
        $('.sms-login-sub').on('click', function () {
            var log_pho = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
            var pho_val = $('.login-phone').val();
            if (log_pho.test(pho_val)) {
                loginRegister(pho_val);
            } else if (!log_pho.test(pho_val)) {
                $('.error-msg').show();
                $('.err-sms-msg').html('请输入正确的手机号');
            }
            if (log_pho.test(pho_val) && $('.login-phone').hasClass('success-curr')) {
                console.log('登录');
                // Save();
                smsLogin(ReUrl);
            }
        })

    }


});