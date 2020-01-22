<template>
    <div>
        <h2>{{ $t('headers.login')}}</h2>
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

h2 {
    text-align: center;
}

</style>