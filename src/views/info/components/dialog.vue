<template>
    <div class="dialogAddForm">
        <el-dialog :title="title" :visible.sync="dialogFormVisible"  @close="close" @open="openFunOptions" width="500px">
            <el-form :model="form" ref="ruleForm" >
                <el-form-item label="类别：" prop="category">
                    <el-select v-model="form.category" placeholder="请选择类别">
                        <el-option v-for="item in categoryOptions.options" :key="item.id"  :label="item.category_name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="标题：" prop="title">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="概况："  prop="content">
                    <el-input type="textarea" v-model="form.content"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addInfoFun" :loading="loadingStatus">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import {addInfo} from "@/api/new"
import {ref,reactive,watch, onMounted} from "@vue/composition-api"
export default {
    name:'infoDialog',
    props:{
        flag:{
            type:Boolean,
            default:false
        },
        category:{
            type:Array,
            default:()=>[]
        },
        editDatas:{
            type:Object,
            default: ()=>{}
        },
        addOrEdit:{
            type:String,
            default:''
        }
    },
    setup(props,{root,emit,refs}){
        const dialogFormVisible =ref(false)
        const loadingStatus = ref(false)
        const title = ref('')
        
        watch(()=>[props.flag,props.editDatas,props.addOrEdit],([value,value2,value3])=>{
            dialogFormVisible.value = props.flag
            if(value3=='新增'){
                form.title = ""
                form.category=""
                 form.content=""
                 title.value='新增'
            }else{
                title.value='编辑'
                if(value2.title){
                    form.title = value2.title
                }
                if(value2.categoryId){
                    form.category = value2.categoryId
                }
                if(value2.content){
                    form.content = value2.content
                }
            }
        })
        const close=()=>{
            dialogFormVisible.value = false
            emit('close',false)
            resetForm()
        }
        const form=reactive({
          title: '',
          category: '',
          content:''
        })
        const resetForm = ()=>{
            refs['ruleForm'].resetFields();
            form.title = ""
            form.category=""
            form.content=""
        }
        const categoryOptions=reactive({
            options:[]
        })
        const openFunOptions = ()=>{
            categoryOptions.options = props.category
        }
        const addInfoFun = ()=>{

            // id: 信息ID（string）
            // categoryId: 分类ID（string）
            // title: 标题（string）
            // content: 内容（string）
            // imgUrl: 缩略图（string）

            let requestDta = {
                category:form.category,
                title:form.title,
                content:form.content
            }
            loadingStatus.value = true
            addInfo(requestDta).then((res)=>{
                root.$message({
                    message: res.data.message,
                    type: 'success'
                });
                loadingStatus.value = false
                resetForm();
                emit('getList')
                // dialogFormVisible.value = false
            }).catch(err=>{
                 loadingStatus.value = false
            })

        }

        return{
            dialogFormVisible,
            form,
            close,
            categoryOptions,
            openFunOptions,
            addInfoFun,
            loadingStatus,
            title
        }
    }
}
</script>
<style lang="scss" scoped>
  
</style>