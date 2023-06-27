{
    //首页分页列表
    let setstr = `

`;
    let cat_id;
    $('.product-menu>li').on('mouseenter', function () {
        $(this).addClass('active').siblings().removeClass('active');

        cat_id = $.trim($(this).text());
        num = $(this).index();
        console.log(cat_id);
        getAjax(1);
        $('.p-show').css('top', `${-10 - $(this).index() * 40}px`);
    });
    $('.product-menu>li').on('mouseleave', function () {
        $(this).removeClass('active');
        $('.p-show').remove();
        // setstr = '';
    });

    //分类请求
    function getAjax(page) {
        $.ajax(
            {
                url: '../php/goods_list.php',
                type: 'get',
                data: {
                    cat_two_id: cat_id,
                    page: page,
                    line: 12
                },
                dataType: 'json',
                success: function (res) {
                    setstr += `<div class="p-show">
                <ul>`;
                    if (res.length >= 12) {
                        res.length = 12;
                    }
                    res.forEach(function (item) {
                        setstr += `
                    <a href="../page/detail.html?goods_id=${item.goods_id}">
                    <li>
                        <img src="${item.goods_big_logo}" alt="">
                        <div>
                            <p>${item.goods_name}</p>
                            <span>${item.goods_price}元</span>
                        </div>
                    </li>
                    </a>
                `;
                    });
                    $('.product-menu>li').eq(num).prepend(setstr);
                    $('.p-show').css('top', `${-10 - num * 40}px`);
                    setstr = '';
                }
            }
        );
    }

}
{//推荐部分
    let index = 0;
    let str = '';
    //切换方法
    function switchTj() {
        $('.recommend-swiper>li>a').eq(index).addClass('active').parent().siblings().children().removeClass('active');
        $('.product-box>ul').animate({
            left: `-${index * $('.product-box>ul').innerWidth()}px`
        }, 1000);
    }
    //点击切换
    $('.recommend-swiper>li').on('click', function () {
        index = $(this).index();
        switchTj();
    });
    //查看更多
    function linkMore() {

        window.location.href = './commodity.html#more';
    }

    //再看看
    $('.next').on('click', function () {
        index++;
        let lilistLengtn = $('.recommend-swiper>li').length;
        if (index == lilistLengtn) {
            index = 0;
        }

        switchTj();
    });

    //循环遍历添加推荐内容
    $('.recommend-swiper>li>a').each(function (i, item) {
        getAjax(1, $(item).text());
    });

    //推荐请求
    function getAjax(page, cat_id, callback) {
        $.ajax(
            {
                url: '../php/recommend.php',
                type: 'get',
                data: {
                    cat_two_id: cat_id,
                    page: page,
                    line: 3,
                },
                dataType: 'json',
                success: function (res) {

                    res.forEach(function (item) {
                        str = `
                        <a href="../page/detail.html?goods_id=${item.goods_id}">
                        <li>
                        <img src="${item.goods_big_logo}" alt="" width="180" height="180">
                        <p>
                            ${item.goods_name}
                        </p>
                        <p>
                            <span>${item.goods_price}元</span>
                        </p>
                        </li></a>`;

                        $('.product-box>ul').append(str);
                        //定义一个回调函数
                        // callback();
                    });

                }
            }
        );
    }
}

{//新品上市
    console.log($('#newProduct .p-list'));
    let cat_id = '数码家电';
    $.ajax(
        {
            url: '../php/recommend.php',
            type: 'get',
            data: {
                cat_two_id: cat_id,
                page: 1,
                line: 4,
            },
            dataType: 'json',
            success: function (res) {

                res.forEach(function (item) {
                    str = `
                <a href="../page/detail.html?goods_id=${item.goods_id}">
                <li>
                <img src="${item.goods_big_logo}" alt="">
                <div class="textbg">
                    <p>${item.goods_name}</p>
                    <p><span>${item.goods_price}元</span></p>
                </div>
                </li></a>`;


                    $('#newProduct .p-list').append(str);
                    //定义一个回调函数
                    // callback();
                });

            }
        }
    );

}
{//热销产品
    let index = 0;
    let str = '';
    //切换方法
    function switchRx() {
        $('.p-window .p-list').animate({
            left: `-${index * $('.p-window').innerWidth()}px`
        }, 1000);
    }
    //点击切换
    
    $('.sell-btn>a').on('mousedown', function () {
        $(this).addClass('active').siblings().removeClass('active');
        if ($(this).index() == 0) {
            index--;
            if (index < 0) {
                index = 2;
            }
        } else {
            index++;
            if (index > 2) {
                index = 0;
            }
        }

        switchRx();
        console.log('hello');
    });
    $('.sell-btn>a').mouseup(function(){$(this).removeClass('active')});
    //添加内容
    getAjax(1, "生活日用");

    //热销请求
    function getAjax(page, cat_id) {
        $.ajax(
            {
                url: '../php/recommend.php',
                type: 'get',
                data: {
                    cat_two_id: cat_id,
                    page: page,
                    line: 9,
                },
                dataType: 'json',
                success: function (res) {

                    res.forEach(function (item) {
                        str = `
                        <a href="../page/detail.html?goods_id=${item.goods_id}">
                        <li>
                        <img src="${item.goods_big_logo}" alt="">
                        <div class="praise"></div>
                        <p>${item.goods_name}</p>
                        <p><span>${item.goods_price}元</span></p>
                        <div>
                            <div class="shopCar">
                                <span class="iconfont icon-cart-icon  "></span>
                            </div>
                        </div>
                        </li>
                        </a>`;

                        $('.p-window .p-list').append(str);
                        //定义一个回调函数
                        // callback();
                    });

                }
            }
        );
    }

}