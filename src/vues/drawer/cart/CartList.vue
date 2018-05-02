<template>
    <div>
        <table>
            <tr>
                <th>Produit</th>
                <th>Quantité</th>
                <th>Prix unitaire</th>
            </tr>
        </table>
        <cart-item v-for="obj in objectsInCart" :objInCart="obj"/>
    </div>
</template>

<script>
    import CartItem from "./CartItem.vue";
    import { $select } from '../../../sagas/vue';
    import { objectsDisplayed } from '../../../selectors';
    import objectsAvailable from '../../../../resources/objectsAvailable.json';

    export default {
        components: {CartItem},
        name: "cart-list",
        data() {
            return {
                objectsInCart: [],
            }
        },
        updated() {
            const objsDisplayed = $select(objectsDisplayed);

            objsDisplayed.forEach((obj) => {
                const objTmp = {
                    name: obj.name,
                    price: objectsAvailable[obj.name].price['ILE DE FRANCE'],
                    apparels: obj.apparels,
                    qte: 1
                };

                // Si il y a deja un objectsInCart similaire
                let isAlreadyIn = false;
                this.objectsInCart.forEach((a) => {
                    if (a.name === objTmp.name) {
                        a.qte++;
                        isAlreadyIn = true;
                    }
                });

                if (!isAlreadyIn) {
                    this.objectsInCart.push(objTmp);
                }
            });
        }
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