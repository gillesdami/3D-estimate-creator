<template>
    <div>
        <!--<img v-on:click="settings" id="settings" src="../../../assets/buttons/settings.svg"/>-->
        <img v-on:click="help" id="questionMark" src="../../../assets/buttons/help.svg"/>
        <img v-on:click="deleteAll" id="trash" src="../../../assets/buttons/delete.svg"/>
    </div>
</template>

<script>
    import { actionCreator, DELETE_ALL, TOGGLE_HELPER_PANEL, TOGGLE_SETTINGS_PANEL } from "../../actions";

    export default {
        name: "buttons",
        data() {
            return {}
        },
        methods: {
            help: function () {
                this.$root.$emit('put', actionCreator(TOGGLE_HELPER_PANEL));
            },
            deleteAll: function () {
                if (confirm('Êtes-vous sûr de vouloir tout supprimer ? Cette action est irréversible !')) {
                    this.$root.$emit('put', actionCreator(DELETE_ALL));
                }
            },
            settings: function () {
                this.$root.$emit('put', actionCreator(TOGGLE_SETTINGS_PANEL));
            },
        }
    }
</script>