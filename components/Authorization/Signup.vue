<template>
    <div>
        <h2>{{ $t('headers.register')}}</h2>
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

h2 {
    text-align: center;
}

</style>