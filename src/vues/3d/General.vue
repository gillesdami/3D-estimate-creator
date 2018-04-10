<template>
    <div id="general">
        <p> Nom : <span> {{object.itemName}}</span></p>
        <p> Prix : <span> {{object.price}} €</span></p>
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