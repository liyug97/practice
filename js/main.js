/*
请求地址: http://wthrcdn.etouch.cn/weather_mini
请求方法:get
请求参数:city(城市名)
响应内容:天气信息

1.点击回车/城市
2.查询数据
3.渲染数据

*/
window.onload=function(){
    var app = new Vue({
        el:"#app",
        data:{
            city:"",
            weatherList:[],
        },
        methods: {
            searchWeather:function() {
                var that = this;
                axios.get("http://wthrcdn.etouch.cn/weather_mini?city="+this.city)
                .then(function(response){
                    console.log(response);
                    console.log(response.data.data.forecast);
                    that.weatherList = response.data.data.forecast;                   
                })
                .catch(function(err){})               
            },
            changeCity:function(city){
                this.city = city;
                this.searchWeather();// 调用方法(methods中定义的方法内部,可以通过this关键字调用其他方法)              
            }
        },
    })
}