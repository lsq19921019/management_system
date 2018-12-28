<!--
    create:luofeifie 11/5
    desc:还款日历
-->
<template>
    <div class="page" ref="page_el">
        <loading v-if="isShowLoading" :text="'加载中...'"></loading>   
        <div class="page_title" ref="page_title">
            <p>{{ this.$route.meta.title }}</p>
            <a href="javascript:;" onclick="window.history.back();" class="goback"></a>
        </div>
        <div class="caleBox">
            <div class="cale_title">
                <span class="left_btn">&lt;</span>
                <span class="current">{{ cYear+'-'+cMonth }}</span>
                <span class="right_btn">&gt;</span>
            </div>
            <div class="caleCon">
                <div class="weekTitle">
                    <div class="week_item" v-for="(item,index) in weekArr" :key="index">{{ item }}</div>
                </div>
                <div class="day">
                    <swiper :options="swiperOption">
                        <swiper-slide>
                            <div class="dayItem" v-for="(item,index) in daylist" :key="index">
                                <div v-if="item.date==''" class="noday"></div>
                                <div v-else-if="item.today" class="today">{{ item.date }}</div>
                                <div v-else-if="item.date==12||item.date==16||item.date==24" class="today-blue">{{ item.date }}</div>
                                <div v-else class="dateline">{{ item.date }}</div>
                            </div>
                        </swiper-slide>
                    </swiper>
                </div>
            </div>
            <div class="dayInfo">
                <div class="info_item">
                    <span class="s1"></span>
                    <span class="s2">当天前还款日</span>
                </div>
                <div class="info_item">
                    <span class="s1"></span>
                    <span class="s2">今天</span>
                </div>
                <div class="info_item">
                    <span class="s1"></span>
                    <span class="s2">当天后还款日</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import 'swiper/dist/css/swiper.css';
    import { swiper, swiperSlide } from 'vue-awesome-swiper';
    export default {
        name : 'AuthBase',
        data() {
            return {
                isShowLoading : true,
                weekArr: ['日', '一', '二', '三', '四', '五', '六'],
                daylist:[],
                thisMonthCalendar:'',
                lastMonthCalendar:'',
                current:'',
                cYear:'',
                cMonth:'',
                dayList:[],
                //swiper配置
                swiperOption: {
                    autoplay: false,
                    loop: true,
                    observer:true,//修改swiper自己或子元素时，自动初始化swiper 
                    observeParents:false,
                    
                    on: {//修改swiper的父元素时，自动初始化swiper
                        slidePrevTransitionEnd:() => {
                            // dosomething;
                            if(this.cMonth===1){
                                this.cYear--;
                                this.cMonth=12;
                            }else{
                                this.cMonth--;
                            }
                            this.draw_calendar(this.cYear,this.cMonth);
                        },
                        slideNextTransitionEnd:() => {
                            if(!this.swiperStart){
                                return;
                            }
                            // dosomething;
                            if(this.cMonth===12){
                                this.cYear++;
                                this.cMonth=1;
                            }else{
                                this.cMonth++;
                            }
                            this.draw_calendar(this.cYear,this.cMonth);
                            // _this.draw_calendar('2018-11');
                        }
                    },
                    pagination: {
                        
                    },
                },                             
            }
        },
        components : {
            swiper,swiperSlide
        },
        created() {
            //页面渲染前
            let d = new Date();
            let _this = this;
            _this.cYear = d.getFullYear();
            _this.cMonth = d.getMonth()+1;
            _this.cDay = d.getDate();
            _this.draw_calendar(_this.cYear,_this.cMonth,_this.cDay);
        },
        mounted() {
            let _this = this;
            //页面加载完毕
            setTimeout(()=>{
                _this.swiperStart = 1;
            },500);

        },
        methods:{
            //获取月份日期
            this_month(){
                let _this = this;
                let date = new Date;
                _this.current = date.getFullYear()+'年'+date.getMonth()+'月'                
                let month = date.getMonth() + 1;
                month = (month < 10 ? "0" + month : month);
                let year = date.getFullYear();
                let tomonth = year + '-' + month; 
                return tomonth;

            },
            draw_calendar(y,m){
                let _this = this;
                _this.isShowLoading = true;
                let list = [];
                // let arr = now.split('-');
                let year = y;  //年份
                let month = m; //月份
                let d = new Date(year,month-1,1,1,1,1); //初始化
                let firstDay = d.getDay();  //星期几
                let allDate = new Date(d.getFullYear(),(d.getMonth()+1),0).getDate();   //总天数
                let j = 1;

                //  前面空了几天
                for(let i=0;i<firstDay;i++){
                    list.push({
                        ymd:'',
                        date:'',
                        today:false,
                    })
                }

                for(let i=0;i<allDate;i++){
                    let ymd = yyy + '-' + mmm + '-' + j;
                    let today = '';
                    let status = '';
                    if( yyy && mmm && ddd == j){
                        today = true;
                    }else{
                        today = false;
                    }

                    list.push({
                        ymd:ymd,
                        date:j,
                        today:today,
                        status:status
                    })
                    j++;
                }

                _this.daylist = list;
                console.log(_this.daylist)
                _this.isShowLoading = false;
            },
            addPreZero(num){
                if(num<10){
                    return '0'+num;
                }else{
                    return num;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .swiper-slide{
        padding-bottom: .2rem;
    }
    .day{
        text-align: left;
        .dayItem{
            display: inline-block;
            width: 14.286%;          
            line-height: 1;
            font-size:.24rem;
            color:rgba(62,71,93,1);
            .today{
                text-align: center;
                color:rgba(255,255,255,1);
                background:rgba(244,204,100,1);
                border-radius:50%;
                width: .48rem;
                height: .48rem;
                line-height: .48rem;
                margin: 0 auto;
            }
            .today-blue{
                text-align: center;
                color:rgba(255,255,255,1);
                background:#527BEC;
                border-radius:50%;
                width: .48rem;
                height: .48rem;
                line-height: .48rem;
                margin: 0 auto;                
            }            
            .dateline{
                text-align: center;
                width: .48rem;
                height: .48rem;
                line-height: .48rem;
                margin: 0 auto;
                padding: .2rem 0;
            }
        }
    }
    .page{
        margin-top:1.4rem;
        .base_info{
            background: #fff;
        }
        .caleBox{
            background: #fff;
            text-align: center;
            .cale_title{
                font-size: .32rem;
                color: #A8AAB2;
                padding: .29rem 0;
                line-height: 1;
                border-bottom: 1px solid #E6E6E6;
                .current{
                    padding: 0 .4rem;
                }             
            }
            .caleCon{
                .weekTitle{
                    display: flex;
                    padding: .2rem 0;
                    .week_item{
                        font-size:.24rem;
                        color:rgba(62,71,93,1);
                        line-height:1;
                        width: 14.286%;
                        float: left;
                        &:first-child{
                            color: #A8AAB2;
                        };
                        &:last-child{
                            color: #A8AAB2;
                        }
                    }                
                }
            }
            .dayInfo{
                display: flex;
                justify-content: center;
                border-top: 1px solid #E6E6E6;
                padding: .22rem 0;
                .info_item{
                    &:nth-child(1){
                        .s1{
                           display: inline-block;
                           width: .2rem;
                           height: .2rem;
                           border-radius: 50%;
                           background-color:#EBEBEB;
                        }
                    }
                    &:nth-child(2){
                        .s1{
                           display: inline-block;
                           width: .2rem;
                           height: .2rem;
                           border-radius: 50%;
                           background-color:#F4CC64;
                           margin-left: .6rem;
                        }
                    }
                    &:nth-child(3){
                        .s1{
                           display: inline-block;
                           width: .2rem;
                           height: .2rem;
                           border-radius: 50%;
                           background-color:#527BEC;
                           margin-left: .6rem;
                        }
                    }                                         
                }
                .s2{
                    font-size:.24rem;
                    color:rgba(168,170,178,1);
                    line-height:1;
                    margin-left: .16rem;                   
                }
            }
        }
    }
</style>