<template>
    <div id="drawer">
        <div class="row" style="margin-bottom: -30px">
            <div class="col s6" style="padding: 0">
                <button id="buttonObjects" class="buttonTab" v-on:click="changeTab">CATALOGUE</button>
            </div>

            <div class="col s6" style="padding: 0">
                <button id="buttonCart" class="buttonTab" v-on:click="changeTab">COMMANDE</button>
            </div>
        </div>
        <br/>
        <cart id="cart"/>
        <objects id="objects"/>
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
        methods: {
            changeTab: function (event) {
                if (event.target.id === "buttonCart") {
                    document.getElementById("cart").style.display = "block";
                    document.getElementById("objects").style.display = "none";

                    document.getElementById("buttonCart").style.backgroundColor = "white";
                    document.getElementById("buttonCart").style.color = "#ff7575";
                    document.getElementById("buttonCart").style.borderBottom = "1.5px solid #ff7575";

                    document.getElementById("buttonObjects").style.backgroundColor = "#e5e5e5";
                    document.getElementById("buttonObjects").style.color = "silver";
                    document.getElementById("buttonObjects").style.borderBottom = "1.5px solid silver";

                } else {
                    document.getElementById("cart").style.display = "none";
                    document.getElementById("objects").style.display = "block";

                    document.getElementById("buttonObjects").style.backgroundColor = "white";
                    document.getElementById("buttonObjects").style.color = "#ff7575";
                    document.getElementById("buttonObjects").style.borderBottom = "1.5px solid #ff7575";

                    document.getElementById("buttonCart").style.backgroundColor = "#e5e5e5";
                    document.getElementById("buttonCart").style.color = "silver";
                    document.getElementById("buttonCart").style.borderBottom = "1.5px solid silver";
                }
            },
        },
        mounted: function() {
            
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