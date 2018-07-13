var countdown = 60;
//定时器
function settime(obj) {

    if (countdown == 0) {
        obj.removeAttr("disabled").addClass('yzm-curr');
        obj.val("获取验证码");
        countdown = 60;
        obj.removeClass('no-click');
        return;
    } else {
        obj.attr("disabled", "disabled").removeClass('yzm-curr');
        obj.val(countdown + "s后重新发送");
        countdown--;
        obj.addClass('no-click')
    }
    setTimeout(function () {
        settime(obj)
    }, 1000)
};

/*
function autoPwd() {
    if ($.cookie("rmbUser") == "true") {
        $("#autolog").attr("checked", true);
        $("#username").val($.cookie("username"));
        $("#password").val($.cookie("password"));
    }
}
function Save() {
    if ($("#ck_rmbUser").attr("checked")) {
        var str_username = $("#username").val();
        var str_password = $("#password").val();
        $.cookie("rmbUser", "true", {expires: 7}); //存储一个带7天期限的cookie
        $.cookie("username", str_username, {expires: 7});
        $.cookie("password", str_password, {expires: 7});
    }
    else {
        $.cookie("rmbUser", "false", {expire: -1});
        $.cookie("username", "", {expires: -1});
        $.cookie("password", "", {expires: -1});
    }
}
*/

//注册
function sign(Reurl) {
    // console.log('我是注册');
    // var sEmail = $("#InputEmailR").val();
    var sTel = $(".sign-phone").val();
    var sTelcheck = $("#InputYzmT").val();
    var sPassed = $("#signPassword").val();
    // var sParent = $("#signPassword").val();
    var linkid = "";
    $.post("/UsersV2.ashx?useraction=userregisteronlytel&stamp=", {
        "sEmail": sTel,
        "sTel": sTel,
        // "sPassed": sPassed,
        "sTelcheck": sTelcheck
        // "sParent": sParent
    }, function (data, status) {

        if (status == "success") {
            if (data == "0") {
                localStorage.setItem("sTemplate", "");
                if (Reurl != "" && Reurl != null) {
                    window.location.href = Reurl;
                }else{
                    window.location.href = "http://www.capabcv.com";
                }
                /*if (linkid != "" || linkid != null) {
                    window.location.href = "http://www.capabcv.com";
                }
                else {
                    window.location.href = "http://www.capabcv.com";
                }*/
            }
            if (data == "7") {
                $('.err-msg-yzm').text("验证码不正确").show();
                $('.phone_yzm').css('border-color', '#f75234')
            }
            if (data == "11") {
                //邮箱
                $('.sign-phone-msg').text('该号码已注册，你可以直接登录');
            }
            //手机
            if (data == "12") {
                $('.sign-phone-msg').text('该号码已注册，你可以直接登录');
            }
            if (data == "112") {
                //手机或者邮箱
                $('.sign-phone-msg').text('该号码已注册，你可以直接登录');
            }
        }
    });
}
//老用户登录
function passLogin(Reurl) {
    var sEmail = $("#username").val();
    var sPassed = $("#password").val();
    var sReurl = "";
    var iLink = "";
    $.post("/UsersV2.ashx?useraction=userlogin", {"sEmail": sEmail,"sPassed": sPassed}, function (data, status) {
        if (status == "success") {
            if (data == "0") {
                $('.error-msg').hide();
                if (Reurl != "" && Reurl != null)
                {
                    window.location.href = Reurl;
                }
                else
                {
                    window.location.href = "http://www.capabcv.com";
                }
                /* if (Reurl == "1") {
                    // window.location.href = "http://www.capabcv.com";
                    window.location.href = Reurl;
                }
                else {
                    localStorage.setItem("sTemplate", "");
                    location.replace(Reurl);
                }*/
            }
            if (data == "1") {
                $('.error-pass').show();
                $('.err-pass-msg').text('密码不正确,请重新输入')

            }
            if (data == "2") {
                $('.error-pass').show();
                $('.err-pass-msg').html('帐号未注册,你可以' + '<a href="">去注册</a>'
                )
            }
        }
    });
}
//手机登录
function smsLogin(Reurl) {
    var sTel = $(".login-phone").val();
    var sTelcheck = $("#InputYzmT").val();
  /*  var sReurl = "";
    if (sReurl.indexOf("?") >= 0) {
        sReurl = sReurl + "&stamp=";
    }
    else {
        sReurl = sReurl + "?stamp=";
    }*/
    $.post("/UsersV2.ashx?useraction=teltemplogin", {
        "sTel": sTel,
        "sTelcheck": sTelcheck
    }, function (data, status) {
        if (status == "success") {
            if (data == "0") {
                $('.error-msg').hide();
                if (Reurl != "" && Reurl != null) {
                    window.location.href = Reurl;
                }else{
                    window.location.href = "http://www.capabcv.com";
                }
                /* if (Reurl == "1") {
                     // window.location.href = "http://www.capabcv.com";
                     window.location.href = Reurl;
                 }
                 else {
                     localStorage.setItem("sTemplate", "");
                     location.replace(Reurl);
                 }*/
            }
            if (data == "2") {
                $('.error-msg').show();
                $('.err-sms-msg').html('验证码不正确');
            }
        }
    });
}

function useradditionalemail() {
    var sTel = $("#InputPhoneT").val();
    if (sTel != "") {
        $.post("ResumeV2.ashx?resumeaction=additionalemail", {"sTel": sTel}, function (data, status) {
            if (status == "success") {
                if (data == "1") {
                    $("#regemail3").css("display", "block");
                }
                else {
                    $("#regemail3").css("display", "none");
                }
            }
        });
    }
};
//注册验证码
function siginCodesend(sTel) {
    if (sTel != "") {
        $.post("/UsersV2.ashx?useraction=usertelcodesend2", {sTel: sTel}, function (data, status) {

            if (status == "success") {
                if (data == "0") {
                    // alert("发送成功");
                    settime($('.sms-cd-btn'))
                }
            }
        });
    } else {
        alert("请输入手机号码");
    }
}
//短信登录验证码
function logincodesend() {
    var sTel = $('.login-phone').val();
    if (sTel != "") {
        console.log('发送验证码');
        $.post("/UsersV2.ashx?useraction=usertelcodesend", {"sTel": sTel}, function (data, status) {
            if (status == "success") {
                if (data == "0") {
                    settime($('.sms-cd-btn'))
                }
            }
        });
    } else {
        alert("请输入手机号码");
    }
}
//绑定手机验证码
function bindcodesend(sTel) {
    $.ajax({
        url: "http://www.capabcv.com/usersget.ashx?useraction=telcheckcodesend",
        data: {sTel: sTel},
        dataType: 'jsonp',
        type: 'get',
        success: function (data) {
            if (data == 0) {
                // alert('发送成功')
                settime($('#sms-send-cd-btn'))
            }
        },
        error: function () {
        }
    })
}
//登陆验证
function loginRegister1(username) {
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
                //已注册
                $('.error-pass').hide();
                $('.login-phone').addClass('success-curr');
                if ($('.phone_yzm').val() != "") {
                    $('.sms-login-sub').addClass('yzm-curr')
                }
            } else if (rightData == 1) {//未注册
                $('.error-pass').show();
                $('.err-pass-msg').html('该账号未注册,您可以' + '<a href="">去注册</a>');
                $('.login-phone').removeClass('success-curr');
            }
        }
    })
};

function loginRegister(username) {
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
            if (rightData == 0) {//已注册
                $('.error-msg').hide();
                $('.login-phone').addClass('success-curr');
                if ($('.sms-cd-btn').hasClass('no-click')) {
                    $('.sms-cd-btn').removeClass('yzm-curr').attr('disabled', 'disabled');
                }
                $('.sms-cd-btn').addClass('yzm-curr').removeAttr('disabled');
                if ($('.phone_yzm').val() != "") {
                    $('.sms-login-sub').addClass('yzm-curr')
                }
            } else if (rightData == 1) {//未注册
                $('.error-msg').show();
                $('.err-sms-msg').html('该账号未注册,您可以' + '<a href="">去注册</a>');
                $('.sms-cd-btn').removeClass('yzm-curr').attr('disabled', 'disabled');
                $('.login-phone').removeClass('success-curr');

                if ($('.phone_yzm').val() != "") {
                    $('.sms-login-sub').removeClass('yzm-curr')
                }
            }
        }
    })
};
//注册验证
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
                $('.sign-phone-msg').show().html('该账号已注册,您可以' + '<a href="./login.html">直接登录</a>');
                $('.sign-phone').removeClass('success');
                $('.sms-cd-btn').removeClass('yzm-curr').attr('disabled', 'disabled')
            } else if (rightData == 1) {
                $('.sign-phone-msg').hide();
                $('.sign-phone').addClass('success');
                if($('.sms-cd-btn').hasClass('no-click')){
                    $('.sms-cd-btn').removeClass('yzm-curr').attr('disabled', 'disabled')
                }else{
                    $('.sms-cd-btn').addClass('yzm-curr').removeAttr('disabled');
                }

            }

        }
    })
};
//修改密码
function getRegister(username) {
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
            if (rightData == 0) {//已注册
                $('.sign-phone-msg').hide();
                $('.get-username').css({'border-color': '#ccc'}).addClass('success');
                if($('.get-cd-btn').hasClass('no-click')){
                    $('.get-cd-btn').removeClass('yzm-curr').attr('disabled', 'disabled');
                }else{
                    $('.get-cd-btn').removeAttr('disabled').addClass('yzm-curr')
                }

            } else if (rightData == 1) {//未注册

                $('.sign-phone-msg').html('该账号不存在').show();
                $('.get-username').css({'border-color': '#f75234'}).removeClass('success');
                $('.get-cd-btn').removeClass('yzm-curr').attr('disabled', 'disabled');
            }

        }
    })
};
//弹框
function alertBox(text,type) {
    if(type=='err'){
        $('.errorBox img').removeAttr('src');
        $('.errorBox img').attr('src', 'Images/error-msg.png');
    }
    if(type=='right'){
        $('.errorBox img').removeAttr('src');
        $('.errorBox img').attr('src', 'Images/right.png');
    }
    $(".errorBox p").html(text);
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

