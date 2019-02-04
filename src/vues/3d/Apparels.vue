<template>
    <div v-if="detailsState().item && detailsState().item.apparels.length" class="apparels-box">
        <!-- Travées -->
        <div v-if="displaySpan(detailsState().itemName)" class="travees">
            <p class="label">Ajouter/Suppimer une travée</p>
            <button id="deleteSpanButton"
                    :disabled="shouldBeDisabled()"
                    v-on:click="deleteSpan"> - </button>
            <span> {{getArea()}} m²</span>
            <button id="addSpanButton" v-on:click="addSpan"> + </button>
        </div>

        <!-- Liste des apparels -->
        <div v-for="(apparel, index) in detailsState().item.apparels">
            <div v-if="apparel.type !== 'Structure pignon'" class="row" style="margin-bottom: 0;">
                <div class="col">
                    <p class="label">{{apparel.type}}</p>
                </div>
            </div>

            <div v-if="apparel.type !== 'Structure pignon'" class="row" style="margin-bottom: 0;">
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
    import {actionCreator, ADD_SPAN, ADD_SPAN_NUMBER, APPAREL_CHANGED, DELETE_SPAN} from '../../actions';
    import { $select } from '../../sagas/vue';
    import { getDetailsState, getSpansState } from "../../selectors";

    export default {
        name: "Apparels",
        data() {
            return {
                selectApparels: [],
                area: 0,
                spanByClick: false
            }
        },
        methods: {
            displaySpan : function (itemN) {
                const objectsAvailable = window.objectsAvailable;

                return objectsAvailable[itemN].travee;
            },
            shouldBeDisabled: function () {
                if (this.spansSate().length === 0) return true;
                else {
                    const spansObj = this.spansSate().find(obj => obj.uid === this.detailsState().item.uid);

                    if (!spansObj) return true;
                    return spansObj.spansNumber === 0;
                }
            },
            addSpan: function () {
                this.spanByClick = true;

                this.$root.$emit('put', actionCreator(ADD_SPAN_NUMBER, {
                    uid: this.detailsState().item.uid,
                    itemName: this.detailsState().itemName,
                    item : this.detailsState().item
                }));

                this.$root.$emit('put', actionCreator(ADD_SPAN, {
                    uid: this.detailsState().item.uid,
                    itemName: this.detailsState().itemName,
                    item : this.detailsState().item
                }));

                this.calculateArea();
            },
            deleteSpan: function () {
                this.spanByClick = true;

                this.$root.$emit('put', actionCreator(DELETE_SPAN, {
                    uid: this.detailsState().item.uid,
                    itemName: this.detailsState().itemName,
                    item : this.detailsState().item,
                    shouldIDeleteIt: true
                }));

                this.calculateArea();
            },
            getArea: function () {
                if (this.detailsState().item){
                    if (this.spansSate().length === 0) {
                        this.area = this.detailsState().item.area;
                    } else {
                        if (!this.spanByClick) {
                            this.calculateArea();
                        }
                    }
                }
                return this.area;
            },
            calculateArea: function () {
                const spansObj = this.spansSate().find(obj => obj.uid === this.detailsState().item.uid);

                if (spansObj) {
                    this.area = (spansObj.spansNumber + 1) * this.detailsState().item.area;
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