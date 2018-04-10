<template>
    <div id="total">
        <p class="value"> Total : {{totalValue}} €* </p>
        <p class="estimation"> *estimation non contractuelle</p>
    </div>
</template>

<script>
    export default {
        name: "Total",
        props: ['totalValue']
    }
</script>

<style scoped>
    .estimation {
        margin-top: 0;
        font-size: 0.5em;
    }

    .value {
        margin-bottom: 0;
    }

    #total {
        font-weight: bold;
    }
</style>