{//优惠券
    //活动产品
    let str = '数码家电';

    $.ajax({
        url: '../php/goods_list.php',
        data: {
            cat_two_id: str,  // 前端url地址中,分类名称数据
            page: 2,          // 当前页数,也就是函数的参数
            line: 3,             // 每页显示的数据数量,根据项目需求而定
        },
        type: 'get',
        dataType: 'json',
        success: function(res){
            let str = '';
            //优惠券，模拟
            let discount = 400;
            res.forEach((item) => {
                discount = discount/2;
                str = `
                <li>
                <div class="coupon-box">
                    
                    <img src="../images/coupon${discount}.png" alt="">
                    <div class="receive-btn active">
                        领取
                    </div>
                </div>
                <div class="coupon-product">
                    <div class="product-info">
                        <h2>${item.cat_one_id}</h2>
                        <h2>${item.cat_id}</h2>
                        <p><span>${item.goods_price}元</span></p>
                        <div class="go-btn"><a href="./detail.html?goods_id=${item.goods_id}" style="color:#fff;">去看看</a></div>
                    </div>
                    <a href="./detail.html?goods_id=${item.goods_id}">
                    <img src="${item.goods_big_logo}" alt="">
                    </a>
                    <div class="swiper-btn">
                        <a href="#">&lt;</a>
                        <a href="#">&gt;</a>
                    </div>
                </div>
                </li>
                `;
                $('#coupon>ul').append(str);
            });
        }
    });
}
{//热门活动
     //活动产品
     let str = '数码家电';

     $.ajax({
         url: '../php/setnum.php',
         data: {
             cat_two_id: str,  // 前端url地址中,分类名称数据
             start: 9,          // 起始位置
             line: 4,             // 每页显示的数据数量,根据项目需求而定
         },
         type: 'get',
         dataType: 'json',
         success: function(res){
             let str = '';
             //优惠券，模拟
             res.forEach((item) => {
                 str = `
                 <a href="./detail.html?goods_id=${item.goods_id}">
                 <li>
                 <img src="${item.goods_big_logo}" alt="">
                 <div>新品发布会</div>
                </li>
                </a>
                 `;
                 $('#popularActive>ul').append(str);
             });
         }
     });
}