<template>
    <div>
        <h1 class="login login--title">{{ $t('headers.login')}}</h1>
        <SigninForm />
    </div>
</template>

<script>
import SigninForm from "./SigninForm";

export default {
    name: "Signin",
    components: {
        SigninForm
    }
};
</script>

<style lang="scss">

.login {
    &--title {
        text-align: center;
        font-family: TheAntiquaB;
        font-style: normal;
        font-weight: 800;
        font-size: 32px;
        line-height: 64px;
        color: #247ee5;

        @include phone-big {
            font-size: 48px;
        }
    }
}



</style>