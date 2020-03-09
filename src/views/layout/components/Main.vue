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
        height: 70vh;
        background: #fff;
        margin: 10px 0 0 260px;
    }
</style>