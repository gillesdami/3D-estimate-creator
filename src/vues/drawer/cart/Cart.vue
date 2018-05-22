<template>
    <div>
        <cart-list/>
        <br/>
        <TotalCartPage id="totalCartPage"/>
        <div class="offset-s2 col s10 offset-s1" style="padding: 0">
            <button id="buttonEstimation" v-on:click="sendEstimation">ENVOYER MA DEMANDE A L'EQUIPE ATAWA</button>
        </div>
    </div>
</template>

<script>
    import CartList from "./CartList";
    import TotalCartPage from '../../TotalCartPage';
    import { actionCreator, SEND_ESTIMATION } from '../../../actions'

    export default {
        components: {CartList, TotalCartPage},
        name: "cart",
        methods: {
            sendEstimation: function () {
                this.$root.$emit('put', actionCreator(SEND_ESTIMATION));
            },
        }
    }
</script>