/**
 * Created by Administrator on 2018/9/5.
 */
$(function(){
    mui('.mui-scroll-wrapper').scroll({
        deceleration : 0.0005,
        indicators : false
    })
    mui('.mui-slider').slider({
        interval : 2000
    })

    /*»ñÈ¡¹Ø¼ü×Ö*/
    window.lt = {}

    lt.getSearchValue = function () {
        var params = {}
        var search = location.search
        if(search){
            search = search.replace('?','')
            var arr = search.split('&')
            arr.forEach(function (item, i) {
                var itemArr = item.split('=')
                params[itemArr[0]] = itemArr[1]
            })
        }
        return params
    }
})