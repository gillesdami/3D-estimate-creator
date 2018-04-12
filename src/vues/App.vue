<template>
    <div id="app">
        <objects :collapsiblesStatus="store().collapsiblesStatus"></objects>
        <buttons id="buttonsPanel"/>
        <helper-panel v-if="store().helper.isDisplay" id="helperPanel"/>
        <details-comp :object="object"></details-comp>
    </div>
</template>

<script>
    import HelperPanel from './3d/helperPanel/HelperPanel';
    import Buttons from './3d/Buttons';
    import Objects from './drawer/Objects.vue';
    import Details from './3d/Details';
    import { $select } from '../sagas/vue';
    import { rootselector } from '../selectors';

    export default {
        name: 'app',
        components : {
            'buttons' : Buttons,
            'objects' : Objects,
            'details-comp' : Details,
            'helper-panel': HelperPanel,
        },
        data() {
            return {
                object: {
                    itemName: "tente",
                    price: "30"
                }
            }
        },
        methods: {
            'store': function() {
                return $select(rootselector);
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