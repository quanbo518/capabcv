function usersload() {
    $.post("/UsersV2.ashx?useraction=userload", { "nId": "0" }, function (data, status) {
        if (status == "success") {
            userinfoarr = data.split("|");
            if (userinfoarr[0] == "0") {
                $("#userinfohead").html("<div id='HeadPhoto20' class='dropdown user_dropdown' ><span class='iconfont nav_user dropdown-toggle' id='dLabel' data-toggle='dropdown'></span><ul class='dropdown-menu user_downlist' role='menu' aria-labelledby='dLabel' style='margin:12px 0 0 0; padding-top:3px; border:#333333 1px solid'><li><a href='/usercentermanage/UserInfoEdit.html' class='iconfont icon-zhuye' target='_blank'>个人中心</a></li><li><a href='/resumev2/resumetool.aspx' class='iconfont icon-jianliguanli'>简历中心</a></li><li><a href='/UserSetPass.aspx' class='iconfont icon-jianliguanli'>修改密码</a></li><li><a onclick=userlogout() class='iconfont icon-tuichu'>退出登录</a></li></ul></div>")
                $("#HeadPhoto20").css("background", "url(" + userinfoarr[2] + ") no-repeat center 15%");
                $("#HeadPhoto20").css("background-size", "cover");
                localStorage.setItem("UserId", userinfoarr[3]);
                localStorage.setItem("UMail", userinfoarr[4]);
                localStorage.setItem("UTel", userinfoarr[5]);
                localStorage.setItem("UName", userinfoarr[1]);
                var link = document.createElement("link");
                link.rel = "stylesheet";
                link.type = "text/css";
                link.href = "/Css/plugin/animate.min.css";
                document.getElementsByTagName("head")[0].appendChild(link);
            }
            else {
                /*$("#userinfohead").html("<div class='dropdown'><span class='iconfont icon-user nav_search dropdown-toggle' data-toggle='dropdown'></span><ul class='dropdown-menu user_down' role='menu' aria-labelledby='dLabel'><li><a href='/UserLogin.aspx?reurl=" + window.location.href + "'>登录</a></li><li><a href='userpassback.aspx' target='_blank'>找回密码</a></li></ul></div>")*/
                //$("#userinfohead").html("<div class='dropdown'><span class='iconfont icon-user nav_search dropdown-toggle' data-toggle='dropdown'></span><ul class='dropdown-menu user_down' role='menu' aria-labelledby='dLabel'><li style='padding-left:15px;'><a href='/SimpReglog.aspx'>登录领贤</a></li><li><a href='/userpassback.aspx' target='_blank'>找回密码</a></li></ul></div>")
                //$("#userinfohead").html("<div class='dropdown'><span class='iconfont icon-user nav_search dropdown-toggle' data-toggle='dropdown'></span><ul class='dropdown-menu user_down' role='menu' aria-labelledby='dLabel'><li style='padding-left:15px;'><a href='/UserLogin.aspx?reurl=" + window.location.href + "'>登录</a></li><li><a href='/userpassback.aspx' target='_blank'>找回密码</a></li></ul></div>")
            }
        }
    });
}

function userlogin_reurl(reurl) {
    var sEmail = $("#email").val();
    var sPassed = $("#password").val();
    var sRePassed = "1";

    $.post("/Users.ashx?useraction=userlogin", { "sEmail": sEmail, "sPassed": sPassed, "sRePassed": sRePassed }, function (data, status) {
        if (status == "success") {
            if (data == "0")//登陆成功
            {
                window.location.href = reurl;
            }
            if (data == "1")//密码不正确
            {
                alert("密码不正确");
            }
            if (data == "2")//email不正确
            {
                alert("用户不存在");
            }
        }
    });
}

function userlogout() {
    localStorage.removeItem("UserId");
    //localStorage.removeItem("nId");
    //localStorage.removeItem("sTemplate");
    localStorage.removeItem("casenId");
    localStorage.removeItem("caseTemplate");
    localStorage.removeItem("nextnId");
    localStorage.removeItem("nextTemplate");
    localStorage.removeItem("prevnId");
    localStorage.removeItem("nextTemplate");
    localStorage.removeItem("oUl_name");
    localStorage.removeItem("oUl1_name");

    $.post("/UsersV2.ashx?useraction=userlogout", {}, function (data, status) {
        if (status == "success") {
            $("#userinfohead").html("<a class=log href=javascript:void(0)><i class='icon iconfont'>&#xe613;</i></a>");
            window.location.href = "http://www.capabcv.com";
        }
    });
}

function userlogwrite(pageview) {
    var stamproot = GetQueryString("stamp");

    $.post("/UsersV2.ashx?useraction=usermutilog", { "pageview": pageview, "stamp": stamproot }, function (data, status) {
        if (status == "success") {

        }
    });
}

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
