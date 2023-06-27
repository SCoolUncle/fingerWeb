// 获取cookie
function getcookie(){
    let ck = document.cookie;
    let arr = ck.split('; ');
    let obj = {};
    for ( let i = 0 ; i < arr.length ; i++){
        let newarr = arr[i].split('=');
        obj[newarr[0]] = newarr[1];
    }
    return obj;
}
//设置cookie
function setcookie( key , value , time , path){
    let nowtime = new Date();
    let t = Date.now();
    t = t - (60*60*1000*8) + time*1000;
    nowtime.setTime(t);
    let a = time ? nowtime:'';
    document.cookie = key+`=${value};expires=${a};path=${path}`;
}