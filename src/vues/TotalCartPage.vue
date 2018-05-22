<template>
    <div>
        <p class="elemCartPage"> > Estimation de votre budget :</p>
        <p class="elemCartPage">entre {{totalMinus10()}} € et {{totalPlus10()}} €</p>
        <p id="estimationCartPage">estimation non contractuelle</p>
    </div>
</template>

<script>
    import { $select } from '../sagas/vue';
    import { totalSelector } from '../selectors';
    import objectsAvailable from '../../resources/objectsAvailable.json';

    export default {
        name: "Total",
        methods: {
            total: function () {
                return $select(totalSelector, objectsAvailable);
            },
            totalMinus10: function() {
                return this.total() - (this.total() * 0.1);
            },
            totalPlus10: function() {
                return this.total() + (this.total() * 0.1);
            }
        }
    }
</script>