import {Base, $} from './pub/packages';
require('../css/about.scss');
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.css'
Base.showPage();
var main = {
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
        },
        //图片轮播
        initSwiper() {
            let certifySwiper = new Swiper('#certify .swiper-container', {
                watchSlidesProgress: true,
                slidesPerView: 'auto',
                centeredSlides: true,
                loop: true,
                loopedSlides: 12,
                autoplay: true,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                pagination: {
                    el: '.swiper-pagination',
                    //clickable :true,
                },
                on: {
                    progress: function(progress) {
                        for (let i = 0; i < this.slides.length; i++) {
                            var slide = this.slides.eq(i);
                            var slideProgress = this.slides[i].progress;
                            let modify = 1;
                            if (Math.abs(slideProgress) > 1) {
                                modify = (Math.abs(slideProgress) - 1) * 0.3 + 1;
                            }
                            let translate = slideProgress * modify * 220 + 'px';
                            let scale = 1 - Math.abs(slideProgress) / 5;
                            let zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
                            slide.transform('translateX(' + translate + ') scale(' + scale + ')');
                            slide.css('zIndex', zIndex);
                            slide.css('opacity', 1);
                            if (Math.abs(slideProgress) > 3) {
                                slide.css('opacity', 0);
                            }
                        }
                    },
                    setTransition: function(transition) {
                        for (var i = 0; i < this.slides.length; i++) {
                            var slide = this.slides.eq(i)
                            slide.transition(transition);
                        }
            
                    }
                }            
            })            
        }
    },
    bind() {},
    init() {
        this.fncs.initUserInfo();
        //渲染公共头部
        Base.initModules(['footer','header','goToTop','aboutNav'],this.data.userInfo,'about');
        //图片轮播
        this.fncs.initSwiper();
    }
};
main.init();