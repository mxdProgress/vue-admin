<template>
    <div>
        <el-select v-model="data.keyWords" placeholder="请选择" size="small">
            <el-option
            v-for="item in data.initOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
    </div>
</template>
<script>
import {ref,reactive, onMounted } from "@vue/composition-api"
export default {
    name:'',
    props:{
        config:{
            type:Object,
            default:()=>{}
        }
    },
    setup(props,{root}){
        const data = reactive({
            keyWords:'',
            initOptions:[],
            item:[
                {value:"name", label:'姓名'},
                {value:'iphone', label:'手机号'},
                {value:'email', label:'邮箱'}
            ]
        })

        /**
         * 初始化选项
        */
       const initOptions = ()=>{
           let initData=props.config.init
           let optionsArr = []

           if(initData.length===0){
               console.log('config传过来的值是空的！')
               return false
           }
           initData.forEach(item=>{
                let arr = data.item.filter(i => i.value == item)
                if(arr.length>0){
                    optionsArr.push(arr[0])
                }
           })
           if(optionsArr.length===0){
               console.log('匹配数据为空!')
               return false
           }
           //赋值
           data.initOptions = optionsArr
           //取第一个值
           data.keyWords = data.initOptions[0].value
       }

        onMounted(()=>{
            initOptions()
        })

        return{
            //数组数据
            data,
            //方法
            initOptions
        }
    }
}
</script>
<style lang="scss" scoped>

</style>