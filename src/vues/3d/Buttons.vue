<template>
    <div>
        <img v-on:click="help" id="questionMark" src="../../../assets/questionMark.jpg"/>
        <img v-on:click="deleteAll" id="trash" src="../../../assets/trash.png"/>
    </div>
</template>

<script>
    import { actionCreator, DELETE_ALL, TOGGLE_HELPER_PANEL } from "../../actions";

    export default {
        name: "buttons",
        data() {
            return {
                msg: 'Welcome to Your Vue.js App!'
            }
        },
        methods: {
            help: function () {
                this.$root.$emit('put', actionCreator(TOGGLE_HELPER_PANEL));
            },
            deleteAll: function () {
                this.$root.$emit('put', actionCreator(DELETE_ALL));
            }
        }
    }
</script>

<style lang=css>
    #questionMark {
        height: 1.5vw;
        width: 1.5vw;
    }

    #trash {
        height: 1.5vw;
        width: 1.5vw;
    }
</style>