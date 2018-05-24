<template>
    <div>
        <button class="closeButton" v-on:click="closeSettings">X</button>

        <div class="switch">
            <label>
                Afficher la grille
                <input id="checkboxGrid" v-on:click="displayGrid" type="checkbox" checked>
                <span class="lever"></span>
            </label>
        </div>

    </div>
</template>

<script>
    import { actionCreator, DISPLAY_GRID, TOGGLE_SETTINGS_PANEL } from "../../actions";

    export default {
        name: "settings-panel",
        components: {},
        methods: {
            closeSettings: function () {
                this.$root.$emit('put', actionCreator(TOGGLE_SETTINGS_PANEL));
            },
            displayGrid: function () {
                this.$root.$emit('put', actionCreator(DISPLAY_GRID, {
                        displayGrid: document.getElementById("checkboxGrid").checked
                    })
                );
            }
        },
    }
</script>