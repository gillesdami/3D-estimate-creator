<template>
    <div id="drawer">
        <span>
            <button id="buttonObjects" class="buttonTab" v-on:click="changeTab">Objets</button>
            <button id="buttonCart" class="buttonTab" v-on:click="changeTab">Panier</button>
        </span>
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
                    document.getElementById("buttonCart").style.backgroundColor = "rgba(" + 255 + "," + 58 + "," + 59 + "," + 0.8 + ")";
                    document.getElementById("objects").style.display = "none";
                    document.getElementById("buttonObjects").style.backgroundColor = "rgba(" + 255 + "," + 58 + "," + 59 + "," + 1 + ")";
                } else {
                    document.getElementById("cart").style.display = "none";
                    document.getElementById("buttonCart").style.backgroundColor = "rgba(" + 255 + "," + 58 + "," + 59 + "," + 1 + ")";
                    document.getElementById("objects").style.display = "block";
                    document.getElementById("buttonObjects").style.backgroundColor = "rgba(" + 255 + "," + 58 + "," + 59 + "," + 0.8 + ")";
                }
            }
        }
    }
</script>