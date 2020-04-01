<template>

    <div class="info-wrap">
        <el-row :gutter="20" class="heightDiv">
            <el-col :span="22">
                <el-row :gutter="10">
                    <el-col :span="4">
                        <div class="form-wrap">
                            <label>关键字：</label>
                            <div class="wrap-content">
                                <el-selects :config="data.configOptions"></el-selects>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <el-input size="small" placeholder="请搜索关键字"></el-input>
                    </el-col>
                    <el-col :span="4">
                        <el-button size="small" type="danger">搜索</el-button>
                    </el-col>
                </el-row>
            </el-col>
             <el-col :span="2">
                 <el-button type="danger"  size="mini">添加用户</el-button>
             </el-col>
        </el-row>
        <div class="" style="height:30px;"></div>
        <table-vue :config="data.configTable">
            <template v-slot:status="slotsData">
                {{slotsData.data.name}}
                <el-switch v-model="data.switch" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </template>
            <template v-slot:operation="slotsData">
                 <el-button type="danger"  size="mini">删除</el-button>
                 <el-button type="primary"  size="mini">编辑</el-button>
            </template>
        </table-vue>
        <div class="heightDiv" ></div>

        <el-row>
            <el-col :span="24" style="text-align:right">
                <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="data.currentPage4"
                    :page-sizes="[100, 200, 300, 400]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="400">
                    </el-pagination>
            </el-col>
        </el-row>
        
    </div>

</template>
<script>
    import {ref,reactive, onMounted,watch } from "@vue/composition-api"
    import elSelects from "@/components/Select/index"
    import tableVue from "@/components/Table/index"
    export default {
        name: 'uesrManage',
        components:{
            elSelects,
            tableVue
        },
        setup(props,{root}) {
            const data = reactive({
                keyWords:'name',
                switch:true,
                currentPage4: 4,
                item:[],
                configOptions:{
                    init:["name","iphone"]
                },
                configTable:{
                    selection:true,
                    tHead:[
                        {
                            label:'用户名/邮箱',
                            field:'email',
                            width:150
                        },
                        {
                            label:'真实姓名',
                            field:'name'
                        },
                        {
                            label:'手机号',
                            field:'phone'
                        },
                        {
                            label:'地区',
                            field:'address',
                            width:250
                        },
                        {
                            label:'角色',
                            field:'role',
                            width:100
                        },
                        {
                            label:'启用禁用',
                            field:'status',
                            width:100,
                            columnType:'slot',
                            slotsName:'status'
                        },
                        {
                            label:'操作',
                            field:'operation',
                            width:150,
                            columnType:'slot',
                            slotsName:'operation'
                        }
                    ]
                }
            })


            /**
             * 方法
            */
            const handleSizeChange=(val)=> {
                console.log(`每页 ${val} 条`);
            }
            const handleCurrentChange=(val)=> {
                console.log(`当前页: ${val}`);
            }

            return{
                data,handleSizeChange,handleCurrentChange
            }
        }
    }
</script>
<style lang="scss" scoped>
    
</style>