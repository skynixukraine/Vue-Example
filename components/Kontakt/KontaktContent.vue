<template>
    <form action class = "form form--sendEmail" method = "POST" @submit.prevent = "onSubmit">
		<div class = "form__item-group">
        <div class = "form__item">
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
			<input class = "input input--name"
				   type = "text"
				   name = "name"
				   ref = "name"
				   v-model = "models.name"
				   :placeholder = "'Name'"
				   @blur = "onNameChange">
			<div class = "form__message" v-if = "errors.name">{{ errors.name }}</div>
		</div>
		</div>
        <div class = "form__item">
			<textarea class = "input input--text textarea-sendEmail"
				   type = "text"
				   name = "describe"
				   ref = "describe"
				   autocomplete = "off"
				   v-model = "models.describe"
				   :placeholder = "'Nachricht'"
				   @blur = "onBodyChange"></textarea>
			<div class = "form__message" v-if = "errors.describe">{{ errors.describe }}</div>
		</div>
		<div class = "form__item form__item--checkbox">
			<div class = "form__title form__title--accepted">
			</div>
			<div class = "group-accept-form">
			<input type = "checkbox"
				   name = "accepted"
				   ref = "accepted"
				   v-model = "models.accepted"
				   @change = "onAcceptChangeReadContract" />
			<div class = "form__title form__title--accepted">
				{{ $t('genegal-translations.i-accept') }}
				<NuxtLink :to = "$routes.datenschutzGmbh.path" class = "link link--small-blue" exact>
					{{ $t('genegal-translations.data-protection') }}
				</NuxtLink>
				{{ $t('genegal-translations.read-and-accept') }}
			</div>
			</div>
			<div class = "form__message" v-if = "errors.accepted">{{ errors.accepted }}</div>
		</div>
		<div class = "form__item form__item-kontakt-btn">
			<div class = "quest-for-submit">
				<span>{{this.questNumber}}</span>
				<input 
				type = "number" 
				name = "question"
				v-model = "models.questionAnswer"
  				@change="updateAnswer" 
				class = "quest__input"/>
				<div class = "form__message" v-if = "errors.question">{{ errors.question }}</div>
			</div>
			<button class = "link link--button link--button-full-width link--button-blue link--button-gradient btn-kontakt"
					type = "submit">
				{{ $t("links.send-email") }}
			</button>
		</div>
    </form>
</template>

<script>
import validator from "~/mixins/validator";
import UserApi from "~/services/api/User";
import modal from '~/mixins/modal';

export default {
        mixins : [
			validator,
			modal
        ],
        data(){
            return {
                models        : {
                    email    : "",
                    name     : "",
					describe : "",
					accepted   		: false,
					questionAnswer	: false,
				},
				formIsValid	   : {
					email	   		: false,
					name       		: false,
					describe   		: false,
					accepted   		: false,
					questionAnswer	: false,
				},
				quest		   : null,
                isFormSending  : false,
				succesMessage: this.$t("genegal-translations.succes-message")
            }
		},
		computed: {
			questNumber() {				
				let leftNum = Math.round(Math.random() * 10);
				let rightNum = Math.round(Math.random() * 10);
				this.quest = leftNum + rightNum;
				return `${leftNum} + ${rightNum} =`;
			}
		},
        methods: {
			updateAnswer(event) {
				this.formIsValid.questionAnswer = this.validateQuest(event, this.quest);
				this.$forceUpdate();
			},
            onEmailChange(event){
                this.formIsValid.email = this.validateEmail(event);
                this.$forceUpdate();
			},
			onNameChange(event){
                this.formIsValid.name = this.validateName(event);
                this.$forceUpdate();
			},
			onBodyChange(event){
				this.formIsValid.describe = this.validateName(event);
                this.$forceUpdate();
			},
			onAcceptChangeReadContract(event){
                this.formIsValid.accepted = this.validateAccept(event, this.models.accepted);
            },
            onSubmit(){
				this.isFormSending = true;

				if(Object.values(this.formIsValid).indexOf(false) > -1){
					this.validateForm(this.models);
                    this.isFormSending = false;
                    this.$forceUpdate();
                    return false;
				}
				
				let formData = new FormData();

				formData.append('email', this.models.email);
                formData.append('body', this.models.describe);
				formData.append('name', this.models.name);
				
				// API to Sending E-Mail

				UserApi.createSupportRequest(formData).then(response => {
						   this.openModal(this.$modals.defaultModal, this.succesMessage);
						   this.$root.$emit("showNotify", {type : "error", text : response.message});
						   this.$router.push({path : this.$routes.home.path});
                        }).catch(error => {
						   this.openModal(this.$modals.defaultModal, error.message);
						   this.$root.$emit("showNotify", {type : "error", text : error});
                        });

            },
            validateForm(models){
                // check required fields
                if(!models.email){
                    this.errors["email"] = this.$t("errors.form.required-field");
					this.$forceUpdate();
                    return false;
                }
                if(!models.name){
                    this.errors["name"] = this.$t("errors.form.required-field");
                    this.$forceUpdate();
                    return false;
                }
                if(!models.describe){
                    this.errors["describe"] = this.$t("errors.form.required-field");
                    this.$forceUpdate();
                    return false;
				}
				if(!models.accepted){
                    this.errors['accepted'] = this.$t('errors.form.required-field');
                    this.$forceUpdate();
                    return false;
				}
				if(!models.questionAnswer){
                    this.errors['question'] = this.$t('errors.form.required-field');
                    this.$forceUpdate();
                    return false;
                }
               
                return true;
            },
        }
}
</script>

<style lang = "scss" scoped>
	.quest__input {
		height: 100%;
    	width: 60px;
    	margin-right: 20px;
		-moz-appearance: textfield;
	}
	.quest__input::-webkit-outer-spin-button,
	.quest__input::-webkit-inner-spin-button {
		-webkit-appearance: none;
  		margin: 0;
	}
	.form__item-kontakt-btn {
		display: flex;
		justify-content: flex-end;
		button {
			width: auto;
			
		}
	}
	.form__item-group {
		display: flex;
	}
    .form__item-group .input--login {
		width: 90%;
	}
	.group-accept-form {
		display: flex;
		align-items: baseline;
		.form__title--accepted {
			margin-left: 10px;
		}
	}
	.textarea-sendEmail {
		resize: none;
    	overflow: hidden;
		min-height: 5em;
    	height: 200px;
	}

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
	@media (max-width : #{768px}) {	
				.form__item-kontakt-btn button {
					min-width: 140px;
					padding: 20px 45px 15px 40px;
				}
				.quest-for-submit {
					width: 170px;
				}
			}
</style>