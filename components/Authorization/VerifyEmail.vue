<template>
	<div class = "verify-email">
		<h1>{{ title }}</h1>
		<transition name = "main-animation">
			<p class = "verify-email__message" v-if = "message">{{ message }}</p>
		</transition>
		<Loader v-if = "!isLoadingFinish && (isChangeEmail && isHideContent && !isSuccess || !isChangeEmail)" />
		<div class = "verify-email__sign-in-container" v-if = "isLoadingFinish && !isChangeEmail">
			<transition name = "main-animation">
			</transition>
		</div>
		<transition name = "main-animation">
			<form class = "verify-email__change-email-form"
				  v-if = "!isHideContent && isChangeEmail"
				  @submit.prevent = "onSubmitChangeEmail">
				<InputPassword :labelTxt = "'Bestätigen Sie die Änderung der E-Mail-Adresse'"
							   @change = "onPasswordChange" />
				<button type = "submit"
						class = "control-btn--submit"
						:class = "{'control-btn--disabled': !isPasswordValid}">Bestätigen Sie
				</button>
			</form>
		</transition>
		<div class = "verify-email__links">
			<NuxtLink :to = "$routes.home.path"
					  class = "link link--button link--button-blue link--button-gradient"
					  exact>Zurück zur Homepage
			</NuxtLink>
			<transition name = "main-animation">
				<a href="https://online-hautarzt.de/einloggen"
						  class = "link link--button link--button-blue link--button-gradient"
						  exact>Mein Konto
				</a>
			</transition>
		</div>
	</div>
</template>

<script>
    import modal from "~/mixins/modal";
    import UserApi from "~/services/api/User";
    import validator from "~/mixins/validator";
    import Loader from "~/components/App/Loader";
    import InputPassword from "~/components/Content/InputPassword";
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
            SigninForm,
            InputPassword
        },
        mixins     : [
            modal,
            validator,
        ],
        mounted(){
            if(this.isChangeEmail){

            } else{
                if(process.client){
                    this.verifyEmail();
                }
            }
        },
        data(){
            return {
                title               : "Überprüfen Sie Ihre E-Mails.",
                message             : "",
                isSuccess           : false,
                isHideContent       : false,
                isPasswordValid     : false,
                isLoadingFinish     : false,
                changeEmailPassword : "",
            }
        },
        methods    : {
            onPasswordChange(event){
                this.isPasswordValid     = this.validatePassword(event);
                this.changeEmailPassword = event.target.value;
            },
            onSubmitChangeEmail(){
                this.isHideContent = true;

                this.verifyEmail();
            },
            validateQuery(){
                if(this.isChangeEmail){
                    if(this.$route.query.hasOwnProperty("token") && this.$route.query.hasOwnProperty("id")){
                        return true;
                    } else{
                        this.message         = "Ungültige Überprüfungsdaten für das Senden.";
                        this.isLoadingFinish = true;
                        return false;
                    }
                } else{
                    if(this.$route.query.hasOwnProperty("expires") && this.$route.query.hasOwnProperty("id") && this.$route.query.hasOwnProperty("signature")){
                        return true;
                    } else{
                        this.message         = "Ungültige Überprüfungsdaten für das Senden.";
                        this.isLoadingFinish = true;
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
                        formData.append("password", this.changeEmailPassword);

                        UserApi.verifyChangeEmail(formData).then(response => {
                            this.title           = "Glückwunsch!";
                            this.message         = "Ihre E-Mail-Adresse wurde erfolgreich bestätigt. Bevor Sie sich einloggen können, prüfen wir Ihre Daten auf Korrektheit. Sie erhalten eine E-Mail sobald die Prüfung abgeschlossen ist. Dies erfolgt in der Regel innerhalb 24 Stunden. Im Anschluss können Sie sich einloggen und Ihre erforderlichen Daten ergänzen, die wir dann erneut auf Korrektheit überprüfen, bevor wir Sie für die Patientenversorgung freischalten. Bitte halten Sie Ausschau nach E-Mail-Post von uns - dann kann es bald losgehen!";
                            this.isSuccess       = true;
                            this.isLoadingFinish = true;
                        }).catch(error => {
                            this.title           = "Etwas ist schief gelaufen";
                            this.message         = "Diese E-Mail wurde bereits verifiziert. Wir werden nun die von Ihnen eingereichten Informationen prüfen und über Ihre Freischaltung entscheiden. Dies dauert in der Regel weniger als 48h. Bitte halten Sie die Augen offen nach einer E-Mail, die Sie über die nächsten Schritte informiert.";
                            this.isHideContent   = false;
                            this.isLoadingFinish = true;
                        });
                    } else{
                        this.$store.dispatch("user/VERIFY_USER_EMAIL", {
							expires   : this.$route.query.expires,
							id        : this.$route.query.id,
                            signature : this.$route.query.signature,
                        }).then(response => {
                            this.title           = "Glückwunsch!";
                            this.message         = "Ihre E-Mail-Adresse wurde erfolgreich bestätigt. Bevor Sie sich einloggen können, prüfen wir Ihre Daten auf Korrektheit. Sie erhalten eine E-Mail sobald die Prüfung abgeschlossen ist. Dies erfolgt in der Regel innerhalb 24 Stunden. Im Anschluss können Sie sich einloggen und Ihre erforderlichen Daten ergänzen, die wir dann erneut auf Korrektheit überprüfen, bevor wir Sie für die Patientenversorgung freischalten. Bitte halten Sie Ausschau nach E-Mail-Post von uns - dann kann es bald losgehen!";
                            this.isSuccess       = true;
                            this.isLoadingFinish = true;

                            // need this code for new component
                            // this.$store.dispatch("user/LOAD_USER", {
                            //     id: this.$cookies.get(this.$cookie.names.tokenId),
                            //     token: this.$cookies.get(this.$cookie.names.token)
                            // })
                        }).catch(error => {
                            this.title           = "Etwas ist schief gelaufen";
                            this.message         = "Diese E-Mail wurde bereits verifiziert. Wir werden nun die von Ihnen eingereichten Informationen prüfen und über Ihre Freischaltung entscheiden. Dies dauert in der Regel weniger als 48h. Bitte halten Sie die Augen offen nach einer E-Mail, die Sie über die nächsten Schritte informiert.";
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
		&__message {
			margin-bottom : $main_offset / 2;
		}
		
		.link {
			margin-top : $main_offset;
		}
		
		&__sign-in-container {
			margin         : 0 auto $main_offset / 2;
			display        : flex;
			max-width      : 600px;
			align-items    : center;
			flex-direction : column;
		}
		
		&__change-email-form {
			margin    : 0 auto;
			max-width : 600px;
			
			.control-btn--submit {
				margin : $main_offset / 2 0;
			}
		}
	}
</style>