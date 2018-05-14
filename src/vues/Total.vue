<template>
    <div id="total">
        <p class="value"> Total : {{total()}} €* </p>
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

<style scoped>
    .estimation {
        margin-top: 0;
        font-size: 0.8em;
    }

    .value {
        margin-bottom: 0;
    }

    #total {
        font-weight: bold;
    }
</style>