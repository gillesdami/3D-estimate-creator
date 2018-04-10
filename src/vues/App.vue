<template>
    <div id="app">
        <buttons/>
        <object-item :item="store.objects.item"></object-item>
        <object-item :item="store.objects.item2"></object-item>
        <details-comp :object="object"></details-comp>
    </div>
</template>

<script>
    import Buttons from './3d/Buttons';
    import Details from './3d/Details';
    import ObjectItem from './drawer/ObjectItem.vue';

    export default {
        name: 'app',
        components : {
            'buttons' : Buttons,
            'object-item' : ObjectItem,
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