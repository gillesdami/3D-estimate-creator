<template>
    <div id="app">
        <buttons/>
    </div>
</template>

<script>
    import Buttons from './3d/Buttons'
    export default {
        name: 'app',
        components : {
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
</style>