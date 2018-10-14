<template>
    <div>
        <p class="objectSection" v-on:click="clickedStructureCartSection">
            <img class="square-check" src="../../../../assets/listElements/square-check.svg"/>
            Structure
            <img v-if="!cartCollapsiblesStatus('structure')" class="circle-plus"
                 src="../../../../assets/listElements/circle-plus.svg"/>
            <img v-else class="circle-minus" src="../../../../assets/listElements/circle-minus.svg"/>
        </p>
        <div class="objectSectionList" v-bind:class="{ expanded: cartCollapsiblesStatus('structure') }">
            <cart-item v-for="obj in objs.structObjectsInCart" :obj-in-cart="obj"/>
        </div>

        <p class="objectSection" v-on:click="clickedMobilierCartSection">
            <img class="square-check" src="../../../../assets/listElements/square-check.svg"/>
            Mobilier
            <img v-if="!cartCollapsiblesStatus('mobilier')" class="circle-plus"
                 src="../../../../assets/listElements/circle-plus.svg"/>
            <img v-else class="circle-minus" src="../../../../assets/listElements/circle-minus.svg"/>
        </p>
        <div class="objectSectionList" v-bind:class="{ expanded: cartCollapsiblesStatus('mobilier') }">
            <cart-item v-for="obj in objs.mobObjectsInCart" :obj-in-cart="obj"/>
        </div>
    </div>
</template>

<script>
    import CartItem from "./CartItem.vue";
    import { actionCreator, CLICKED_COLLAPSIBLE } from '../../../actions';
    import { $select } from '../../../sagas/vue';
    import { getCollapsibleState, objectsDisplayed } from '../../../selectors';

    export default {
        components: {CartItem},
        name: "cart-list",
        data() {
            return {
                objs: {
                    structObjectsInCart: [],
                    mobObjectsInCart: [],
                },
                structureClicked: false,
                mobilierClicked: false,
            }
        },
        updated() {
            const objsDisplayed = $select(objectsDisplayed);
            const objectsAvailable = window.objectsAvailable;

            const objects = objsDisplayed.map((obj) => ({
                uid: obj.uid,
                name: obj.name,
                description: objectsAvailable[obj.name].description,
                section: objectsAvailable[obj.name].section,
                category: objectsAvailable[obj.name].category,
                apparels: obj.apparels,
                price: objectsAvailable[obj.name].price['ILE DE FRANCE'],
                qte: 1
            }));

            //increment qte
            const objectsGrouped = objects.reduce((acc, val) => {
                const IndexInAcc = acc.findIndex(e => e.name === val.name && JSON.stringify(e.apparels) === JSON.stringify(val.apparels));

                if (IndexInAcc !== -1) {
                    acc[IndexInAcc].qte++;
                    return acc;
                } else {
                    return [...acc, val]
                }
            }, []);

            const structObjectsInCart = objectsGrouped.filter((obj) => obj.section !== "Mobilier");
            const mobObjectsInCart = objectsGrouped.filter((obj) => obj.section === "Mobilier");

            const objs = {
                structObjectsInCart,
                mobObjectsInCart
            }

            if (JSON.stringify(this.objs) !== JSON.stringify(objs)) {
                this.objs = objs;
            }

            if (!this.structureClicked && !this.cartCollapsiblesStatus("structure")) {
                this.clickedStructureCartSection();
                this.structureClicked = true;
            }

            if (!this.mobilierClicked && !this.cartCollapsiblesStatus("mobilier")) {
                this.clickedMobilierCartSection();
                this.mobilierClicked = true;
            }
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
            cartCollapsiblesStatus: function (category) {
                return $select(getCollapsibleState, "cart", category);
            }
        },
    }
</script>