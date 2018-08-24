var slideimg = document.getElementById("slideimg");
var warp = document.getElementById("warp");
var content = document.querySelectorAll("#lists li");
console.log(content);
var maxNum = content.length-1;//轮播图的数量
var offset = 750;//偏移量（轮播图的宽度）
var posX = 0;
var timer = null;//定时器
var slideTime = 2000;//默认轮播图的间隔时间
var index = 0;//用来保存步数（点击对应的序号）
//下一个，当到达最后一个图片时，跳转到第一个图
function toright(){
	index ++;
	if(index > maxNum){
		index=0;
	}
	console.log("index的值：" + index);
	animate(-offset*index);
	buttonsShow();
}
//上一个，当到达第一个图片时，跳转到最后一个图
function toleft(){
	index --;
	if(index < 0){
		index = maxNum;
	}
	animate(-offset*index);
	buttonsShow();
}
//封装一个负责幻灯动画的函数
function animate(offsetNum){
	//接收offset后，修改变量posX的值然后赋值给slideimg.style.left
	posX = offsetNum;
	if(posX < -(maxNum*offset)){
		posX = 0;
	}
	if(posX > 0){
		posX = -(maxNum*offset);
	}
	slideimg.style.left = posX + "px";
}
//封装一个定时器开始函数
function play(){
	timer = setInterval(function(){
	toright();
	},slideTime);
}
play();
//封装一个定时器暂停函数
function stop(){
	clearInterval(timer);
}
//封装一个控制导航按钮css的函数
function buttonsShow(){
	for (var k = 0; k < content.length; k++) {
		content[k].className = "";
	}
	content[index].className = "on";
}
//当鼠标移入轮播图区域时，暂停播放
warp.onmouseover = function(){
	stop();
}
//当鼠标离开轮播图区域时，继续播放
warp.onmouseout = function(){
	play();
}
//为导航按钮绑定点击事件(mouseover事件)
for (var i = 0; i < content.length; i++) {
	content[i].onclick = function(){
		for (var j = 0; j < content.length; j++) {
			//找到被点击的对象
			content[j].className = "";
			if(this==content[j]){
				//跳转到对应的图片
				index = j;
				//因为index是自动加1，而变量j是用户随机点击的，这里index 和 j需要同步
				console.log("index的值为：" + index);
				console.log("j的值为：" + j);
				animate(-offset*j);
				content[j].className = "on";
			}
		}
	}
}
