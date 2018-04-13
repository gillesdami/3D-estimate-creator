<template>
    <body>
        <div id="v3D">
            <div id="threeRoot"></div>

            <buttons id="buttonsPanel"/>
            <helper-panel v-if="store().helper.isDisplayed" id="helperPanel"/>
            <details-comp/>
        </div>
        
        <drawer :store="store()"/>
    </body>
</template>

<script>
    import HelperPanel from './3d/helperPanel/HelperPanel';
    import Buttons from './3d/Buttons';
    import Details from './3d/Details';
    import { $select } from '../sagas/vue';
    import { rootselector, rendererSelector } from '../selectors';
    import Drawer from './drawer/Drawer.vue';

    export default {
        name: 'app',
        components: {
            'buttons': Buttons,
            'details-comp': Details,
            'helper-panel': HelperPanel,
            'drawer': Drawer
        },
        methods: {
            'store': function() {
                return $select(rootselector);
            }
        },
        mounted: function() {
            const renderer = $select(rendererSelector);

            if(renderer.domElement) {
                document.getElementById('threeRoot').appendChild(renderer.domElement);
            }
        }
    }
</script>

<style lang="css">

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