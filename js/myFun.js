function scroll(){
    if(window.pageYOffset!==null){
        return {
            top:window.pageYOffset,
            left:window.pageXOffset
        }
    }else if(document.compatMode==="CSS1.Compat"){
        return {
            top:document.documentElement.scrollTop,
            left:document.documentElement.scrollLeft
        }
    }
    return {
        top:document.body.scrollTop,
        left:document.body.scrollLeft
    }
}
function $(id){
    return typeof id==="string" ? document.getElementById(id):null;
}
function show(obj){
   return obj.style.display="block";
}
function hide(){
    return obj.style.display="";
}
function client(){
    if(window.innerWidth){
          return{
                 width:window.innerWidth,
                 height:window.innerHeight
          }
    }else if(document.compatMode!='CSS1Compat'){
           return {
               width:document.body.clientWidth,
               height:document.body.clientHeight
           }
    }
    return {
        width:document.documentElement.clientWidth,
        height:document.documentElement.clientHeight
    }
}
function getCssAttrValue(obj,attr){
if(obj.currentStyle){
    return obj.currentStyle[attr];
}else{
    return window.getComputedStyle(obj,null)[attr];
}
}
function buffer(obj,json,fn){//缓动动画函数
   //清除定时器
   clearInterval(obj.timer);
   //设置定时器
   var begin=0,target=0,speed=0;
   obj.timer=setInterval(function(){
       //旗帜
       var flag=true;
       for(k in json){
           //获取初始值
           if("opacity"===k){//透明度
            begin=parseInt(parseFloat(getCssAttrValue(obj,k))*100);
            target=parseInt(parseFloat(json[k])*100);

           }else if("scrollTop"===k){
               begin=Math.ceil(obj.scrollTop);
               target=parseInt(json[k]);
           }else{
            begin=parseInt(getCssAttrValue(obj,k)||0);
            target=parseInt(json[k]);
        }
           //求出步长
           speed=(target-begin)*0.2;
           //判断是否向上取整
           speed=(target>begin)? Math.ceil(speed):Math.floor(speed);
           //动起来
           if("opacity"===k){
                 //w3c浏览器
                 obj.style.opacity=(begin+speed)/100;
                 //ie浏览器
                 obj.style.filter='alpha(opacity:'+(speed+begin)+')';
           }else if("scrollTop"===k){
                obj.scrollTop=begin+speed;
           }else if("zIndex"===k){
                obj.style[k]=json[k];
           }
           
           else{
            obj.style[k]=begin+speed+'px';
        }
           //判断
           if(begin!==target){
             flag=false;
           }
       }
       //清楚定时器
       if(flag){
           clearInterval(obj.timer);
           console.log(fn);
           //判断有没有回调函数
           if(fn){
               fn();
           }
       }
   },20)
}
//节流
function throttle(fn,delay){
    var timer=null;
    return function(){
        clearTimeout(timer);
        timer=setTimeout(fn,delay);
    }
}
window.onresize=throttle(function(){
    
},400);
