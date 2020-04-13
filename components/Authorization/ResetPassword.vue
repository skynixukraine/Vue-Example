<template>
	<div>
	<div class="reset-pasword" v-if="success === false">
	<h3>Geben Sie die E-Mail-Adresse ein und wir senden Ihnen weitere Anweisungen</h3>
	<form action class = "form form--login" method = "POST" @submit.prevent = "onSubmit">
		<div class = "form__item">
			<div class = "form__title form__title--login">{{ $t("forms.enter-email") }}<span>*</span></div>
			<input class = "input input--email"
				   type = "email"
				   name = "email"
				   ref = "email"
				   v-model = "models.email"
				   :placeholder = "$t('forms.enter-email')"
				   @blur = "onEmailChange">
			<div class = "form__message" v-if = "errors.email">{{ errors.email }}</div>
		</div>
		<div class = "form__item">
			<button class = "link link--button link--button-full-width link--button-blue link--button-gradient"
					type = "submit">
				{{ this.$t('reset-password-page.send') }}
			</button>
		</div>
	</form>
	</div>
		<div class="reset-pasword reset-pasword__success" v-else>
			<h3>An die E-Mail wurde eine E-Mail mit weiteren Anweisungen gesendet</h3>
		</div>
	</div>
</template>

<script>
    import validator from "~/mixins/validator";
    import recaptcha from "~/mixins/recaptcha";
    import userApi from "~/services/api/User";
    export default {
        mixins : [
            validator,
            recaptcha,
        ],
        created(){
            if(process.client){
                this.$recaptchaLoaded()
                    .then(() => {
                        this.loadAndSetRecaptchaToken(this.$recaptchaActions.resetPassword)
                    })
            }
        },
        data(){
            return {
                models        : {
                    email    : ""
                },
                isFormSending : false,
				success: false,
            };
        },
        methods : {
            onSubmit(){
                this.isFormSending = true;

                if(!this.validateForm(this.models)){
                    this.isFormSending = false;
                    return false;
                }
                
                let email = this.$refs.email.value;
                let emailData = new FormData();
                emailData.append("email", email);
                emailData.append("recaptcha", this.recaptchaToken);

                userApi.resetPassword(emailData).then((response) => {
                    this.success = true
					this.$router.push({path : this.$routes.home.path});
                }).catch((error) => {
                    this.openModal(this.$modals.defaultModal, error.message, "Error");
                });
             
            },
            validateForm(models){
                // check required fields
                if(!models.email){
                    this.errors["email"] = this.$t("errors.form.required-field");
                    this.$forceUpdate();
                    this.$root.$emit("showNotify", {type : "error", text : "Имейл не заполнен"});
                    return false;
                }
                // check recaptcha token exist
                if(!this.recaptchaToken){
                    this.$root.$emit("showNotify", {type : "error", text : "Recaptcha not exist."});
                    return false;
                }

                return true;
            },
            handleErrorResponse(errors){
                if(Object.keys(errors).length === 0){
                    return true
                }

                for(let fieldName in errors){
                    this.errors[fieldName] = errors[fieldName][0];
                }
                this.$forceUpdate();
                return true;
            },

            onEmailChange(event){
                this.validateEmail(event);
                this.$forceUpdate();
            },
        }
    };
</script>

<style lang = "scss" scoped>
	h3 {
		text-align: center;
	}
	.form {
		
		&--login {
			width          : 100%;
			display        : flex;
			align-items    : center;
			flex-direction : column;
			@include tablet-big {
				width: 50%;
				margin: auto;
			}
		}
	}
	
	.form__item {
		width  : 100%;
		margin : 2% auto;
		
		.form__title {
			font-style  : normal;
			font-weight : 500;
			font-size   : 14px;
			line-height : 28px;
			color       : $color-rolling-stone;
			
			@include phone-big {
				font-size : 16px;
			}
			
			@include tablet-big {
				font-size : 18px;
			}
			span {
				color: $color-alert-red;
			}
		}
		
		.form__message {
			color        : $color-alert-red;
			padding-left : 10px;
		}
	}
	
	.reset-pasword__success {
		padding-bottom: 40px;
	}
</style>