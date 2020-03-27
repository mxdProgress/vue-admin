<template>
    <div class="info-wrap">
        <el-row :gutter="20">
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
                 <el-button type="danger"  size="mini" >添加用户</el-button>
             </el-col>
        </el-row>
    </div>
</template>
<script>
    import {ref,reactive, onMounted,watch } from "@vue/composition-api"
    import elSelects from "@/components/Select/index"
    export default {
        name: 'uesrManage',
        components:{
            elSelects
        },
        setup(props,{root}) {
            const data = reactive({
                keyWords:'name',
                item:[],
                configOptions:{
                    init:["name","iphone"]
                }
            })
            return{
                data
            }
        }
    }
</script>
<style lang="scss" scoped>
    
</style>