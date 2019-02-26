import {Base, $} from './pub/packages';
require('../css/about.scss');
require('../css/pages/activity.scss');
require('../js/pub/myPictureTurn');
require('../js/pub/mySimpleTurn');
Base.showPage();
let main = {
    data : {
        userInfo : {
            nickName : null
        }
    },
    doms : {},
    fncs : {
        //重置userInfo
        initUserInfo() {
            if(sessionStorage.getItem('userInfo')) {
                main.data.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
            }
            //myPictureTurn
            //$('#unit').myPictureTurn()
        },
        scroll:function(){
            var city_top = $('#city_top').offset().top;
            $('.city_li').click(function () {
                $('html,body').animate({scrollTop:city_top},500);
            })
        },
        onClick:function(){
            $('#unit').mySimpleTurn({
                speed:500,
                delay:2000,
                many:4,
                cur:0,
                autoPlay:false
            });
            $("#unit dl dd").click(function(){
                $(this).addClass('on').siblings().removeClass('on');
                var thisIndex=$(this).index();
                var cur=0;
                switch (thisIndex)
                {
                    case 0:
                        cur=4;
                        break;
                    case 1:
                        cur=11;
                        break;
                    case 2:
                        cur=14;
                        break;
                    case 3:
                        cur=15;
                        break;
                }
                window.GoToPlay(cur);
            });
            $("#1F").click(function(){
                $('html,body').animate({scrollTop:$('.1F').offset().top}, 800);
                $('.navigation').find('ul li').removeClass('active');
                $("#1F").addClass('active');
            });
            $("#2F").click(function(){
                $('html,body').animate({scrollTop:$('.2F').offset().top}, 800);
                $('.navigation').find('ul li').removeClass('active');
                $("#2F").addClass('active');
            });
            $("#3F").click(function(){
                $('html,body').animate({scrollTop:$('.3F').offset().top}, 800);
                $('.navigation').find('ul li').removeClass('active');
                $("#3F").addClass('active');
            })
            $("#4F").click(function(){
                $('html,body').animate({scrollTop:$('.4F').offset().top}, 800);
                $('.navigation').find('ul li').removeClass('active');
                $("#4F").addClass('active');
            })                        
        },
    },
    bind() {},
    init() {
        this.fncs.onClick();
        this.fncs.initUserInfo();
        //渲染公共头部
        Base.initModules(['footer','header'],this.data.userInfo);
    }
};
main.init();