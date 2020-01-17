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

<style>
</style>