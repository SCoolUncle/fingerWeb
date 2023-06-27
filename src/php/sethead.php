<?php
// 1,获取前端数据参数

// 通过 $_POST预定义变量,获取账号密码
$name = $_POST['userName'];
// $pwd = $_POST['userPwd'];

// 通过 $_FILES预定义变量,获取上传文件信息
// 这个数组不是我们想要的数据存储形式,要进行转化
$file = $_FILES['file'];

// 定义一个新数组,来进行数组的转化
$newFile = [];

// foreach( $file as $k => $v ){
//     foreach( $v as $kk => $vv ){
//         $newFile[$kk][$k] = $vv;
//     }
// }

// // 循环遍历新的数组,完成验证判断
// $fileName = '';
// foreach( $newFile as $k => $v ){
//     // 判断临时文件上传是否成功
    if( $file['error'] !== UPLOAD_ERR_OK ){
        die( json_encode([ 0 , '临时文件上传失败']) );
    }

    // 获取扩展名
    // 找到最后一个点,截取字符串,再从点之后获取扩展名
    $fix = substr(strrchr( $file['name']  , '.') , 1 );
   
    // 定义一个扩展名允许的数组
    $fileFixArr = ['jpg' , 'jpeg' , 'png' , 'gif'];

    // 如果 $fix 扩展名 不是 数组中允许的扩展名
    if( in_array($fix ,  $fileFixArr) === false ){
        // PHP的阻止程序执行
        die(json_encode([ 0 , '扩展名不符合类型' ]));
    }
    // move_uploaded_file( $v['tmp_name'] , "../images/{$fileName}" );
// }
// echo json_encode($file);

// 所有的文件验证判断能正确之后,在进行文件上传
// 循环遍历数组中的所有文件,将所有的文件,上传至指定的文件夹

// foreach($newFile as $k => $v){
//     $fileNmae = $v['name'];
    // $fix = substr(strrchr( $v['name']  , '.') , 1 );

    // $eix = md5( microtime(true) . mt_rand( 10000 , 99999 ));

    // // 将随机文件名 点 原始扩展名拼接为新的文件名称
    // $newFileName = $eix . '.' . $fix;
    // // 将文件上传至指定的文件夹
    move_uploaded_file( $file['tmp_name'] , "../images/{$file['name']}" );
    
    // // 返回文件名名称,将文件名称存储在数据库中
    // // 如果是定义的函数,就需要使用 return 来返回这一个文件名
    // // 如果是多文件,就要是使用数组来存储文件名 返回这个数组

// 执行mysqli对数据库进行写入操作
$newname = $file['name'];
$link = mysqli_connect('127.0.0.1' , 'root' , 'root' , 'nz2002' , 3306);

// $sql = " INSERT INTO `person` (`name`,`pwd`,`pic`) VALUES ( '{$name}' , '{$pwd}' , '{$newFileName}' ) ";
$sql = "UPDATE `user` SET `headPortrait` = '../images/{$newname}' WHERE `username` = {$name}";
$result = mysqli_query($link,$sql);

if( $result === true ){
    echo json_encode([1,'文件上传成功']);
}else{
    echo json_encode([0,'文件上传失败']);
}








