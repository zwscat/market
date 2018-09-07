/**
 * Created by Administrator on 2018/9/6.
 */
$(function(){
    getFirstCeteData(function(data){
        /*一级分类默认渲染*/
        $('.cate_left ul').html(template('firstTemplate',data))

        var id = $('.cate_left ul li:first-child').find('a').data('id')
        render(id)
    })

    $('.cate_left').on('tap', 'li', function () {
        if($(this).hasClass('active')) return false
        $(this).addClass('active').siblings().removeClass('active')
        var id = $(this).find('a').data('id')
        render(id)
    })
})
/*一级*/
var getFirstCeteData = function (callback) {
    $.ajax({
        type : 'get',
        url : '/category/queryTopCategory',
        data : {},
        dataType : 'json',
        success : function(data){
            callback && callback(data)
        }
    })
}
/*二级*/
var getSecondCateData = function (params,callback) {
    $.ajax({
        url : '/category/querySecondCategory',
        type : 'get',
        data : params,
        dataType : 'json',
        success : function(data){
            callback && callback(data)
        }
    })
}

/*渲染*/
var render = function (id) {
    getSecondCateData({
        id : id
    },function(data){
        $('.cate_right ul').html(template('secondTemplate',data))
    })
}