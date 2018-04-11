<template>
    <div>
        <h3 class="objectCategory" v-on:click="clickedObjectCategory">{{ category }}</h3>
        <div class="objectList" v-bind:class="{ expanded: expanded }">
            <object-item 
                v-for="(item, itemName) in items" 
                v-if="item.category === category" 
                :item="item" :name="itemName">
            </object-item>
        </div>
    </div>
</template>

<script>
    import { actionCreator, CLICKED_COLLAPSIBLE } from '../../actions';
    import ObjectItem from './ObjectItem';

    export default {
        name: "object-category",
        methods: {
            clickedObjectCategory: function () {
                this.$root.$emit('put', actionCreator(CLICKED_COLLAPSIBLE, {
                    section: this.section,
                    category: this.category
                    }));
            }
        },
        props: ['section', 'category', 'expanded', 'items'],
        components : {
            'object-item' : ObjectItem
        },
    }
</script>

<style lang=css>
    
</style>