<template>
    <div class="objectItem" v-on:click="clickedObjectItem">
        <img class="objectItemIcon" :src="`assets/objectIcons/${ name }.jpg`"/>
        <span class="objectItemTitle">{{ name }}</span>
    </div>
</template>

<script>
    import { actionCreator, CLICKED_OBJECT_ITEM_ICON } from '../../actions';

    export default {
        name: "object-item",
        methods: {
            clickedObjectItem: function () {
                this.$root.$emit('put', actionCreator(CLICKED_OBJECT_ITEM_ICON, this.item));
            }
        },
        props: ['name', 'item']
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