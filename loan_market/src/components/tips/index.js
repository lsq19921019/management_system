import Vue from 'vue';
import Message from './main.vue';

//合并对象函数，这个方法是会改变，第一个参数的值的
function merge(target) {
    for (let i = 1, j = arguments.length; i < j; i++) {
        let source = arguments[i] || {};
        for (let prop in source) {
            if (source.hasOwnProperty(prop)) {
                let value = source[prop];
                if (value !== undefined) {
                    target[prop] = value;
                }
            }
        }
    }
    return target;
};

let instance;
//extend 是构造一个组件的语法器.传入参数，返回一个组件
let MessageConstructor = Vue.extend(Message);

let initInstance = ()=>{
    //实例化ConfirmConstructor组件
    instance = new MessageConstructor({
        el : document.createElement('div')
    });
    //添加到boby
    document.body.appendChild(instance.$el);
    
}

let Msg = (options={})=>{
    if(document.getElementById('JS_tipsWrap')) return;
    //初始化
    initInstance();
    // 将单个 confirm instance 的配置合并到默认值（instance.$data，就是main.vue里面的data）中
    merge(instance.$data, options);
    //返回promise
    return new Promise((resolve,reject)=>{        
        instance.show = true;
        let success = instance.success;
        let cancel = instance.cancel;
        setTimeout(_=>{
            instance.show = false
        },options.time || 1500);
        instance.success = _=>{
            //先执行instance.success main.vue里的success函数
            success();
            resolve('ok');
        }
    });
};
// export default Msg;
const install = _=>{
    //注册全局组件
    Vue.component(Msg.name,Msg);
    //添加全局API
    Vue.prototype.$msg = Msg;
}
export default install;