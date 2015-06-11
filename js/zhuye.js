/*
$(function(){
	var $win_height = $(window).height();
	var $win_width = $(window).width();
	//alert($win_width);
	$('body').css('height',$win_height);
	$('#anli').css('height',$win_height-200);
	$('#anli').css('margin-top',-($win_height-200)/2);
	$('#anli li').css('height',($win_height-200)/2);
	$('#anli li').css('width',($win_height-200)/2);
});
			

*/

/* 首页中的效果 */
window.onload = function(){
	/* 获取可视区的尺寸 */
	var win_height = view().h;
	var win_width = view().w;
	
	var iNow = 0; // 定义当前是第几屏 默认为1
	var arrSec = document.getElementsByTagName('section');// 获取 页面中 的section
	var arrLi_side = document.getElementsByTagName('aside')[0].getElementsByTagName('li');
	var chSec = document.getElementById("chSec").children; // 变换背景的元素
	var solTrue = true;  // 定义开关 运动完了 才可以在继续滚动
	var arrB_one = document.getElementById("jianjie").getElementsByTagName('b');
	
	var time = null;
	var iTim = 0;
	clearInterval(time);
	time = setInterval(function(){
		arrB_one[iTim].className = 'tripper';
		iTim++;
		if(iTim>=arrB_one.length){clearInterval(time)}
	},80);
	
	/* 初始化 每个 section 的位置 */
	ImPos(iNow);
	
	/* 点击右侧导航 */
	for (var i=0;i<arrLi_side.length;i++) {
		arrLi_side[i].index = i;
		arrLi_side[i].onclick = function(){
			if(iNow != this.index){
				tabTop(iNow,this.index,true);
				iNow = this.index;
			}
			
		}
	}
	// 设置 body 的高度
	document.body.style.height = win_height + 'px';

	/* 滑动滚轮 */
	document.onmousewheel = doScroll;
    if( document.addEventListener ){
        document.addEventListener('DOMMouseScroll',doScroll,false);
    }
    
    
    /* 设置第五屏尺寸 */
   var anli = document.getElementById("anli");
   var arrAnLi = anli.getElementsByTagName('li');
   anli.style.height = win_height-200 + 'px';
   anli.style.marginTop = -(win_height-200)/2 +'px';
   // 为每个 li 设置 宽高
   for (var i=0;i<arrAnLi.length;i++) {
   		arrAnLi[i].style.width = arrAnLi[i].style.height = (win_height-200)/2 +'px';
   }
    
    /* 上下滚动时候触发的函数事件 */
    function doScroll( ev ){
    	if(solTrue){
    		 mouseScroll( ev, function(){
	            if(iNow>0){
	            	tabTop(iNow,iNow-1);
	            	iNow--;
	            }
	            
	        }, function(){
	            if(iNow<5){
	            	tabTop(iNow,iNow+1);
	            	iNow++;
	            }
	            
	        } );
	        solTrue = false;
//	        alert(iNow);
    	}
       
    }
    /* 判断上下滚动 */
    function mouseScroll( ev, upFn, downFn ){
        var ev = ev || event;
        var bDown = true;
        if( ev.wheelDelta ){
            bDown = !(ev.wheelDelta > 0);    
        }else{
            bDown = ev.detail > 0;    
        }
        if( bDown ){
            downFn && downFn();
        }else{
            upFn && upFn();    
        }        
        
    }
	
	/*  向下  向上 滑动 */
	function tabTop(m,n,onTrue){
		//if(m==n || m=='' || n==''){return;}
		// 右侧导航
		arrLi_side[m].className = '';
		arrLi_side[n].className = 'active';
		// 滚动
		startMove(arrSec[m],{top:(m>n?win_height:-win_height)},function(){
            arrSec[m].style.top = m>n?win_height:-win_height + 'px';
            solTrue = true;
            if(onTrue){ImPos(n)}
        });
		startMove(arrSec[n],{top:0},function(){
	    	arrSec[n].style.top = '0px';
	    });
		// 背景
		startMove(chSec[m],{opacity:0},function(){
			chSec[m].style.opacity=0;
			chSec[m].style.alpha = 'alpha(opacity:0)';
			chSec[m].style.zIndex = 0;
		})
		startMove(chSec[n],{opacity:100},function(){
			chSec[n].style.opacity=1;
			chSec[n].style.alpha = 'alpha(opacity:100)';
			chSec[n].style.zIndex = 1;
		})
	}
	
	/* 调整 每屏 的位置 */
	function ImPos(num){
		for (var i=0;i<num;i++) {
			arrSec[i].style.top = -win_height+'px';
		}
		for (var i=num+1;i<arrSec.length;i++) {
			arrSec[i].style.top = win_height + 'px';
		}
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}