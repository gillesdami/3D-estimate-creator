<template>
    <div class="objectItem" v-on:click="clickedObjectItem">
        <img class="objectItemIcon" :src="`assets/objectIcons/${ name }.jpg`"/>
        <span class="objectItemTitle">{{ name }}</span>
    </div>
</template>

<script>
    import {actionCreator, ADD_OBJECT_DISPLAYED, SHOW_DETAILS_PANEL} from '../../../actions';

    export default {
        name: "object-item",
        methods: {
            clickedObjectItem: function () {
                this.$root.$emit('put', actionCreator(SHOW_DETAILS_PANEL, {
                    itemName: this.name,
                    item: this.item
                }));

                this.$root.$emit('put', actionCreator(ADD_OBJECT_DISPLAYED, {
                    itemName: this.name,
                    item: this.item
                }));
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