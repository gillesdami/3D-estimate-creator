<template>
    <div class="row first-div">
        <div id="v3D" class="col s9" :class="{'objectLoading': !detailsState().objectLoaded}">
            <header-atawa id="header"/>

            <details-comp id="details" v-show="detailsState().isDisplayed"/>

            <div id="threeRoot"></div>

            <helper-panel id="helperPanel"
                          v-show="store().helper.isDisplayed"/>

            <settings-panel id="settingsPanel"
                            v-show="store().settings.isDisplayed"/>

            <recap-order-panel id="recapOrderPanel"
                    v-show="store().recapOrder.isMainDisplayed"/>

            <div class="col s6 offset-s6" style="padding: 0">
                <button id="buttonEstimation" class="buttonEstimation" v-on:click="sendEstimation">ENVOYER MA DEMANDE
                </button>
            </div>
        </div>

        <clip-loader class="spinner"
                     :loading="!detailsState().objectLoaded"
                     :color="color"></clip-loader>

        <drawer id="drawer" class="col s3"
                :store="store()"/>
    </div>
</template>

<script>
    import HelperPanel from './3d/helperPanel/HelperPanel';
    import SettingsPanel from './3d/SettingsPanel';
    import Details from './3d/Details';
    import RecapOrder from './3d/recapOrder/RecapOrder';
    import Drawer from './drawer/Drawer.vue';
    import HeaderAtawa from './Header';
    import { $select } from '../sagas/vue';
    import { getDetailsState, objectsDisplayed, rendererSelector, rootselector } from '../selectors';
    import {
        actionCreator,
        DBCLICKED_CANVAS,
        MOUSE_CLICK,
        MOUSE_MOVE,
        MOUSE_UP,
        SET_RENDERER_SIZE,
        TOGGLE_RECAP_PANEL_MAIN
    } from '../actions';
    import ClipLoader from 'vue-spinner/src/ClipLoader'

    export default {
        name: 'app',
        components: {
            'details-comp': Details,
            'helper-panel': HelperPanel,
            'drawer': Drawer,
            'settings-panel': SettingsPanel,
            'header-atawa': HeaderAtawa,
            'recap-order-panel': RecapOrder,
            ClipLoader
        },
        data() {
            return {
                color: "#ff3a3b"
            }
        },
        methods: {
            store: function () {
                return $select(rootselector);
            },
            saveStoreToLocalStorage: function () {
                setInterval(() => {
                    const store = this.store();
                    localStorage.setItem("store", JSON.stringify(store));
                }, 3000);
            },
            detailsState: function () {
                return $select(getDetailsState);
            },
            getObjectsDisplayed: function () {
                return $select(objectsDisplayed)
            },
            setRendererSize: function (renderer) {
                const container = document.getElementById('threeRoot');
                this.$root.$emit('put', actionCreator(SET_RENDERER_SIZE, {
                    renderer,
                    width: container.clientWidth,
                    height: container.clientHeight
                }));
            },
            handleHideDetailsPanel: function () {
                const threeRoot = document.getElementById('threeRoot');

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
                    hold = false;
                });

                threeRoot.addEventListener('mousemove', e => {
                    this.$root.$emit('put', actionCreator(MOUSE_MOVE, {
                        event: e
                    }));
                });
            },
            sendEstimation: function () {
                this.$root.$emit('put', actionCreator(TOGGLE_RECAP_PANEL_MAIN));
            },
        },
        mounted: function () {
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

            this.handleHideDetailsPanel();

            window.addEventListener('resize', () => this.setRendererSize(renderer));

            this.saveStoreToLocalStorage();
        }
    }
</script>