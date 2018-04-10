<template>
    <div>
        <helper-list :items="HelperItems['helperItems']"/>
    </div>
</template>

<script>
    import HelperList from './HelperList'
    import HelperItems from '../../../../resources/helper.json'

    export default {
        name: "helper-panel",
        components: {
            'helper-list': HelperList,
        },
        data() {
            return {
                HelperItems
            }
        },
    }
</script>

<style lang="css">

</style>