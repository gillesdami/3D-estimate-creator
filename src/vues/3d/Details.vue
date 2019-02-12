<template>
    <div class="details-panel">

        <general></general>
        <parameters v-if="!isMobilier()"></parameters>
        <apparels v-if="!isMobilier()"></apparels>

        <div v-if="isMobilier()">
            <p class="label">Ajouter/Suppimer du mobilier</p>
            <button id="deleteSpanButton"
                    :disabled="qte <= 1"
                    v-on:click="deleteMobi"> - </button>
            <input type="number" style="width: 40%;" v-model="qte"/>
            <button id="addSpanButton" v-on:click="addMobi"> + </button>

            <div id="deleteButtonRow" class="row">
                <button id="validateButton" v-on:click="validateAndHideDetails">VALIDER</button>
                <img v-on:click="deleteMobiDisplayed" id="trashDetails" src="../../../assets/buttons/delete.svg"/>
            </div>
        </div>

        <div id="deleteButtonRow" class="row" v-if="detailsState().itemName && detailsState().item && !isMobilier()">
            <button id="validateButton"
                    v-if="objectsDisplay().filter(obj => obj.uid === detailsState().item.uid)[0] && !objectsDisplay().filter(obj => obj.uid === detailsState().item.uid)[0].isValidated"
                    v-on:click="validateAndHideDetails">VALIDER
            </button>
            <img v-on:click="deleteObjectDisplayed" id="trashDetails" src="../../../assets/buttons/delete.svg"/>
        </div>

    </div>
</template>

<script>
    import General from './General';
    import Parameters from './Parameters';
    import Apparels from './Apparels';
    import {
        actionCreator,
        DELETE_OBJECT_DISPLAYED,
        HIDE_DETAILS_PANEL,
        VALIDATE_OBJECT_DISPLAYED,
        RESET_ITEM_SPAN,
        ADD_MOBI,
        REMOVE_MOBI,
        SET_MOBI
    } from '../../actions';
    import { $select } from '../../sagas/vue';
    import { getDetailsState, objectsDisplayed, getMobilier } from "../../selectors";

    export default {
        name: "Details",
        components: {
            'general': General,
            'parameters': Parameters,
            'apparels': Apparels
        },
        data() {
            return {
                qte: ($select(getMobilier)
                    .find(m => m.itemName === this.detailsState().itemName) || {qte: 1})
                    .qte
            }
        },
        methods: {
            detailsState: function () {
                return $select(getDetailsState);
            },
            objectsDisplay: function () {
                return $select(objectsDisplayed);
            },
            isMobilier: function() {
                return (this.detailsState().item || {}).section === "Mobilier"
            },
            deleteObjectDisplayed: function () {
                if (confirm('Êtes-vous sûr de vouloir supprimer cet objet ?')) {
                    this.$root.$emit('put', actionCreator(DELETE_OBJECT_DISPLAYED, {
                        uid: this.detailsState().item.uid
                    }));
                    this.$root.$emit('put', actionCreator(RESET_ITEM_SPAN, {
                        uid: this.detailsState().item.uid
                    }));
                }
            },
            deleteMobiDisplayed: function () {
                if (confirm('Êtes-vous sûr de vouloir supprimer cet objet ?')) {
                    this.qte = 0;
                }
            },
            validateAndHideDetails: function () {
                this.$root.$emit('put', actionCreator(VALIDATE_OBJECT_DISPLAYED, {
                    uid: this.detailsState().item.uid,
                    "isValidated": true
                }));
                this.$root.$emit('put', actionCreator(HIDE_DETAILS_PANEL));
            },
            addMobi: function() {
                this.qte++;
            },
            deleteMobi: function() {
                this.qte--;
            }
        },
        watch: {
            qte: function() {
                if(this.isMobilier) {
                    this.$root.$emit('put', actionCreator(SET_MOBI, {
                        itemName: this.detailsState().itemName,
                        qte : this.qte
                    }));
                }
            }
        },
        updated() {
            this.qte = ($select(getMobilier)
                    .find(m => m.itemName === this.detailsState().itemName) || {qte: 1})
                    .qte
        }
    }
</script>