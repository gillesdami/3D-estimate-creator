<template>
    <div id="objectDetails">
        <general :object="object"></general>
        <parameters :object="object"></parameters>
        <apparels :object="object"></apparels>
    </div>
</template>

<script>
    import General from './General';
    import Parameters from './Parameters';
    import Apparels from './Apparels';

    export default {
        name: "Details",
        components: {
            'general': General,
            'parameters': Parameters,
            'apparels': Apparels
        },
        props: ['object']
    }
</script>

<style scoped>

</style>