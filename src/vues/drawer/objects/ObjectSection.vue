<template>
    <div>
        <h3 class="objectSection" v-on:click="clickedObjectSection">{{ section }}</h3>
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
    import objectsAvailable from '../../../../resources/objectsAvailable.json'

    export default {
        name: "object-section",
        methods: {
            clickedObjectSection: function () {
                this.$root.$emit('put', actionCreator(CLICKED_COLLAPSIBLE, {
                    section: this.section
                }));
            },
            sectionCollapsiblesStatus: function() {
                return $select(getCollapsibleState, this.section);
            }
        },
        props: ['section'],
        computed: {
            categories: function() {
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
        components : {
            'object-category' : ObjectCategory
        }
    }
</script>

<style lang=css>
    .objectSectionList {
        max-height: 0;
        transition: 0.5s ease;
        overflow: hidden;
    }
    .objectSectionList.expanded {
        max-height: 2000px;
    }
</style>