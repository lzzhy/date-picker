<!-- 组件说明 -->
<template>
    <!-- 因为在点击input后，class="pannel"就出现了，但是里面的东西操作不到，所以需要自定义指令 v-click-outside -->
    <div class="data-picker" v-click-outside>
        <input type="text" :value="formatDate">
        <div class="pannel" v-if="isVisible">
            <div class="pannel-nav">
                <span>&lt;</span>
                <span @click="preMonth">&lt;&lt;</span>
                <span>{{time.year}}年</span>
                <span>{{time.month+1}}月</span>
                <span @click="nextMonth">&gt;&gt;</span>
                <span>&gt;</span>
            </div>
            <div class="pannel-content">
                <div class="days">
                    <!-- 直接列出一个6*7列的列表 -->
                    <span v-for="j in 7" :key="`_`+j" class="cell cell-days">
                        {{weekDays[j-1]}}
                    </span>
                    <div v-for="i in 6" :key="i">
                        <!-- 判断是不是当月  不是当月就变灰-->
                        <span class="cell" v-for="j in 7" :key="j" @click="chooseDate(visibleDays[(i-1)*7+(j-1)])" :class="[{notCurrentMonth: !isCurrentMonth(visibleDays[(i-1)*7+(j-1)])},{today: isToday(visibleDays[(i-1)*7+(j-1)])},{select: isSelect(visibleDays[(i-1)*7+(j-1)])}]">
                            {{visibleDays[(i-1)*7+(j-1)].getDate()}}
                        </span>
                    </div>
                </div>
            </div>
            <div class="pannel-footer">
                今天
            </div>
        </div>
    </div>
</template>

<script>
// import { getYearMonthDay } from '../../util'
import * as utils from '../../util' // 和上面注释那行一个意思，只是这样写是把util里的方法都导出，上面那张需要把方法一个一个列出来
export default {
    // 自定义指令
    directives: {
        clickOutside: {  // 指令的生命周期
            bind(el,bindings,vnode) {
                console.log(8888);
                // 把事件绑定给document，看一下点击的是否是当前的内部元素
                let handler = (e) => {
                    if(el.contains(e.target)) {
                        // 判断一下当前面板已经显示出来了
                        if(!vnode.context.isVisible) {
                            vnode.context.focus();
                            console.log('包含');
                        }
                    } else {
                        if(vnode.context.isVisible){
                            vnode.context.blur();
                            console.log('不包含');
                        }
                    }
                } 
                el.handler = handler;
                document.addEventListener('click',handler)
            },
            unbind(el) {
                console.log(3333);
                document.removeEventListener('click',el.handler)
            }
        }   
    },
    props: {
        value: {
            type: Date,
            default: () => new Date() // 因为返回的默认值必须是一个函数
        }
    },
    components: {

    },
    data () {
        let {year,month} = utils.getYearMonthDay(this.value)
        return {
            isVisible: false, // 变量使用来控制日历面板是否可见
            weekDays: ['日','一','二','三','四','五','六'],
            time: {year,month} // 日历面板上的那个年月
        };
    },
    computed: {
        // 时间格式
        formatDate() { 
            // 在 getYearMonthDay 里面获取到 getFullYear,getMonth,getDate
            let {year,month,day} = utils.getYearMonthDay(this.value);
            return `${year}-${month + 1}-${day}`
        },
        visibleDays() {
            // 先获取当前是周几

            // 获取当前年月份
            let {year,month} = utils.getYearMonthDay(utils.getDate(this.time.year,this.time.month,1))
            // 获取当前月份的第一天
            let currentFirstDay = utils.getDate(year,month,1)
            console.log(currentFirstDay);
            // 先生成一个当前 2019 5 18    2019 5 1
            // 获取当前是周几 把天数往前移动几天
            let week = currentFirstDay.getDay()
            console.log(week);
            // 当前开始天数 往前移了24天
            let startDay = currentFirstDay - week * 60 * 60 * 1000 * 24
            // 循环42天 因为日历7天*6行
            let arr = []
            for(let i = 0; i < 42; i++) {
                arr.push(new Date(startDay + i * 60 * 60 * 1000 * 24))
            }
            return arr
        }
    },
    methods: {
        focus() {
            this.isVisible = true
        },
        blur() {
            this.isVisible = false
        },
        isCurrentMonth(date) {
            // 判断是否是当月 this.value
            // 现在知道当前用户传人的值 2018.5.18
            let {year,month} = utils.getYearMonthDay(utils.getDate(this.time.year,this.time.month,1))
            let {year:y,month:m} = utils.getYearMonthDay(date)
            return year===y && month === m
        },
        // 判断是否是当天
        isToday(date) {
            let {year,month,day} = utils.getYearMonthDay(date)
            let {year:y,month:m,day:d} = utils.getYearMonthDay(this.value)
            return year===y && month === m && day === d
        },
        isSelect(date) {
            // 获取当前的年月日
            let {year,month,day} = utils.getYearMonthDay(this.value)
            let {year:y,month:m,day:d} = utils.getYearMonthDay(date)
            return year===y && month === m && day === d
        },
        // 选择日期
        chooseDate(date){
            this.time = utils.getYearMonthDay(date)
            this.$emit('input',date)
            this.blur()  // 关闭弹层
        },
        preMonth() {
            // 获取当前年月的日期
            let d = utils.getDate(this.time.year,this.time.month,1)
            d.setMonth(d.getMonth()-1)
            this.time = utils.getYearMonthDay(d)
        },
        nextMonth() {
            // 获取当前年月的日期
            let d = utils.getDate(this.time.year,this.time.month,1)
            d.setMonth(d.getMonth()+1)
            this.time = utils.getYearMonthDay(d)
        }
    },
    created() {
    },
    mounted() {
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
    .pannel {
        position: absolute;
        background: #fff;
        box-shadow:  2px 2px 2px pink,-2px -2px 2px pink;
    }
    .pannel-nav {
        height: 30px;
        display: flex;
        justify-content: space-around;
        span {
            cursor: pointer;
            user-select: none;
        }
    }
    .pannel-content {
        .cell {
            width: 32px;
            height: 32px;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            &:hover {
                border: 1px solid pink;
                box-sizing: border-box;;
            }
        }
        .cell-days {
            &:hover {
                border: 1px solid pink;
            }
        }
    }
    .pannel-footer {
        height: 30px;
        text-align: center;
    }
    .notCurrentMonth {
        color: gray;
    }
    .today {
        background: red;
        border-radius: 50%;
    }
    .select {
        border: 1px solid pink;
    }
</style>