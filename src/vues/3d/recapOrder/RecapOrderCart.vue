<template>
    <div>
        <cart-list/>
        <div class="buttonsRecapOrderPanel">
            <button class="ATAWAButton" v-on:click="hidePannel">RETOUR</button>
            <button class="ATAWAButton" style="margin-left: 20vw;" v-on:click="displayForm">SUIVANT</button>
        </div>
        
    </div>
</template>

<script>
    import CartList from "../../drawer/cart/CartList";
    import { actionCreator, SAVE_OBJECTS_IN_RECAP, TOGGLE_RECAP_PANEL_FORM, TOGGLE_RECAP_PANEL_MAIN } from '../../../actions';

    export default {
        name: "RecapOrderCart",
        components: {
            "cart-list": CartList
        },
        methods: {
            displayForm: function () {
                this.$root.$emit('put', actionCreator(SAVE_OBJECTS_IN_RECAP, {
                        objectsInRecap: this.objectsInRecap
                    }
                ));
                this.$root.$emit('put', actionCreator(TOGGLE_RECAP_PANEL_FORM));
            },
            hidePannel: function () {
                this.$root.$emit('put', actionCreator(TOGGLE_RECAP_PANEL_MAIN));
            }
        }
    }
</script>