<template>
    <div id="app">
        <buttons/>
        <objects :collapsiblesStatus="store.collapsiblesStatus"></objects>
        <details-comp :object="object"></details-comp>
    </div>
</template>

<script>
    import Buttons from './3d/Buttons';
    import Objects from './drawer/Objects.vue';
    import Details from './3d/Details';

    export default {
        name: 'app',
        components : {
            'buttons' : Buttons,
            'objects' : Objects,
            'details-comp' : Details
        },
        props: ['store'],
        data() {
            return {
                object: {
                    itemName: "tente",
                    price: "30"
                }
            }
        },
        watch: {
            'store': function (val, oldVal) {
                console.log(oldVal + 'has been changed to ' + val + ' from outside.');
            }
        },
    }
</script>

<style lang="css">
    #app {
        color: #56b983;
    }
</style>