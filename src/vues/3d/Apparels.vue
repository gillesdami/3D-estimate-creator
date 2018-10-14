<template>
    <div v-if="detailsState().item && detailsState().item.apparels.length>0" class="apparels-box">
        <div v-for="(apparel, index) in detailsState().item.apparels">
            <div class="row" style="margin-bottom: 0;">
                <div class="col">
                    <p class="label">{{apparel.type}}</p>
                </div>
            </div>

            <div class="row" style="margin-bottom: 0;">
                <div class="col" style="width: 100%">
                    <select :value="apparel.value.name"
                            @input="selectApparels[index] = $event.target.value"
                            v-on:change="handleChange(selectApparels[index], apparel.type)">
                        <option v-for="value in apparel.values"
                                :value="`${value.name}`">{{value.name}}
                        </option>
                    </select>
                </div>
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
            handleChange: function (value, type) {
                let valueToSend = null;

                this.detailsState().item.apparels.forEach(ap => {
                    ap.values.forEach(v => {
                        if (v.name === value) valueToSend = v;
                    })
                });

                console.log(valueToSend);

                this.$root.$emit('put', actionCreator(APPAREL_CHANGED, {
                    uid: this.detailsState().item.uid,
                    itemName: this.detailsState().itemName,
                    apparel: {
                        type,
                        "value": valueToSend
                    },
                    settings: this.detailsState().item.settings
                }));
            },
            detailsState: function () {
                return $select(getDetailsState);
            }
        }
    }
</script>