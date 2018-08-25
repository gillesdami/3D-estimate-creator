<template>
    <div>
        <p class="elemCartPage"> > Estimation de votre budget :</p>
        <p class="elemCartPage">entre {{ totalMinus10().toFixed(2) }} € et {{ totalPlus10().toFixed(2) }} €</p>
        <p id="estimationCartPage">estimation non contractuelle</p>
    </div>
</template>

<script>
    import { $select } from '../sagas/vue';
    import { totalSelector } from '../selectors';

    export default {
        name: "Total",
        methods: {
            total: function () {
                return $select(totalSelector, window.objectsAvailable);
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