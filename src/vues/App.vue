<template>
    <div class="row first-div">
        <div id="v3D" class="col s9">
            <details-comp id="details" v-show="detailsState().isDisplayed"/>

            <Total id="total"/>

            <div id="threeRoot"></div>

            <buttons id="buttonsPanel"/>
            <helper-panel id="helperPanel"
                          v-show="store().helper.isDisplayed"/>

            <settings-panel id="settingsPanel"
                            v-show="store().settings.isDisplayed"/>

        </div>

        <drawer id="drawer" class="col s3"
                :store="store()"/>
    </div>
</template>

<script>
    import HelperPanel from './3d/helperPanel/HelperPanel';
    import SettingsPanel from './3d/SettingsPanel';
    import Buttons from './3d/Buttons';
    import Details from './3d/Details';
    import {$select} from '../sagas/vue';
    import {getDetailsState, objectsDisplayed, rendererSelector, rootselector} from '../selectors';
    import Drawer from './drawer/Drawer.vue';
    import Total from './Total';
    import {actionCreator, SET_RENDERER_SIZE, HIDE_DETAILS_PANEL, MOUSE_CLICK, DBCLICKED_CANVAS, MOUSE_MOVE, MOUSE_UP} from '../actions'

    export default {
        name: 'app',
        components: {
            SettingsPanel,
            'buttons': Buttons,
            'details-comp': Details,
            'helper-panel': HelperPanel,
            'drawer': Drawer,
            'settings-panel' : SettingsPanel,
            Total,
        },
        methods: {
            store: function() {
                return $select(rootselector);
            },
            saveStoreToLocalStorage: function() {
                setInterval(() => {
                    const store = this.store();
                    localStorage.setItem("store", JSON.stringify(store));
                }, 3000);
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
                }));

                const threeRoot = document.getElementById('threeRoot');
                const detailsComp = document.getElementById('details');
                detailsComp.style.left = (0.75*threeRoot.clientWidth).toString();
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

                    this.$root.$emit('put', actionCreator(MOUSE_UP));

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
            }, 100);

            // Désactiver click droit sur la scene
            threeRoot.addEventListener('contextmenu', event => event.preventDefault());

            this.handleHideDetailsPanel(threeRoot);

            window.addEventListener('resize', () => this.setRendererSize(renderer));

            this.saveStoreToLocalStorage();
        }
    }
</script>