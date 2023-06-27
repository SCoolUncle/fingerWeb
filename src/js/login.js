let box = document.getElementById('loginBox');
 //忘记密码,暂时跳转至注册页面
 function forgetP(){
    $('.l-tab-list:last').click();
}


//创建一个封装对象
class Loginobj {
    constructor(ele) {
        this.ele = ele;
        this.username = this.ele.querySelector('#username');
        this.password = this.ele.querySelector('#password');
        this.loginerror = this.ele.querySelector('#loginError');
        this.regerror = this.ele.querySelector('#regError');
        this.loginbtn = this.ele.querySelector('#loginbtn');
        this.tabBtns = this.ele.querySelectorAll('.l-tab-covers div');
        this.infoBox = this.ele.querySelectorAll('.static-module .inform-box');
        this.regbtn = this.ele.querySelector('#regbtn');
        this.setname = this.ele.querySelector('#setname');
        this.setpwd = this.ele.querySelector('#setpwd');
        this.setpwds = this.ele.querySelector('#setpwds');
        this.sms = this.ele.querySelector('#sms');
        this.inputlist = this.ele.querySelectorAll('input');
        this.getsms = this.ele.querySelector('#smsbtn');
        this.tfRes = false;
    }
    //登录注册切换
    tabswiper() {
        this.tabBtns.forEach((item, key) => {
            item.onclick = () => {
                this.tabBtns.forEach((i, k) => {
                    i.classList.remove('active');
                    this.infoBox[k].classList.remove('active');
                });
                item.classList.add('active');
                this.infoBox[key].classList.add('active');
            }
        });
    }
   
    //登录判断
    judgment() {
        $('#loginbtn').on('click', () => {
            let uname = $('#username').val();
            let upwd = $('#password').val();
            let checkbox = $('.autoCheck').prop('checked');
            this.loginVerification(this.username, this.password, this.loginerror);
            if (this.tfRes == true) {
                $.ajax({
                    url: '../php/goods_login.php',
                    type: 'post',
                    data: { userName: uname, userPwd: upwd },
                    dataType: 'json',
                    success: function (res) {

                        if (res == '1' && checkbox == true ) {
                            //设置一个cookie,该cookie只有在选中自动登录的时候才会执行,时效一个小时
                            setcookie('login', `${uname}`, 3600, '/');
                            let str = decodeURIComponent(window.location.search);
                            str = str.substr(1);
                            window.location.href = str;

                        }else if(res == '1' ){
                            //设置一个cookie时效为当前窗口
                            setcookie('login', `${uname}`,'', '/');
                            let str = decodeURIComponent(window.location.search);
                            str = str.substr(1);
                            window.location.href = str;
                        } else {
                            $('#loginError').css('display', 'block');
                            $('#loginError').html("该账号还没有注册，请您前往注册!");
                        }
                    }
                }
                );
            }
        });
    }

    //注册判断
    registered() {
        $('#regbtn').css('cursor','pointer');
        $('#regbtn').on('click', () => {
            let username = $('#setname').val();
            let userpwd1 = $('#setpwd').val();
            let userpwd2 = $('#setpwds').val();

            this.loginVerification(this.setname, this.setpwd, this.regerror);
            if( userpwd1 !== userpwd2){
                $('#regError').css('display', 'block');
                $('#regError').html('两次输入的密码不一致!');
                this.tfRes = false;
            }
            if (this.tfRes == true) {
                $.ajax({
                    url: '../php/goods_res.php',
                    type: 'post',
                    data: { userName: username, userPwd: userpwd1 },
                    dataType: 'json',
                    success: function (res) {
                        if (res == '1') {
                            //如果注册成功弹出提示信息
                            let regpop = `
                            <div id="regtrue">
                            <div>
                                <p>注册成功!</p>
                            </div>
                            </div>`;
                            $('body').prepend(regpop);
                            $('#regtrue').fadeOut(4000);
                            setTimeout(function(){
                                window.location.reload();
                            },3000);

                        } else {
                            alert('该账号已被注册!');
                        }
                    }
                }
                );
            }
        });
    }



    //提交按钮执行的格式判断事件
    loginVerification(target1, target2, errorbox) {
        this.tfRes = false;
        let reg = /^1[3-9][0-9]{9}$/;
        let pwdreg = /[A-z0-9]{6,10}/;
        if (target1.value == '' || !reg.test(target1.value)) {
            errorbox.style.display = 'block';
            errorbox.innerHTML = '请输入一个11位电话号码！';
        } else if (target2.value == '' || !pwdreg.test(target2.value)) {
            errorbox.style.display = 'block';
            errorbox.innerHTML = '密码错误！';
        } else {
            errorbox.innerHTML = '';
            errorbox.style.display = 'none';
            this.tfRes = true;
        }
    }

    //自动登录，设置cookie
    autoLogin(){

    }

    // //点击获取验证码
    // getCode() {

    // }

    // //验证码计时
    // codeTiming(obj) {
    //     setInterval(() => {
    //         let num = 60;
    //         for (i = 0; i < num; i++) {
    //             num--;
    //         }
    //         if (num < 10) {
    //             obj.value = num + 's';
    //         }
    //         obj.value = num + 's';
    //     }, 1000);
    // }

    //事件绑定方法
    addListener(obj, eventstr, callback) {
        if (obj.addEventListener) {
            obj.addEventListener(eventstr, callback, false);
        } else {
            obj.attachEvent('on' + eventstr, function () {
                callback.call(obj);
            });
        }
    }

    //
    init() {
        this.tabswiper();
        this.judgment();
        this.registered();
        // this.gorgetP();
    }
}

const newobj = new Loginobj(box);
newobj.init();