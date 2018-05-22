<template>
    <div class="general-header" v-if="detailsState().itemName && detailsState().item">
        <p class="title">{{detailsState().itemName}}</p>
        <p class="details-price"> Prix : <span> {{ detailsState().item.price["ILE DE FRANCE"].toFixed(2) }} €</span></p>
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