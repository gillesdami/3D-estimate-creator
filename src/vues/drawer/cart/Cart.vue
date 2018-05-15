<template>
    <div>
        <h2>Panier</h2>
        <cart-list/>
        <br/>
        <Total id="totalCart"/>
    </div>
</template>

<script>
    import CartList from "./CartList";
    import Total from '../../Total';

    export default {
        components: {CartList, Total},
        name: "cart",
    }
</script>