<template>
    <div>
        <table>
            <tr>
                <th>Produit</th>
                <th>Quantité</th>
                <th>Prix unitaire</th>
            </tr>
        </table>
        <cart-item v-for="obj in objectsInCart()" :obj="obj"/>
    </div>
</template>

<script>
    import CartItem from "./CartItem.vue";
    import { $select } from '../../../sagas/vue';
    import { objectsDisplayed } from '../../../selectors';

    export default {
        components: { CartItem },
        name: "cart-list",
        methods: {
            objectsInCart: function () {
                const objs = $select(objectsDisplayed);
                const objectsInCart = [];
                
                objs.forEach((obj) => {
                    const objTmp = {
                        name: obj.name,
                        price: obj.price,
                        apparels: obj.apparels,
                        qte: 1
                    };

                    // Si il y a deja un objectsInCart similaire
                    let isAlreadyIn = false;
                    objectsInCart.forEach((a) => {
                        if (a.name === objTmp.name) {
                            a.qte++;
                            isAlreadyIn = true;
                        }
                    });

                    if (!isAlreadyIn) {
                        objectsInCart.push(objTmp);
                    }
                    console.log(objectsInCart);
                    return objectsInCart;
                });
            }
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