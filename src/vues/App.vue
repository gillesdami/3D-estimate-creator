<template>
    <div id="app">
        <buttons id="buttonsPanel"/>
        <helper-panel id="helperPanel"/>
    </div>
</template>

<script>
    import Buttons from './3d/Buttons'
    import HelperPanel from './3d/helperPanel/HelperPanel'

    export default {
        name: 'app',
        components : {
            'helper-panel' : HelperPanel,
            'buttons' : Buttons
        },
        data() {
            return {
                msg: 'Welcome to Your Vue.js App!'
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