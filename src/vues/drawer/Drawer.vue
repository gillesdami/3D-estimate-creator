<template>
    <div id="drawer">
        <div class="row" style="margin-bottom: -30px">
            <div class="col s6" style="padding: 0">
                <button id="buttonObjects" class="buttonObjects buttonTab" :class="{'buttonTabSelected': buttonObjectsActivated,
                'buttonTabNotSelected': !buttonObjectsActivated}"
                        v-on:click="changeTab">CATALOGUE</button>
            </div>

            <div class="col s6" style="padding: 0">
                <button id="buttonCart" class="buttonCart buttonTab" :class="{'buttonTabSelected': buttonCartActivated,
                'buttonTabNotSelected': !buttonCartActivated}"
                        v-on:click="changeTab">COMMANDE</button>
            </div>
        </div>
        <br/>
        <cart id="cart" :style="{'display': cartDisplayValue}"/>
        <objects id="objects" :style="{'display': objectsDisplayValue}"/>
    </div>
</template>

<script>
    import Objects from '../drawer/objects/Objects.vue';
    import Cart from '../drawer/cart/Cart.vue';

    export default {
        components: {
            'objects': Objects,
            'cart': Cart,
        },
        name: "drawer",
        data() {
            return {
                buttonObjectsActivated: true,
                buttonCartActivated: false,
                objectsDisplayValue: 'block',
                cartDisplayValue: 'none'
            }
        },
        methods: {
            changeTab: function (event) {
                if (event.target.id === "buttonCart") {
                    this.buttonObjectsActivated = false;
                    this.buttonCartActivated = true;

                    this.objectsDisplayValue = "none";
                    this.cartDisplayValue = "block";
                } else {
                    this.buttonObjectsActivated = true;
                    this.buttonCartActivated = false;

                    this.objectsDisplayValue = "block";
                    this.cartDisplayValue = "none";
                }
            }
        },
        mounted:function() {
            document.getElementById("buttonCart").addEventListener("focus", function() {
                this.style.backgroundColor = "white";
                this.style.color = "#ff7575";
                this.style.borderBottom = "1.5px solid #ff7575";

                document.getElementById("buttonObjects").style.backgroundColor = "#e5e5e5";
                document.getElementById("buttonObjects").style.color = "silver";
                document.getElementById("buttonObjects").style.borderBottom = "1.5px solid silver";
            });

            function onObjectsFocus() {
                this.style.backgroundColor = "white";
                this.style.color = "#ff7575";
                this.style.borderBottom = "1.5px solid #ff7575";

                document.getElementById("buttonCart").style.backgroundColor = "#e5e5e5";
                document.getElementById("buttonCart").style.color = "silver";
                document.getElementById("buttonCart").style.borderBottom = "1.5px solid silver";
            }

            document.getElementById("buttonObjects").addEventListener("focus", onObjectsFocus);
            onObjectsFocus.bind(document.getElementById("buttonObjects"))();
        }
    }
</script>