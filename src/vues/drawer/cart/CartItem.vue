<template>
    <table class="cartTable">
        <tr>
            <td class="product">{{ objInCart.name }}</td>
            <td class="qte tdItem">x{{ objInCart.qte }}</td>
            <td class="price tdItem">{{ objInCart.price.toFixed(2) }} €</td>
        </tr>
        <tr v-for="apparel in objInCart.apparels">
            <td v-if="!apparel.value.name.includes('aucun')" class="apparelValue">{{apparel.value.name}}</td>
            <td v-if="!apparel.value.name.includes('aucun')">{{apparel.value.price['ILE DE FRANCE']}} €</td>
        </tr>
    </table>
</template>

<script>
    export default {
        name: "cart-item",
        props: ['objInCart']
    }
</script>