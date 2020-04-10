<template>
    <div>
        <el-row :gutter="0">
            <el-col :span="6" v-if="init.province">
                <el-select v-model="data.provinceValue" placeholder="请选择" @change="handleProvince">
                    <el-option v-for="item in data.provinceData" :key="item.PROVINCE_CODE" :value="item.PROVINCE_CODE" :label="item.PROVINCE_NAME">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="6" v-if="init.city">
               <el-select v-model="data.cityValue" placeholder="请选择" @change="handleCity">
                    <el-option v-for="item in data.cityData" :key="item.CITY_CODE" :value="item.CITY_CODE" :label="item.CITY_NAME">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="6" v-if="init.area">
                <el-select v-model="data.areaValue" placeholder="请选择" @change="handleArea">
                    <el-option v-for="item in data.areaData" :key="item.AREA_CODE" :value="item.AREA_CODE" :label="item.AREA_NAME">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="6" v-if="init.street">
                <el-select v-model="data.streetValue" placeholder="请选择"@change="handleStreet">
                    <el-option v-for="item in data.streetData" :key="item.STREET_CODE" :value="item.STREET_CODE" :label="item.STREET_NAME">
                    </el-option>
                </el-select>
            </el-col>

        </el-row>
    </div>
</template>
<script>
// import {getCityPicker} from '@/api/common'
import { watch, reactive , onBeforeMount } from '@vue/composition-api'
import { cityPickerFun } from "./cityPicker"
export default {
    name:'cityPicker',
    props:{
        cityPickerLevel:{
            type:Array,
            default: () => []
        },
         cityPickerData:{
            type:Object,
            default:()=>{}
         }
    },
    setup(props,{emit}){
        const {getProvince , handleProvince , handleCity, handleArea ,handleStreet, data, resuleData} = cityPickerFun()

        const init=reactive({
            province:false,
            city:false,
            area:false,
            street:false
        })

        const initCityPicker=()=>{
            let cityLevel=props.cityPickerLevel
            if(cityLevel.length==0){
                for(let key in init){
                    init[key]=true
                }
            }else{
                cityLevel.forEach(item => {
                    init[item]=true
                });
            }
        }

        onBeforeMount(()=>{
            getProvince(),
            initCityPicker()
        })

        watch([
            ()=> resuleData.provinceValue,
            ()=> resuleData.cityValue,
            ()=> resuleData.areaValue,
            ()=> resuleData.streetValue,

        ],([
            province,
            city,
            area,
            street
        ])=>{
           emit('update:cityPickerData',resuleData)
        })
        return {
            data,
            init,
            handleProvince,handleCity,handleArea,handleStreet,
        }
    }
}
</script>
<style lang="scss" scoped>

</style>