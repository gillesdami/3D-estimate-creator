<template>
    <div id="drawer">
        <div class="row" style="margin-bottom: -30px">
            <div class="col s6" style="padding: 0">
                <button id="buttonObjects" class="buttonTab" v-on:click="changeTab">Catalogue</button>
            </div>

            <div class="col s6" style="padding: 0">
                <button id="buttonCart" class="buttonTab" v-on:click="changeTab">Panier</button>
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

                    document.getElementById("buttonCart").style.backgroundColor = "#ff3a3b";
                    document.getElementById("buttonObjects").style.backgroundColor = "#ff7575";
                    document.getElementById("buttonCart").style.color = "#FFFFFF";
                    document.getElementById("buttonObjects").style.color = "#e5e5e5";

                } else {
                    document.getElementById("cart").style.display = "none";
                    document.getElementById("objects").style.display = "block";

                    document.getElementById("buttonCart").style.backgroundColor = "#ff7575";
                    document.getElementById("buttonObjects").style.backgroundColor = "#ff3a3b";
                    document.getElementById("buttonCart").style.color = "#e5e5e5";
                    document.getElementById("buttonObjects").style.color = "#FFFFFF";
                }
            },
        },
        mounted: function() {
            document.getElementById("buttonCart").addEventListener("focus", function() {
                this.style.backgroundColor = "#ff3a3b";
                document.getElementById("buttonObjects").style.backgroundColor = "#ff7575";
            });

            document.getElementById("buttonObjects").addEventListener("focus", function() {
                this.style.backgroundColor = "#ff3a3b";
                document.getElementById("buttonCart").style.backgroundColor = "#ff7575";
            });
        }

    }
</script>