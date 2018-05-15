<template>
    <div>
        <button id="closeButton" v-on:click="closeHelper">X</button>
        <helper-list :items="HelperItems['helperItems']"/>
    </div>
</template>

<script>
    import { actionCreator, TOGGLE_HELPER_PANEL } from "../../../actions";
    import HelperList from './HelperList';
    import HelperItems from '../../../../resources/helper.json';

    export default {
        name: "helper-panel",
        components: {
            'helper-list': HelperList,
        },
        data() {
            return {
                HelperItems,
            }
        },
        methods: {
            closeHelper: function () {
                this.$root.$emit('put', actionCreator(TOGGLE_HELPER_PANEL));
            }
        },
    }
</script>