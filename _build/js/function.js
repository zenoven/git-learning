function transition(itemSelector,delay,interval,duration){
    var timeoutId, 
        i = 0,
        items = $(itemSelector),
        isFirstTime = true;
    function _do(){
        clearTimeout(timeoutId);
        timeoutId = setTimeout(function(){
            if(i != 0){
                items.eq(i-1).removeClass('item-transition');
            }
            items.eq(i).addClass('item-transition').show(0).transition({ 
                perspective: '240px',
                duration: duration,
                // scale: 1 ,
                rotateX: '0'
            });
            if(i < $(itemSelector).length){
                i++;
            }
            
            _do();
        },isFirstTime ? 0 : interval);
        isFirstTime = false;
    }
    setTimeout(function(){
        _do();
    },delay);
}

function transitionAndHide(itemSelector,delay,interval,duration){
    var timeoutId, 
        i = 0,
        items = $(itemSelector),
        isFirstTime = true;
    function _do(){
        clearTimeout(timeoutId);
        timeoutId = setTimeout(function(){
            // console.log('begin... i = ' + i);
            if(i == 0){
                items.eq($(itemSelector).length - 1).removeClass('item-transition').attr('style','').hide(0);
            }else{
                items.eq(i-1).removeClass('item-transition').attr('style','').hide(0);
            }
            items.eq(i).addClass('item-transition').show(0).transition({ 
                perspective: '200px',
                duration: duration,
                // scale: 1 ,
                rotateX: '0'
            });

            if(i != $(itemSelector).length - 1){
                i++;
            }else{
                i = 0;
            }
            // console.log('next... i = ' + i);
            // console.log('end... ');
            // console.log('******************************');
            
            _do();
        },isFirstTime ? 0 : interval);
        isFirstTime = false;
    }
    setTimeout(function(){
        _do();
    },delay);
}

function toggleClssWithDelay(selector,className,delay){
    var timeoutId;
    function _do(){
        clearTimeout(timeoutId);
        var timeoutIdInner;
        timeoutId = setTimeout(function(){
            $(selector).removeClass(className);
            clearTimeout(timeoutIdInner);
            timeoutIdInner = setTimeout(function(){
                $(selector).addClass(className);
            }, delay + 2000);
            
            console.log('a');
            
            _do();
        },delay);
        
    }
    _do();
}
$(function(){

    // .item-list 3D翻转
    transition('.item-list .item',500,200,400);
    // #footer .data 3D翻转
    transitionAndHide('#footer .data .animation-rotate',0,4000,300);
    // #footer .news 跑马灯
    $('#footer .news .animation-marquee').marquee({});
    // toggleClssWithDelay('.icon-triangle','rotateY',5000);
});
