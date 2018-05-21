<template>
    <div>
        <div id="parentHeader">
            <img id="logoAtawa" src="../../assets/logo_atawa.svg"/>
            <span id="tel">01 40 50 19 42</span>
        </div>
        <buttons id="buttonsPanel"></buttons>
        <total id="total"></total>
    </div>
</template>

<script>
    import Buttons from './3d/Buttons';
    import Total from './TotalMainPage';

    export default {
        name: "header",
        components: {
            'buttons': Buttons,
            'total': Total,
        }
    }
</script>

<style scoped>

</style>