/* 获取天气数据函数 */
function getWeather(cityCode){
    myAxios({
        url:'http://hmajax.itheima.net/api/weather',
        params:{
            city:cityCode
        }
    }).then(result=>{
        console.log(result.data)
        const resultStr=result.data
        const todayWeather=result.data.todayWeather
        // console.log(todayWeather)
        document.querySelector('.area').innerHTML=resultStr.area
        /* 日期信息渲染 */
        const dateStr=`
                <span class="dateShort">${resultStr.dateShort}</span>
                <span class="calendar">农历&nbsp;
                    <span class="dateLunar">${resultStr.dateLunar}</span>
                </span>
           `
        document.querySelector('.title').innerHTML=dateStr
        /* 天气信息渲染 */
        const weatherStr=`
            <div class="tem-box">
                <span class="temp">
                    <span class="temperature">${resultStr.temperature}</span>
                    <span>°</span>
                </span>
            </div>
            <div class="climate-box">
                <div class="air">
                    <span class="psPm25">${resultStr.psPm25}</span>
                    <span class="psPm25Level">${resultStr.psPm25Level}</span>
                </div>
                <ul class="weather-list">
                    <li>
                        <img src="${resultStr.weatherImg}" class="weatherImg" alt="">
                        <span class="weather">${resultStr.weather}</span>
                    </li>
                    <li class="windDirection">${resultStr.windDirection}</li>
                    <li class="windPower">${resultStr.windPower}</li>
                </ul>
            </div>
        `
        document.querySelector('.weather-box').innerHTML=weatherStr
        /* 今日天气情况渲染 */
        const todayStr=` <div class="range-box">
                <span>今天：</span>
                <span class="range">
                    <span class="weather">${todayWeather.weather}</span>
                    <span class="temNight">${todayWeather.temNight}</span>
                    <span>-</span>
                    <span class="temDay">${todayWeather.temDay}</span>
                    <span>℃</span>
                </span>
            </div>
            <ul class="sun-list">
                <li>
                    <span>紫外线</span>
                    <span class="ultraviolet">${todayWeather.ultraviolet}</span>
                </li>
                <li>
                    <span>湿度</span>
                    <span class="humidity">${todayWeather.humidity}</span>%
                </li>
                <li>
                    <span>日出</span>
                    <span class="sunriseTime">${todayWeather.sunriseTime}</span>
                </li>
                <li>
                    <span>日落</span>
                    <span class="sunsetTime">${todayWeather.sunsetTime}</span>
                </li>
            </ul>`
            document.querySelector('.today-weather').innerHTML=todayStr
            /* 7日内天气预报 */
            const dayForecast=resultStr.dayForecast
            const weekStr=dayForecast.map(item=>{
                return `<li class="item">
                    <div class="date-box">
                        <span class="dateFormat">${item.dateFormat}</span>
                        <span class="date">${item.date}</span>
                    </div>
                    <img src="${item.weatherImg}" alt="" class="weatherImg">
                    <span class="weather">${item.weather}</span>
                    <div class="temp">
                        <span class="temNight">${item.temNight}</span>-
                        <span class="temDay">${item.temDay}</span>
                        <span>℃</span>
                    </div>
                    <div class="wind">
                        <span class="windDirection">${item.windDirection}</span>
                        <span class="windPower">${item.windPower}</span>
                    </div>
                </li>`
            }).join('')
            document.querySelector('.week-wrap').innerHTML=weekStr
    })
    
}
getWeather('110100')
/* 搜索城市 */
document.querySelector('.search-city').addEventListener('input',(e)=>{
    const searchCity=e.target.value
    console.log(searchCity)
    myAxios({
        url:'http://hmajax.itheima.net/api/weather/city',
        params:{
            city:searchCity
        }
    }).then(result=>{
        console.log(result.data)
        const cityList=result.data
        const cityStr=cityList.map(item=>{
           return  `<li class="city-item" data-code=${item.code}>${item.name}</li>`
        }).join('')
        document.querySelector('.search-list').innerHTML=cityStr
    })
})
document.querySelector('.search-list').addEventListener('click',e=>{
    if (e.target.classList.contains('city-item')){
        const cityCode=e.target.dataset.code
        getWeather(cityCode)
        document.querySelector('.search-city').value=''
    }
})
