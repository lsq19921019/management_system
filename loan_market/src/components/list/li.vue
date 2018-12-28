<!--
    desc:列表项组件
-->
<template>
    <li>
        <div class="item_con" v-if="type==1" :class="flextype">
            <span class="key" :style="'min-width:'+minwidth">{{ name }}</span>
            <span class="val" :style="'color:'+rcolor">{{ val }}</span>            
        </div>
        <div class="item_con" v-if="type==2" :class="flextype">
            <span class="key" :style="'min-width:'+minwidth">{{ name }}</span>
            <input type="text" :maxlength="maxlen" :placeholder="placeholder" :class="placetype" :value="val" @input="$emit('input',$event.target.value)"/>         
        </div>
        <div class="item_con" v-if="type==3" :class="flextype">
            <span class="key" :style="'min-width:'+minwidth">{{ name }}</span>
            <span class="right val" :style="'color:'+rcolor">{{ val }}
                <img class="icon_img" src="../../assets/my_arrow.png" alt="">
            </span>
        </div>
        <div class="item_line"></div>
    </li>
</template>

<script>
import codeCom from '@/components/list/code';
export default {
    data() {
        return {
            
        }
    },
    components : {
        //组件
        codeCom
    },
    props:{
        name:'',    //左边名字
        val:'',     //右边值
        type:'',    //列表类型
        rcolor:'',   //右边名字颜色
        placeholder:'', //输入框提示
        minwidth:'', //最小宽度
        flextype:'',  //布局类型
        placetype:'',  //提示语位置
        iscode:'', //是否显示验证码按钮
        maxlen:'',
        codetype:'',
        codephone:'',       
    },
    created() {

    },
    methods:{
      
    }   
}
</script>

<style lang="scss" scoped>
    li{
        margin-left: .33rem; 
        .item_line{
            position: relative;
            &::before{
                content: '';
                position: absolute;
                width: 200%;
                height: 200%;
                border-bottom: 1px solid #e6e6e6;
                -webkit-transform-origin: 0 0;
                -moz-transform-origin: 0 0;
                -ms-transform-origin: 0 0;
                -o-transform-origin: 0 0;
                transform-origin: 0 0;
                -webkit-transform: scale(0.5, 0.5);
                -ms-transform: scale(0.5, 0.5);
                -o-transform: scale(0.5, 0.5);
                transform: scale(0.5, 0.5);
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
            }              
        }      
        .item_con{
            display: flex;
            justify-content: space-between;
            align-items: center;  
            padding: .35rem .34rem .34rem 0;
            .phone{
                text-align: right;
                .spl{
                    color: #ccc;
                }
                .phone1{
                    width: 20%;
                }
                .phone2{
                    width: 30%;
                }
                .phone3{
                    width: 35%;
                }
            }
            .key{
                font-size: .32rem;
                font-weight:500;
                color:rgba(62,71,93,1);
                line-height: 1;
                display: inline-block;
            }
            .val{
                font-size:.28rem;
                font-weight:500;
                color:rgba(62,71,93,1);
                line-height: 1;
                .icon_img{
                    width: .12rem;
                    height: .22rem;
                    margin-left: .17rem;
                }       
            }
            .right{
                display: flex;
                align-items: center;
                color: #3E475D;
            }
            input{
                font-size:.28rem;
                font-weight:500;
                color:#3E475D;
                text-align:right;
                line-height: 1.2;
            }
            .placetype{
                &::placeholder{text-align: left!important;};
            }
        }
        .flextype{
            justify-content: flex-start!important;
        }
    }
    input::-webkit-input-placeholder{
        color:#ccc;
    }
    input::-moz-placeholder{
        color:#ccc;
    }
    input:-moz-placeholder{
        color:#ccc;
    }
    input:-ms-input-placeholder{
        color:#ccc;
    }
</style>
