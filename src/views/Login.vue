<template>
    <div id="login">
        <div class="menuBox">
            <ul style="overflow:hidden;">
                <li v-for="(item, index) in menuTab" :key="item.id":class="{current:item.current}" @click="toggleMenu(item)" >{{item.txt}}</li>
            </ul>
            <div class="container_login">
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm" size="small">
                    <el-form-item prop="useName"  class="itemClass">
                        <label>用户名</label>
                        <el-input type="text" v-model="ruleForm.useName" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item prop="password" class="itemClass">
                        <label>密码</label>
                        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item prop="passwords" class="itemClass" v-if="modules==='register'">
                        <label>重复密码</label>
                        <el-input type="password" v-model="ruleForm.passwords" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item prop="code"  class="itemClass">
                        <label>验证码</label>
                        <el-row :gutter="11">
                            <el-col :span="15"><el-input v-model="ruleForm.code"></el-input></el-col>
                            <el-col :span="9"><el-button type="success" size="mini" @click='getSms()' :disabled='getSmsDisabled' style="width:100%">{{getSmsCode}}</el-button></el-col>
                        </el-row>
                        
                    </el-form-item>
                    <el-form-item class="itemClass" style="text-align:left;margin-top:20px;" >
                        <el-button type="primary" @click="submitForm('ruleForm')" :disabled="loginStatus" class="block">{{modules==='login'?"提交":"注册"}}</el-button>
                        <!-- <el-button @click="resetForm('ruleForm')" class="block">重置</el-button> -->
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
import {GetSms,Register,Login} from '@/api/login';
import {reactive,ref, onMounted} from  '@vue/composition-api';
import { stripscript, validatePass, validateEmail, validateVCode } from '@/utils/validate';
export default {
    name:'Login',
    setup(props,{refs,root}){
        let checkUseName = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入用户名'));
            } else if(validateEmail(value)){
                callback(new Error('用户名格式有误'));
            } else {
                callback(); //true
            }
        };
        let checkPassWord = (rule, value, callback) => {
            // 过滤后的数据
            ruleForm.password = stripscript(value);
            value = ruleForm.password;
            if (value === '') {
                callback(new Error("请输入密码"));
            } else if (validatePass(value)) {
                callback(new Error("密码为6至20位数字+字母"));
            } else {
                callback();
            }
        };
        let checkPassWords = (rule, value, callback) => {
            ruleForm.passwords = stripscript(value);
            value = ruleForm.passwords;
            if (value === '') {
                callback(new Error("请再次输入密码"));
            } else if (value != ruleForm.password) {
                callback(new Error("重复密码不正确"));
            } else {
                callback();
            }
        };

        let checkCode = (rule, value, callback) => {
           if (value === '') {
                return callback(new Error('请输入验证码'));
            }else if(validateVCode(value)){
                return callback(new Error('验证码格式有误'));
            }else{
                callback();
            }
        };
        const ruleForm=reactive({
            useName: '',
            password: '',
            passwords: '',
            code: ''
        })
        const rules=reactive({
            useName: [
                { validator: checkUseName, trigger: 'blur' }
            ],
            password: [
                { validator: checkPassWord, trigger: 'blur' }
            ],
            passwords: [
                { validator: checkPassWords, trigger: 'blur' }
            ],
            code: [
                { validator: checkCode, trigger: 'blur' }
            ]
        })
        const menuTab =reactive([
            {txt:"登录",current:true,type:'login'},
            {txt:"注册",current:false,type:'register'}
        ])
        const modules = ref('login')
        const loginStatus = ref(true)
        const getSmsDisabled = ref(false)
        const getSmsCode = ref('获取验证码')
        const timer = ref(null)
        
        const toggleMenu = data => {
            menuTab.forEach((item)=>{
                item.current=false
            })
           data.current=true
           modules.value = data.type
           refs['ruleForm'].resetFields();
        }
        const getSms=(()=>{
            if(ruleForm.useName==''){
               root.$message.error('请输入用户名');
                return ;
            }
            getSmsDisabled.value = true
            getSmsCode.value = '发送中'
            setTimeout(function(){
                GetSms({username:ruleForm.useName,module:modules.value}).then(response=>{
                    console.log(response);
                    let data = response.data;
                    root.$message({
                        message:data.message,
                        type:'success'
                    })
                    loginStatus.value=false
                    countTime(5)
                    
                }).catch(error=>{
                    console.log(error);
                });
            },3000)
        })
        const submitForm = formName => {
            refs[formName].validate((valid) => {
            if (valid) {
                if(modules.value=='login'){
                    login();
                }else{
                    register();
                }
                
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        }

        const countTime = (time)=>{
            timer.value = setInterval(()=>{
                time--
                if(time == 0){
                    clearInterval(timer.value)
                    getSmsCode.value = '重新获取'
                    getSmsDisabled.value = false
                }else{
                    getSmsCode.value = `倒计时${time}秒`
                }
               
            },1000);
        }

        const clearCountDown=()=>{
            getSmsDisabled.value = false
            getSmsCode.value = '获取验证码'
            clearInterval(timer.value)
        }

        const register = ()=>{
            let requestData={
                username:ruleForm.useName,
                password:ruleForm.password,
                code:ruleForm.code
            }
            Register(requestData).then(response=>{
                console.log(response);
                let data = response.data;
                root.$message({
                    message:data.message,
                    type:'success'
                })
                toggleMenu(menuTab[0]);
                clearCountDown()
            }).catch(error=>{

            });
        }
        const login = ()=>{
            let requestData ={
                username:ruleForm.useName,
                password:ruleForm.password,
                code:ruleForm.code
            };
            Login(requestData).then((response)=>{
                let data = response.data;
                root.$message({
                    message:data.message,
                    type:'success'
                })
            }).catch((error)=>{

            });
        }

        onMounted(()=>{
            
        })

        return {
            ruleForm,
            rules,
            menuTab,
            modules,
            getSmsDisabled,
            timer,
            getSmsCode,
            loginStatus,
            toggleMenu,
            submitForm,
            getSms
        }

    },
    

}
</script>
<style lang="scss" scoped>
    #login{
        height: 100vh;
        background: #344a5f;
    }
    .menuBox{
        width:290px;
        height: 600px;
        position: absolute;
        top:0;
        left: 0;
        bottom:0;
        right:0;
        margin:auto;
        color:#fff;
        ul li{
            width:50%;
            line-height:40px;
            border-radius: 2px;
            text-align: center;
            float: left;
            cursor: pointer;
        }
        ul li.current{
            background: rgba(0,0,0,.1);
        }
       .itemClass{
           margin-bottom:10px;
       } 
       .demo-ruleForm{
           margin:10px 0;
       }
       .block{
           width: 100%;
       }
    }
    
</style>