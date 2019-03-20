/*
包含n个工具函数的模块
 */
/*
注册Boss--> /Bossinfo
注册JobSeeker--> /JobSeekeinfo
登陆Boss --> /Bossinfo 或者 /Boss
登陆JobSeeker --> /JobSeekeinfo 或者 /JobSeeke
 */
export function getRedirectTo(type, header) {
    let path = '';
    if(type === 'Boss') {
        path = '/boss'
    } else {
        path = '/jobseeker'
    }
    if(!header) {
        path += 'info'
    }
    return path
}

// export function formatUnixtimestamp(inputTime) {  
//     var date = new Date(inputTime);
//     var y = date.getFullYear();  
//     var m = date.getMonth() + 1;  
//     m = m < 10 ? ('0' + m) : m;  
//     var d = date.getDate();  
//     d = d < 10 ? ('0' + d) : d;  
//     var h = date.getHours();
//     h = h < 10 ? ('0' + h) : h;
//     var minute = date.getMinutes();
//     var second = date.getSeconds();
//     minute = minute < 10 ? ('0' + minute) : minute;  
//     second = second < 10 ? ('0' + second) : second; 
//     return h+':'+minute;  
// }

export function formatUnixtimestamp(data) {
    var nowTime = new Date();
    var provideTime = data;
    var provideDate = new Date(provideTime);
    // 当前时间转换
    var nowY = nowTime.getFullYear();
    var nowM = nowTime.getMonth() + 1;
    var nowD = nowTime.getDate();
    //获取时间转换
    var proY = provideDate.getFullYear();
    var proM = provideDate.getMonth() + 1;
    var proD = provideDate.getDate();

    // 转换时间样式
    var Y = provideDate.getFullYear() + "-";
    var M = (provideDate.getMonth() + 1 < 10 ? '0' + (provideDate.getMonth() + 1) : provideDate.getMonth() + 1) + "-";
    var D = (provideDate.getDate() < 10 ? '0' + provideDate.getDate() : provideDate.getDate()) + ' ';
    var h = (provideDate.getHours() < 10 ? '0' + provideDate.getHours() : provideDate.getHours()) + ':';
    var m = provideDate.getMinutes() < 10 ? '0' + provideDate.getMinutes() : provideDate.getMinutes();
    var weekend = provideDate.getDay();
    switch (weekend){
        case 1 :
            weekend = "星期一";
            break;
        case 2 :
            weekend = "星期二";
            break;
        case 3 :
            weekend = "星期三";
            break;
        case 4 :
            weekend = "星期四";
            break;
        case 5 :
            weekend = "星期五";
            break;
        case 6 :
            weekend = "星期六";
            break;
        case 0 :
            weekend = "星期日";
            break;
    }
    var time;
    if(nowTime >= provideTime){
        if(nowY <= proY){
            if(nowM <= proM){
                if(nowD <= proD){
                     time = h + m;
                }else if(nowD - proD >= 1 && nowD - proD < 2){
                     time = "昨天 " + h + m;
                }else if(nowD - proD >= 2 && nowD - proD < 7){
                     time = weekend + " " + h + m;
                }else {
                     time = M + D + h + m;
                }
            }else {
                time = M + D + h + m;
            }
        }else {
            time = Y + M + D + h + m;
        }
    }else {
        time = h + m;
    }
    return time;
}

