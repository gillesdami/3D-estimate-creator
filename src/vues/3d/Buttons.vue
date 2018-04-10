<template>
    <div>
        <img v-on:click="help" id="questionMark" src="../../../assets/questionMark.jpg"/>
        <img v-on:click="deleteAll" id="trash" src="../../../assets/trash.png"/>
    </div>
</template>

<script>
    export default {
        name: "buttons",
        data() {
            return {
                msg: 'Welcome to Your Vue.js App!'
            }
        },
        methods: {
            help: function () {
                alert('Display help panel')
            },
            deleteAll: function () {
                alert('Delete all ...')
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