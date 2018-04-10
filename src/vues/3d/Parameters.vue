<template>
    <div id="parameters">
        <select name="color" v-model="colorSetting" v-on:change="dispatchChange">
            <option value="red">Rouge</option>
            <option value="green">Vert</option>
            <option value="blue">Bleu</option>
        </select>
    </div>
</template>

<script>
    import { actionCreator, SETTING_CHANGED } from '../../actions';

    export default {
        name: "Parameters",
        data() {
            return {
                colorSetting: 'default'
            }
        },
        props: ['object'],
        methods: {
            dispatchChange: function() {
                this.$root.$emit('put', actionCreator(SETTING_CHANGED, {
                    itemName: this.object.itemName,
                    setting: {
                        type: 'color',
                        value: this.colorSetting
                    }
                }));
            }
        }
    }
</script>

<style scoped>

</style>