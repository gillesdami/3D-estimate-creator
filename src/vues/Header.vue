<template>
    <div>
        <div id="parentHeader">
            <img id="logoAtawa" src="../../assets/logo_atawa.svg"/>
            <span id="tel">01 40 50 19 42</span>
            <total id="total"></total>
        </div>
        <buttons id="buttonsPanel"></buttons>
    </div>
</template>

<script>
    import Buttons from './3d/Buttons';
    import Total from './TotalMainPage';

    export default {
        name: "header-atawa",
        components: {
            'buttons': Buttons,
            'total': Total,
        }
    }
</script>

<style scoped>

</style>