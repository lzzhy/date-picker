从0开始构建日历组件

首先，准备工作，建项目各种就不说了，都是些常规操作。。。。（不懂可以看另外2个组件有详细注释）


需求分析：
1. 用户需要用 data-picker 组件，那么在 views 下的 dataPicker.vue 中 就会 <dataPicker></dataPicker>，那就要引入，传值各种，然后慢慢地在 views 下的 dataPicker.vue 和 components 下的dataPicker.vue 中去慢慢的添加。组件封装其实本质就是父子传值。



课外话题：
1. 由于是时间组件，那必然会需要转化时间的函数，可以抽出来放在 util.js 中：
const xxxx = (date) => {
    // 逻辑
    return 一个东西
}
export {
    xxxx
}