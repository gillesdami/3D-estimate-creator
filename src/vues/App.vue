<template>
    <div id="app">
        <buttons/>
        <object-item :item="item"></object-item>
        <object-item :item="item"></object-item>
    </div>
</template>

<script>
    import Buttons from './3d/Buttons';
    import ObjectItem from './drawer/ObjectItem.vue';

    export default {
        name: 'app',
        components : {
            'buttons' : Buttons,
            'object-item' : ObjectItem
        },
        data() {
            return {
                msg: 'Welcome to Your Vue.js App!',
                item: {
                    name: "hi"
                }
            }
        }
    }
</script>

<style lang="css">
    #app {
        color: #56b983;
    }
</style>