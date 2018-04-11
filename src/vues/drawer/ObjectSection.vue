<template>
    <div>
        <h3 class="objectSection" v-on:click="clickedObjectSection">{{ section }}</h3>
        <div class="objectSectionList" v-bind:class="{ expanded: sectionCollapsiblesStatus.self }">
            <object-category
                v-for="(categoryItems, categoryName) in itemsByCategory" 
                :items="categoryItems" :category="categoryName" :expanded="sectionCollapsiblesStatus[categoryName]" :section="section">
            </object-category>
        </div>
    </div>
</template>

<script>
    import { actionCreator, CLICKED_COLLAPSIBLE } from '../../actions';
    import ObjectCategory from './ObjectCategory';

    export default {
        name: "object-section",
        methods: {
            clickedObjectSection: function () {
                this.$root.$emit('put', actionCreator(CLICKED_COLLAPSIBLE, {
                    section: this.section
                }));
            }
        },
        props: ['section', 'sectionCollapsiblesStatus', 'items'],
        data() {
            const groupedItems = {};

            Object.keys(this.items).forEach((key) => {
                if(!groupedItems[this.items[key].category]) {
                    groupedItems[this.items[key].category] = {};
                }

                groupedItems[this.items[key].category][key] = this.items[key];
            });

            return {itemsByCategory: groupedItems};
        },
        components : {
            'object-category' : ObjectCategory
        },
    }
</script>

<style lang=css>
    
</style>