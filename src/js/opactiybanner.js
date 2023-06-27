var box = document.getElementById('banner');
class Carousel {
    constructor(box) {
        this.box = box;
        this.btnlist = box.querySelectorAll('.swiper li');
        this.imglist = box.querySelectorAll('.imgbox li');
        this.swiperbox = box.querySelector('.swiper');
        this.rlbtns = box.querySelectorAll('.swiper-btn li');
        this.timer;
        this.index = 0;
    }

    //添加底部按钮
    setSwiper() {
        this.imglist.forEach((items, key) => {
            let li = document.createElement('li');
            this.swiperbox.appendChild(li);
        });
        let btnlist = this.swiperbox.children[0];
        btnlist.classList.add('active');
    }
    //创建一个设置隐藏的方法
    setOpacity() {
        this.imglist.forEach((items) => {
            items.classList.remove('active');
        });
        this.btnlist.forEach((i, k) => {
            i.classList.remove('active');
        });
        if( this.index < 0 ){
            this.index = this.imglist.length-1;
        }else if( this.index > this.imglist.length-1){
            this.index = 0;
        }
        this.imglist[this.index].classList.add('active');
        this.btnlist[this.index].classList.add('active');
    }

    //底部按钮点击
    bottomClick() {
        this.btnlist = this.box.querySelectorAll('.swiper li');
        this.btnlist.forEach((items, key) => {
            this.bind(items, 'click', () => {
                this.index = key;
                this.setOpacity();
            });
        });
    }

    //切换按钮点击
    swiperClick(){
        this.rlbtns.forEach( ( items, key ) => {
            this.bind(items, 'click' , () => {
                if(key == 0){
                    this.index--;
                }else{
                    this.index++;
                }                      
                this.setOpacity();
            });
        });
    }
    
    //自动轮播
    auto(){
        this.timer = setInterval(() => {
            this.index ++;
            this.setOpacity();
        },3000);
    }

    //鼠标划入停止轮播
    stop(){
        this.bind(this.box, 'mouseover', () => {
            clearInterval(this.timer);
        });
        this.bind(this.box, 'mouseout', () =>{
            this.auto();
        });
    }



    bind(obj, eventStr, callback) {
        if (obj.addEventListener) {
            obj.addEventListener(eventStr, callback, false);
        } else {
            obj.attachEvent('on' + eventStr, () => {        // 将this转换为obj.this
                callback.call(obj);
            });
        }

    }
    init() {
        this.setSwiper();   //运行底部按钮添加操作
        this.bottomClick(); //底部按钮事件监听
        this.swiperClick(); //左右切换按钮
        this.auto();
        this.stop();
    }
}

const newobj = new Carousel(box);
newobj.init();