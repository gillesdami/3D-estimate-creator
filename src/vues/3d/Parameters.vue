<template>
    <div>
        <div v-if="detailsState().item && detailsState().item.settings.length>0">
            <p class="title">Paramètres</p>
            <div v-for="(setting, index) in detailsState().item.settings">
                <div v-if="setting.type === 'slider'">
                    <span>{{setting.name}}</span>
                    <p class="range-field">
                        <input :id="`rangeInput${index}`"
                               type="range"
                               @input="sliderSettings[index] = $event.target.value"
                               v-on:change="handleChange(sliderSettings[index], setting.name, index)"
                               :min="setting.min"
                               :max="setting.max"
                               :step="setting.step">
                    </p>
                    <span :id="`rangeInputValue${index}`"></span>
                </div>

                <div v-if="setting.type === 'select'">
                    <span>{{setting.name}}</span>
                    <select @input="selectSettings[index] = $event.target.value"
                            v-on:change="handleChange(selectSettings[index], setting.name)">
                        <option disabled selected value="">Faites votre choix</option>
                        <option v-for="value in setting.values" :value="`${value}`">{{value}}</option>
                    </select>
                </div>


            </div>
        </div>
    </div>
</template>

<script>
    import {actionCreator, SETTING_CHANGED} from '../../actions';
    import {$select} from '../../sagas/vue';
    import {getDetailsState} from "../../selectors";

    export default {
        name: "Parameters",
        data() {
            return {
                sliderSettings: [],
                selectSettings: []
            }
        },
        methods: {
            handleChange: function(value, name, index) {
                if (index >= 0) {
                    const slider = document.getElementById(`rangeInput${index}`);
                    const output = document.getElementById(`rangeInputValue${index}`);

                    output.innerHTML = slider.value; // Display the default slider value

                    // Update the current slider value (each time you drag the slider handle)
                    slider.oninput = function() {
                        output.innerHTML = this.value;
                    };
                }

                this.$root.$emit('put', actionCreator(SETTING_CHANGED, {
                    itemName: this.detailsState().itemName,
                    setting: {
                        name,
                        value
                    }
                }));
            },
            detailsState: function() {
                return $select(getDetailsState);
            }
        }
    }
</script>

<style scoped>
    .title {
        font-size: 1.5em;
        font-weight: bold;
    }
</style>