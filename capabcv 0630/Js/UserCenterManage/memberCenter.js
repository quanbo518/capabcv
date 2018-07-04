var nUId = "";
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
            },
            error: function () {
            },
            complete: function () {
                $('.sidebar-menu .menu-list:last-child').addClass('active-curr')
                orderList();
            }
        });
    }
    function orderList() {
        var datar = '';
        var successArr=[];
        $('.pay-box').empty();
                $.ajax({
                    type: 'get',
                    async: false,
                    url: "http://www.capabcv.com/OrderClass.ashx?orderaction=orderlistload",
                    dataType: "jsonp",
                    jsonp: "callback",
                    success: function (data) {
                        datar = data.OrderInfoClass;
                        datar.reverse();
                        if(nUId){
                            for(var i=0;i<datar.length;i++){
                                if(datar[i].sOrderStatus==0){
                                    successArr.push(datar[i])
                                }
                            }
                        }
                    },
                error:function () {
                    $('.pay-box').html('<div style="width:100%;margin: 60px auto;font-size: 18px;text-align: center;color:#999">你还没有购买任何订单呢</div>');
                },
                    complete:function () {
                        var orderStr = "";
                        var type = '';
                        var timeNum = '';
                        $('.pay-box').empty()
                        // console.log(successArr.length);
                        if(successArr.length<=0){
                            $('.order-box').append('<div class="err-tips" style="width:100%;margin: 60px auto;font-size: 18px;text-align: center;color:#999">你还没有购买任何订单呢</div>');
                        }else{
                            $('.order-box .err-tips').remove();
                            for(var k=0;k<successArr.length;k++){
                                var sProductClass = successArr[k].sProductClass;
                                if (sProductClass == 23) {
                                    type = "钻石会员";
                                    timeNum = 365
                                }
                                if (sProductClass == 25) {
                                    type = "黄金会员";
                                    timeNum = 186
                                }
                                if (sProductClass == 11||sProductClass==29) {
                                    type = "白银会员";
                                    timeNum = 93
                                }
                                // console.log(new Date(successArr[k].dtInTime).getTime()+100*24);
                                orderStr += '<tr>' +
                                    '<td>' + successArr[k].dtInTime + '</td>' +
                                    ' <td>' + newTime(successArr[k].dtInTime, timeNum) + '</td>' +
                                    '<td>' + type + '</td>' +
                                    ' </tr>'
                            }
                            $('.pay-box').append(orderStr)
                        }
                    }
            })
            }
    function newTime(nowDate, timeNum) {
        var result;
        var newdate = new Date(nowDate);
        console.log(newdate);
        var milliseconds =newdate.getTime()+1000 * 60 * 60 * 24*timeNum;
        console.log(milliseconds);
        var endTime = new Date(milliseconds);
        // console.log(endTime);
        var year = endTime.getFullYear(),
            month = endTime.getMonth() + 1,
            day = endTime.getDate(),
            hour = endTime.getHours(),
            min = endTime.getMinutes(),
            sec = endTime.getSeconds();
        result = year + '/' +
            month + '/' +
            day + ' ' +
            hour + ':' +
            min + ':' +
            sec;
        return result;
    }
})

