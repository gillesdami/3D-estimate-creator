<template>
    <table>
        <tr>
            <td>{{ objInCart.name }}</td>
            <td class="tdItem">{{ objInCart.qte }}</td>
            <td class="tdItem">{{ objInCart.price }} €</td>
        </tr>
        <tr v-for="app in updateApparels()">
            <td class="tdSubItem">{{ app.name }} - {{ app.value }}</td>
            <td class="tdSubItem">{{ app.qte }}</td>
        </tr>
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
                    let apTmp = {
                        name: ap.name,
                        value: ap.value,
                        qte: 1
                    };

                    // Si il y a deja un apparels similaire
                    let isAlreadyIn = false;
                    apparels.forEach((a) => {
                        if (a.name === apTmp.name) {
                            a.qte++;
                            isAlreadyIn = true;
                        }
                    });

                    if (!isAlreadyIn) {
                        apparels.push(apTmp);
                    }
                });

                return apparels;
            },
        }
    }
</script>

<style lang="css">
    .tdItem {
        text-align: right;
    }

    .tdSubItem {
        font-style: italic;
        font-size: small;
    }
</style>