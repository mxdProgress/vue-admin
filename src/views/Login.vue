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
                            <el-col :span="15"><el-input v-model.number="ruleForm.code"></el-input></el-col>
                            <el-col :span="9"><el-button type="success" size="mini">获取验证码</el-button></el-col>
                        </el-row>
                        
                    </el-form-item>
                    <el-form-item class="itemClass" style="text-align:left;margin-top:20px;" >
                        <el-button type="primary" @click="submitForm('ruleForm')" class="block">提交</el-button>
                        <!-- <el-button @click="resetForm('ruleForm')" class="block">重置</el-button> -->
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
import { stripscript, validatePass, validateEmail, validateVCode } from '@/utils/validate';
export default {
    name:'Login',
    data(){
        
        var checkUseName = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入用户名'));
            } else if(validateEmail(value)){
                callback(new Error('用户名格式有误'));
            } else {
                callback(); //true
            }
        };
        var checkPassWord = (rule, value, callback) => {
            // 过滤后的数据
            this.ruleForm.password = stripscript(value);
            value = this.ruleForm.password;
            if (value === '') {
                callback(new Error("请输入密码"));
            } else if (validatePass(value)) {
                callback(new Error("密码为6至20位数字+字母"));
            } else {
                callback();
            }
        };
        var checkPassWords = (rule, value, callback) => {
            this.ruleForm.passwords = stripscript(value);
            value = this.ruleForm.passwords;
            if (value === '') {
                callback(new Error("请再次输入密码"));
            } else if (value != this.ruleForm.password) {
                callback(new Error("重复密码不正确"));
            } else {
                callback();
            }
        };

        var checkCode = (rule, value, callback) => {
           if (value === '') {
                return callback(new Error('请输入验证码'));
            }else if(validateVCode(value)){
                return callback(new Error('验证码格式有误'));
            }else{
                callback();
            }
        };
        return {
            modules:'login',
            ruleForm: {
            useName: '',
            password: '',
            passwords: '',
            code: ''
        },
        rules: {
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
            },
            menuTab:[
                {txt:"登录",current:true,type:'login'},
                {txt:"注册",current:false,type:'register'}
            ]    
        }
    },
    methods:{
        toggleMenu(data){
            this.menuTab.forEach((item)=>{
                item.current=false
            })
           data.current=true
           this.modules = data.type
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                alert('submit!');
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        // resetForm(formName) {
        //     this.$refs[formName].resetFields();
        // }
    }
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