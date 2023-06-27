 {


    function setBanner(imgList, swiperId, ulBox, liwidth, wspeed, updownList, interval) {
        //参数列表
        //imgList   图片li标签列表
        //swiperId  滑动按钮盒子的id
        //ulBox     ul盒子对象
        //liwidth   li标签的宽度不带px
        //speed     轮播图播放速度
        //updownList    左右切换按钮
        //interval  轮播图间隔
        //引入move函数
        document.write("<script language=javascript src='./js/tool.js'></script>");
        var index = 1;
        var timermove;

        //创建一个克隆函数，用来克隆第一个和最后一个列表项
        //此处的obj是li列表
        copyLi(imgList, ulBox);
        function copyLi(obj, obj2) {

            var firstValue = obj[0].cloneNode(true);
            var lastValue = obj[obj.length - 1].cloneNode(true);
            obj2.insertBefore(lastValue, obj[0]);
            obj2.appendChild(firstValue);

        }
        //滑动按钮添加方法
        addSwiper(imgList, swiperId);
        function addSwiper(obj, obj2) {
            for (var i = 0; i < obj.length; i++) {
                var boxObj = document.getElementById(obj2);
               
                var newvalue = document.createElement('li');
                boxObj.appendChild(newvalue);
            }
            var btnlist = document.querySelectorAll('#' + obj2 + ' li');
            btnlist[index - 1].classList.add('active');
        }

        //默认位置调整,默认第一张显示
        defaultLeft(ulBox, liwidth);
        function defaultLeft(obj, obj2) {
            obj.style.left = -obj2 + 'px';
        }

        //滑动按钮样式添加方法
        // setSwiperStyle( swiperId ,imgList);
        function setSwiperStyle(obj, obj2) {
            var nav = document.querySelectorAll('#' + obj + ' li')
            nav.forEach(function (items) {
                items.classList.remove('active');
            });
            if (index >= obj2.length + 1) {
                var newindex = 1;
            } else if (index < 1) {
                newindex = 5;
            } else {
                newindex = index;
            }
            nav[newindex - 1].classList.add('active');
        }

        //滑动按钮点击切换函数
        swiperChange(swiperId, liwidth, ulBox);
        function swiperChange(oobj, oobj2, oobj3) {
            var nav = document.querySelectorAll('#' + oobj + ' li');
            nav.forEach(function (item, key) {
                item.onclick = function () {
                    index = key + 1;
                    oobj3.style.left = -index * oobj2 + 'px';
                    setSwiperStyle(swiperId, imgList);
                }
            });
        }

        //创建轮播效果
        //当后台运行时，页面不显示，后台会一直执行，会出现页面显示问题
        auto(ulBox, liwidth, wspeed, interval, imgList);
        function auto(bj, obj2, obj3, obj4, obj5) {
            //防止页面重复关闭后定时器叠加，关闭上一
            clearInterval(timermove);
            timermove = setInterval(function () {
                index++;
                setSwiperStyle(swiperId, imgList);
                move(bj, 'left', -index * obj2, obj3, function () {
                    if (index == obj5.length + 1) {
                        index = 1;
                        //此时显示的时最后一张图片和第一张是一模一样的
                        bj.style.left = -liwidth + 'px';
                    }
                    // setnav();
                });
            }, obj4);

        }


        //创建一个左右切换函数
        toggle(updownList, ulBox, imgList, liwidth, wspeed);
        function toggle(obj, obj2, obj3, obj4, obj5) {
            obj[0].onclick = function () {

                index--;
                //先进行判断防止点击过快出现负值
                if (index <= 0) {
                    index = 0;
                }
                setSwiperStyle(swiperId, imgList);
                move(obj2, 'left', -index * obj4, obj5, function () {
                    if (index >= obj3.length + 1) {
                        index = 1;
                        //此时显示的时最后一张图片和第一张是一模一样的
                        obj2.style.left = -index * obj4 + 'px';
                    }
                    if (index <= 0) {
                        index = 5;
                        obj2.style.left = -index * obj4 + 'px';
                    }
                    // setnav();
                });
            }
            obj[1].onclick = function () {
                index++;
                //防止点击过快出现大于长度的值最大为6
                if (index >= obj3.length + 1) {
                    index = 6;
                }
                setSwiperStyle(swiperId, imgList);
                move(obj2, 'left', -index * obj4, obj5, function () {
                    if (index == obj3.length + 1) {
                        index = 1;
                        //此时显示的时最后一张图片和第一张是一模一样的
                        obj2.style.left = -index * obj4 + 'px';
                    }
                    if (index == 0) {
                        index = 5;
                        obj2.style.left = -index * obj4 + 'px';
                    }
                    // setnav();
                });
            }

        }

        //鼠标移入移出函数
        stopLoop(ulBox);
        function stopLoop(obj) {
            bind(obj.parentNode, 'mouseover', function () {
                clearInterval(timermove);
            });
            bind(obj.parentNode, 'mouseout', function () {
                auto(ulBox, liwidth, wspeed, interval, imgList);
            });
        }

        //解决页面最小化问题
        //visbilitychange    当显示状态改变时的事件函数
        hidden();
        function hidden() {
            bind(document, 'visibilitychange', function () {
                //如果显示状态是隐藏就停止执行函数
                if (document.visibilityState == 'hidden') {
                    clearInterval(timermove);
                } else if (document.visibilityState == 'visible') {
                    auto(ulBox, liwidth, wspeed, interval, imgList);
                }
            });
        }

        //创建监听添加函数
        function bind(obj, eventStr, callback) {
            if (obj.addEventListener) {
                obj.addEventListener(eventStr, callback, false);
            } else {
                obj.attachEvent('on' + eventStr, function () {        // 将this转换为obj.this
                    callback.call(obj);
                });
            }
        }
    }
//设定轮播效果
    var imglist = document.querySelectorAll('.banner-img li');
    var swiperid = 'swiper';
    var ulbox = document.querySelector('.banner-img');

    var liw = ulbox.clientWidth;
    
    var speed = 30;
    var updownlist = document.querySelectorAll('.updown-btn');
    var timeinterval = 4000;
    setBanner(imglist, swiperid, ulbox, liw, speed, updownlist, timeinterval);
}