var sessionUser = document.getElementById('downist').getAttribute('data');
//var nTId = common.main.GetQueryString("iLink");

var nTIdArr = window.location.href.split('/');
var nTIdArrS = nTIdArr[4].split('?');
var nTId = nTIdArrS[0].replace('.html', '');
var stamp = nTIdArrS[1];

//alert(stamp)

$(function () {
    var type;
    isPrebiew(nTId);

    function isPrebiew(nTId) {
        $.ajax({
            url: 'http://www.capabcv.com/resumev2/resumev2.ashx?resumeaction=templatetableinfoload',
            data: {nTId: nTId},
            dataType: 'jsonp',
            type: 'post',
            success: function (data) {
                var datas = data.TemplateTableInfoClass;
                type=datas[0].sTableType;
                //下载数
                $('.down-num').text(datas[0].sDowncount);

                $('.resume_memo').text(datas[0].sTableViewMemo.substring(0,100));

                $(".resume_list_title").html(datas[0].sTableTitle);

//                $(".btn-confirm").attr("href","http://www.capabcv.com/ResumeDocument/"+ datas[0].sTableType + "/" + datas[0].sTableDowdUrl);

                $(".downTemplate_img").attr("src", "http://www.capabcv.com/ResumeDocument/" + datas[0].sTableType + "/" + datas[0].sTableViewUrl);


                //点击下载
                $("#btn-confirm").click(function () {
                    if (sessionUser != null && sessionUser != ''){
                        isPaymentDown(datas[0].nId, datas[0].sTableType, datas[0].sTableDowdUrl, datas[0].sPayit);
                    }
                    else
                    {
                        //location.href = "http://www.capabcv.com/Regandlog-.aspx?ingate=0&" + stamp + "&Reurl=http://www.capabcv.com/resumedownload/" + nTId + ".html";
                        location.href = "http://www.capabcv.com/SimpReglog.aspx?ingate=0&" + stamp + "&Reurl=http://www.capabcv.com/resumedownload/" + nTId + ".html";
                    }
                });
                if(type=="wordeng"){
                    $('._typeName').text('英文')
                }
                if(type=="ppt"){
                    $('._typeFormat').text('ppt/pptx/wps')
                }if(type=="mail"){
                    $('#tpl_list li .hot-tpl-img').css({
                        'height':'145px'
                    })
                }
                hotMoudle('.hot_tpl_box',4,type)
            },
            complete:function () {

            }
        });
    };



//热门模板
    function hotMoudle(hotBox,nTop,sTableType) {

        var hotHtml = '<div class="hot-tpl">' +
            '<div class="hd clearfix">' +
            '<span class="title pull-left">热门模板</span>' +
            '<a href="http://www.capabcv.com/resumedownloadlist/' + sTableType + '" class="more pull-right">更多></a>' +
            '</div>' +
            '<ul class="clearfix" id="tpl_list">' +
            '</ul>' +
            '</div>';
        $(hotBox).html(hotHtml);
        $.ajax({
            url: 'http://www.capabcv.com/resumev2/resumev2.ashx?resumeaction=templatetablelistload',
            data: {nTop: nTop, sTableType:sTableType,sOrder:"nList"},
            dataType: 'jsonp',
            type: 'get',
            success: function (data) {
                var datas = data.TemplateTableInfoClass, hotHtml = '';

                for (var i = 0; i < datas.length; i++) {
                    hotHtml += '<li>' +

                        '<a href="http://www.capabcv.com/resumedownload/' + datas[i].nId + '.html">' +

                        '<img src="http://www.capabcv.com/ResumeDocument/' + datas[i].sTableType + '/' + datas[i].sTableViewUrl.replace('.png','pic.png')+'" class="img-responsive">' +
                        '</a>' +
                        '</li>';
                }
                $("#tpl_list").html(hotHtml);
            },
        });

    }



    function isDownload(nDownId, sDownClass) {
        $.ajax({
            url: '/userdownloadclass.ashx?downaction=userdownloadadd',
            data: {nDownId: nDownId, sDownClass: sDownClass},
            dataType: 'json',
            type: 'post',
            success: function (data) {

            },
        });
    }


    function isPaymentDown(nDownId, type, sDownClass, sPay) {

        var total = -1, currentNum = -1, newTab;
        newTab = window.open('', '_blank');
        $.ajax({
            url: 'http://www.capabcv.com/orderclass.ashx?orderaction=bonused&sBonusType=ResumeDown',
            dataType: 'jsonp',
            type: 'get',
            success: function (data) {
                total = data;
            },
            complete: function () {
                //非封面
                if (type != "cover") {
                    if (total != -1) {
                        $.ajax({
                            url: 'http://www.capabcv.com/orderclass.ashx?orderaction=downloaded',
                            dataType: 'jsonp',
                            type: 'get',
                            success: function (data) {
                                currentNum = data;
                            },
                            complete: function () {
                                if (sPay == "") {
                                    if (currentNum >= total) {
                                        newTab.location = "http://www.capabcv.com/payit/payresumedown.aspx";
                                    } else {
                                        newTab.close();
                                        userlogwrite(type + "下载-" + nDownId);
                                        isDownload(nDownId, type);
                                        window.location.href = "http://www.capabcv.com/ResumeDocument/" + type + "/" + sDownClass + "";
                                    }
                                    ;
                                }
                                else {
                                    userlogwrite(type + "下载-" + nDownId);
                                    isDownload(nDownId, type);
                                    window.location.href = "http://www.capabcv.com/ResumeDocument/" + type + "/" + sDownClass + "";
                                    newTab.close();
                                }
                            },
                        });
                    }
                    else {
                        newTab.location = "http://www.capabcv.com/payit/payresumedown.aspx";
                    };
                }
                //封面 只判断是否付过费 不判断余额是否足够
                else if (type == "cover") {
                    if (total != -1) {
                        userlogwrite(type + "下载-" + nDownId);
                        isDownload(nDownId, type);
                        window.location.href = "http://www.capabcv.com/ResumeDocument/" + type + "/" + sDownClass + "";
                        newTab.close();
                    }
                    else {
                        newTab.location = "http://www.capabcv.com/payit/payresumedown.aspx";
                    };
                }
            },
        });
    };


    $('.Vdown img').click(function () {
        $('.problem_content').stop().slideToggle(400)
    });
//    分享
    common.main.share_event(".share-box");
//    热门简历



// common.main.hot_article_event('',12)
})