<template>
	<div class = "signin">
		<h2 class = "signin__header">{{ $t("headers.login")}}</h2>
		<SigninForm />
		<ForgotPassword />
	</div>
</template>

<script>
    import SigninForm from "~/components/Authorization/SigninForm";
    import ForgotPassword from "~/components/Authorization/ForgotPassword";

    export default {
        components : {
            SigninForm,
            ForgotPassword
        }
    };
</script>

<style lang = "scss">
	
	.signin {
		width           : 100%;
		display         : flex;
		align-items     : center;
		flex-direction  : column;
		justify-content : flex-start;
		
		&__header { text-align : center; }
		@include phone-big-max {
			margin-top: 30px;
		}
	}
</style>