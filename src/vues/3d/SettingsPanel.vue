<template>
    <div>
        <button class="closeButton" v-on:click="closeSettings">X</button>
        <br>

        <div>
            <label>
                <input type="checkbox" class="filled-in" checked="checked"/>
                <span>Afficher la grille </span>
            </label>
        </div>
    </div>
</template>

<script>
    import { actionCreator, TOGGLE_SETTINGS_PANEL } from "../../actions";

    export default {
        name: "settings-panel",
        components: {},
        data() {
            return {
                displayGrid : true,
            }
        },
        methods: {
            closeSettings: function () {
                this.$root.$emit('put', actionCreator(TOGGLE_SETTINGS_PANEL));
            }
        },
    }
</script>