<template>
    <div class="details-panel">
        <general/>
        <parameters/>
        <apparels/>

        <div id="deleteButtonRow" class="row" v-if="detailsState().itemName && detailsState().item">
            <button id="validateButton" v-on:click="validateAndHideDetails">VALIDER</button>
            <button id="deleteObjectButton" v-on:click="deleteObjectDisplayed">SUPPRIMER</button>
            <!--<img v-on:click="deleteObjectDisplayed" id="trash" src="../../../assets/buttons/delete.svg"/>-->
        </div>

    </div>
</template>

<script>
    import General from './General';
    import Parameters from './Parameters';
    import Apparels from './Apparels';
    import { actionCreator, DELETE_OBJECT_DISPLAYED, HIDE_DETAILS_PANEL } from '../../actions';
    import { $select } from '../../sagas/vue';
    import { getDetailsState, objectsDisplayed } from "../../selectors";

    export default {
        name: "Details",
        components: {
            'general': General,
            'parameters': Parameters,
            'apparels': Apparels
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
                this.$root.$emit('put', actionCreator(HIDE_DETAILS_PANEL));
            }
        }
    }
</script>