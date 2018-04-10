<template>
    <div id="app">
        <buttons id="buttonsPanel"/>
        <helper-panel id="helperPanel"/>
        <object-item :item="store.objects.item"></object-item>
        <object-item :item="store.objects.item2"></object-item>
    </div>
</template>

<script>
    import HelperPanel from './3d/helperPanel/HelperPanel'
    import Buttons from './3d/Buttons'
    import ObjectItem from './drawer/ObjectItem.vue';

    export default {
        name: 'app',
        components: {
            'helper-panel': HelperPanel,
            'buttons': Buttons,
            'object-item': ObjectItem
        },
        props: ['store']
    }
</script>

<style lang="css">
    #app {
        color: #56b983;
    }

    #buttonsPanel {
        margin: 0.5% 0 0 0.5%;
    }

    #helperPanel {
        width: 50%;
        border: 1px solid black;
        padding: 2vw;
        margin: 2vw;
    }
</style>