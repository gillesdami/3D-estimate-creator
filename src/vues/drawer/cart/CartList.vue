<template>
    <div>
        <p class="objectSection" v-on:click="clickedStructureCartSection">
            <img class="square-check" src="../../../../assets/listElements/square-check.svg"/>
            Structure
            <img v-if="!cartCollapsiblesStatus('structure')" class="circle-plus" src="../../../../assets/listElements/circle-plus.svg"/>
            <img v-else class="circle-minus" src="../../../../assets/listElements/circle-minus.svg"/>
        </p>
        <div class="objectSectionList" v-bind:class="{ expanded: cartCollapsiblesStatus('structure') }">
            <cart-item v-for="obj in structObjectsInCart" :obj-in-cart="obj"/>
        </div>

        <p class="objectSection" v-on:click="clickedMobilierCartSection">
            <img class="square-check" src="../../../../assets/listElements/square-check.svg"/>
            Mobilier
            <img v-if="!cartCollapsiblesStatus('mobilier')" class="circle-plus" src="../../../../assets/listElements/circle-plus.svg"/>
            <img v-else class="circle-minus" src="../../../../assets/listElements/circle-minus.svg"/>
        </p>
        <div class="objectSectionList" v-bind:class="{ expanded: cartCollapsiblesStatus('mobilier') }">
            <cart-item v-for="obj in mobObjectsInCart" :obj-in-cart="obj"/>
        </div>
    </div>
</template>

<script>
    import CartItem from "./CartItem.vue";
    import { actionCreator, CLICKED_COLLAPSIBLE } from '../../../actions';
    import { $select } from '../../../sagas/vue';
    import { objectsDisplayed } from '../../../selectors';
    import { getCollapsibleState } from '../../../selectors';
    import objectsAvailable from '../../../../resources/objectsAvailable.json';

    export default {
        components: {CartItem},
        name: "cart-list",
        data() {
            return {
                structObjectsInCart: [],
                mobObjectsInCart: [],
            }
        },
        mounted() {
            const objsDisplayed = $select(objectsDisplayed);

            const objects = objsDisplayed.map((obj) => ({
                    uid: obj.uid,
                    name: obj.name,
                    description: objectsAvailable[obj.name].description,
                    section: objectsAvailable[obj.name].section,
                    category: objectsAvailable[obj.name].category,
                    price: objectsAvailable[obj.name].price['ILE DE FRANCE'],
                    qte: 1
                }));

            //increment qte
            const objectsGrouped = objects.reduce((acc, val) => {
                const IndexInAcc = acc.findIndex(e => e.name === val.name);

                if(IndexInAcc !== -1) {
                    acc[IndexInAcc].qte++;
                    return acc;
                } else {
                    return [...acc, val]
                }
            }, []);

            this.structObjectsInCart = objectsGrouped.filter((obj) => obj.section !== "Mobilier");
            this.mobObjectsInCart = objectsGrouped.filter((obj) => obj.section === "Mobilier");
        },
        methods: {
            clickedStructureCartSection: function () {
                this.$root.$emit('put', actionCreator(CLICKED_COLLAPSIBLE, {
                    section: "cart",
                    category: "structure"
                }));
            },
            clickedMobilierCartSection: function () {
                this.$root.$emit('put', actionCreator(CLICKED_COLLAPSIBLE, {
                    section: "cart",
                    category: "mobilier"
                }));
            },
            cartCollapsiblesStatus: function(category) {
                return $select(getCollapsibleState, "cart", category);
            }
        },
    }
</script>