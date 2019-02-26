<template>
    <div class="consult">
        <div class="consult-item">
            <el-row>
                <el-col :span="24">
                    <div class="grid-content bg-purple-dark">
                        <b class="consult-item-b">{{wechatItems.wechatName}}</b>
                        <span class="consult-item-span">微信号：{{wechatItems.wechatNo}}</span>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="consult-list" v-for="(item,index) in contactItems" :key="index">
            <div class="consult-list-th">
                <div class="fl">{{index+1}}.</div>
                <el-row :gutter="20">
                    <el-col :span="4">
                        <div class="grid-content bg-purple">
                            <b>{{item.level | formateVal('a')}}</b>
                        </div>
                    </el-col>
                    <el-col :span="10">
                        <div class="grid-content bg-purple">
                            <label>接洽时间：</label>
                            <span>{{item.createTime}}</span>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <label>收集人：</label>
                            <span>{{item.createUser}}</span>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="consult-list-con">
                <div v-if="item.level == 2">
                    <el-row :gutter="20">
                        <el-col :span="6">
                            <div class="grid-content bg-purple">
                                <label>是否接互金：</label>
                                <span>{{item.p2pEnable | formateVal('b')}}</span>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <label>原因/备注：</label>
                                <span>{{item.p2pEnableRemark}}</span>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple">
                                <label>粉丝数：</label>
                                <span>{{item.fansNum}}</span>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="6">
                            <div class="grid-content bg-purple">
                                <label>投放形式：</label>
                                <span>{{item.publishType | formateVal('c')}}</span>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple">
                                <label>广告撰写：</label>
                                <span>{{item.advertiseWriteMan | formateVal('e')}}</span>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <label>号主撰写稿费：</label>
                                <span>{{item.advertiseWritePrice}}</span>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="6">
                            <div class="grid-content bg-purple">报价:</div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple">头条({{item.quoteHeadlinePrice}})</div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple">次条({{item.quoteSecondPrice}})</div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple">其他({{item.quoteOtherPrice}})</div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="6">
                            <div class="grid-content bg-purple">长期合作价：</div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple">头条({{item.publishHeadlinePrice}})</div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple">次条({{item.publishSecondPrice}})</div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple">其他({{item.publishOtherPrice}})</div>
                        </el-col>
                    </el-row>
                </div>
                <div v-else>
                    <el-row :gutter="20">
                        <el-col :span="6">
                            <div class="grid-content bg-purple">
                                <label>联系人：</label>
                                <span>{{item.contactPerson}} ({{item.sex | formateVal('d')}})</span>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple">
                                <label>QQ：</label>
                                <span>{{item.contactQq}}</span>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple">
                                <label>微信：</label>
                                <span>{{item.contactWechat}}</span>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple">
                                <label>电话：</label>
                                <span>{{item.contactMobile}}</span>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="6">
                            <div class="grid-content bg-purple">
                                <label>是否接广告：</label>
                                <span>{{item.advertiseEnable | formateVal('b')}}</span>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <label>可接广告类型：</label>
                                <span>{{item.advertiseType}}</span>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple">
                                <label>粉丝数：</label>
                                <span>{{item.fansNum}}</span>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="6">
                            <div class="grid-content bg-purple">报价：</div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple">头条({{item.quoteHeadlinePrice}})</div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple">次条({{item.quoteSecondPrice}})</div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple">其他({{item.quoteOtherPrice}})</div>
                        </el-col>
                    </el-row>
    
                </div>
                <el-row>
                    <el-col :span="24">
                        <div class="grid-content bg-purple-dark">
                            <label class="fl">沟通记录：</label>
                            <p>{{item.contactRecord}}</p>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <el-row :gutter="20" class="pgtp30">
			<el-col :span="24">
				<div class="grid-content bg-purple">
					<el-pagination
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
						:current-page="currentPage"
						:page-sizes="[10, 20, 30, 40]"
						:page-size="pageSize"
						layout="total, sizes, prev, pager, next, jumper"
						:total="total">
					</el-pagination>
				</div>
			</el-col>
		</el-row>
    </div>
</template>
<style lang="scss" scoped>
.consult {
    &-item {
        margin: 0 20px;
        padding: 16px 0;
        border-bottom: 1px dashed #eee;
        &-b {
            margin-right: 20px;
            font-size: 18px;
        }
        &-span {
            font-size: 16px;
        }
    }
    &-list {
        margin: 10px 20px;
        font-size: 14px;
        line-height: 40px;
        color: #2d2f33;
        &-con {
            padding: 0 5px 10px;
            border: 1px solid #eee;
        }
    }
    .fl {
        float: left;
    }
}
</style>
<script>
import $ from 'jquery'
import {baseUrl} from '@/config/env';
import { consultWith } from '@/service/getData';
export default {
    data() {
        return {
            api: baseUrl +'/contactmanage/queryHistory',
            total: 0,
            currentPage: 1,
            pageSize: 10,
            wechatItems: {
                wechatId: '',
                wechatName: '',
                wechatNo: '',
            },
            contactItems: []
        }
    },
    filters: {
        formateVal(val, sta) {
            if (sta == 'a') { // level 接洽阶段
                if (val == 1) {
                    return '第一轮接洽'
                } else if (val == 2) {
                    return '第二轮接洽'
                }
            } else if (sta == 'b') { //p2pEnable  	是否可投放互金
                if (val == 0) {
                    return '是'
                } else if (val == 1) {
                    return '否'
                }
            } else if (sta == 'c') {//publishType 	投放形式
                if (val == 1) {
                    return '软广'
                } else if (val == 2) {
                    return '硬广'
                } else if (val == 3) {
                    return '贴图'
                } else if (val == 4) {
                    return '其他'
                } else {
                    return '不限'
                }
            } else if (sta == 'd') {
                if (val == 1) {
                    return '男'
                } else if (val == 2) {
                    return '女'
                }
            } else if (sta == 'e') { //advertiseWriteMan 
                if (val == 1) {
                    return '号主'
                } else if (val == 2) {
                    return '投放人'
                } else {
                    return '不限'
                }
            }
        }
    },
    mounted() {
        this.initData();
    },
    methods: {
        initData(){
            this.getContactInf();
        },
        async getContactInf(){
            let query = this.$route.query;
            this.wechatItems.wechatId = query.wechatId,
            this.wechatItems.wechatName = query.wechatName,
            this.wechatItems.wechatNo = query.wechatNo;
            let obj = {
                wechatId: this.wechatItems.wechatId,
                pageIndex: this.currentPage,
                pageSize: this.pageSize
            }
            let consultList = await consultWith(obj);
            this.contactItems = consultList.data.list;
            this.total = consultList.data.total;
        },
        handleSizeChange(val) { //pageSize 改变时会触发 
            this.pageSize = val;
            this.getContactInf();
        },
        handleCurrentChange(val) { //currentPage 改变时会触发
            this.currentPage = val;
            this.getContactInf();
        }
    }
}
</script>

