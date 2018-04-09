<template>
    <div id="general">
        <p> Nom : <span> {{object.nom}}</span></p>
    </div>
</template>

<script>
    export default {
        name: "General",
        props: ['object']
    }
</script>

<style scoped>

</style>