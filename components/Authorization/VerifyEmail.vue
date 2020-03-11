<template>
	<div class = "verify-email">
		<h1>{{ title }}</h1>
		<transition name = "main-animation">
			<p class = "verify-email__message" v-if = "message">{{ message }}</p>
		</transition>
		<Loader v-if = "!isLoadingFinish" />
		<div class = "verify-email__sign-in-container" v-else>
			<transition name = "main-animation">
				<SigninForm v-if = "isSuccess" />
			</transition>
		</div>
		<NuxtLink :to = "$routes.home.path"
				  class = "link link--button link--button-blue link--button-gradient"
				  exact>Zurück zur Homepage
		</NuxtLink>
	</div>
</template>

<script>
    import Loader from "~/components/App/Loader";
    import UserApi from "~/services/api/User";
    import SigninForm from "~/components/Authorization/SigninForm";

    export default {
        props      : {
            isChangeEmail : {
                type    : Boolean,
                default : false
            }
        },
        components : {
            Loader,
            SigninForm
        },
        created(){
            if(process.client){
                this.verifyEmail();
            }
        },
        data(){
            return {
                title           : "Überprüfen Sie Ihre E-Mails.",
                message         : "",
                isSuccess       : false,
                isLoadingFinish : false,
            }
        },
        methods    : {
            validateQuery(){
                if(this.isChangeEmail){
                    if(this.$route.query.hasOwnProperty("token") && this.$route.query.hasOwnProperty("id")){
                        return true;
                    } else{
                        this.message = "Ungültige Überprüfungsdaten für das Senden.";
                        return false;
                    }
                } else{
                    if(this.$route.query.hasOwnProperty("expires") && this.$route.query.hasOwnProperty("id") && this.$route.query.hasOwnProperty("signature")){
                        return true;
                    } else{
                        this.message = "Ungültige Überprüfungsdaten für das Senden.";
                        return false;
                    }
                }
            },
            verifyEmail(){
                if(this.validateQuery()){
                    if(this.isChangeEmail){
                        let formData = new FormData();

                        formData.append("id", this.$route.query.id);
                        formData.append("token", this.$route.query.token);

                        UserApi.verifyChangeEmail(formData).then(response => {
                            this.title           = "Glückwunsch!";
                            this.message         = "Ihre E-Mail wurde erfolgreich bestätigt. Jetzt können Sie Ihr persönliches Konto eingeben.";
                            this.isSuccess       = true;
                            this.isLoadingFinish = true;
                        }).catch(error => {
                            this.title           = "Etwas ist schief gelaufen";
                            this.message         = error.message;
                            this.isLoadingFinish = true;
                        });
                    } else{
                        this.$store.dispatch("user/VERIFY_USER_EMAIL", {
							expires   : this.$route.query.expires,
							id        : this.$route.query.id,
                            signature : this.$route.query.signature,
                        }).then(response => {
                            this.title           = "Glückwunsch!";
                            this.message         = "Ihre E-Mail wurde erfolgreich bestätigt. Jetzt können Sie Ihr persönliches Konto eingeben.";
                            this.isSuccess       = true;
                            this.isLoadingFinish = true;

                            // need this code for new component
                            // this.$store.dispatch("user/LOAD_USER", {
                            //     id: this.$cookies.get(this.$cookie.names.tokenId),
                            //     token: this.$cookies.get(this.$cookie.names.token)
                            // })
                        }).catch(error => {
                            this.title           = "Etwas ist schief gelaufen";
                            this.message         = error.message;
                            this.isLoadingFinish = true;
                        });
                    }
                }
            },
        }
    }
</script>

<style lang = "scss" scoped>
	.verify-email {
		&__sign-in-container {
			margin         : 0 auto $main_offset / 2;
			display        : flex;
			max-width      : 600px;
			align-items    : center;
			flex-direction : column;
		}
		
		&__message {
			margin-bottom : $main_offset / 2;
		}
		
		.link {
			margin-top : $main_offset;
		}
	}
</style>