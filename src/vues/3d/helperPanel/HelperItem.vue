<template>
    <div class="helperItem">
        <img class="helperIcon" :src="icon"/><p>{{description}}</p>
    </div>
</template>

<script>
    export default {
        name: "helper-item",
        props: ['icon', 'description']
    }
</script>

<style scoped>
.helperIcon {
    width: 100px;
    height: 100px;
}

.helperItem {
    width: 100%;
    display: flex;
    align-items: center;
}
</style>