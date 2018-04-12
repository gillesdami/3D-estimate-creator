<template>
    <div>
        <object-section
            v-for="(sectionItems, sectionName) in itemsBySection" 
            :items="sectionItems" :section="sectionName" :section-collapsibles-status="collapsiblesStatus[sectionName] || {}">
        </object-section>
    </div>
</template>

<script>
    import ObjectSection from './ObjectSection';
    import objectsAvailable from '../../../../resources/objectsAvailable.json'

    export default {
        name: "objects",
        props: ['collapsiblesStatus'],
        data() {
            const groupedItems = {};

            Object.keys(objectsAvailable).forEach(function(key) {
                if(!groupedItems[objectsAvailable[key].section]) {
                    groupedItems[objectsAvailable[key].section] = {};
                }

                groupedItems[objectsAvailable[key].section][key] = objectsAvailable[key];
            });

            return {itemsBySection: groupedItems};
        },
        components : {
            'object-section' : ObjectSection
        },
    }
</script>

<style lang=css>
    
</style>