<template>
    <div class="row">
        <div id="v3D" class="col s8">
            <details-comp/>

            <!--<div id="threeRoot"></div>-->

            <buttons id="buttonsPanel"/>
            <helper-panel id="helperPanel"
                          v-if="store().helper.isDisplayed"/>
        </div>

        <drawer class="col s4"
                :store="store()"/>
    </div>
</template>

<script>
    import HelperPanel from './3d/helperPanel/HelperPanel';
    import Buttons from './3d/Buttons';
    import Details from './3d/Details';
    import { $select } from '../sagas/vue';
    import { rootselector, rendererSelector } from '../selectors';
    import Drawer from './drawer/Drawer.vue';
    import { actionCreator, SET_RENDERER_SIZE } from '../actions'

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
            },
            resizeRenderer: function() {

            }
        },
        mounted: function() {
            const renderer = $select(rendererSelector);

            document.getElementById('threeRoot').appendChild(renderer.domElement);

            window.addEventListener('resize', () => {
                const container = document.getElementById('v3D');
                this.$root.$emit('put', actionCreator(SET_RENDERER_SIZE, {
                    renderer,
                    width: container.clientWidth,
                    height: container.clientHeight
                } ));
            });
        }
    }
</script>

<style lang="css">
    #v3D {
        padding: 0;
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