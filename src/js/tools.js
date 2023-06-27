//attr允许的值 height left right width opacity 
//设置透明度时罪逮捕超过1
function move(obj, attr, target, speed, callback) {
	//关闭上一个定时器
	clearInterval(obj.timer);

	//获取元素目前的位置
	var current = parseInt(getStyle(obj, attr));


	// if (type === 'opacity') {
	// 	oldVal = parseFloat(window.getComputedStyle(ele)[type]) * 100;
	// } else {
	// 	oldVal = parseInt(window.getComputedStyle(ele)[type]);
	// }

	//判断速度的正负值
	//如果从0 向 800移动，则speed为正
	//如果从800向0移动，则speed为负
	if (current > target) {
		//此时速度应为负值
		speed = -speed;
	}

	//开启一个定时器，用来执行动画效果
	//向执行动画的对象中添加一个timer属性，用来保存它自己的定时器的标识
	obj.timer = setInterval(function () {



		//获取box1的原来的left值
		var oldValue = parseInt(getStyle(obj, attr));

		if (attr === 'opacity') {
			if(speed > 1 || target > 1){
				speed = 0;
				target = 1;
			}
			oldValue = parseFloat(getStyle(obj, attr) );
			speed = speed;
		} else {
			oldValue = parseInt(getStyle(obj, attr));
		}

		// if (type === 'opacity') {
		// 	ele.style[type] = oldVal / 100;
		// } else {
		// 	ele.style[type] = oldVal + 'px';
		// }

		//变速运动使用
		// var step = (target - oldValue) / speed;
		// //变速运动时使用的判断
		// speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
		// console.log(speed+'df');
		// //匀速运动
		var newValue = oldValue + speed;
		// var newValue = oldValue + step;

		//向左移动时，需要判断newValue是否小于target
		//向右移动时，需要判断newValue是否大于target

		if ((speed < 0 && newValue < target) || (speed > 0 && newValue > target)) {
			newValue = target;
		}


		if (attr === 'opacity') {
			obj.style[attr] = newValue;
			obj.style.filter = 'alpha(opacity='+newValue*100+")";
			
		} else {
			//将新值设置给box1
			obj.style[attr] = newValue + "px";
		}


		//当元素移动到0px时，使其停止执行动画
		if (newValue == target) {
			//达到目标，关闭定时器
			clearInterval(obj.timer);
			//动画执行完毕，调用回调函数
			callback && callback();
		}

	}, 1000/60);
}

//创建一个获取实时位置的方法
function getStyle(obj, name) {
	if (window.getComputedStyle) {
		//正常浏览器的方式，具有getComputedStyle()方法
		return getComputedStyle(obj, null)[name];
	} else {
		//IE8的方式，没有getComputedStyle()方法
		return obj.currentStyle[name];
	}

}

