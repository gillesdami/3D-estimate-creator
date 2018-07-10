<template xmlns="http://www.w3.org/1999/html">
    <div>
        <form class="col s12">
            <div class="row">
                <div class="input-field col s6">
                    <input v-model="lastname" placeholder="Nom*" id="last_name" type="text">
                    <span class="warnForm" v-if="isLastNameEmpty">Champ obligatoire</span>
                </div>
                <div class="input-field col s6">
                    <input v-model="firstname" placeholder="Prénom*" id="first_name" type="text">
                    <span class="warnForm" v-if="isFirstNameEmpty">Champ obligatoire</span>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s6">
                    <input v-model="email" placeholder="Email*" id="email" type="email">
                    <span class="warnForm" v-if="isEmailCorrect">Cet email ne semble pas correct !</span>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s6">
                    <textarea v-model="commentary"
                              placeholder="Commmentaire (optionel)"
                              id="commentary"
                              rows="10"
                              cols="50">
                    </textarea>
                </div>
            </div>
            <span style="font-style: italic;">* Champs obligatoire</span>
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
        data: () => ({
            firstname: "",
            lastname: "",
            email: "",
            isLastNameEmpty: false,
            isFirstNameEmpty: false,
            isEmailCorrect: false,
            commentary: ""
        }),
        methods: {
            displayRecap: function () {
                this.$root.$emit('put', actionCreator(TOGGLE_RECAP_PANEL_RECAP));
            },
            sendEstimation: function () {
                if (this.checkForm()) {
                    alert("Succes");
                    this.$root.$emit('put', actionCreator(SEND_ESTIMATION));
                }
            },
            checkForm: function () {
                const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                this.firstname === "" ? this.isFirstNameEmpty = true : this.isFirstNameEmpty = false;
                this.lastname === "" ? this.isLastNameEmpty = true : this.isLastNameEmpty = false;
                regex.test(this.email) ? this.isEmailCorrect = false : this.isEmailCorrect = true;

                return this.firstname !== "" && this.lastname !== "" && regex.test(this.email);
            },
        },
    }
</script>