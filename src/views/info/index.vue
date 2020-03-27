<template>
    <div class="info-wrap">
        
        <el-row :gutter="20">
            <el-col :span="4">
                <div class="form-wrap">
                    <label>类型：</label>
                    <div class="wrap-content">
                        <el-select v-model="category" placeholder="请选择" size="small">
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
            <el-col :span="9">
                <div class="form-wrap">
                    <label>日期：</label>
                    <div class="wrap-content">
                        <el-date-picker
                            v-model="date"
                            type="datetimerange"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :default-time="['00:00:00', '23:59:00']"
                            size="small"
                            style="70%"
                        >
                        </el-date-picker>
                    </div>

                </div>
            </el-col>
            <el-col :span="4">
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
                <el-input v-model="content" placeholder="请输入内容" size="small"></el-input>
            </el-col>
            <el-col :span="2">
                 <el-button type="danger" @click="search"  size="small">搜索</el-button>
            </el-col>
            <el-col :span="2">
                 <el-button type="danger" @click="editDialog('新增')" size="small">新增</el-button>
            </el-col>
        </el-row>
        <div style="height:20px;"></div>

        <el-table :data="tableData.item" border style="margin-top:30px;" size="mini" v-loading="loading" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="40">
            </el-table-column>
            <el-table-column prop="id" label="id"> </el-table-column>
            <el-table-column prop="title" label="标题"> </el-table-column>
            <el-table-column prop="categoryId" label="类别" > </el-table-column>
            <el-table-column prop="createDate" label="创建时间"> </el-table-column>
            <el-table-column  label="操作"width="240"> 
                 <template slot-scope="scope">
                    <el-button type="primary" size="mini"@click="editDialog('编辑',scope.row)">编辑</el-button>
                    <el-button type="danger" size="mini" @click="deleteItemFun(scope.row.id)">删除</el-button>
                    <el-button type="primary" size="mini" @click="editDetailed(scope.row)" style="margin-left:10px;">编辑详情</el-button>
                 </template>
            </el-table-column>
        </el-table>
        <div style="height:20px;"></div>
        <el-row type="flex" justify="end">
            <el-col :span="8">
                 <el-button type="danger" size="mini" @click="deleteItemAll">删除所有</el-button>
            </el-col>
            <el-col :span="16" style="text-align:right">
                <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="10"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </el-col>
        </el-row>
        <dialog-from :flag="dialogAdd" @close="close" @getList="getListFun" :category="options.item" :addOrEdit="addOrEdit" :editDatas="editData.editDataItem"></dialog-from>
    </div>
</template>
<script>
    import {ref,reactive, onMounted,watch } from "@vue/composition-api"
    import dialog from "./components/dialog"
    import {global} from "@/utils/global_v3.0"
    import {common} from "@/api/common"
    import {setCategory,getList,delateItem} from "@/api/new"
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
            const tableData=reactive({
                item:[]
            })
            const category=ref('')
            const date=ref('')
            const keyswords=ref(keysID[0].value)
            const content = ref('')
            const dialogAdd = ref(false)
            const total = ref(0)
            const loading = ref(false)
            const addOrEdit = ref('')
            const deleteData = reactive({})
            const page = reactive({
                pageNumber:1,
                pageSize:10
            })
            const editData =reactive({
                editDataItem:{}
            })
            const  handleSizeChange=(val)=> {
                console.log(`每页 ${val} 条`);
                page.pageSize = val
                getListFun()
            }
            const handleCurrentChange=(val)=> {
                console.log(`当前页: ${val}`);
                page.pageNumber = val
                getListFun()
            }
            const close = ()=>{
                dialogAdd.value=false
            }

            const editDialog=(flags,val)=>{
                dialogAdd.value=true
                addOrEdit.value = flags
                editData.editDataItem = val
            }



            const deleteItemFun=(val)=>{
               deleteData.value=[val]
               confirm({
                    content:'删除单条信息？删除将无法恢复！',
                    tip:'警告',
                    type:'info',
                    fn:confirmFunSimple
                })
            }
            const deleteItemAll=()=>{
                if(!deleteData.value || deleteData.value.length==0){
                    root.$message({
                        type:'error',
                        message:'请选择要删除数据!'
                    })
                    return false
                }
                confirm({
                    content:'删除全部信息？删除将无法恢复！',
                    tip:'警告',
                    type:'warning',
                    fn:confirmFunAll
                })
            }
            const confirmFunAll = ()=>{
                delateItem({id:deleteData.value}).then(res=>{
                    deleteData.value=''
                    getListFun()
                }).catch(err=>{})
            }
            const confirmFunSimple = ()=>{
                delateItem({id:deleteData.value}).then(res=>{
                    deleteData.value=''
                    getListFun()
                }).catch(err=>{})
            }
            const handleSelectionChange = (val)=>{
               deleteData.value = val.map( item => item.id )
            }
            
            const getListFun =()=>{
                let requestData = {
                    categoryId: category.value,
                    startTiem: date.value[0],
                    endTime: date.value[1],
                    title: '',
                    id: '',
                    pageNumber: page.pageNumber,
                    pageSize:page.pageSize
                }
                loading.value = true
                getList(requestData).then(res=>{
                    let data = res.data.data
                    tableData.item = data.data
                    total.value = data.total
                    loading.value = false
                }).catch(err=>{
                    loading.value = false
                })
            }

            const search= ()=>{
                getListFun()
            }


            const editDetailed = (data)=>{
                root.$router.push({
                    path:`/editDetailed/${data.id}/${data.title}`
                })
            }
            onMounted(()=>{
                getInfoCategory()
                getListFun()
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
                category,
                date,
                keyswords,
                content,
                handleSizeChange,
                handleCurrentChange,
                dialogAdd,
                close,
                deleteItemFun,
                deleteItemAll,
                getListFun,
                total,
                loading,
                deleteData,
                handleSelectionChange,
                search,
                editDetailed,
                editDialog,
                editData,
                addOrEdit
            }
        }
    }
</script>
<style lang="scss" scoped>
   
</style>