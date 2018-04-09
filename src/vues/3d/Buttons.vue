<template>
    <div id="buttons">
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
    #buttons {
        margin: 0.5% 0 0 0.5%
    }

    #questionMark {
        height: 3%;
        width: 2%;
    }

    #trash {
        height: 3%;
        width: 2%;
    }
</style>