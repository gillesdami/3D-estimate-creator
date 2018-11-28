<template>
    <div>
        <p class="elemCartPage"> > Estimation de votre budget :</p>
        <p class="elemCartPage">entre {{ totalMinus10().toFixed(2) }} € et {{ totalPlus10().toFixed(2) }} €</p>
        <p id="estimationCartPage">estimation non contractuelle</p>
    </div>
</template>

<script>
    import {$select} from '../sagas/vue';
    import {getSpansState, objectsDisplayed, totalSelector} from '../selectors';

    export default {
        name: "Total",
        methods: {
            total: function () {
                let totalItems = $select(totalSelector, window.objectsAvailable);
                const objDisplayed = $select(objectsDisplayed, window.objectsAvailable);
                const spanState = $select(getSpansState);

                let allApparels = {};
                let totalApparels = 0;

                objDisplayed.forEach(obj => {

                    obj.apparels.forEach(ap => {
                        if (this.shouldICalculIt(ap)) {
                            totalApparels += ap.value.price["ILE DE FRANCE"];
                            if (ap.type.includes("Toit")) {
                                allApparels.toit = ap.value.price['ILE DE FRANCE'];
                            } else if (ap.type.includes("Plancher")) {
                                allApparels.plancher = ap.value.price['ILE DE FRANCE'];
                            } else if (ap.type.includes("Rideau Longueur")) {
                                allApparels.rideauLongueur = ap.value.price['ILE DE FRANCE'];
                            } else if (ap.type.includes("Rideau Largeur")) {
                                allApparels.rideauLargeur = ap.value.price['ILE DE FRANCE'];
                            }
                        }
                    });

                    // Gestion des travées
                    const item = spanState.filter((span) => obj.uid === span.uid);
                    if (item.length !== 0) {
                        totalItems += window.objectsAvailable[obj.name].price["ILE DE FRANCE"] * item[0].spansNumber;

                        totalItems += allApparels.toit * (item[0].spansNumber + 1);
                        totalItems += allApparels.plancher * (item[0].spansNumber + 1);
                        totalItems += allApparels.rideauLongueur * (item[0].spansNumber + 1) * 2;
                        totalItems += allApparels.rideauLargeur * 2;
                    } else {
                        totalItems += totalApparels;
                    }

                    totalApparels = 0;

                });

                return totalItems;
            },
            totalMinus10: function () {
                return this.total() - (this.total() * 0.1);
            },
            totalPlus10: function () {
                return this.total() + (this.total() * 0.1);
            },
            shouldICalculIt: function (apparel) {
                let display = true;
                if (apparel.value.name.includes('aucun')) display = false;
                if (apparel.type === 'Renforcement') display = false;
                if (apparel.type === 'Structure pignon') display = false;
                if (apparel.type === 'Pignon') display = false;

                return display;
            }
        }
    }
</script>