import DES3 from '../../../static/3DES.js';

//data配置
export function initData(_this) {
    return {
        isShowLoading : false,
        apiPath : {
            register : '/api/user/register',
            msgCode : '/api/message/sms_code',
            sendNum : '/api/message/image_code_frequency'
        },
        codeBtnStauts : false,
        codeBtnText : '获取验证码',
        mobile : '',
        code : '',
        isShowImgCode : false,
        //获取的子组件图形验证码
        imgCode : '',
        //注册来源
        sourceCode : _this.$route.params.sourceCode ? _this.$route.params.sourceCode : '',
    }
}

//登录函数
export function login(_this) {
    let regs = _this.Base.regs;
    if(_this.mobile.length < 1) {
        _this.$msg({ content : '请输入手机号' });
        return;
    } else if(!regs.mobile.test(_this.mobile)) {
        _this.$msg({ content : '请输入正确的手机号' });
        return;
    }
    if(_this.code.length < 1) {
        _this.$msg({ content : '请输入手机验证码' });
        return;
    } else if(!regs.msgCode.test(_this.code)) {
        _this.$msg({ content : '请输入正确的手机验证码' });
        return;
    }
    _this.isShowLoading = true;
    let data = {
        cellphone : _this.mobile,
        code : _this.code,        
    };
    let register = DES3.encrypt(_this.Base.desKey, JSON.stringify(data));
    _this.$ajax.post(_this.apiPath.register,_this.$qs.stringify({
        register : register,                   
        sourceCode : _this.sourceCode
    }),{
        headers: _this.Base.initAjaxHeader(0,{
            register : register
        })
    }).then(res=>{
        let result = res.data;
        if(result.status == 0) {
            _this.handlerSuccess(result);
            // _this.$msg({ content : '注册成功' });
            // setTimeout(_=>{
            //     _this.handlerSuccess(result);
            // },1000);
                                
        } else {
            _this.$msg({ content : result.msg });
        }
        _this.isShowLoading = false;
    });
}

//获取验证码
export function getCode(_this) {
    let regs = _this.Base.regs;
    if(_this.mobile.length < 1) {
        _this.$msg({ content : '请输入手机号' });
        return;
    } else if(!regs.mobile.test(_this.mobile)) {
        _this.$msg({ content : '请输入正确的手机号' });
        return;
    }
    let data = {
        type : '1',
        cellphone : _this.mobile,
        imgCode : _this.imgCode
    };
    //校验通过发送验证码
    _this.$ajax.post(_this.apiPath.msgCode,_this.$qs.stringify(data),{
        headers: _this.Base.initAjaxHeader(0,data)
    }).then(res=>{
        let result = res.data;
        let t = 60;
        if(result.status == 0) {  
            _this.$msg({ content : result.msg });
            _this.isShowImgCode = false;
            _this.codeBtnStauts = true;
            let st = setInterval(_=>{
                if(t > 1) {
                    _this.codeBtnText = `${--t}秒`;
                } else {
                    clearInterval(st);
                    _this.codeBtnText = '重新发送';
                    _this.codeBtnStauts = false;
                } 
            },1000);
        } else {
            _this.$msg({ content : result.msg });
        }
    });
}

//获取验证码发送次数
export function getSendNum(_this) {
    return new Promise((resolve,reject)=>{
        let regs = _this.Base.regs;
        if(_this.mobile.length < 1) {
            // _this.$msg({ content : '请输入手机号' });
            return reject('请输入手机号');
        } else if(!regs.mobile.test(_this.mobile)) {
            // _this.$msg({ content : '请输入正确的手机号' });
            return reject('请输入正确的手机号');
        }
        let data = {
            type : '1',
            cellphone : _this.mobile
        };
        _this.$ajax.post(_this.apiPath.sendNum,_this.$qs.stringify(data),{
            headers : _this.Base.initAjaxHeader(0,data)
        }).then(rs=>{
            let res = rs.data;
            if(res.status == 0) {
                resolve(res.result);
            }
        });
    });
}

// handlerSendNum