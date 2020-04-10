<template>
    <div class="dialogAddForm">
        <el-dialog :title="title" :visible.sync="dialogFormVisible"  @close="close" @open="openFunOptions" width="500px">
            <el-form :model="data.form" ref="ruleForm" size="small">
                <el-form-item label="用户："prop="title" >
                    <el-input v-model="data.form.title" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="姓名：" prop="content">
                    <el-input v-model="data.form.content"></el-input>
                </el-form-item>
                <el-form-item label="手机：" prop="iphone">
                    <el-input type="number" v-model="data.form.iphone"></el-input>
                </el-form-item>
                <el-form-item label="地区：" prop="cityPiker">
                    <cityPicker :cityPickerLevel="['province','city','area','street']" :cityPickerData.sync="data.form.cityPickerData" />
                    {{data.form.cityPickerData}}
                </el-form-item>
                <el-form-item label="启用：" prop="radio">
                    <el-radio v-model="data.form.radio" label="1">禁用</el-radio>
                    <el-radio v-model="data.form.radio" label="2">启用</el-radio>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="角色：" prop="checkListValue">
                    <el-checkbox-group v-model="data.form.checkListValue">
                        <el-checkbox v-for="item in data.form.checkList" :key="item.role" :label="item.name" ></el-checkbox>
                       
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
import { getUserRole } from "@/api/user"
import { ref , reactive , watch , onMounted, onBeforeMount } from "@vue/composition-api"
import cityPicker from "@/components/cityPicker/index"
export default {
    name:'infoDialog',
    components:{
        cityPicker
    },
    props:{
        flag:{
            type:Boolean,
            default:false
        },
        editDatas:{
            type:Object,
            default: ()=>{}
        },
        addOredit:{
            type:String,
            default:''
        }
    },
    setup(props,{ root , emit , refs }){
        const dialogFormVisible =ref(false)
        const loadingStatus = ref(false)
        const title = ref('')

        const data = reactive({
            form:{
                title:'',
                content:'',
                checkListValue:['A'],
                radio:"1",
                iphone:null,
                cityPickerData:{},
                checkList:[]
            }
        })

        const getRole=()=>{
            getUserRole({}).then(res=>{
                console.log(res.data.data)
                data.form.checkList=res.data.data
            }).catch(err=>{

            })
        }

        onBeforeMount(()=>{
            
        })

        
        
        watch(()=>[props.flag,props.editDatas,props.addOredit],([value,value2,value3])=>{
            dialogFormVisible.value = props.flag
            if(value3=='新增'){
                title.value='新增'
            }else{
                title.value='编辑'
                if(value2.title){
                    data.form.title = value2.title
                }
                if(value2.categoryId){
                     data.form.category = value2.categoryId
                }
                if(value2.content){
                     data.form.content = value2.content
                }
            }
        })
        const close=()=>{
            dialogFormVisible.value = false
            emit('close',false)
            refs['ruleForm'].resetFields()
        }
        const resetForm = (formName)=>{
            refs[formName].resetFields()
        }
        const openFunOptions = ()=>{
            getRole()
        }
     

        return{
            dialogFormVisible,
            close,
            openFunOptions,
            loadingStatus,
            title,
            resetForm,
            data
        }
    }
}
</script>
<style lang="scss" scoped>
  
</style>