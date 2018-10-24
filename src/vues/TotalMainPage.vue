<template>
    <div>
        <span class="value"> Estimation : {{ total() }} € TTC* </span>
        <br>
        <span class="estimation"> *estimation non contractuelle</span>
    </div>
</template>

<script>
    import { $select } from '../sagas/vue';
    import { getSpansState, objectsDisplayed, totalSelector } from '../selectors';

    export default {
        name: "Total",
        methods: {
            total: function () {
                let totalItems = $select(totalSelector, window.objectsAvailable);
                const objDisplayed = $select(objectsDisplayed, window.objectsAvailable);
                const spanState = $select(getSpansState);

                let totalApparels = 0;

                objDisplayed.forEach(obj => {

                    obj.apparels.forEach(ap => {
                        if (!ap.value.name.includes("aucun"))
                            totalApparels += ap.value.price["ILE DE FRANCE"];
                    });

                    // Gestion des travées
                    const item = spanState.filter((span) => obj.uid === span.uid);
                    if (item.length !== 0) {

                        totalItems += window.objectsAvailable[obj.name].price["ILE DE FRANCE"] * item[0].spansNumber;
                        totalItems += totalApparels * (item[0].spansNumber + 1);
                    } else {
                        totalItems += totalApparels;
                    }

                    totalApparels = 0;

                });


                return totalItems;
            }
        }
    }
</script>