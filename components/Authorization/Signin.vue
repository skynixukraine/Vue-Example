<template>
    <div>
        <h1 class="login login--title">{{ $t('headers.login')}}</h1>
        <SigninForm />
        <!-- <ForgotPassword /> -->
    </div>
</template>

<script>
import SigninForm from "~/components/Authorization/SigninForm"
import ForgotPassword from "~/components/Authorization/ForgotPassword"

export default {
    components: {
        SigninForm,
        ForgotPassword
    }
};
</script>

<style>
</style>