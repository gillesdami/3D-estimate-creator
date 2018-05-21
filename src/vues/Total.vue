<template>
    <div>
        <p class="value"> Estimation : {{total()}} € TTC* </p>
        <p class="estimation"> *estimation non contractuelle</p>
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