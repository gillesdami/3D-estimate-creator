<template>
    <div id="app">
        <buttons/>
        <object-list category="Tente de réception" expanded=1></object-list>
        <details-comp :object="object"></details-comp>
    </div>
</template>

<script>
    import Buttons from './3d/Buttons';
    import ObjectList from './drawer/ObjectList.vue';
    import Details from './3d/Details';

    export default {
        name: 'app',
        components : {
            'buttons' : Buttons,
            'object-list' : ObjectList,
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
        }
    }
</script>

<style lang="css">
    #app {
        color: #56b983;
    }
</style>