<template>
    <table class="cartTable">
        <tr>
            <td class="product">{{ objInCart.name }}</td>
            <td class="qte tdItem">x{{ objInCart.qte }}</td>
            <td class="price tdItem">{{ objInCart.price.toFixed(2) }} €</td>
        </tr>
    </table>
</template>

<script>
    export default {
        name: "cart-item",
        props: ['objInCart']
    }
</script>