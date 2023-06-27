<?php
include_once './config.php';

$userName = $_POST['userName'];
 
// $userPwd = $_POST['userPwd'];

$link = mysqli_connect($host, $user, $pwd, $dbname, $port);

$sql = "SELECT * FROM `user` WHERE `username` = '{$userName}'  ";

$result = mysqli_query($link, $sql);

$arr = mysqli_fetch_all($result,MYSQLI_ASSOC);

if(count($arr) == 1){
    //设定一个cookie值来标识当前的用户
    // setcookie('login', $userName, time()+3600,'/');
    echo json_encode($arr);
}else{
    $str = "./images/defaulthead.png";
    echo json_encode([0,$str]);
}