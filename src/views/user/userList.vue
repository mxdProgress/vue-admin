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
                 <el-button type="danger"  size="mini" @click="dialogAddFun('新增')">添加用户</el-button>
             </el-col>
        </el-row>
        <div class="" style="height:30px;"></div>
        <table-vue :config="data.configTable">
            <template v-slot:status="slotsData">
                <el-switch v-model="slotsData.data.status" active-value="2" inactive-value="1" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                <!-- {{slotsData.data.status}} -->
            </template>
            <template v-slot:operation="slotsData">
                 <el-button type="danger"  size="mini">删除</el-button>
                 <!-- <el-button type="primary"  size="mini">编辑</el-button> -->
            </template>
        </table-vue>
        <div class="heightDiv" ></div>
        <dialogAdd :flag.sync="data.dialog_info" :addOredit="data.addOredit" :editDatas="data.editDataItem" @close="close"/>
      
    </div>

</template>
<script>
    import {ref,reactive, onMounted,watch } from "@vue/composition-api"
    import elSelects from "@/components/Select/index"
    import tableVue from "@/components/Table/index"
    import dialogAdd from "./add"
    export default {
        name: 'uesrManage',
        components:{
            elSelects,
            tableVue,
            dialogAdd
        },
        setup(props,{root}) {
            const data = reactive({
                keyWords:'name',
                dialog_info:false,
                addOredit:'',
                editDataItem:{},
                item:[],
                configOptions:{
                    init:["name","iphone"]
                },
                configTable:{
                    selection:true,
                    size:"small",
                    tHead:[
                        {
                            label:'用户名',
                            field:'username',
                            width:150
                        },
                        {
                            label:'真是姓名',
                            field:'truename',
                            width:150
                        },
                        {
                            label:'手机号',
                            field:'phone'
                        },
                        {
                            label:'地区',
                            field:'region',
                            width:250
                        },
                        {
                            label:'角色',
                            field:'role',
                            width:100
                        },
                        {
                            label:'禁用状态',
                            field:'status',
                            width:150,
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
                    ],
                    requestDatas:{
                        url:'getList',
                        method:'POST',
                        data:{
                            pageNumber: 1,
                            pageSize:10
                        }
                    },
                    isShow:true,
                    layout:"total, sizes, prev, pager, next, jumper"
                }
            })


            /**
             * 方法
            */
           const dialogAddFun=(flags,val)=>{
               data.dialog_info=true
               data.addOredit=flags
               data.editDataItem = val
           }
           const close = ()=>{
                data.dialog_info=false
            }
            return{
                data,
                dialogAddFun,
                close
            }
        }
    }
</script>
<style lang="scss" scoped>
    
</style>