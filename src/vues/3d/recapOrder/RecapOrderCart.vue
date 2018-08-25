<template>
    <div>
        <div id="recapOrderCart">
            <cart-item v-for="obj in objs.structObjectsInCart" :obj-in-cart="obj"/>
        </div>
        <button class="ATAWAButton" v-on:click="displayForm">SUIVANT</button>
    </div>
</template>

<script>
    import { $select } from '../../../sagas/vue';
    import { objectsDisplayed } from '../../../selectors';
    import CartItem from './../../drawer/cart/CartItem';
    import { actionCreator, SAVE_OBJECTS_IN_RECAP, TOGGLE_RECAP_PANEL_FORM } from '../../../actions';

    export default {
        name: "RecapOrderCart",
        components: {
            "cart-item": CartItem
        },
        data: () => ({
            objectsInRecap: null
        }),
        updated() {
            const objsDisplayed = $select(objectsDisplayed);
            const objectsAvailable = window.objectsAvailable;

            const objects = objsDisplayed.map((obj) => ({
                uid: obj.uid,
                name: obj.name,
                apparels: objectsAvailable[obj.name].apparels,
                price: objectsAvailable[obj.name].price['ILE DE FRANCE'],
                qte: 1
            }));

            //increment qte
            const objectsGrouped = objects.reduce((acc, val) => {
                const IndexInAcc = acc.findIndex(e => e.name === val.name);

                if (IndexInAcc !== -1) {
                    acc[IndexInAcc].qte++;
                    return acc;
                } else {
                    return [...acc, val]
                }
            }, []);

            const structObjectsInCart = objectsGrouped.filter((obj) => obj.section !== "Mobilier");

            const objs = {structObjectsInCart};

            if (JSON.stringify(this.objs) !== JSON.stringify(objs)) {
                this.objs = objs;
            }

            this.objectsInRecap = objs.structObjectsInCart;
        },
        methods: {
            displayForm: function () {
                this.$root.$emit('put', actionCreator(SAVE_OBJECTS_IN_RECAP, {
                        objectsInRecap: this.objectsInRecap
                    }
                ));
                this.$root.$emit('put', actionCreator(TOGGLE_RECAP_PANEL_FORM));
            }
        }
    }
</script>