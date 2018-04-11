<template>
    <div>
        <img :src="icon"/> - {{description}}
    </div>
</template>

<script>
    export default {
        name: "helper-item",
        props: ['icon', 'description']
    }
</script>

<style scoped>

</style>