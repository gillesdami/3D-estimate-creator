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
    import { actionCreator, CLICKED_OBJECT_CATEGORY } from '../../actions';
    import ObjectItem from './ObjectItem';
    import objectsAvailable from '../../../resources/objectsAvailable.json'

    export default {
        name: "object-list",
        methods: {
            clickedObjectCategory: function () {
                console.log(this.items, this.category);
                this.$root.$emit('put', actionCreator(CLICKED_OBJECT_CATEGORY, this.category));
            }
        },
        props: ['category', 'expanded'],
        data() {
            return {items: objectsAvailable};
        },
        components : {
            'object-item' : ObjectItem
        },
    }
</script>

<style lang=css>
    
</style>