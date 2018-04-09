<template>
    <div class="objectItem" v-on:click="clickedObjectItem">
        <img class="objectItemIcon" :src="`assets/objectIcons/${ item.name }.jpg`"/>
        <span class="objectItemTitle">{{ item.name }}</span>
    </div>
</template>

<script>
    export default {
        name: "object-item",
        data() {
            return {
                item2: {
                    name: "hello"
                }
            }
        },
        methods: {
            clickedObjectItem: function () {
                this.$root.$emit('put', {"type": "some action ! :)"});
            }
        },
        props: ['item']
    }
</script>

<style lang=css>
    .objectItem {
        width: 9vw;
        height: 9vw;
        overflow: hidden;
        text-align: center;
    }

    .objectItemIcon {
        width: 7vw;
        height: 7vw;
    }

    .objectItemTitle {
        color: black;
        word-break: none;
    }
</style>