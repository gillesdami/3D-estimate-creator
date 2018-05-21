<template>
    <div>
        <cart-list/>
        <br/>
        <Total id="totalCart"/>
        <div class="offset-s2 col s8 offset-s2" style="padding: 0">
            <button id="buttonEstimation" v-on:click="sendEstimation">ENVOYER MA DEMANDE A L'EQUIPE ATAWA</button>
        </div>
    </div>
</template>

<script>
    import CartList from "./CartList";
    import Total from '../../Total';
    import { actionCreator, SEND_ESTIMATION } from '../../../actions'

    export default {
        components: {CartList, Total},
        name: "cart",
        methods: {
            sendEstimation: function () {
                this.$root.$emit('put', actionCreator(SEND_ESTIMATION));
            },
        }
    }
</script>