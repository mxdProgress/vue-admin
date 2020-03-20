<template>
    <div >
        <div class="headerWrap">
            <div class="header-left" @click="navMenuState"><svg-icon iconClass="menu" className="menu"></svg-icon></div>
            <div class="header-right">
                <img src="../../../assets/account.png">
                <span>{{username}}</span>
                <h2 @click="exit"><svg-icon iconClass="account" className="account"></svg-icon></h2>
            </div>
        </div>
    </div>
</template>
<script>
import { computed } from '@vue/composition-api';
export default {
    name: 'headerComponent',
    setup(props,{root}) {
        const navMenuState=(()=>{
            // root.$store.commit('app/SET_COLLAPSE');
            root.$store.dispatch('app/set_collapse',{name:'jjjj'});
        })

        const username = computed(()=>root.$store.state.app.username)
        const exit = ()=>{
            root.$store.dispatch('app/exit').then(res=>{
                console.log('aaa')
                root.$router.push({name:'Login'})
            }).catch()
        }
        return {
            navMenuState,
            username,
            exit
        }
    }
}
</script>
<style lang="scss" scoped>
    .headerWrap{
        height:50px;
        background: #fff;
        box-shadow: 3px 3px  3px #ccc ;
        .header-left{
            margin:15px 0 0 20px;
            float:left;
            font-size:20px;
        }
         .header-right{
            margin:10px 15px 0 0;
            float:right;
            font-size:20px;
            img{
                width:30px;
                float: left;
                padding:0px 20px 0 20px;
            }
            h2{
                border-left: 1px #ccc solid;
                padding:5px 0 0 20px;
                float: left;
            }
            span{
                font-size: 12px;
                float: left;
                display: inline-block;
                line-height:25px;
                margin-right:10px;
            }
        }

    }
</style>