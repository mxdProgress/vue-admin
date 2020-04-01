<template>
    <div>
        <el-table :data="data.tableData" border style="width: 100%">
            <!--全选-->
            <el-table-column v-if="data.configTable.selection" type="selection" width="40"></el-table-column>

            
            <template v-for="item in data.configTable.tHead">
                <!--v-slot-->
                <el-table-column :width="item.width" :key="item.field" :prop="item.field" :label="item.label" v-if="item.columnType=='slot'">
                    <template slot-scope="scope">
                        <slot :name="item.slotsName" :data="scope.row"></slot> 
                    </template>
                </el-table-column>
                <!--Tbale渲染头部数据-->
                <el-table-column :width="item.width" :key="item.field" :prop="item.field" :label="item.label"  v-else></el-table-column>
            </template >
            
        </el-table>
    </div>
</template>
<script>
import {ref,reactive, onMounted, onBeforeMount } from "@vue/composition-api"
export default {
    name:'tableVue',
    props:{
        config:Object,
        default:()=>{}
    },
    setup(props, { root } ){
        const data = reactive({
            tableData: [{
                email: '2016-05-02',
                name: '张三',
                phone:'18251422552',
                address: '上海市普陀区金沙江路 1518 弄',
                role:'查勘员'
            }, {
                email: '2016-05-02',
                name: '李四',
                phone:'18251422552',
                address: '上海市普陀区金沙江路 1518 弄',
                role:'协赔员'
            }, {
                email: '2016-05-02',
                name: '曹八',
                phone:'18251422552',
                address: '上海市普陀区金沙江路 1518 弄',
                role:'管理员'
            }, {
                email: '2016-05-02',
                name: '王柳',
                phone:'18251422552',
                address: '上海市普陀区金沙江路 1518 弄',
                role:'超级员'
            }],
            configTable:{
                tHead:[],
                selection:true
            }
        })

        const initOptionsFun=()=>{
            let tableConfig = props.config
            for(let key in tableConfig){
                if(data.configTable[key]){
                    data.configTable[key] = tableConfig[key]
                }
            }
        }

        onBeforeMount(()=>{
            initOptionsFun()
            // data.configTable.tHead=props.config.tHead
            // data.configTable.selection=props.config.selection
        })
        
        return {
            data
            
        }
    }

    
}
</script>
<style lang="scss" scoped>

</style>
<!---
v-slot:父组件传内容到子组件显示
1、匿名插槽
2、具名插槽：指定插槽显示内容
    <template #status>
        <el-switch v-model="data.switch" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
    </template>
    <template>
        <slot :name="item.slotsName"></slot> //(这个slotsName传过来的值相当于name="status")
    </template>
3、作用域插槽：可以进行数据绑定，父子组件通讯   
   子组件数据传到父组件  <template slot-scope="scope">
                            <slot :name="item.slotsName" :data="scope.row"></slot> 
                        </template>
    父组件接收  <template v-slot:status="slotsData">
                    {{slotsData.data.name}}  //这个data就是子组件绑定的data
                    <el-switch v-model="data.switch" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                </template>

---->