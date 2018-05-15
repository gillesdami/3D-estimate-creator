<template>
    <div class="details-panel">
        <general></general>
        <parameters></parameters>
        <apparels></apparels>

        <div id="deleteButtonRow" class="row" v-if="detailsState().itemName && detailsState().item">
            <div class="col s12">
                <button id="deleteObjectButton" v-on:click="deleteObjectDisplayed">Supprimer l'objet</button>
            </div>
        </div>
    </div>
</template>

<script>
    import General from './General';
    import Parameters from './Parameters';
    import Apparels from './Apparels';
    import { actionCreator, DELETE_OBJECT_DISPLAYED } from '../../actions';
    import { $select } from '../../sagas/vue';
    import { getDetailsState } from "../../selectors";

    export default {
        name: "Details",
        components: {
            'general': General,
            'parameters': Parameters,
            'apparels': Apparels
        },
        methods: {
            detailsState: function() {
                return $select(getDetailsState);
            },
            deleteObjectDisplayed: function() {
                this.$root.$emit('put', actionCreator(DELETE_OBJECT_DISPLAYED, {
                    uid: this.detailsState().item.uid
                }));
            }
        }
    }
</script>