<template>
    <div>
        <table class="cartTable">
            <tr>
                <th class="product">Produit</th>
                <th class="qte tdItem">Qté</th>
                <th class="price tdItem">Prix /u</th>
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
                let isAlreadyIn = false;

                this.objectsInCart.forEach((a) => {
                    //TODO pour juju
                    if (a.uid !== obj.uid && a.name === obj.name && a.price === obj.price && a.apparels === obj.apparels) {
                        a.qte++;
                        isAlreadyIn = true;
                    }
                });

                if (!isAlreadyIn) {
                    this.objectsInCart.push({
                        uid: obj.uid,
                        name: obj.name,
                        price: objectsAvailable[obj.name].price['ILE DE FRANCE'],
                        apparels: obj.apparels,
                        qte: 1
                    });
                }
            });
        },
    }
</script>

<style lang="css">
    table {
        text-align: left;
    }

    .tdItem {
        text-align: right;
    }

    .product {
        width: 20vw
    }

    .qte {
        width: 5vw
    }

    .price {
        width: 10vw
    }
</style>