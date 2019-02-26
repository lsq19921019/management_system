/**
 *  装饰者模式
 *  原组件抽象类
 */
export default class Component {
    constructor() {
        console.log('Component Class created');
    }

    operation() {
        throw new Error("This method must be overwritten!");
    }
}