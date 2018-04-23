<template>
    <div class="row">
        <div id="v3D" class="col s9">
            <details-comp id="details" v-show="detailsState().isDisplayed"/>

            <div id="threeRoot"></div>

            <buttons id="buttonsPanel"/>
            <helper-panel id="helperPanel"
                          v-show="store().helper.isDisplayed"/>
        </div>

        <drawer class="col s3"
                :store="store()"/>
    </div>
</template>

<script>
    import HelperPanel from './3d/helperPanel/HelperPanel';
    import Buttons from './3d/Buttons';
    import Details from './3d/Details';
    import { $select } from '../sagas/vue';
    import { rootselector, rendererSelector, getDetailsState } from '../selectors';
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
            store: function() {
                return $select(rootselector);
            },
            detailsState: function() {
                return $select(getDetailsState);
            },
            setRendererSize: function(renderer) {
                const container = document.getElementById('v3D');
                this.$root.$emit('put', actionCreator(SET_RENDERER_SIZE, {
                    renderer,
                    width: container.clientWidth,
                    height: container.clientHeight
                } ));
            }
        },
        mounted: function() {
            const renderer = $select(rendererSelector);
            const threeRoot = document.getElementById('threeRoot');
            threeRoot.appendChild(renderer.domElement);

            setTimeout(() => {
                this.setRendererSize(renderer);
                const detailsComp = document.getElementById('details');
                detailsComp.style.left = (0.6*threeRoot.clientWidth).toString();
            }, 100);

            window.addEventListener('resize', () => {
                this.setRendererSize(renderer);
            });
        }
    }
</script>

<style lang="css">
    /*
    Sans ça les select sont en display none
     */
    select {
        display: block;
    }

    /*
    Couleur de site de tentingo
     */
    html {
        background-color: #F6F7F8;
    }

    h3 {
        margin: 8px;
    }

    #v3D {
        padding: 0;
    }

    #details {
        position: absolute;
        top: 0;
    }

    #buttonsPanel {
        position: absolute;
        top: 0;
        left: 0;
        margin: 0.5% 0 0 0.5%;
    }

    #helperPanel {
        position: absolute;
        top: 15px;
        left: 0;
        width: 25%;
        background-color: #F6F7F8;
        border: 1px solid white;
        padding: 2vw;
        margin: 2vw;
    }
</style>