<template>
    <table class="cartTable">
        <tr>
            <td class="product">{{ objInCart.name }}</td>
            <td class="qte tdItem">{{ objInCart.qte }}</td>
            <td class="price tdItem">{{ objInCart.price }} €</td>
        </tr>
        <template v-for="app in updateApparels()">
            <td class="tdSubItem">{{ app.type }}</td>
            <tr class="tdSubItem" v-for="appDetails in app.values">
                <td class="product">{{appDetails.type}}</td>
                <td class="qte tdItem">{{appDetails.qte}}</td>
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

                this.objInCart.apparels.forEach((ap) => {
                    let apValues = [{
                        type: ap.values[0],
                        qte: this.objInCart.qte - 1,
                    }];

                    ap.values.forEach(value => {
                        apValues.forEach(v => {
                            if (v.type === value) {
                                v.qte += 1;
                            } else {
                                apValues.push({
                                    type: value,
                                    qte: 0
                                });
                            }
                        });

                    });

                    apparels.push({
                        type: ap.type,
                        values: apValues,
                    });
                });

                return apparels;
            },
        }
    }
</script>

<style lang="css">
    .tdSubItem {
        font-style: italic;
        font-size: small;
    }
</style>