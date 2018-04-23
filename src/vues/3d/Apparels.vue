<template>
    <div>
        <div v-if="detailsState().item && detailsState().item.apparels.length>0">
            <h3>Habillage</h3>
            <div class="input-field" v-for="(apparel, index) in detailsState().item.apparels">
                <select :v-model="selectApparels[index]"
                        v-on:change="handleChange(selectApparels[index], apparel.type)">
                    <option disabled selected>Faites votre choix</option>
                    <option v-for="value in apparel.values"
                            :value="`${value}`">{{value}}</option>
                </select>
            </div>
        </div>
    </div>
</template>

<script>
    import { actionCreator, APPAREL_CHANGED } from '../../actions';
    import { $select } from '../../sagas/vue';
    import { getDetailsState } from "../../selectors";

    export default {
        name: "Apparels",
        data() {
            return {
                selectApparels: []
            }
        },
        methods: {
            handleChange: function(value, type) {
                this.$root.$emit('put', actionCreator(APPAREL_CHANGED, {
                    itemName: this.detailsState().itemName,
                    apparel: {
                        type,
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

</style>