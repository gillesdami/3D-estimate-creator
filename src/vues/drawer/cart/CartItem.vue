<template>
    <table class="cartTable">
        <tr>
            <td class="product">{{ objInCart.name }}</td>
            <td class="qte tdItem">x{{ objInCart.qte }}</td>
            <td class="price tdItem">{{ objInCart.price.toFixed(2) }} €</td>
        </tr>
        <tr v-for="apparel in objInCart.apparels">
            <td v-if="shouldIDisplayIt(apparel)" class="apparelValue">{{apparel.value.name}}
            </td>
            <td v-if="shouldIDisplayIt(apparel)">
                {{apparel.value.price['ILE DE FRANCE']}} €
            </td>
        </tr>
    </table>
</template>

<script>
    export default {
        name: "cart-item",
        props: ['objInCart'],
        methods: {
            shouldIDisplayIt: function (apparel) {
                let display = true;
                if(apparel.value.name.includes('aucun')) display = false;
                if(apparel.type === 'Renforcement') display = false;
                if(apparel.type === 'Structure pignon') display = false;
                if(apparel.type === 'Pignon') display = false;

                return display;
            }
        }
    }
</script>