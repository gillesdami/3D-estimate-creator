<template>
    <div>
        <h2>Panier</h2>
        <cart-list/>
        <br/>
        <span>Total : {{ total() }} €</span>
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
            total: function() {
                const tt =  $select(totalSelector, objectsAvailable);
                return tt;
            }
        }
    }
</script>

<style lang="css">

</style>