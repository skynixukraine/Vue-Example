<template>
    <form action class = "form form--sendEmail" method = "POST" @submit.prevent = "onSubmit">
        <div class = "form__item">
			<div class = "form__title form__title--email"></div>
			<input class = "input input--login"
				   type = "email"
				   name = "email"
				   ref = "email"
				   v-model = "models.email"
				   :placeholder = "$t('forms.enter-email')"
				   @blur = "onEmailChange">
			<div class = "form__message" v-if = "errors.email">{{ errors.email }}</div>
		</div>
        <div class = "form__item">
			<div class = "form__title form__title--name"></div>
			<input class = "input input--password"
				   type = "text"
				   name = "name"
				   ref = "name"
				   v-model = "models.name"
				   :placeholder = "'Name'">
			<div class = "form__message" v-if = "errors.name">{{ errors.name }}</div>
		</div>
        <div class = "form__item">
			<div class = "form__title form__title--password"></div>
			<input class = "input input--password"
				   type = "text"
				   name = "describe"
				   ref = "describe"
				   v-model = "models.describe"
				   :placeholder = "'Nachricht'">
			<div class = "form__message" v-if = "errors.describe">{{ errors.describe }}</div>
		</div>
		<div class = "form__item">
			<button class = "link link--button link--button-full-width link--button-blue link--button-gradient"
					type = "submit">
				{{ $t("links.signin") }}
			</button>
		</div>
    </form>
</template>

<script>
import validator from "~/mixins/validator";

export default {
        mixins : [
            validator
        ],
        data(){
            return {
                models        : {
                    email    : "",
                    name     : "",
                    describe : "",
                },
                isFormSending : false,
            }
        },
        methods: {
            onEmailChange(event){
                this.validateEmail(event);
                this.$forceUpdate();
            },
            onSubmit(){
                this.isFormSending = true;

                if(!this.validateForm(this.models)){
                    this.isFormSending = false;
                    return false;
                }
            },
            validateForm(models){
                // check required fields
                if(!models.email){
                    this.errors["email"] = this.$t("errors.form.required-field");
                    this.$forceUpdate();
                    this.$root.$emit("showNotify", {type : "error", text : "Email required"});
                    return false;
                }
                if(!models.name){
                    this.errors["name"] = this.$t("errors.form.required-field");
                    this.$forceUpdate();
                    this.$root.$emit("showNotify", {type : "error", text : "Name required"});
                    return false;
                }
                if(!models.describe){
                    this.errors["describe"] = this.$t("errors.form.required-field");
                    this.$forceUpdate();
                    this.$root.$emit("showNotify", {type : "error", text : "Describe required"});
                    return false;
                }
               
                return true;
            },
        }
}
</script>

<style lang = "scss" scoped>
	.form {
		&--login {
			width          : 100%;
			display        : flex;
			align-items    : center;
			flex-direction : column;
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
		}
		
		.form__message {
			color        : $color-alert-red;
			padding-left : 10px;
		}
	}
</style>