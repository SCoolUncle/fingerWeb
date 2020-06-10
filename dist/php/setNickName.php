<?php

$name = $_POST['userName'];
$nickname = $_POST['nickName'];
$link = mysqli_connect('127.0.0.1' , 'root' , 'root' , 'nz2002' , 3306);


$sql = "UPDATE `user` SET `nickname`='{$nickname}' WHERE `username` = {$name}";
$result = mysqli_query($link,$sql);
if( $result === true ){
    echo json_encode(1);
}else{
    echo json_encode(0);
}