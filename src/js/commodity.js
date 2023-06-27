
{//销量
    //商品轮播
    let index = 0;
    let timer;
    auto();
    function auto() {
        timer = setInterval(function () {

            $('.salelist').animate({
                left: -index * 5 * 242
            }, 1000, "swing"
            );
            index++;
            if (index > 2) {
                index = 0;
            }
        }, 3000);

    }

    $('.salelist').mouseenter(function () {
        clearInterval(timer);
    });
    $('.salelist').mouseleave(function () {
        auto();
    });

    //因为当前没有热度数据，暂时五颗星
    getAjax();
    function getAjax() {
        $.ajax({
            url: '../php/recommend.php',
            data: {
                cat_two_id: "相机配件",
                page: 1,
                line: 15
            },
            type: 'get',
            dataType: 'json',
            success: function (res) {
                res.forEach(function (item) {
                    let str = `
                    
                    <li>
                    <a href="./detail.html?goods_id=${item.goods_id}">
                    <img src="${item.goods_big_logo}" alt="" width="230" height="230">
                    
                    <p>
                    ${item.goods_name}
                    </p>
                    <p>
                        <i class="iconfont icon-shoucang0"></i>
                        <i class="iconfont icon-shoucang0"></i>
                        <i class="iconfont icon-shoucang0"></i>
                        <i class="iconfont icon-shoucang0"></i>
                        <i class="iconfont icon-shoucang0"></i>
                    </p>
                    <div>
                        <span>${item.goods_price}￥</span>
                        <button class="goshop" ;>
                            详情
                        </button>
                    </div>
                    </a>
                    </li>
                    
                    `;
                    $('.salelist').append(str);
                });
            }
        });
    }
  
}

{//分类列表
    let str = '数码家电';
    $('.menulist>li').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
        str = $(this).html();
        getAjax(1);
    });
    getAjax(1);
    function getAjax(page) {
        $.ajax({
            url: '../php/goods_list.php',
            data: {
                cat_two_id: str,  // 前端url地址中,分类名称数据
                page: page,          // 当前页数,也就是函数的参数
                line: 8,             // 每页显示的数据数量,根据项目需求而定
            },
            type: 'get',
            dataType: 'json',
            success: function (res) {
                let str = '';
                res.forEach(function (item) {
                    str += `<li class="list-item">
                            <div class="panel panel-primary">
                              <div class="panel-footer">
                                <div class="row">
                                  <div class="">
                                    <div class="thumbnail">
                                      <img
                                        src="${item.goods_big_logo}" alt="...">
                                      <div class="caption">
                                        <h3>${item.goods_name}</h3>
                                        <p>
                                          <span>${item.goods_price} 元</span>
                                        </p>
                                        <p>
                                          <a href="./detail.html?goods_id=${item.goods_id}"class="newbtn btn-primary" id="btn">详情信息</a>
                                          <a href="javascript:void(0);" class="newbtn btn-danger shopcar" id="btn">+购物车</a>
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>`;

                })

                $('#more .content-box ul').html(str);
                $('.M-box').pagination({
                    mode: 'fixed',               // 固定显示的页面数量
                    pageCount: res[0].sumPage,  // 总页数 
                    totalData: res[0].row,      // 总数据数量
                    current: res[0].page,       // 当前页数
                    showData: 8,                // 每页数据数量
                    activeCls: 'active',        // 点中标签的样式
                    coping: true,                // 显示首页末页
                    homePage: '首页',            // 首页的文字内容
                    endPage: '末页',             // 末页的文字内容
                    prevContent: '上页',         // 上页的文字内容
                    nextContent: '下页',         // 下页的文字内容
                    callback: function (result) {    // 点击的时候,触发的程序
                        // 获取当前的页数
                        let p = result.getCurrent();  // 获取当前点击的按钮,所表示的下一次请求的页数
                        // 这个页数,就是下次请求的参数
                        getAjax(p);                   // 点击时,再次发送ajax请求,参数是点击的按钮,表示的页数
                    }
                });
            }
        })
    }
}

{//好评
    let str = '数码家电';
    //请求数据
    $.ajax({
        url: '../php/goods_list.php',
        data: {
            cat_two_id: str,  
            page: 1,          
            line: 6,           
        },
        type: 'get',
        dataType: 'json',
        success: function(res){
            let str = '';
            res.forEach(function(item){
                str = `
                    
                    <div class="swiper-slide"  >
                    <a href="./detail.html?goods_id=${item.goods_id}">
                    <img src="${item.goods_big_logo}" width="400" alt="">
                    </a>
                    </div>
                    
                `;
                $('.swiper-wrapper').append(str);
                // style="background: url(${item.goods_big_logo}
            });
        }
    });
}
{//

}