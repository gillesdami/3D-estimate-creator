<template>
    <div>
        <h2>Catalogue</h2>
        <object-section v-for="section in sections" :section="section"/>
    </div>
</template>

<script>
    import ObjectSection from './ObjectSection';
    import objectsAvailable from '../../../../resources/objectsAvailable.json'

    export default {
        name: "objects",
        props: ['collapsiblesStatus'],
        computed: {
            sections: function() {
                const sections = [];

                Object.keys(objectsAvailable).forEach(function(key) {
                    if(!sections.includes(objectsAvailable[key].section)) {
                        sections.push(objectsAvailable[key].section);
                    }
                });

                return sections;
            }
        },
        components : {
            'object-section' : ObjectSection
        },
    }
</script>