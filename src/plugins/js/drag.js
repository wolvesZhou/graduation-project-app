//拖拽的实现
var startDrag = function(bar, params, callback){

	params = {
		left: 0,
		top: 0,
		currentX: 0,
		currentY: 0,
		flag: false
	};

	var disX = 0, disY = 0;


	//o是移动对象
	var TouchStart = function(event){
		params.flag = true;
		if(!event){
			event = window.event;
			//防止IE文字选中
			bar.onselectstart = function(){
				return false;
			}
		}
		var e = event;
		params.currentX = e.targetTouches[0].clientX;
		params.currentY = e.targetTouches[0].clientY;
	};
	var TouchEnd = function(){
		params.flag = false;
		callback(disX,disY,"end");
	};
	var TouchMove = function(event){
		var e = event ? event: window.event;
		if(params.flag){
			var nowX = e.targetTouches[0].clientX, nowY = e.targetTouches[0].clientY;
			disX = nowX - params.currentX;
			disY = nowY - params.currentY;
			if (typeof callback == "function") {
				callback(disX,disY,"move");
			}
		}else{
			callback(0,0,"move");
		}
	};
	bar.addEventListener('touchstart',TouchStart, false);
	bar.addEventListener('touchmove',TouchMove, false);
	bar.addEventListener('touchend',TouchEnd, false);
};

if (typeof module != 'undefined' && module.exports) {
    module.exports = startDrag;
} else if (typeof define == 'function' && define.amd) {
    define(function() {
        return startDrag;
    });
} else {
    window.startDrag = startDrag;
}
