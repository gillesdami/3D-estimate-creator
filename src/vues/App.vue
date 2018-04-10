<template>
    <div id="app">
        <buttons/>
        <object-list category="Tente de réception" expanded=1></object-list>
    </div>
</template>

<script>
    import Buttons from './3d/Buttons';
    import ObjectList from './drawer/ObjectList.vue';

    export default {
        name: 'app',
        components : {
            'buttons' : Buttons,
            'object-list' : ObjectList
        },
        props: ['store']
    }
</script>

<style lang="css">
    #app {
        color: #56b983;
    }
</style>