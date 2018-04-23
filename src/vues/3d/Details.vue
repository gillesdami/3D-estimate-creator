<template>
    <div class="details-panel">
        <general></general>
        <parameters></parameters>
        <apparels></apparels>
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
        }
    }
</script>

<style scoped>
    .details-panel {
        width: 15%;
        text-align: center;
        padding: 5px;
        background-color: #F6F7F8;
        border-radius: 15px;
    }
</style>