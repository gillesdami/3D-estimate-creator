<template>
    <table>
        <tr>
            <td>{{obj['name']}}</td>
            <td class="tdItem">{{obj['qte']}}</td>
            <td class="tdItem">{{obj['price']}} €</td>
        </tr>
        <tr v-for="app in apparels">
            <td class="tdSubItem">{{app['name']}} - {{app['value']}}</td>
            <td class="tdSubItem">{{app['qte']}}</td>
        </tr>
    </table>
</template>

<script>
    export default {
        name: "cart-item",
        props: ['obj'],
        data() {
            return {
                apparels: []
            }
        },
        created() {
            this.obj['apparels'].forEach((ap) => {
                let apTmp = {
                    name: ap.name,
                    value: ap.value,
                    qte: 1
                };

                // Si il y a deja un apparels similaire
                let isAlreadyIn = false;
                this.apparels.forEach((a) => {
                    if (a.name === apTmp.name) {
                        a.qte++;
                        isAlreadyIn = true;
                    }
                });

                if (!isAlreadyIn) {
                    this.apparels = [...this.apparels, apTmp];
                }
            });
        },
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