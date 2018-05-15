<template>
    <div>
        <h3 class="objectCategory" v-on:click="clickedObjectCategory">{{ category }}</h3>
        <div class="objectList" v-bind:class="{ expanded: categoryCollapsiblesStatus() }">
            <object-item 
                v-for="(item, itemName) in items" 
                v-if="item.section === section && item.category === category" 
                :item="item" :name="itemName"/>
        </div>
    </div>
</template>

<script>
    import { actionCreator, CLICKED_COLLAPSIBLE } from '../../../actions';
    import ObjectItem from './ObjectItem';
    import { $select } from '../../../sagas/vue';
    import { getCollapsibleState } from '../../../selectors';
    import objectsAvailable from '../../../../resources/objectsAvailable.json'

    export default {
        name: "object-category",
        methods: {
            clickedObjectCategory: function () {
                this.$root.$emit('put', actionCreator(CLICKED_COLLAPSIBLE, {
                    section: this.section,
                    category: this.category
                    }));
            },
            categoryCollapsiblesStatus: function() {
                return $select(getCollapsibleState, this.section, this.category);
            }
        },
        computed: {
            items: function() {
                return objectsAvailable;
            }
        },
        props: ['section', 'category'],
        components : {
            'object-item' : ObjectItem
        },
    }
</script>

<style lang=css>
    .objectList {
        max-height: 0;
        transition: 0.5s ease;
        overflow: hidden;
    }
    .objectList.expanded {
        max-height: 2000px;
    }
</style>