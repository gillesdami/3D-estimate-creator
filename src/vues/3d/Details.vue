<template>
    <div class="details-panel">

        <general></general>
        <parameters></parameters>
        <apparels></apparels>

        <div id="deleteButtonRow" class="row" v-if="detailsState().itemName && detailsState().item">
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
        VALIDATE_OBJECT_DISPLAYED
    } from '../../actions';
    import { $select } from '../../sagas/vue';
    import { getDetailsState, objectsDisplayed } from "../../selectors";

    export default {
        name: "Details",
        components: {
            'general': General,
            'parameters': Parameters,
            'apparels': Apparels
        },
        data() {
            return {}
        },
        methods: {
            detailsState: function () {
                return $select(getDetailsState);
            },
            objectsDisplay: function () {
                return $select(objectsDisplayed);
            },
            deleteObjectDisplayed: function () {
                if (confirm('Êtes-vous sûr de vouloir supprimer cet objet ?')) {
                    this.$root.$emit('put', actionCreator(DELETE_OBJECT_DISPLAYED, {
                        uid: this.detailsState().item.uid
                    }));
                }
            },
            validateAndHideDetails: function () {
                this.$root.$emit('put', actionCreator(VALIDATE_OBJECT_DISPLAYED, {
                    uid: this.detailsState().item.uid,
                    "isValidated": true
                }));
                this.$root.$emit('put', actionCreator(HIDE_DETAILS_PANEL));
            }
        }
    }
</script>