<template>
    <div>
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
        setup(props) {

        }
    }
</script>
<style lang="scss" scoped>
    .navLeft{
        width:250px;
        height: 100vh;
        float: left;
        background: #344a5f;
    }
    .mainRight{
        height: 100vh;
        background: #f7f7f7;
    }
</style>