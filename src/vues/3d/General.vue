<template>
    <div>
        <div v-if="detailsState().itemName && detailsState().item">
            <p class="title">{{detailsState().itemName}}</p>
            <p> Prix : <span> {{detailsState().item.price["ILE DE FRANCE"]}} €</span></p>
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