<?php

$name = $_POST['userName'];
$address = $_POST['address'];
$phone = $_POST['phone'];
$remarks = $_POST['remarks'];
$addressee = $_POST['addressee'];
$link = mysqli_connect('127.0.0.1' , 'root' , 'root' , 'nz2002' , 3306);


$sql = "UPDATE `user` SET `address`='{$address}',`phone`='{$phone}', `remarks`='{$remarks}',`addressee` = '{$addressee}' WHERE `username` = {$name}";
$result = mysqli_query($link,$sql);
if( $result === true ){
    echo json_encode(1);
}else{
    echo json_encode(0);
}