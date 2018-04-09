<template>
    <div id="app">
        <buttons/>
        <object-item :item="store.objects.item"></object-item>
        <object-item :item="store.objects.item2"></object-item>
    </div>
</template>

<script>
    import Buttons from './3d/Buttons';
    import ObjectItem from './drawer/ObjectItem.vue';

    export default {
        name: 'app',
        components : {
            'buttons' : Buttons,
            'object-item' : ObjectItem
        },
        props: ['store']
    }
</script>

<style lang="css">
    #app {
        color: #56b983;
    }
</style>