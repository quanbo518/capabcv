

$(function () {
    function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r != null) return unescape(r[2]);
        return null;
    }
    var sTel='';
    var Reurl=GetQueryString('Reurl');
    console.log(Reurl);
    login();
    function login() {
        $.ajax({
            type: "get",
            async: false,
            url: "http://www.capabcv.com/usersget.ashx?useraction=userload",
            dataType: "jsonp",
            jsonp: "callback",
            success: function (data) {
                nUId = data.nId;
                sTel=data.sTel;
            },
            error: function () {
            },
            complete: function () {
                var log_pho = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
                if(log_pho.test(sTel)){
                    if(Reurl!=null){
                        window.location.href= Reurl;
                        return
                    }else{
                        window.location.href= "http://www.capabcv.com"
                    }

                }
            }
        });
    }


    $('.form-control').focus(function () {
        $(this).css({'background': '#fff', 'border-color': '#ccc'})
    });
    $('.form-control').blur(function () {
        $(this).css('background', '#f4f4f4')
    });
    signVerify();
//注册验证
    function signVerify() {
        $('.sign-phone').blur(function () {
            var log_pho = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
            var phoVal = $(this).val();
            if ($(this).val() == "") {
                $(this).css('border-color', '#f75234').removeClass('success');
                $('.sign-phone-msg').show().html('请输入手机号码');
            }else if(!log_pho.test(phoVal)){
                $('.sign-phone-msg').show().html('输入正确的手机号码');
                $(this).css('border-color', '#f75234').removeClass('success');
                // $('.sign-phone-msg').show().html('请输入手机号码');
            }
            if ($('.drag_text').text() == '验证通过') {
                if ($(this).val() != "") {
                    $('.sign-pass,.sign-yzm').show();
                } else {
                    $('.sms-cd-btn').removeClass('yzm-curr').attr('disabled', 'disabled')
                }
            }
        });
        $('.sign-phone').keyup(function (e) {
            var log_pho = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
            var pho_val = $(this).val();
            if ($(this).val().length == 11 && !log_pho.test(pho_val)) {
                $(this).css('border-color', '#f75234').removeClass('success');
                $('.sign-phone-msg').show().html('请输入正确的手机号码');
            } else if (log_pho.test(pho_val)) {
                isRegister($(this).val());
                $(this).css('border-color', '#ccc');
            }else{
                $('.sms-cd-btn').removeClass('yzm-curr').attr('disabled', 'disabled')
            }
            if($('.sms-cd-btn').hasClass('no-click')){
                $('.sms-cd-btn').removeClass('yzm-curr').attr('disabled', 'disabled')
            }
            //滑动显示
            if ($('.drag_text').text() == '验证通过' && $(this).val() != "") {
                $('.sign-pass,.sign-yzm').show();
            }

        });

        //验证码
        $('.phone_yzm').blur(function () {
            var reg = /^\d{4}$/;
            if ($(this).val() == "") {
                $('.err-msg-yzm').text('请输入验证码').show();
                $(this).css('border-color', '#f75234').removeClass('success')
            }
        }).keyup(function () {
            var reg = /^\d{4}$/;
            if (reg.test($(this).val())) {
                $('.err-msg-yzm').text('').hide();
                $(this).css('border-color', '#ccc').addClass('success');
            } else if (!reg.test($(this).val()) && $(this).val().length == 4) {
                $('.err-msg-yzm').text('请输入正确验证码').show();
                $(this).css('border-color', '#f75234').removeClass('success')
            }
            if($(this).val()!=""){
                $('.sign-sub').addClass('yzm-curr').removeAttr('disabled')
            }else{
                $('.sign-sub').removeClass('yzm-curr').attr('disabled','disabled')
            }

        });
/*
//对密码进行验证；
        $('#signPassword').blur(function () {
            var log_pass = /^(?![^A-Za-z]+$)(?![^0-9]+$)[\x21-x7e]{6,16}$/;
            if ($(this).val() == "") {
                $(this).css('border-color', '#f75234').removeClass('success');
                $('.form-tip-msg').text('请输入密码').show()
            }

        }).keyup(function () {
            var log_pass = /^(?![^A-Za-z]+$)(?![^0-9]+$)[\x21-x7e]{6,20}$/;
            if (log_pass.test($(this).val())) {
                $(this).css('border-color', '#ccc').addClass('success');
                $('.form-tip-msg').hide();
                $('.sign-sub').addClass('yzm-curr success').removeAttr('disabled')
            } else if ($(this).val().length < 6) {
                $(this).css('border-color', '#f75234').removeClass('success');
                $('.form-tip-msg').show().text('密码长度6-20位');
                $('.sign-sub').removeClass('yzm-curr success').attr('disabled', 'disabled')
            } else {
                $(this).css('border-color', '#f75234').removeClass('success');
                $('.form-tip-msg').show().text('大写字母、小写字母、数字和标点符号至少包含2种')
                $('.sign-sub').removeClass('yzm-curr success').attr('disabled', 'disabled')
            }
        });*/

        $('.sign-pass').on('click', '.pass-icon', function () {
            if ($(this).hasClass('vericode-icon')) {
                $(this).removeClass('vericode-icon').addClass('disable-icon');
                $('#signPassword').attr('type', 'text')
            } else if ($(this).hasClass('disable-icon')) {
                $(this).addClass('vericode-icon').removeClass('disable-icon');
                $('#signPassword').attr('type', 'password')
            }
        })

    }

//点击发送验证码
    $('.sms-cd-btn').on('click', function () {
        var telVal = $('.sign-phone').val();
        // isRegister(telVal);

        if($('.sign-phone').hasClass('success')){
            bindcodesend(telVal);
            // settime($(this))
        }


    });

    $('#Useragreement').on('click', function () {
        if ($(this).hasClass('success')) {
            $(this).removeAttr('checked').removeClass('success');
            $('.check-msg').text('请勾选').show()
        } else {
            $(this).attr('checked', 'checked').addClass('success');
            $('.check-msg').text('').hide()
        }
    });

//点击绑定
    $('.sign-sub').on('click', function () {

        var sTel = $('.sign-phone').val();
        var Telcheck = $('.phone_yzm ').val();
        if ($('#Useragreement').hasClass('success')) {
            $.ajax({
                url: "http://www.capabcv.com/usersget.ashx?useraction=userteleditbycheck",
                data: {sTel: sTel,Telcheck:Telcheck},
                dataType: 'jsonp',
                type: 'get',
                success: function (data) {
                    if (data == 0) {
                        alert('绑定成功')
                        window.location.href='http://www.capabcv.com'
                    }
                    if(data==1){
                        $('.sign-phone-msg').show().html('该手机号码已经绑定');
                    }
                    if(data==7){
                        $('.err-msg-yzm').text('验证码不正确').show();
                    }
                },
                error: function () {
                }
            })

        }
    });
    $('.sign-sub').keyup(function (e) {
        if (e.keyCode == 13) {
            console.log(13);
            if ($('#Useragreement').hasClass('success')) {
                sign();
            }
        }

    })

})