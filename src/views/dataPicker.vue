<!-- 组件说明 -->
<template>
    <div class="data-picker">
        <!-- :value="now" @input="val => value=val" 就是 v-model 的语法糖 -->
        <dataPicker v-model="now"></dataPicker> 
    </div>
</template>

<script>
import dataPicker from '../components/dataPicker'
export default {
    components: {
        dataPicker
    },
    data () {
        return {
            now: new Date()
        };
    },
    computed: {

    },
    methods: {
        
    },
    created() {
    
    },
    mounted() {
        console.log(dataPicker);
    
    },
    beforeCreate() {}, //生命周期 - 创建之前
    beforeMount() {}, //生命周期 - 挂载之前
    beforeUpdate() {}, //生命周期 - 更新之前
    updated() {}, //生命周期 - 更新之后
    beforeDestroy() {}, //生命周期 - 销毁之前
    destroyed() {}, //生命周期 - 销毁完成
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
    }
</script>

<style lang='scss' scoped>
</style>