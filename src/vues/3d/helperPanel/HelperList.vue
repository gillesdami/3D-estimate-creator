<template>
    <div>
        <helper-item v-for="item in items" :icon="item['icon']" :description="item['description']"/>
    </div>
</template>

<script>
    import HelperItem from './HelperItem';

    export default {
        name: "helper-list",
        props: ['items'],
        components: {
            'helper-item': HelperItem
        }
    }
</script>

<style lang="css">

</style>