<template>
    <div>
        <p class="elemCartPage"> > Estimation de votre budget :</p>
        <p class="elemCartPage">entre {{ totalMinus10().toFixed(2) }} € et {{ totalPlus10().toFixed(2) }} €</p>
        <p id="estimationCartPage">estimation non contractuelle</p>
    </div>
</template>

<script>
    import {$select} from '../sagas/vue';
    import {getSpansState, objectsDisplayed, totalSelector, getMobilier} from '../selectors';

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

                            if (ap.type === "Rideau") {
                                totalApparels += ap.value.price["ILE DE FRANCE"] * 4;
                            } else if (ap.type.includes("Toit")) {
                                let area = window.objectsAvailable[obj.name].area;
                                if(area != null) {
                                    allApparels.toit = ap.value.price['ILE DE FRANCE'] * area;
                                    totalApparels += ap.value.price["ILE DE FRANCE"] * area;
                                } else {
                                    allApparels.toit = ap.value.price['ILE DE FRANCE'];
                                    totalApparels += ap.value.price["ILE DE FRANCE"];
                                }
                            } else if (ap.type.includes("Plancher")) {
                                allApparels.plancher = ap.value.price['ILE DE FRANCE'];
                                totalApparels += ap.value.price["ILE DE FRANCE"];
                            } else if (ap.type.includes("Rideau Longueur")) {
                                allApparels.rideauLongueur = ap.value.price['ILE DE FRANCE'];
                                totalApparels += ap.value.price["ILE DE FRANCE"] * 2;
                            } else if (ap.type.includes("Rideau Largeur")) {
                                allApparels.rideauLargeur = ap.value.price['ILE DE FRANCE'];
                                totalApparels += ap.value.price["ILE DE FRANCE"] * 2;
                            } else {
                                totalApparels += ap.value.price["ILE DE FRANCE"];
                            }
                        }
                    });

                    // Gestion des travées
                    const item = spanState.filter((span) => obj.uid === span.uid);
                    if (item.length !== 0) {
                        // prix de l'item de base
                        totalItems += window.objectsAvailable[obj.name].price["ILE DE FRANCE"] * item[0].spansNumber;

                        // on multiplie les apparels * nombre de travees
                        totalApparels *= (item[0].spansNumber + 1);

                        // on enlève les rideaux qui ne sont pas au milieu
                        totalApparels -= allApparels.rideauLargeur * (item[0].spansNumber + 1);
                    }

                    totalItems += totalApparels;

                    totalApparels = 0;

                });

                $select(getMobilier).forEach(o => {
                    totalItems += window.objectsAvailable[o.itemName].price["ILE DE FRANCE"] * o.qte;
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