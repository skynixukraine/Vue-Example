<template>
    <button class="link link--button link--button-password">Forgot Password?</button>
</template>

<script>
export default {
    name: "ForgotPassword"
};
</script>

<style lang="scss">
.link {
    &--button-password {
        background: #f7fafc;
        border: none;
        font-family: TheSansB;
        font-style: normal;
        font-weight: 530;
        font-size: 16px;
        line-height: 21px;

        /* identical to box height */
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: #247ee5;
    }
}
</style>
