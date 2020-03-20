<template>
    <div>
        <div class="navWrap">

            <el-menu default-active="1-4-1" class="el-menu-vertical-demo"background-color="transparent" text-color="#fff" :collapse="isCollapse" router>
                <template  v-for="(item,index) in routers">
                    <el-submenu index="1" v-if="!item.hidden" :key="item.id"  :index="index+''">
                        <template slot="title">
                            <!-- <i :class="item.meta.icon"></i> -->
                            <svg-icon :iconClass="item.meta.icon" :className="item.meta.icon" />
                            <span slot="title">{{item.meta.txt}}</span>
                        </template>
                        <el-menu-item v-for="(subItem, index) in item.children" :key="subItem.id" :index="subItem.path" >{{subItem.meta.txt}}</el-menu-item>
                    </el-submenu>
                </template>
            </el-menu>
        </div>
    </div>
</template>
<script>
import {reactive,ref, onMounted,computed} from  '@vue/composition-api'
    export default {
        name: 'navMenu',
        setup(props,{root}) {
            const isCollapse = computed(()=>root.$store.state.app.isCollapse);
            const routers=reactive( root.$router.options.routes )
            // console.log(root.$store.getters.counts)
            // root.$store.commit('SET_COUNT',100);
            return {
                isCollapse,
                routers
            }
        }
    }
</script>
<style lang="scss" scoped>
    .console,.infomanage,.user{
        margin-right: 10px;
    }
</style>