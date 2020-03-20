<template>
    <div :class="[menuStatus?'close':'open']">
        <div class="navLeft">
            <Nav></Nav>
        </div>
        <div class="mainRight">
            <Header></Header>
            <Main></Main>
        </div>
    </div>
</template>
<script>
    import {computed} from  '@vue/composition-api'
    import Nav from './components/Nav'
    import Header from './components/Header'
    import Main from './components/Main'
    export default {
        name: 'index',
        components: {
            Nav,
            Header,
            Main
        },
        setup(props,{root}) {
            const menuStatus =computed(()=>root.$store.state.app.isCollapse)
            return {
                menuStatus
            }
        }
    }
</script>
<style lang="scss" scoped>
    .navLeft{
        width:250px;
        height: 100vh;
        float: left;
        background: #344a5f;
        transition: all 0.3s ease;
    }
    .mainRight{
        height: 100vh;
        background: #f7f7f7;
    }
    .close .navLeft{
        width:64px;
    }
    
</style>