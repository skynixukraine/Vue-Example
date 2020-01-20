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
</script>

<style>
</style>