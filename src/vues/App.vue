<template>
    <div id="app">
        <buttons id="buttonsPanel"/>
        <helper-panel v-if="store.helper.isDisplay" id="helperPanel"/>
        <object-list category="Tente de réception" expanded=1></object-list>
        <details-comp :object="object"></details-comp>
    </div>
</template>

<script>
    import HelperPanel from './3d/helperPanel/HelperPanel';
    import Buttons from './3d/Buttons';
    import ObjectList from './drawer/ObjectList.vue';
    import Details from './3d/Details';

    export default {
        name: 'app',
        components: {
            'helper-panel': HelperPanel,
            'buttons': Buttons,
            'details-comp': Details,
            'object-list': ObjectList,
        },
        props: ['store'],
        data() {
            return {
                object: {
                    itemName: "Tente",
                    price: "30",
                    settings: [{
                        name: "longueur",
                        type: "slider",
                        min: 3,
                        max: 300,
                        step: 3,
                        effect: {
                            type: "repeat-y"
                        }
                    },{
                        name: "hauteur",
                        type: "slider",
                        min: 5,
                        max: 200,
                        step: 5,
                        effect: {
                            type: "repeat-y"
                        }
                    },{
                        name: "couleur",
                        type: "select",
                        values: ["Rouge", "Vert", "Bleu"],
                        effect: {
                            type: "repeat-y"
                        }
                    } ]
                }
            }
        }
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