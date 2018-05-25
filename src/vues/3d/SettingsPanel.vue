<template>
    <div>
        <button class="closeButton" v-on:click="closeSettings">X</button>

        <div class="switch elemSettings">
            <label>
                <span>Afficher la grille</span>
                <input id="checkboxGrid" v-on:click="displayGrid" type="checkbox" checked>
                <span class="lever"></span>
            </label>
        </div>
        <div class="elemSettings">
            <label v-if="settingsState().displayGrid">
                <span>Taille de la grille</span>
                <input type="range"
                       v-on:change="sizeGrid($event)"
                       :min="5"
                       :max="100"
                       :step="5">
            </label>
        </div>
        <div class="elemSettings">
            <label>
                <span>Choix du décor</span>
                <select v-on:change="changeBackground($event)">
                    <option disabled selected value="">Faites votre choix</option>
                    <option v-for="value in backgrounds">{{value}}</option>
                </select>
            </label>
        </div>

    </div>
</template>

<script>
    import { actionCreator, DISPLAY_GRID, RESIZE_GRID, TOGGLE_SETTINGS_PANEL, UPDATE_BACKGROUND } from "../../actions";
    import { $select } from '../../sagas/vue';
    import { getSettingsState } from "../../selectors";

    export default {
        name: "settings-panel",
        components: {},
        data() {
            return {
                backgrounds: ["Aucun", "Herbe"]
            }
        },
        methods: {
            settingsState: function () {
                return $select(getSettingsState);
            },
            closeSettings: function () {
                this.$root.$emit('put', actionCreator(TOGGLE_SETTINGS_PANEL));
            },
            displayGrid: function () {
                this.$root.$emit('put', actionCreator(DISPLAY_GRID, {
                        displayGrid: document.getElementById("checkboxGrid").checked
                    })
                );
            },
            sizeGrid: function (event) {
                this.$root.$emit('put', actionCreator(RESIZE_GRID, {
                        sizeGrid: event.target.value
                    })
                );
            },
            changeBackground: function(event) {
                this.$root.$emit('put', actionCreator(UPDATE_BACKGROUND, {
                        background: event.target.value
                    })
                );
            }
        },
    }
</script>