<template>
    <div id="app">
        <cart :objects-displayed="store.objectsDisplayed"/>
        <objects :collapsiblesStatus="store.collapsiblesStatus"/>

        <buttons id="buttonsPanel"/>
        <helper-panel v-if="store.helper.isDisplay" id="helperPanel"/>

        <details-comp :object="object"/>
    </div>
</template>

<script>
    import HelperPanel from './3d/helperPanel/HelperPanel.vue';
    import Buttons from './3d/Buttons.vue';
    import Objects from './drawer/objects/Objects.vue';
    import Details from './3d/Details.vue';
    import Cart from './drawer/cart/Cart.vue'

    export default {
        name: 'app',
        components : {
            'buttons' : Buttons,
            'objects' : Objects,
            'details-comp' : Details,
            'helper-panel': HelperPanel,
            'cart': Cart,
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