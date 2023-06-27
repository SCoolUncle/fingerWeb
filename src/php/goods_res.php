<?php
include_once './config.php';

$userName = $_POST['userName'];
$userPwd = $_POST['userPwd'];

$link = mysqli_connect($host, $user, $pwd, $dbname, $port);

$demandsql = "SELECT `id` FROM `user` WHERE `username` = '{$userName}'  ";
$dres = mysqli_query($link, $demandsql);
$arr = mysqli_fetch_all($dres);
if(count($arr) >= 1){
    echo json_encode('0');
}else{
    $sql = "INSERT INTO `user`(`username` , `userpwd`) VALUES('{$userName}' , '{$userPwd}')";

    $result = mysqli_query($link, $sql);

    // // 写入成功,执行结果是true,写入失败是false
    if($result == true){
        echo json_encode('1');
    }else{
        echo json_encode('0');
    }
}
