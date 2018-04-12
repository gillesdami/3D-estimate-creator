<template>
    <div>
        <table>
            <tr>
                <th>Produit</th>
                <th>Quantité</th>
                <th>Prix unitaire</th>
            </tr>
        </table>
        <cart-item v-for="obj in objectsInCart" :obj="obj"/>
    </div>
</template>

<script>
    import CartItem from "./CartItem.vue";
    import Cart from "./Cart";

    export default {
        components: {
            Cart,
            CartItem,
        },
        name: "cart-list",
        props: ['objectsInCart'],
    }
</script>

<style lang="css">
    table {
        text-align: left;
    }

    th, td {
        padding: 1vw;
    }
</style>