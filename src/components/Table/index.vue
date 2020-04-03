<template>
    <div>
        <el-table :data="data.tableData" border style="width: 100%" :size="data.configTable.size">
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

        <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagiNationData.currentpage"
            :page-sizes="pagiNationData.pagesizes"
            :page-size="pagiNationData.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagiNationData.total">
        </el-pagination>
    </div>
</template>
<script>
import {ref,reactive, onMounted, onBeforeMount,watch  } from "@vue/composition-api"
import {loadTableDataFun} from "@/components/Table/tableLoadData"
import { paginationHook } from "@/components/Table/paginationHook"
export default {
    name:'tableVue',
    props:{
        config:Object,
        default:()=>{}
    },
    setup(props, { root } ){
        const {userManageListData,getloadTableData} = loadTableDataFun()
        const { pagiNationData , pagiNationFun,handleSizeChange,handleCurrentChange}  = paginationHook()
        const data = reactive({
            tableData: [],
            total:0,
            configTable:{
                tHead:[],
                size:"",
                selection:true,
                requestDatas:{}
            }
        })

        // watch(()=>userManageListData.item,(newValue,oldValue)=>{
        //     data.tableData = newValue
        // })

        watch([
            ()=>userManageListData.item,
            ()=>userManageListData.total
        ],([
            tableCount,totalCount
        ])=>{
            data.tableData = tableCount
            pagiNationFun(totalCount)
            console.log(totalCount)
        })

        //这种直接在组件中加载接口渲染数据会导致这个组件代码冗余严重，所以调接口逻辑要在其他页面完成
        // const loadData=()=>{
        //     let request ={
        //         url:requestListUrl[data.configTable.requestDatas.url],
        //         method:data.configTable.requestDatas.method,
        //         data:data.configTable.requestDatas.data
        //     }
        //     loadTableData(request).then(res=>{
        //         let resData = res.data.data.data
        //         data.tableData=resData
        //     }).catch(err=>{
        //     })
        // }

        const initOptionsFun=()=>{
            let tableConfig = props.config
            let KeyArr = Object.keys(tableConfig)
            for(let key in tableConfig){
                if(KeyArr.includes(key)){    //["selection", "tHead", "requestUrl"].includes(selection)  includes方法用来判断一个数组是否包含一个指定的值
                    data.configTable[key] = tableConfig[key]
                }
            }
        }

        onBeforeMount(()=>{
            initOptionsFun()
            getloadTableData(data.configTable)

            // loadData()
            //传统props传值写法
            // data.configTable.tHead=props.config.tHead
            // data.configTable.selection=props.config.selection
        })

     
        return {
            data,
            pagiNationData ,handleSizeChange,handleCurrentChange
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