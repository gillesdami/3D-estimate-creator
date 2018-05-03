<template>
    <div>
        <h2>Panier</h2>
        <cart-list/>
        <br/>
        <h4>Total : {{ total() }} €</h4>
    </div>
</template>

<script>
    import objectsAvailable from '../../../../resources/objectsAvailable.json';
    import CartList from "./CartList";
    import { $select } from '../../../sagas/vue';
    import { totalSelector } from '../../../selectors';

    export default {
        components: {CartList},
        name: "cart",
        methods: {
            total: function () {
                return $select(totalSelector, objectsAvailable);
            }
        }
    }
</script>

<style lang="css">

</style>