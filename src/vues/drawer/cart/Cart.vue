<template>
    <div>
        <cart-list/>
        <br/>
        <TotalCartPage id="totalCartPage"/>
        <div class="col s12" style="padding: 0; text-align: center;">
            <button id="buttonEstimation" v-on:click="sendEstimation">ENVOYER MA DEMANDE A L'EQUIPE ATAWA</button>
        </div>
    </div>
</template>

<script>
    import CartList from "./CartList";
    import TotalCartPage from '../../TotalCartPage';
    import { actionCreator, TOGGLE_RECAP_PANEL_MAIN } from '../../../actions'

    export default {
        components: {CartList, TotalCartPage},
        name: "cart",
        methods: {
            sendEstimation: function () {
                this.$root.$emit('put', actionCreator(TOGGLE_RECAP_PANEL_MAIN));
            },
        }
    }
</script>