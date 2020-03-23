<template>
    <div>
        <el-dialog title="新增" :visible.sync="dialogFormVisible"  @close="close" @open="openFunOptions" width="500px">
            <el-form :model="form" ref="ruleForm" >
                <el-form-item label="类别：" >
                    <el-select v-model="form.category" placeholder="请选择类别">
                        <el-option v-for="item in categoryOptions.options" :key="item.id"  :label="item.category_name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="标题：">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="概况：">
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
import {ref,reactive,watch} from "@vue/composition-api"
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
        }
    },
    setup(props,{root,emit}){
        const dialogFormVisible =ref(false)
        const loadingStatus = ref(false)
        watch(()=>dialogFormVisible.value = props.flag)
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
            form.title =''
            form.category =''
            form.content =''
        }
        const categoryOptions=reactive({
            options:[]
        })

        const openFunOptions = ()=>{
            categoryOptions.options = props.category
            console.log(categoryOptions.options)

        }
        const addInfoFun = ()=>{

            // id: 信息ID（string）
            // categoryId: 分类ID（string）
            // title: 标题（string）
            // content: 内容（string）
            // imgUrl: 缩略图（string）第22-1学时新增

            let requestDta = {
                category:form.category,
                title:form.title,
                content:form.content
            }
            loadingStatus.value = true
            addInfo(requestDta).then((res)=>{
                console.log(res)

                root.$message({
                    message: res.data.message,
                    type: 'success'
                });
                loadingStatus.value = false
                resetForm();
                // root.$refs['ruleForm'].resetFields();
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
            loadingStatus
        }
    }
}
</script>
<style lang="scss" scoped>
  
</style>