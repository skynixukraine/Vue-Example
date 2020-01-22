<template>
    <div>
        <h2>{{ $t('headers.login')}}</h2>
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

<style lang="scss">

h2 {
    text-align: center;
}

</style>