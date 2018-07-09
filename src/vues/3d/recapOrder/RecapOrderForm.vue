<template xmlns="http://www.w3.org/1999/html">
    <div>
        <form class="col s12">
            <div class="row">
                <div class="input-field col s6">
                    <input placeholder="Nom" id="last_name" type="text">
                </div>
                <div class="input-field col s6">
                    <input placeholder="Prénom" id="first_name" type="text">
                </div>
            </div>
            <div class="row">
                <div class="input-field col s6">
                    <input placeholder="Email" id="email" type="email">
                </div>
            </div>
            <div class="row">
                <div class="input-field col s6">
                    <textarea placeholder="Commmentaire (optionel)" id="commentary" rows="10" cols="50"></textarea>
                </div>
            </div>
        </form>

        <div class="buttonsRecapOrderPanel">
            <button class="ATAWAButton" v-on:click="displayRecap">RETOUR</button>
            <button id="sendEstimation" class="ATAWAButton" v-on:click="sendEstimation">ENVOYER</button>
        </div>
    </div>
</template>

<script>
    import { actionCreator, SEND_ESTIMATION, TOGGLE_RECAP_PANEL_RECAP } from '../../../actions';

    export default {
        name: "RecapOrderForm",
        components: {},
        data: () => ({}),
        methods: {
            displayRecap: function () {
                this.$root.$emit('put', actionCreator(TOGGLE_RECAP_PANEL_RECAP));
            },
            sendEstimation: function () {
                this.$root.$emit('put', actionCreator(SEND_ESTIMATION));
            }
        }
    }
</script>