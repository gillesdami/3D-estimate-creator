<template>
    <div>
        <div v-if="detailsState().item && detailsState().item.apparels.length>0">
            <p class="title">Habillage</p>
            <div class="input-field" v-for="(apparel, index) in detailsState().item.apparels">
                <select :value="apparel.value"
                        @input="selectApparels[index] = $event.target.value"
                        v-on:change="handleChange(selectApparels[index], apparel.type)">
                    <option selected disabled :value="null">Faites votre choix</option>
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
                    uid: this.detailsState().item.uid,
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
    .title {
        font-size: 1.5em;
        font-weight: bold;
    }
</style>