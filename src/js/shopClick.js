
//点击购物车
shopcar($('.shopcar'));
function shopcar(obj) {
    let cookieObj = getcookie();
    obj.on('click', function () {

        if (cookieObj.slogin !== undefined) {

            window.location.href = './shopcar.html';
        }
        if (cookieObj.login !== undefined) {

            window.location.href = './shopcar.html';

        } else if (cookieObj.login == undefined) {

            $('#popUps').css('display', 'block');
            $('.gologin').on('click', function () {
                //如果选择登录，将页面连接传递给url中
                window.location.href = `./loginpage.html?${window.location.href}`;
            });
            //如果以临时用户身份访问则像服务器发送一个请求
            //并且根据客户端返回的数值设置一个特殊的cookie值
            //在这模拟发送请求
            $('.continue').on('click', function () {
                setcookie('slogin', 'temuser0002');
                window.location.reload();
            });
        }
    });
}