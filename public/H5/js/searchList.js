/**
 * Created by Administrator on 2018/9/7.
 */
$(function(){
    mui('.mui-scroll-wrapper').scroll({
        deceleration : 0.0005,
        indicators : false
    })

    /*获取关键字*/
    var parmes = lt.getSearchValue()
    var value = $('.lt_search input').val(parmes.key || '')

    /*页面初始化的时候默认刷新，不需要提前渲染*/
    /*getSearchData({
        proName : parmes.key,
        page : 1,
        pagesize : 4
    },function(data){
        $('.lt_product').html(template('firstTemplate', data))
    })*/

    /*用户点击搜索时，根据新的关键字搜索商品，重置排序列表*/
    $('.lt_search a').on('tap', function() {
        var key = $.trim(value.val())
        if(!key){
            mui.toast('请输入关键字')
            return false
        }

        getSearchData({
            proName : key,
            page : 1,
            pagesize : 4
        },function(data){
            $('.lt_product').html(template('firstTemplate', data))
        })
    })

    /*用户点击排序的时候，根据排序的选项去进行（默认是降序，再次点击是升序）*/
    $('.lt_order a').on('tap', function () {
        var span = $(this).find('span')

        if(! $(this).hasClass('active')){
            $(this).addClass('active').siblings().removeClass('active')
                .find('span').removeClass('fa-angle-up').addClass('fa-angle-down')
        }else {
            if(span.hasClass('fa-angle-down')){
                span.removeClass('fa-angle-down').addClass('fa-angle-up')
            }else{
                span.removeClass('fa-angle-up').addClass('fa-angle-down')
            }
        }

        /*获取当前点击的功能参数， 1升序 2降序*/
        var order = $(this).data('order')
        var orderVal = span.hasClass('fa-angle-up') ? 1 : 2

        var key = $.trim(value.val())
        if(!key){
            mui.toast('请输入关键字')
            return false
        }

        var parmes = {
            proName : key,
            page : 1,
            pagesize : 4

        }
        parmes[order] = orderVal
        getSearchData(parmes,function(data){
            $('.lt_product').html(template('firstTemplate', data))
        })
    })

    /*下拉刷新*/
    mui.init({
        pullRefresh : {
            container : ".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down : {
                /*自动加载*/
                auto : true,
                /*style : 'circle',//必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
                color : '#2BD009', //可选，默认“#2BD009” 下拉刷新控件颜色
                height : '50px',//可选,默认50px.下拉刷新控件的高度,
                range : '100px', //可选 默认100px,控件可下拉拖拽的范围
                offset : '0px', //可选 默认0px,下拉刷新控件的起始位置
                auto : true,//可选,默认false.首次加载自动上拉刷新一次*/
                callback : function () {
                    var that = this
                    var key = $.trim(value.val())
                    if(!key){
                        mui.toast('请输入关键字')
                        return false
                    }

                    /*重置排序功能*/
                    $('.lt_order a').removeClass('active').find('span').removeClass('fa-angle-up').addClass('fa-angle-down')

                    getSearchData({
                        proName : key,
                        page : 1,
                        pagesize : 4
                    },function (data) {
                        setTimeout(function () {
                            $('.lt_product').html(template('firstTemplate', data))
                            /*停止下拉刷新*/
                            that.endPulldownToRefresh()
                            /*上拉加载重置*/
                            that.refresh(true)
                        },1000)
                    })
                }
            },
            /*上拉*/
            up : {
                contentnomore : '没有更多数据了',
                callback : function () {

                    window.page ++

                    var that = this
                    var key = $.trim(value.val())
                    if(!key){
                        mui.toast('请输入关键字')
                        return false
                    }

                    /*获取当前点击的功能参数， 1升序 2降序*/
                    var order = $('.lt_order a.active').data('order')
                    var orderVal = $('.lt_order a.active').find('span').hasClass('fa-angle-up') ? 1 : 2

                    var parmes = {
                        proName : key,
                        page : window.page,
                        pagesize : 4

                    }
                    parmes[order] = orderVal

                    getSearchData(parmes,function (data) {
                        setTimeout(function () {
                            $('.lt_product').append(template('firstTemplate', data))
                            if(data.data.length){
                                /*停止下拉刷新*/
                                that.endPullupToRefresh()
                                /*上拉加载重置*/
                            }else {
                                that.endPullupToRefresh(true)
                            }

                        },2000)
                    })
                }
            }
        }
    })

})

function getSearchData (parmes, callback) {
    $.ajax({
        url : '/product/queryProduct',
        type : 'get',
        data : parmes,
        datatype : 'json',
        success : function (data) {
            window.page = data.page
            callback && callback(data)
        }
    })
}
