<template>
    <div>
        <span class="value"> Estimation : {{ total().toFixed(2) }} € TTC* </span>
        <br>
        <span class="estimation"> *estimation non contractuelle</span>
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
            }
        }
    }
</script>