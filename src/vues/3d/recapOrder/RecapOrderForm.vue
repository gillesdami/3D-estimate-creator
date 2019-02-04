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
                              placeholder="Commmentaire (optionnel)"
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
    import {actionCreator, SEND_ESTIMATION, TOGGLE_RECAP_PANEL_RECAP} from '../../../actions';
    import {$select} from '../../../sagas/vue';
    import {getSpansState, objectsDisplayed} from '../../../selectors';

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
                const objsDisplayed = $select(objectsDisplayed);
                const objectsAvailable = window.objectsAvailable;

                const objects = objsDisplayed.map((obj) => ({
                    uid: obj.uid,
                    name: obj.name,
                    description: objectsAvailable[obj.name].description,
                    section: objectsAvailable[obj.name].section,
                    category: objectsAvailable[obj.name].category,
                    apparels: obj.apparels,
                    price: objectsAvailable[obj.name].price['ILE DE FRANCE'],
                    qte: 1
                }));

                //increment qte
                const objectsGrouped = objects.reduce((acc, val) => {
                    const IndexInAcc = acc.findIndex(e => e.name === val.name && JSON.stringify(e.apparels) === JSON.stringify(val.apparels));

                    if (IndexInAcc !== -1) {
                        acc[IndexInAcc].qte++;
                        return acc;
                    } else {
                        return [...acc, val]
                    }
                }, []);

                const structObjectsInCart = objectsGrouped.filter((obj) => obj.section !== "Mobilier");

                // Gestion des travées
                const spanState = $select(getSpansState);
                spanState.forEach(spans => {
                    structObjectsInCart.filter((obj) => obj.uid === spans.uid)[0].qte += spans.spansNumber;
                });

                if (this.checkForm()) {
                    this.$root.$emit('put', actionCreator(SEND_ESTIMATION, {
                        firstname: this.firstname,
                        lastname: this.lastname,
                        email: this.email,
                        commentary: this.commentary,
                        objects : structObjectsInCart
                    }));
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