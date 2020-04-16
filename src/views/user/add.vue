<template>
    <div class="dialogAddForm">
        <el-dialog :title="title" :visible.sync="dialogFormVisible"  @close="close" @open="openFunOptions" width="500px">
            <el-form :model="data.form" ref="ruleForm" size="small">
                <el-form-item label="用户："prop="username" >
                    <el-input v-model="data.form.username" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item label="姓名：" prop="truename">
                    <el-input v-model="data.form.truename" placeholder="请输入真实姓名"></el-input>
                </el-form-item>
                <el-form-item label="密码：" prop="password">
                    <el-input type="password" v-model="data.form.password" placeholder="请输入6~20数字+字母"></el-input>
                </el-form-item>
                <el-form-item label="手机：" prop="phone">
                    <el-input type="number" v-model="data.form.phone" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item label="地区：" prop="region">
                    <cityPicker :cityPickerLevel="['province','city','area','street']" :cityPickerData.sync="data.cityPickerData" />
                    {{data.cityPickerData}}
                </el-form-item>
                <el-form-item label="启用：" prop="status">
                    <el-radio v-model="data.form.status" label="1">禁用</el-radio>
                    <el-radio v-model="data.form.status" label="2">启用</el-radio>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="角色：" prop="role">
                    <el-checkbox-group v-model="data.form.role">
                        <el-checkbox v-for="item in data.checkList" :key="item.role" :label="item.name" ></el-checkbox>
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
import { getUserRole ,addUser} from "@/api/user"
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
        const title = ref()

        const data = reactive({
            // username：用户名（string）*
            // truename：真实姓名（string）
            // password：密码（string）*
            // phone：手机号（number）
            // region：地区（json）
            // status：禁启用状态（string）*
            // role：角色类型（string）*
            form:{
                username:'',
                truename:'',
                password:'',
                role:[],
                status:"1",
                phone:'',
                region:''
            },
            cityPickerData:{},
            checkList:[]
        })

        const getRole=()=>{
            getUserRole({}).then(res=>{
                data.checkList=res.data.data
            }).catch(err=>{

            })
        }

        onBeforeMount(()=>{})

        
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
        const submitForm=()=>{
            let requestData  = Object.assign({}, data.form);
            requestData.role=requestData.role.join()
            requestData.region=data.cityPickerData
            addUser(requestData).then(res=>{
                root.$message({
                    message: res.data.message,
                    type: "success"
                })
            }).catch(err=>{})
        }
     

        return{
            dialogFormVisible,
            close,
            openFunOptions,
            loadingStatus,
            title,
            resetForm,
            data,
            submitForm
        }
    }
}
</script>
<style lang="scss" scoped>
  
</style>