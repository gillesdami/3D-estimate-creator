<template>
    <div id="app">
        <drawer :store="store"/>

        <buttons id="buttonsPanel"/>
        <helper-panel v-if="store.helper.isDisplay" id="helperPanel"/>

        <details-comp :object="object"/>
    </div>
</template>

<script>
    import HelperPanel from './3d/helperPanel/HelperPanel.vue';
    import Buttons from './3d/Buttons.vue';
    import Details from './3d/Details.vue';
    import Drawer from './drawer/Drawer.vue';

    export default {
        name: 'app',
        components: {
            'buttons': Buttons,
            'details-comp': Details,
            'helper-panel': HelperPanel,
            'drawer': Drawer,
        },
        props: ['store'],
        data() {
            return {
                object: {
                    itemName: 'Tente',
                    price: '30',
                    settings: [{
                        name: 'longueur',
                        type: 'slider',
                        min: 3,
                        max: 300,
                        step: 3,
                        effect: {
                            type: 'repeat-y'
                        }
                    }],
                    apparels: [{
                        type: 'rideau',
                        values: ['Rideau blanc 3x3', 'Rideau cristal 3x3']
                    }]
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