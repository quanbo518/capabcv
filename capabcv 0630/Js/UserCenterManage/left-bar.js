$(function () {
    var nId;
    $.ajax({
        type: "get",
        async: false,
        url: "http://www.capabcv.com/usersget.ashx?useraction=userload",
        dataType: "jsonp",
        jsonp: "callback",
        success: function (data) {
            // loginerId = data.nId;
            nId = data.nId;
            $('.user-head ').attr('src', data.sPhoto?data.sPhoto:"../Images/userPhoto.png");
            $('#people_nick').html(data.sNick)
        },
        error:function () {
            alert('信息获取失败，请检查是否登录！');
            window.location.href='http://www.capabcv.com/login.aspx?Reurl='
        },
        complete: function () {
        }
    });
$('.sidebar-bottom').click(function () {
    userlogout()
})
    $('.sidebar-menu').on('click','.memo-list',function () {
        $(this).addClass('active-curr').siblings().removeClass('active-curr')
    })
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
                // $("#userinfohead").html("<a class=log href=javascript:void(0)><i class='icon iconfont'>&#xe613;</i></a>");
                window.location.href = "http://www.capabcv.com";
            }
        });
    }

});

