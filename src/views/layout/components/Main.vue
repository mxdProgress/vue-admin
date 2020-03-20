<template>
    <div>
        <div class="mainWrap">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'MainComponent',
        setup(props) {

        }
    }
</script>
<style lang="scss" scoped>
    .mainWrap{
        height: calc(100vh - 70px);
        background: #fff;
        margin: 10px 0 0 260px;
        transition: all 0.3s ease;
        padding: 20px;
        box-sizing: border-box;
    }
    .close  .mainWrap{
        margin: 10px 0 0 75px;
    }

</style>