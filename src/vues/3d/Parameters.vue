<template>
    <div id="parameters">
        <div v-if="selects.length>0">
            <div v-for="(select, index) in selects">
                <span>  </span>
                <select name="color"
                        v-model="selectSettings[index]"
                        v-on:change="dispatchChange(selectSettings[index], select.name)">
                    <option v-for="value in select.values" :value="`${value}`">{{value}}</option>
                </select>
            </div>
        </div>

        <div v-if="sliders.length>0">
            <div v-for="(slider, index) in sliders">
                <span>{{slider.name}}</span>
                <input :id="`rangeInput${index}`"
                       type="range"
                       v-model="sliderSettings[index]"
                       v-on:change="dispatchChange(sliderSettings[index], slider.name)"
                       :min="slider.min"
                       :max="slider.max"
                       :step="slider.step">
                <span :id="`rangeInputValue${index}`"></span>
            </div>
        </div>
    </div>
</template>

<script>
    import { actionCreator, SETTING_CHANGED } from '../../actions';
    import { $select } from '../../sagas/vue';
    import { getDetailsState } from "../../selectors";

    export default {
        name: "Parameters",
        data() {
            return {
                sliderSettings: [],
                selectSettings: [],
                sliders: [],
                selects: [],
                details: this.detailsState()
            }
        },
        methods: {
            dispatchChange: function(value, name) {
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
        },
        updated() {
            this.detailsState().item.settings.forEach(setting => {
                switch (setting.type) {
                    case 'slider':
                        this.sliders.push(setting);
                        break;
                    case 'select':
                        this.selects.push(setting);
                        break;
                    default:
                }
            });

            // if (this.sliders.length > 0) {
            //     this.sliders.forEach((sliderObject, index) => {
            //         const slider = document.getElementById(`rangeInput${index}`);
            //         const output = document.getElementById(`rangeInputValue${index}`);
            //         output.innerHTML = slider.value; // Display the default slider value
            //
            //         // Update the current slider value (each time you drag the slider handle)
            //         slider.oninput = function() {
            //             output.innerHTML = this.value;
            //         }
            //     });
            // }
        }
    }
</script>

<style scoped>

</style>