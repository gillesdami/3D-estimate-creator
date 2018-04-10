<template>
    <div id="objectDetails">
        <general :object="object"></general>
        <parameters :object="object"></parameters>
    </div>
</template>

<script>
    import General from './General';
    import Parameters from './Parameters'

    export default {
        name: "Details",
        components: {
            'general': General,
            'parameters': Parameters
        },
        props: ['object']
    }
</script>

<style scoped>

</style>