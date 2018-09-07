/**
 * Created by Administrator on 2018/9/6.
 */
$(function () {
    var historyJson = localStorage.getItem('history') || '[]'
    var historyArr = JSON.parse(historyJson)

    render(historyArr)
    $('.lt_search a').on('tap',function () {
        var key = $.trim($('.lt_search input').val())
        console.log(key);

        if(!key){
            /*mui消息提示*/
            mui.toast('请输入关键字')
        }

        location.href = 'searchList.html?key=' + key

        historyArr.push(key)
        localStorage.setItem('history',JSON.stringify(historyArr))
        render(historyArr)
        $('.lt_search input').val('')
    })

    $('.lt_history').on('tap','span',function () {
        var index = $(this).data('id')
        historyArr.splice(index , 1)
        localStorage.setItem('history', JSON.stringify(historyArr))
        render(historyArr)
    })

})

var render = function (historyArr) {
    var html = ''
    historyArr.forEach(function (item, i) {
        html = '<p>'+item+'<span class="fa fa-close" data-id="'+i+'"></span></p>'
    })

    html = html || '<p style="text-align: center">没有搜索记录</p>'

    $('.lt_history section').html(html)

}