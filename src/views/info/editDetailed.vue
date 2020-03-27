<template>
    <div>
        编辑详情
    </div>
</template>
<script>
import {ref,reactive, onMounted,watch } from "@vue/composition-api"

export default {
    name:'editDetailed',
    setup(props,{root}){
        let id = root.$route.params.id
        console.log(id)
    }
}   
</script>
<style lang="scss" scoped>

</style>