<template>
    <div>
        <span class="value"> Estimation : {{ total() }} € TTC* </span>
        <br>
        <span class="estimation"> *estimation non contractuelle</span>
    </div>
</template>

<script>
    import { $select } from '../sagas/vue';
    import { objectsDisplayed, totalSelector } from '../selectors';

    export default {
        name: "Total",
        methods: {
            total: function () {
                let totalItems = $select(totalSelector, window.objectsAvailable);
                const objDisplayed = $select(objectsDisplayed, window.objectsAvailable);

                let totalApparels = 0;

                objDisplayed.forEach(obj => {
                    obj.apparels.forEach(ap => {
                        if (!ap.value.name.includes("aucun"))
                            totalApparels += ap.value.price["ILE DE FRANCE"];
                    });
                });

                return totalItems + totalApparels;
            }
        }
    }
</script>