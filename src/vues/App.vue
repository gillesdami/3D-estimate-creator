<template>
    <div class="row first-div">
        <div id="v3D" class="col s9">
            <details-comp id="details" v-show="detailsState().isDisplayed"/>

            <div id="threeRoot"></div>

            <buttons id="buttonsPanel"/>
            <helper-panel id="helperPanel"
                          v-show="store().helper.isDisplayed"/>
        </div>

        <drawer id="drawer" class="col s3"
                :store="store()"/>
    </div>
</template>

<script>
    import HelperPanel from './3d/helperPanel/HelperPanel';
    import Buttons from './3d/Buttons';
    import Details from './3d/Details';
    import { $select } from '../sagas/vue';
    import { rootselector, rendererSelector, getDetailsState, objectsDisplayed } from '../selectors';
    import Drawer from './drawer/Drawer.vue';
    import {actionCreator, SET_RENDERER_SIZE, HIDE_DETAILS_PANEL, MOUSE_CLICK, DBCLICKED_CANVAS, MOUSE_MOVE} from '../actions'

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
            getObjectsDisplayed: function() {
                return $select(objectsDisplayed)
            },
            setRendererSize: function(renderer) {
                const container = document.getElementById('v3D');
                this.$root.$emit('put', actionCreator(SET_RENDERER_SIZE, {
                    renderer,
                    width: container.clientWidth,
                    height: container.clientHeight
                } ));
            },
            handleHideDetailsPanel: function (threeRoot) {
                let mouseTimer;
                let hold = false;

                threeRoot.addEventListener('mousedown', e => {
                    this.$root.$emit('put', actionCreator(MOUSE_CLICK, {
                        event: e,
                        objectsDisplayed: this.getObjectsDisplayed()
                    }));

                    mouseTimer = setTimeout(() => hold = true, 500);
                });

                threeRoot.addEventListener('mouseup', e => {
                    clearTimeout(mouseTimer);

                    if (!hold) {
                        if (!document.getElementById('drawer').contains(e.target) &&
                            !document.getElementById('details').contains(e.target)){
                            if (!this.detailsState().clickFromObject && this.detailsState().isDisplayed) {
                                this.$root.$emit('put', actionCreator(HIDE_DETAILS_PANEL));
                            }
                        }
                    } else {
                        hold = false;
                    }
                });

                threeRoot.addEventListener('mousemove', e => {
                    this.$root.$emit('put', actionCreator(MOUSE_MOVE, {
                        event: e
                    }));
                });
            }
        },
        mounted: function() {
            const renderer = $select(rendererSelector);
            const threeRoot = document.getElementById('threeRoot');
            threeRoot.appendChild(renderer.domElement);
            threeRoot.addEventListener('contextmenu', event => event.preventDefault());
            threeRoot.addEventListener('dblclick', e => this.$root.$emit('put', actionCreator(DBCLICKED_CANVAS, {event: e})));

            setTimeout(() => {
                this.setRendererSize(renderer);
                const detailsComp = document.getElementById('details');
                detailsComp.style.left = (0.75*threeRoot.clientWidth).toString();
            }, 100);

            // Désactiver click droit sur la scene
            threeRoot.addEventListener('contextmenu', event => event.preventDefault());

            this.handleHideDetailsPanel(threeRoot);

            window.addEventListener('resize', () => this.setRendererSize(renderer));
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

    .first-div {
        margin-bottom: 0;
        overflow-x: hidden;
        overflow-y: hidden;
        height: 100%;
    }

    #v3D {
        padding: 0;
    }

    #drawer {
        overflow-y: scroll;
        height: 100%;
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