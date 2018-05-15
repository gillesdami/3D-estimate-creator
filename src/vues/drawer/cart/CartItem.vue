<template>
    <table class="cartTable">
        <tr>
            <td class="product">{{ objInCart.name }}</td>
            <td class="qte tdItem">{{ objInCart.qte }}</td>
            <td class="price tdItem">{{ objInCart.price }} €</td>
        </tr>

        <template v-for="app in updateApparels()">
            <tr class="tdSubItem">
                <td class="product">{{app.type}}</td>
                <td class="tdItem" colspan="2">{{app.value}}</td>
            </tr>
        </template>
    </table>
</template>

<script>
    export default {
        name: "cart-item",
        props: ['objInCart'],
        methods: {
            updateApparels: function () {
                const apparels = [];

                this.objInCart.apparels.forEach(ap => {
                    apparels.push({
                        type: ap.type,
                        value: ap.value
                    });
                });

                return apparels;
            }
        }
    }
</script>