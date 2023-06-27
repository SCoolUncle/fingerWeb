{
    let str = `<div class="fixe_menu">
    <ul>
        <li class="list1">
            <a href="#">
                <i class="iconfont icon-cart-icon"></i>
            </a>
            <div>
                我的购物车
            </div>
        </li>
        <li class="list2">
            <a href="javascript:;">
                <i class="iconfont icon-ziyuan"></i>    
            </a>
            <div>
                联系客服
            </div>
        </li>
        <li class="list3">
            <a href="#">
                <i class="iconfont icon-huidaodingbu"></i>
            </a>
            <div>
                回到顶部
            </div>
        </li>
    </ul>
</div>`;
    $('body').prepend(str);

    //购物车添加事件
    $('.list1').on('click', function () {
        let cookieObj = getcookie();
        console.log('hello');
        if (cookieObj.slogin !== undefined) {
            window.location.href = '';
        }
        if (cookieObj.login !== undefined) {
            window.location.href = './shopcar.html';
        } else if (cookieObj.login == undefined) {
            $('#popUps').css('display', 'block');
            $('.gologin').on('click', function () {
                window.location.href = `./loginpage.html?${window.location.href}`;
            });
            $('.continue').on('click', function () {
                setcookie('slogin', 'temuser0002');
                window.location.reload();
            });
        }
    });


}