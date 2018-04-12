<template>
    <div id="general">
        <div v-if="detailsState().itemName && detailsState().item">
            <p> Nom : <span> {{detailsState().itemName}}</span></p>
            <p> Prix : <span> {{detailsState().item.price}} €</span></p>
        </div>
    </div>
</template>

<script>
    import { $select } from '../../sagas/vue';
    import { getDetailsState } from "../../selectors";

    export default {
        name: "General",
        methods : {
            detailsState: function() {
                return $select(getDetailsState);
            }
        }
    }
</script>

<style scoped>

</style>