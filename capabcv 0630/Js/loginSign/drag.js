$.fn.drag = function(options) {
    var x,_x, drag = this, isMove = false, defaults = {
    };
    var options = $.extend(defaults, options);
    var handler = drag.find('.handler');
    var drag_bg = drag.find('.drag_bg');
    var text = drag.find('.drag_text');
    var maxWidth = drag.width() - handler.width();  //能滑动的最大间距

    var start = function() {
      // e.stopPropagation();
       isMove = true;
        var touch ;
        if(event.touches){
            touch = event.touches[0];
        }else {
            touch = event;
        }
        x = touch.pageX || touches.clientX;
    };
    var move = function(e) {

    if(isMove) {

        var touch ;
        if(event.touches){
            touch = event.touches[0];
        }else {
            touch = event;
        }
       var x1 = touch.pageX || touches.clientX;
            _x = x1-x;

          if (_x > 0 && _x <= maxWidth) {
             handler.css({'left': _x});
             drag_bg.css({'width': _x});
             } else if (_x > maxWidth) {  //鼠标指针移动距离达到最大时清空事件
             dragOk();
            }

    }
    }
    var end = function(e) {
        isMove = false;
        if (_x < maxWidth) { //鼠标松开时，如果没有达到最大距离位置，滑块就返回初始位置
            handler.css({'left': 0});
            drag_bg.css({'width': 0});
        }

    }


    //清空事件
    function dragOk() {
        handler.removeClass('handler_bg').addClass('handler_ok_bg');
        text.removeClass('slidetounlock').text('验证通过').css({'color':'#fff'});
        var log_pho = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
        if($('.sign-phone').val()!=""){
            $('.sign-pass ,.sign-yzm').show();
            // $('.')
            if(log_pho.test($('.sign-phone').val())){
                $('.sms-cd-btn').addClass('yzm-curr').removeAttr('disabled')
            }

            if($('.get-username').val()!=''){
                $('.get-yzm').show()
            }
        }
        handler.css({'left': maxWidth});                   // add
        drag_bg.css({'width': maxWidth});                  // add

        handler.unbind('mousedown');
        $(document).unbind('mousemove');
        $(document).unbind('mouseup');
        handler.unbind('touchstart');
        $(document).unbind('touchmove');
        $(document).unbind('touchend');

    }

    handler.on("touchstart", start);
    handler.on("mousedown", start);
    //拖动
    $(document).on("touchmove", move);
    $(document).on("mousemove", move);
    //鼠标松开
    $(document).on("touchend", end);
    $(document).on("mouseup", end);
};