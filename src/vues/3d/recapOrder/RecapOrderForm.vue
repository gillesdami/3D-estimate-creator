<template>
    <div>
        <form class="col s12">
            <div class="row">
                <div class="input-field col s6">
                    <input placeholder="Nom" id="last_name" type="text" class="validate">
                    <label for="last_name">Nom</label>
                </div>
                <div class="input-field col s6">
                    <input placeholder="Prénom" id="first_name" type="text" class="validate">
                    <label for="first_name">Prénom</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s6">
                    <input placeholder="Email" id="email" type="email" class="validate">
                    <label for="email">Email</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s6">
                    <textarea id="commentary" class="materialize-textarea"></textarea>
                    <label for="commentary">Commantaire (optionel)</label>
                </div>
            </div>
        </form>

        <div class="buttonsRecapOrderPanel">
            <button class="ATAWAButton" v-on:click="displayRecap">RETOUR</button>
            <button class="ATAWAButton" v-on:click="sendEstimation">ENVOYER</button>
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