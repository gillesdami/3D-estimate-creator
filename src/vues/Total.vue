<template>
    <div id="total">
        <p> Total : {{totalValue}} € </p>
    </div>
</template>

<script>
    export default {
        name: "Total",
        props: ['totalValue']
    }
</script>

<style scoped>
    #total {
        font-weight: bold;
    }
</style>