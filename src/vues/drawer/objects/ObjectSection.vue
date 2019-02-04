<template>
    <div>
        <p class="objectSection" v-on:click="clickedObjectSection">
            <img class="square-check" src="../../../../assets/listElements/square-check.svg"/>
            {{ section }}
            <img v-if="!sectionCollapsiblesStatus()" class="circle-plus" src="../../../../assets/listElements/circle-plus.svg"/>
            <img v-else class="circle-minus" src="../../../../assets/listElements/circle-minus.svg"/>
            
        </p>
        <div class="objectSectionList" v-bind:class="{ expanded: sectionCollapsiblesStatus() }">
            <object-category v-for="category in categories" :section="section" :category="category"/>
        </div>
    </div>
</template>

<script>
    import { actionCreator, CLICKED_COLLAPSIBLE } from '../../../actions';
    import ObjectCategory from './ObjectCategory';
    import { $select } from '../../../sagas/vue';
    import { getCollapsibleState } from '../../../selectors';
    
    export default {
        name: "object-section",
        methods: {
            clickedObjectSection: function () {
                this.$root.$emit('put', actionCreator(CLICKED_COLLAPSIBLE, {section: this.section}));
            },
            sectionCollapsiblesStatus: function() {
                return $select(getCollapsibleState, this.section);
            }
        },
        props: ['section'],
        data() {
          return {
              clicked: false
          }
        },
        computed: {
            categories: function() {
                const objectsAvailable = window.objectsAvailable;
                const categories = [];

                Object.keys(objectsAvailable).forEach((key) => {
                    if(objectsAvailable[key].section === this.section
                        && !categories.includes(objectsAvailable[key].category)) {
                        categories.push(objectsAvailable[key].category);
                    }
                });
                
                return categories;
            }
        },
        updated: function() {
            if (!this.clicked && !this.sectionCollapsiblesStatus()) {
                this.clickedObjectSection();
                this.clicked = true;
            }
        },
        components : {
            'object-category' : ObjectCategory
        }
    }
</script>