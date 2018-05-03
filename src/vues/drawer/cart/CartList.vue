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
                objsDisplayed: []
            }
        },
        updated() {
            this.objsDisplayed = $select(objectsDisplayed);

            this.objsDisplayed.forEach((obj) => {
                let isAlreadyIn = false;

                this.objectsInCart.forEach((a) => {
                    if (a.uid === obj.uid) {
                        a.apparels = obj.apparels;
                        isAlreadyIn = true;
                    } else {
                        if (a.name === obj.name &&
                            a.price === objectsAvailable[obj.name].price['ILE DE FRANCE']) {
                            a.qte = this.objsDisplayed.filter(obj => obj.name === a.name).length;
                            isAlreadyIn = true;
                        }
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
        }
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