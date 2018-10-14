<template>
    <div>
        <p class="elemCartPage"> > Estimation de votre budget :</p>
        <p class="elemCartPage">entre {{ totalMinus10().toFixed(2) }} € et {{ totalPlus10().toFixed(2) }} €</p>
        <p id="estimationCartPage">estimation non contractuelle</p>
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
            },
            totalMinus10: function () {
                return this.total() - (this.total() * 0.1);
            },
            totalPlus10: function () {
                return this.total() + (this.total() * 0.1);
            }
        }
    }
</script>