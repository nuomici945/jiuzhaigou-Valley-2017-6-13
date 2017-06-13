
function fnLoad(){
	var welcome = id('welcome');
	var index = id('index');
	var arr = ['img/tree.jpg','img/title.png','img/title2.png','img/logo.png','img/cloud.png'];
	var num = 0;
	var Imageonoff = false;
	var Dateonoff = false;
	var timer = 0;
	var oldTime = new Date().getTime();
	addClass(index, "show");
	
	
	
	for(var i=0;i<arr.length;i++){
		var oImg = new Image();
		oImg.src = arr[i];
		oImg.onload = function(){
			num++;	
			if(num == arr.length){
				Imageonoff = true;
			}
		}
		
	}
	
	timer = setInterval(function(){
		var nowTime = new Date().getTime();
		var now = nowTime-oldTime;
		if(now>=5000){
			Dateonoff = true;
		}
		
		
		if(Imageonoff&&Dateonoff){
			clearInterval(timer);
			welcome.style.opacity = 0;
		}
	},100)
	
	
	bind(welcome,"transitionEnd",end);
	bind(welcome,"webkitTransitionEnd",end);
	function end(){
		removeClass(welcome,'show');
		fnIndex();
	}
	
}

//bind(document,'touchend',function(ev){
//	ev.preventDefault();
//})

function fnIndex(){
	var index = id('index');
	var pic = index.getElementsByClassName('picture')[0];
	var list = pic.getElementsByClassName('picture_list')[0];
	var lis = pic.getElementsByTagName('li');
	var As = pic.getElementsByTagName('a');
	var timer = 0;
	var num = 0;
	var w = view().w;
	var now = 0;
	
	
	var startx = 0;
	var x = 0;
	
	fnData()  // 调用获取数据的函数
	auto() //轮播图定时器
	function auto(){
		timer = setInterval(function(){
			num++;
			num = num%lis.length;
			tab()
		},2000)
	}
	
	
	
	bind(list,'touchstart',start);
	bind(list,'touchmove',move);
	bind(list,'touchend',end);
	
	function start(ev){
		clearInterval(timer);
		ev = ev.changedTouches[0];
		list.style.transition = 'none'
		startx = ev.pageX;
		x = now;
	}
	function move(ev){
		ev = ev.changedTouches[0];
		var disx = ev.pageX - startx;
		now = x + disx;
		list.style.transform = list.style.webkitTransform ="translateX("+now+"px)"; 
	}
	function end(){
		
		num = -Math.round(now/w);
		now = -num*w;
		list.style.transition = '.5s';
		list.style.transform = list.style.webkitTransform ="translateX("+now+"px)"; 
		if(num>=lis.length){
			num = lis.length-1;
		}
		if(num<=0){
			num=0;
		}
		tab();
		auto()
	}
	
	function tab(){
		now = -num*w;
		list.style.transition = '.5s';
		list.style.transform = list.style.webkitTransform ="translateX("+now+"px)"; 
		
		for(var i=0;i<As.length;i++){
			removeClass(As[i],"active");
		}
		addClass(As[num],'active');
	}
}

function fnData(){
	var index = id('index');
	var score = index.getElementsByClassName('score')[0];
	var arr = ['非常失望','一般','没有想象中的好','良好','非常好']
	var lis = score.getElementsByTagName('li');
	for(var i=0;i<lis.length;i++){
		(function(index){
			var As = lis[index].getElementsByTagName('a');
			var oInput = lis[index].getElementsByTagName('input')[0];
			for(var k=0;k<As.length;k++){
				As[k].bg = k;
				bind(As[k],'touchstart',function(){
					this.style.background = "url(img/star.png)no-repeat 0px 0px";	
					for(var j=0;j<As.length;j++){
						if(this.bg<j){
							As[j].style.background = "url(img/star.png)no-repeat -38px 0px";	
						}else{
							As[j].style.background = "url(img/star.png)no-repeat -0px 0px";	
						}
						
						
					}
					oInput.value = arr[this.bg];
				})
			}
			
		})(i)
	}
	
}





