<template>
    <div>
        <h1 class="login login--title">{{ $t('headers.register')}}</h1>
        <SignupForm />
    </div>
</template>

<script>
import SignupForm from "./SignupForm";
export default {
    name: "Signup",
    components: {
        SignupForm
    }
};
</script >



<style lang="scss" scoped>

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