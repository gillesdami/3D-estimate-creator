<template>
    <div v-if="detailsState().item && detailsState().item.apparels.length" class="apparels-box">
        <!-- Travées -->
        <div v-if="detailsState().itemName.includes('Tente de reception')" class="travees">
            <p class="label">Ajouter/Suppimer une travée</p>
            <button v-on:click="deleteSpan"> - </button>
            <span> {{surface}} m²</span>
            <button v-on:click="addSpan"> + </button>
        </div>

        <!-- Liste des apparels -->
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
    import {actionCreator, ADD_SPAN, APPAREL_CHANGED, DELETE_SPAN} from '../../actions';
    import { $select } from '../../sagas/vue';
    import { getDetailsState, getSpansState } from "../../selectors";

    export default {
        name: "Apparels",
        data() {
            return {
                selectApparels: [],
                surface: 0
            }
        },
        mounted: function () {
            if (this.detailsState().item) this.calculateSurface();
        },
        methods: {
            //SPAN = TRAVEE
            addSpan: function () {
                this.$root.$emit('put', actionCreator(ADD_SPAN, {
                    uid: this.detailsState().item.uid,
                    itemName: this.detailsState().itemName,
                    item : this.detailsState().item
                }));

                this.calculateSurface();
            },
            deleteSpan: function () {
                this.$root.$emit('put', actionCreator(DELETE_SPAN, {
                    uid: this.detailsState().item.uid,
                    itemName: this.detailsState().itemName,
                    item : this.detailsState().item
                }));

                this.calculateSurface();
            },
            calculateSurface: function () {
                const spansObj = this.spansSate().find(obj => obj.uid === this.detailsState().item.uid);

                if (spansObj) {
                    // 5 = Random number
                    this.surface = spansObj.spansNumber * 5;
                }
            },
            handleChange: function (value, type) {
                let valueToSend = null;

                this.detailsState().item.apparels.forEach(ap => {
                    ap.values.forEach(v => {
                        if (v.name === value) valueToSend = v;
                    })
                });

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
            },
            spansSate: function () {
                return $select(getSpansState)
            }
        }
    }
</script>