{
    let str = `
    <script src="../js/cookies.js"></script>
    <script src="../js/shopClick.js"></script>
    <header id="head-top" class="container-wrap">
    <div class="container-wrap">
        <div class="container">
            <div class="cs l">
                <i class="iconfont icon-ziyuan"></i>
                <i class="iconfont icon-kefu"></i>
                4006-234-343
            </div>
            <div class="seach r">
                <input type="text" placeholder="商品名称">
                <div class="seach-btn">
                    <i class="iconfont icon-sousuo"></i>
                </div>
                <a href="#">办公设备</a>
                <a href="#">游戏装备</a>
            </div>
        </div>
    </div>
    <nav id="head-menu" class="container-wrap">
        <div class="container">
            <div class="logo l"></div>
            <ul class="head-list l">
                <li>
                    <a href="javascript:void(0);" onclick="index()" class="active">
                        首页
                    </a>
                </li>
                <li>
                    <a href="javascript:void(0);" onclick="commodity()">
                        仓库
                    </a>
                </li>
                <li>
                    <a href="javascript:void(0);" onclick="activity()">
                        活动专区
                    </a>
                </li>
            </ul>
            <div class="list-right r">
                <div class="personal r">
                    <div class="p-head l">
                        
                        <ul>
                            <li>
                                <a href="#">
                                    我的店铺
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    订单追踪
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    地址管理
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    我的收藏
                                </a>
                            </li>
                            <li>
                                <a href="./personal.html">
                                    账号信息
                                </a>
                            </li>
                            <li class="logout">
                                <a href="javascript:;">
                                    退出登录
                                </a>
                            </li>
                        </ul>
                    </div>
                    <a href="#" class="log-in l">
                        登录 注册
                    </a>
                </div>
                <i class="iconfont icon-cart-icon shopcar r"></i>
                <i class="iconfont icon-tongzhi r"></i>
            </div>
        </div>
    </nav>
    </header>`
        ;

    let popstr = `
    <!-- 登录选择免登录页面 -->
    <div id="popUps" class="container-wrap">
        <div>
            <p>您还没有登录，如果继续访问我们将为你建立一个临时身份以获得更多服务!&nbsp;&nbsp;&nbsp;(有一定的风险) </p>
            <p>
                <a href="javascript:;"> 《临时身份免责声明》</a>
            </p>
            <p>
                1.临时身份在您关闭网页时失效 <br>
                2.该状态下您可以正常享受购买服务 <br>
                3.关闭网页后将 <u>不会显示您的物流信息</u> <br>
                4.该状态不享有本店提供的优惠服务 <br>
                5.该状态下购买的商品<u>不享有赔偿服务</u>
            </p>
            <button class="gologin">前去登录</button>
            <button class="continue">继续访问</button>
        </div>
    </div>
    `;
    $('body').prepend(popstr);
    $('body').prepend(str);
    let cookieObj = getcookie();
    //当页面加载完成时检测是否有cookie值如果有则跳转到用户登录的首页
    $(window).ready(function () {
        cookieObj = getcookie();
        if (cookieObj.login == undefined && cookieObj.slogin == undefined) {
            $('.p-head').css('display', 'none').siblings().css('display', 'block');

        } else if (cookieObj.login !== undefined || cookieObj.slogin !== undefined) {
            $('.p-head').css('display', 'block').siblings().css('display', 'none');
            if (cookieObj.login !== undefined) {
                //获取头像,临时用户没有头像设定
                $.ajax({
                    url: '../php/getHead.php',
                    type: 'post',
                    dataType: 'json',
                    data: {
                        userName: cookieObj.login
                    },
                    success: function (res) {
                        // console.log(res[0].headPortrait);
                        $('.p-head').css('background', `url(${res[0].headPortrait}) `);
                        $('.p-head').css('backgroundSize', `cover`);
                    }
                });
            }
        }
    });
    //页面切换
    function index() {
        window.location.href = './index.html';
    }
    function commodity() {
        window.location.href = './commodity.html';
    }
    function activity() {
        window.location.href = './activityarea.html';
    }
    //点击登录跳转至登录注册页面
    $('.log-in').on('click', function () {
        window.location.href = `./loginpage.html?${window.location.href}`;
    });

    //退出登录
    $('.logout').on('click', function () {
        setcookie('login', '', -1, '/');
        window.location.reload();
    });

}
$('.p-head').on('click', function(e){
    if(e.target == e.currentTarget){
        window.location.href = './personal.html';
    }
   
});




// {//头像的获取

//     $.ajax({
//         url: '../php/login.php',
//         type: 'post',
//         dataType:'json',
//         data:{
//             username:
//         }
//         success:function(res){

//         }
//     }

//     );

// }

