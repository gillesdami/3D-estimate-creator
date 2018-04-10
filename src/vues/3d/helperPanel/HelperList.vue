<template>
    <div>
        <span v-for="item in items">
            <helper-item :icon="item['icon']" :description="item['description']"/>
        </span>
    </div>
</template>

<script>
    import HelperItem from './HelperItem'

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