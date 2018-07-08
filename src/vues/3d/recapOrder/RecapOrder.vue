<template>
    <div>
        <h5 style="color: #ff3a3b">Récapitulatif de votre commande :</h5>

        <recap-order-cart v-show="orderState().isRecapDisplayed"/>
        <recap-order-form v-show="orderState().isFormDisplayed"/>
    </div>
</template>

<script>
    import RecapOrderForm from './RecapOrderForm';
    import RecapOrderCart from './RecapOrderCart';
    import { $select } from '../../../sagas/vue';
    import { getRecapOrder } from '../../../selectors';

    export default {
        name: "RecapOrder",
        components: {
            "recap-order-form": RecapOrderForm,
            "recap-order-cart": RecapOrderCart,
        },
        data: () => ({}),
        methods: {
            orderState: function () {
                return $select(getRecapOrder);
            },
        }
    }
</script>