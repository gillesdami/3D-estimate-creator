<template>
    <div>
        <h2>Panier</h2>
        <cart-list :objects-in-cart="this.objectsInCart"/>
        <br/>
        <span>Total : {{total}} €</span>
    </div>
</template>

<script>
    import ObjectsAvailable from '../../../../resources/objectsAvailable.json';
    import CartList from "./CartList";

    export default {
        components: {CartList},
        name: "cart",
        props: ['objectsDisplayed'],
        data() {
            return {
                ObjectsAvailable,
                objectsInCart: [],
                total: 0,
            }
        },
        created() {
            // Pour la liste du panier
            this.objectsDisplayed.forEach((obj) => {
                let objTmp = {
                    'name': obj.name,
                    'qte': 1,
                    'price': this.ObjectsAvailable[obj.name].prix['ILE DE FRANCE'],
                    'apparels': obj.apparels
                };

                // Si il y a deja une tente similaire
                let isAlreadyIn = false;
                this.objectsInCart.forEach((o) => {
                    if (o.name === obj.name) {
                        o.qte++;
                        isAlreadyIn = true;
                    }
                });

                if (!isAlreadyIn) {
                    this.objectsInCart = [...this.objectsInCart, objTmp];
                }

                this.total += objTmp.price;
            });
        },
    }
</script>

<style scoped>

</style>