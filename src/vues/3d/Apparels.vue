<template>
    <div id="apparels">
        <div v-if="selects.length>0">
            <div v-for="(select, index) in selects">
                <select name="color"
                        v-model="selectApparels[index]"
                        v-on:change="dispatchChange(selectApparels[index], select.type)">
                    <option v-for="value in select.values"
                            :value="`${value}`">{{value}}</option>
                </select>
            </div>
        </div>
    </div>
</template>

<script>
    import { actionCreator, APPAREL_CHANGED } from '../../actions';

    export default {
        name: "Apparels",
        data() {
            return {
                selectApparels: [],
                selects: []
            }
        },
        props: ['object'],
        methods: {
            dispatchChange: function(value, type) {
                this.$root.$emit('put', actionCreator(APPAREL_CHANGED, {
                    itemName: this.object.itemName,
                    apparel: {
                        type,
                        value
                    }
                }));
            }
        },
        created() {
            this.object.apparels.forEach(apparel => this.selects.push(apparel));
        }
    }
</script>

<style scoped>

</style>