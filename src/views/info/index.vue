<template>
    <div class="info-wrap">
        
        <el-row :gutter="20">
            <el-col :span="4">
                <div class="form-wrap">
                    <label>类型：</label>
                    <div class="wrap-content">
                        <el-select v-model="values" placeholder="请选择" size="small">
                            <el-option
                            v-for="item in options.item"
                            :key="item.value"
                            :label="item.category_name"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                </div>
            </el-col>
            <el-col :span="7">
                <div class="form-wrap">
                    <label>类型：</label>
                    <div class="wrap-content">
                        <el-date-picker
                            v-model="date"
                            type="datetimerange"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :default-time="['12:00:00', '08:00:00']"
                            size="small"
                            style="70%"
                            >
                        </el-date-picker>
                    </div>

                </div>
            </el-col>
            <el-col :span="3">
                <div class="form-wrap">
                    <label>关键字：</label>
                    <div class="wrap-content">
                        <el-select v-model="keyswords" placeholder="请选择" size="small">
                            <el-option
                            v-for="item in keysID"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>

                </div>
            </el-col>
            <el-col :span="3">
                <el-input v-model="input" placeholder="请输入内容" size="small"></el-input>
            </el-col>
            <el-col :span="3">
                 <el-button type="danger"  size="small">搜索</el-button>
            </el-col>
            <el-col :span="2" :offset="2">
                 <el-button type="danger" @click="dialogAdd=true" size="small">新增</el-button>
            </el-col>
        </el-row>
        <div style="height:20px;"></div>

        <el-table :data="tableData" border style="margin-top:30px;" size="mini">
            <el-table-column type="selection" width="40">
        </el-table-column>
            <el-table-column prop="date" label="标题" width="180"> </el-table-column>
            <el-table-column prop="name" label="类别" width="180"> </el-table-column>
            <el-table-column prop="address" label="日期"> </el-table-column>
            <el-table-column prop="manage" label="管理人"> </el-table-column>
            <el-table-column  label="操作"  width="180"> 
                <el-button type="primary" size="mini"@click="dialogAdd=true">编辑</el-button>
                <el-button type="danger" size="mini" @click="deleteItem">删除</el-button>
            </el-table-column>
        </el-table>
        <div style="height:20px;"></div>
        <el-row type="flex" >
            <el-col :span="12">
                 <el-button type="danger" size="mini" @click="deleteItemAll">删除所有</el-button>
            </el-col>
            <el-col :span="12" >
                <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :page-sizes="[100, 200, 300, 400]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="400">
                </el-pagination>
            </el-col>
        </el-row>
        <dialog-from :flag="dialogAdd" @close="close" :category="options.item"></dialog-from>
    </div>
</template>
<script>
    import {ref,reactive, onMounted,watch } from "@vue/composition-api"
    import dialog from "./components/dialog"
    import {global} from "@/utils/global_v3.0"
    import {common} from "@/api/common"
    import {setCategory} from "@/api/new"
    export default {
        name: 'infoList',
        components:{
            dialogFrom:dialog
        },
        setup(props,{root}) {
            const {confirm} = global();
            const {categoryItem,getInfoCategory} = common();
            const options =reactive({ 
                item:[]
            })
            console.log(options)
            const keysID = reactive([
                {
                    value: 'id',
                    label: 'ID'
                },
                {
                    value: 'config',
                    label: 'Config'
                }
            ])
            const tableData=reactive([
                {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄',
                    manage: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄',
                    manage: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄',
                    manage: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄',

                    manage: '上海市普陀区金沙江路 1516 弄' 
                }
            ])
            const values=ref('')
            const date=ref('')
            const keyswords=ref(keysID[0].value)
            const input = ref('')
            const dialogAdd = ref(false)

            const  handleSizeChange=(val)=> {
                console.log(`每页 ${val} 条`);
            }
            const handleCurrentChange=(val)=> {
                console.log(`当前页: ${val}`);
            }
            const close = ()=>{
                dialogAdd.value=false
            }
            const deleteItem=()=>{
               confirm({
                    content:'删除单条信息？删除将无法恢复！',
                    tip:'警告',
                    type:'info',
                    fn:confirmFunSimple
                })
            }
            const deleteItemAll=()=>{
                confirm({
                    content:'删除全部信息？删除将无法恢复！',
                    tip:'警告',
                    type:'warning',
                    fn:confirmFunAll
                })
            }
            const confirmFunAll = ()=>{
                // alert('lllll');
            }
            const confirmFunSimple = ()=>{
            }

            onMounted(()=>{
                getInfoCategory()
                //获取类别接口临时增加模拟数据用，没有实际界面操作
                // setCategory({categoryName:"CCTV3"})
            })

            watch(()=>categoryItem.item,value=>{
                // console.log(value);
                options.item=value
            })

           
            return {
                options,
                keysID,
                tableData,
                values,
                date,
                keyswords,
                input,
                handleSizeChange,
                handleCurrentChange,
                dialogAdd,
                close,
                deleteItem,
                deleteItemAll
            }
        }
    }
</script>
<style lang="scss" scoped>
    .form-wrap{
        overflow: hidden;
        label{
            float: left;
            line-height: 30px;
        }
        .wrap-content{
            margin-left: 50px;
        }
        .height{
            height: 30px;
        }
    }
</style>