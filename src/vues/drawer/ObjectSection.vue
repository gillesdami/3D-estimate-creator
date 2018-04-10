<template>
    <div>
        <h3 class="objectSection" v-on:click="clickedObjectSection">{{ section }}</h3>
        <div class="objectSectionList" v-bind:class="{ expanded: expanded }">
            <object-category
                v-for="(categoryItems, categoryName) in itemBycategory" 
                :items="categoryItems" :category="categoryName" :expanded="1">
            </object-category>
        </div>
    </div>
</template>

<script>
    import { actionCreator, CLICKED_OBJECT_SECTION } from '../../actions';
    import ObjectCategory from './ObjectCategory';
    import objectsAvailable from '../../../resources/objectsAvailable.json'

    export default {
        name: "object-section",
        methods: {
            clickedObjectSection: function () {
                this.$root.$emit('put', actionCreator(CLICKED_OBJECT_SECTION, this.section));
            }
        },
        props: ['section', 'expanded', 'items'],
        data() {
            return {items: objectsAvailable};
        },
        computed: {
            itemBycategory: function () {
                const groupedItems = {};

                Object.keys(this.items).forEach(function(key) {
                    groupedItems[this.items[key].category] ?
                        groupedItems[this.items[key].category].push(this.items[key]) :
                        groupedItems[this.items[key].category] = [this.items[key]];
                });

                return groupedItems;
            }
        },
        components : {
            'object-category' : ObjectCategory
        },
    }
</script>

<style lang=css>
    
</style>