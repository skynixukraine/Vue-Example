<template>
	<div>
		<div class="reset-pasword" v-if="success === false">
			<h3>Geben Sie neue Daten ein</h3>
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
				<div class = "form__item form__item--password">
					<div class = "form__title form__title--password">{{ $t('forms.create-password') }} <span>*</span></div>
					<input class = "input input--password"
						   type = "password"
						   name = "password"
						   ref = "password"
						   v-model = "models.password"
						   :placeholder = "$t('forms.create-password')"
						   @blur = "onPasswordChange" />
					<div class = "form__message" v-if = "errors.password">{{ errors.password }}</div>
				</div>
				<div class = "form__item">
					<div class = "form__title form__title--password">{{ $t('forms.confirm-password') }}<span>*</span></div>
					<input class = "input input--password"
						   type = "password"
						   name = "password_confirmation"
						   ref = "password_confirmation"
						   v-model = "models.password_confirmation"
						   :placeholder = "$t('forms.confirm-password')"
						   @blur = "onConfirmPasswordChange" />
					<div class = "form__message"
						 v-if = "errors.password_confirmation">
						{{ errors.password_confirmation }}
					</div>
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
			<h3>Passwort erfolgreich geändert. Melden Sie sich erneut an</h3>
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
                    email                 : '',
                    password              : '',
                    password_confirmation : '',
                },
                formIsValid       : {
                    password         : false,
                    confirm_password : false,
                    email            : false,
                },
                isFormSending : false,
                success: false,
            };
        },
        methods : {
            onSubmit(){
                this.isFormSending = true;

                if(!this.models.password){
                    this.errors['password'] = this.$t('errors.form.required-field');
                    this.$root.$emit('showNotify', {type : 'error', text : this.$t('errors.form.password-is-empty')});
                }
                if(!this.models.password_confirmation){
                    this.errors['password_confirmation'] = this.$t('errors.form.required-field');
                    this.$root.$emit('showNotify', {
                        type : 'error',
                        text : this.$t('errors.form.сonfirmation-password-is-empty')
                    });
                }

                if(Object.values(this.formIsValid).indexOf(false) > -1){
                    this.validateForm(this.models);
                    this.isFormSending = false;
                    this.$forceUpdate();
                    return false;
                }

                let email = this.$refs.email.value;
                let emailData = new FormData();

            },
            validateForm(models){
                // check required fields
                if(!models.email){
                    this.errors["email"] = this.$t("errors.form.required-field");
                    this.$forceUpdate();
                    this.$root.$emit("showNotify", {type : "error", text : "Имейл не заполнен"});
                    return false;
                }
                if(!models.password){
                    this.errors['password'] = this.$t('errors.form.required-field');
                    this.$root.$emit('showNotify', {type : 'error', text : this.$t('errors.form.password-is-empty')});
                }
                if(!models.password_confirmation){
                    this.errors['password_confirmation'] = this.$t('errors.form.required-field');
                    this.$root.$emit('showNotify', {
                        type : 'error',
                        text : this.$t('errors.form.сonfirmation-password-is-empty')
                    });
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
            onPasswordChange(event){
                this.formIsValid.password = this.validatePassword(event, this.$refs.password_confirmation);
                this.$forceUpdate();
            },
            onConfirmPasswordChange(event){
                this.formIsValid.confirm_password = this.validateConfirmPassword(event, this.$refs.password);
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