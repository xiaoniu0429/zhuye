/* 封装用到的函数方法  */

/* 可视区宽高 */
function view(){
	return{
		w:window.innerWidth || document.documentElement.clientWidth,
		h:window.innerHeight || document.documentElement.clientHeight
	}
}

/* 给指定的节点 增加class */
function addClass(obj,sClass){
	var aClass = obj.className.split(' ');
	if(!obj.className){
		obj.className = sClass;
		return;
	}
	for(var i=0;i<aClass.length;i++){
		if(aClass[i]==sClass){
			return;
		}
	}
	obj.className += ' ' + sClass;
}

/* 给指定的节点 删除class */
function removeClass(obj,sClass){
	var aClass = obj.className.split(' ');
	if(!obj.className){return;}
	for (var i=0;i<aClass.length;i++) {
		if(aClass[i]==sClass){
			aClass.splice(i,1);
			obj.className = aClass.join(' ');
			return;
		}
	}
}

/* 获得指定元素的父元素 */
function getParent(){
	
}

/* 运动函数 */
function startMove(obj,json,fn){
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		var bBtn=true;
		for(attr in json){
			var iCur=0;
			if(attr=='opacity'){
				iCur=Math.round(getStyle(obj,attr)*100);	
			}else{
				iCur=parseInt(getStyle(obj,attr));	
			}
			var iSpeed=(json[attr]-iCur)/8;
			iSpeed=iSpeed>0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
			if(json[attr]!=iCur){
				bBtn=false;	
			}
			if(attr=='opacity'){
				obj.style.filter='alpha(opacity:'+iCur+iSpeed+')';
				obj.style.opacity=(iCur+iSpeed)/100;
			}else{
				obj.style[attr]=iCur+iSpeed+'px';	
			}
		}
		if(bBtn){
			clearInterval(obj.timer);
			if(fn){
				fn.call(obj);	
			}	
		}	
	},50);
}
/* 获取元素样式 */
function getStyle(obj,attr){	
	return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj,false)[attr];
}


