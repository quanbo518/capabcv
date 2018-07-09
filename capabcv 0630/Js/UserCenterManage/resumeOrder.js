var datar;
var vipData=[];
var nUId = "";
var totDownNum;
var finishNum;
$(function () {
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
                $('.sidebar-menu .menu-list:nth-of-type(4)').addClass('active-curr');
            },
            error: function () {},
            complete:function () {

                orderList('0');
                downResumeNum();
                finishResume();
                downNum('ResumeDown');
                downNum('ResumeCreate');
            }
        });
    }
    function orderList(sOrderStatus1) {
        $('.shop_allList').empty();
        $. ajax({
            type:'get',
            async:false,
            url:'http://www.capabcv.com/orderclass.ashx?orderaction=orderclear',
            dataType: "jsonp",
            jsonp: "callback",
            success:function (data) {
            },
            complete:function () {
                $.ajax({
                    type: 'get',
                    async: false,
                    url: "http://www.capabcv.com/OrderClass.ashx?orderaction=orderlistload",
                    dataType: "jsonp",
                    jsonp: "callback",
                    beforeSend:function () {
                        $('.shop_allList').html('<div style="width:100%;margin: 60px auto;font-size: 18px;text-align: center;color:#999">你还没有购买任何订单呢</div>');
                    },
                    success: function (data) {
                        datar = data.OrderInfoClass;
                        if(nUId){ datar.reverse();
                            var order = "";
                            for (var i = 0; i < datar.length; i++) {
                                var reg = /([0-9]+.[0-9]{2})[0-9]*/;
                                var mPrice = datar[i].mPrice.replace(reg, "$1");
                                var sOrderNumId=datar[i].sOrderNumId;
                                // .substring(10)
                                var sProductClass=datar[i].sProductClass;
                                if (datar[i].sOrderStatus == 0) {
                                    // vipData.push( datar[i].mPrice)
                                    var sOrderStatus = '已支付'
                                } else {
                                    sOrderStatus = '未支付'
                                }
                                // if (nUId == datar[i].nBuyers) {

                                if (datar[i].sOrderStatus == sOrderStatus1 || !sOrderStatus1) {
                                    order += '<div class="shop_center" data-id="' + datar[i].nId + '">' +
                                        '<div class="shop_top" style="margin: 0;">' +
                                        '<ul class="shop_top_left pull-left">' +
                                        '<li class="order_num"><span style="margin-right: 5px">订单编号:</span>  '+ sOrderNumId + '</li>' +
                                        '</ul>' +
                                        '<ul class="shop_top_right pull-right ">' +
                                        '<li class=" order_money">¥<i class="money">' + mPrice + '</i></li>' +
                                        '<li class="pay_status">' + sOrderStatus + '</li>' +
                                        '<li class="order_time" >' + datar[i].dtInTime + '</li>' +
                                        '<li>' +
                                        // '<button class="payMoney" type="button" data-sProductClass="' + sProductClass + '">付款</button>' +
                                        //'<img data-id="' + datar[i].nId + '" class="shop_del" src="../Images/del_gray.png" alt="" title="删除订单">' +
                                        '</li>' +
                                        '</ul>' +
                                        '</div>' +
                                        '<div class="shop_content">' +
                                        '<div class="">' +
                                        '<img class="shop_img" src="/Images/p/'+sProductClass+'.png"  data-sProductClass="' +sProductClass + '" alt="">' +
                                        '</div>' +
                                        /*'<div class="shop_detail">' +
                                        '<p class="shop_title">WORD简历模板</p>' +
                                        '<ul>' +
                                        '<li>模板属性: WORD文档,包含2007</li>' +
                                        '<li>模板作者: 领贤简历</li>' +
                                        '<li>纸张大小: A4</li>' +
                                        '<li>文件大小: 1003KB</li>' +
                                        '<li>文档长度: 一页</li>' +
                                        '</ul>' +
                                        '</div>' +*/
                                        '</div>' +
                                        '</div>'
                                    // }
                                }
                            }
                            if(!order){
                                order='<div style="width:100%;margin: 60px auto;font-size: 18px;text-align: center;color:#999">你还没有购买相关订单呢</div>'
                            }
                            $('.shop_allList').html(order);}

                    },
                    error: function () {},
                    complete: function () {
                        delOrder();
                    },

                })
            }
        })
    }

    function ProductTitle() {
        $.ajax({
            type:'get',
            async: false,
            url: "http://www.capabcv.com/OrderClass.ashx?orderaction=productlistload",
            dataType: "jsonp",
            jsonp: "callback",
            success:function (data) {
                var dataL=data.ProductInfoClass;
                for(var j=0;j<dataL.length;j++){
                    for(var i=0;i<vipData.length;i++){
                        var maxNum=Math.max(vipData[i]);
                    }
                    if(maxNum==dataL[j].mProductPrice){
                        var newData=dataL[j];
                        $('.vip-title').html(newData.sProductTitle)
                    }
                }
            },
            error:function () {},
            complete:function () {}
        })
    }
//下载数量

    function downNum(sBonusType) {
        $.ajax({
            type: "get",
            async: false,
            url: "http://www.capabcv.com/orderclass.ashx?orderaction=bonused",
            dataType: "jsonp",
            data:{'sBonusType':sBonusType},
            jsonp: "callback",
            success: function (data) {
                if(nUId){
                    $('.top-describe').css('display','block');
                    if(sBonusType=='ResumeCreate'){
                        var totReCreateNum=data;
                        var surplusReNum=totReCreateNum-finishNum;
                        if (surplusNum > 0 && surplusNum <= 10000) {
                            $('.surPlusResNum').text(surplusNum)
                        }
                        else if (surplusNum == 0) {
                            $('.surPlusResNum').text(0)
                        }
                        else if (totReCreateNum >= 65535) {
                            $('.surPlusResNum').text('不限量')
                        }
                    }else {
                        if(sBonusType=='ResumeDown'){
                            var totReNum=data;
                            var surplusNum = totReNum - totDownNum;

                            if (surplusNum > 0 && surplusNum<=10000) {
                                $('.surplusDownNum').text(surplusNum)
                            }
                            else if (surplusNum == 0) {
                                $('.surplusDownNum').text(0)
                            }
                            else if (totReNum >= 65535) {
                                $('.surplusDownNum').text('不限量')
                            }
                        }
                    }
                }

            },
            error: function () {},
            complete:function () {
            }
        });
    }
    function downResumeNum() {
        $.ajax({
            type: "get",
            async: false,
            url: "http://www.capabcv.com/orderclass.ashx?orderaction=downloaded",
            dataType: "jsonp",
            jsonp: "callback",
            success: function (data) {
                console.log(nUId);
                if(nUId){
                    totDownNum=data;
                    $('.downNum').text(data);
                }
            },
            error: function () {}
        });
    }
    finishResume();
    function finishResume(){
        $.ajax({
            type: "get",
            async: false,
            url: "http://www.capabcv.com/orderclass.ashx?orderaction=resumeed",
            dataType: "jsonp",
            jsonp: "callback",
            success: function (data) {
                if(nUId){
                    finishNum=data;
                    $('.finish-resume').text(finishNum)
                }
            },
            error: function () {}
        });
    }
    //点击全部菜单
    $('.shop_search').on('click',function (e) {
        $('#shop_down').toggle();

        $(document).on("click", function(){
            $("#shop_down").hide();
        });
        e.stopPropagation();
    });
    $("#shop_down").on("click", function(e){
        e.stopPropagation();
    });
    $('.shop_down li').each(function () {
        $(this).click(function () {
            $('.order_status').text($(this).text());
            $('#shop_down').hide();
            $(this).addClass('pay_active').siblings().removeClass('pay_active');
            if ($('.success_order').hasClass('pay_active')) {
                orderList('0')
            } else if ($('.unfinished_order').hasClass('pay_active')) {
                orderList('1')
            } else if ($('.all_order').hasClass('pay_active')) {
                orderList()
            }
        })
    });

//删除订单
    function delOrder() {
        $('.shop_del').each(function () {
            var that=this;
            $(this).click(function () {
                var $nId=$(this).attr('data-id');

                $('.delete_alert1').fadeIn(200);

                $('.btn-confirm').click(function () {

                    $('.delete_alert1').fadeOut(200);
                    $.ajax({
                        type: "get",
                        async: false,
                        url: "http://www.capabcv.com/orderclass.ashx?orderaction=orderdel",
                        dataType: "jsonp",
                        jsonp: "callback",
                        data: {nId:$nId},
                        success: function (data) {

                        },
                        complete:function () {
                            $(that).parents('.shop_center').remove();
                        }

                    })

                })

            })
        })

    }


    $('.x1,.btn-cancel').click(function () {
        $('.delete_alert1').fadeOut(200)
    })

})





