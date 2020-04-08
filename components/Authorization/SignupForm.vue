<template>
	<form action class = "form form--register" method = "POST" @submit.prevent = "onSubmit">
		<div class = "form__item form__item--login">
			<div class = "form__title form__title--login">{{ $t('forms.enter-email') }} <span>*</span></div>
			<input class = "input input--login"
				   type = "email"
				   name = "email"
				   ref = "email"
				   v-model = "models.email"
				   :placeholder = "$t('forms.enter-email')"
				   @blur = "onEmailChange" />
			<img v-if = "!errors.email"
				 class = "check-icon"
				 :src = "require('~/static/images/icons/check-icon.svg')"
				 alt = "check-icon" />
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
			<img class = "eye-icon"
				 :src = "require('~/static/images/icons/eye-icon.svg')"
				 alt = "eye-icon"
				 @click = "togglePasswordVisibility" />
			<div class = "form__message" v-if = "errors.password">{{ errors.password }}</div>
		</div>
		<div class = "form__item">
			<div class = "form__title form__title--password">{{ $t('forms.confirm-password') }}</div>
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
			<div class = "form__title form__title--phone_number">{{ $t('forms.phone-number') }} <span>*</span></div>
			<vue-tel-input id = "vue-tel-input"
						   name = "phone_number"
						   v-model = "models.phone_number"
						   v-bind = "bindProps"
						   @input = "onPhoneChange" />
			<div class = "form__message" v-if = "errors.phone_number">{{ errors.phone_number }}</div>
			<div class = "form__message" v-if = "errors.phone_number_invalid">{{ errors.phone_number_invalid }}</div>
		</div>
		<div class = "form__item">
			<div class = "form__title form__title--lanr">{{ $t('forms.lanr') }}</div>
			<input class = "input input--lanr"
				   type = "text"
				   name = "lanr"
				   ref = "password_confirmation"
				   v-model = "models.lanr"
				   :placeholder = "$t('forms.lanr')" />
		</div>
		<div class = "form__item">
			<div class = "form__title form__title--degree">{{ $t('forms.upload-degree') }}</div>
			<input class = "input input--hidden"
				   type = "file"
				   name = "degree"
				   ref = "degree"
				   @change = "onDegreeUpload" />
			<button class = "link link--button link--button-full-width link--button-white link--button-upload"
					type = "button"
					@click = "addFileDegree">
				<img class = "paper-fastener-button-image"
					 :src = "require('~/static/images/icons/paper-fastener-button-icon.svg')"
					 alt = "paper-fastener-button">
				<p>{{ models.degree ? models.degree.name : $t('forms.add-degree') }}</p>
			</button>
			<div class = "form__message" v-if = "errors.degree">{{ errors.degree }}</div>
			<div class = "form__message" v-if = "errors.degree_size">{{ errors.degree_size }}</div>
		</div>
		<div class = "form__item">
			<div class = "form__title form__title--certification">
				{{ $t('forms.upload-certification') }}
			</div>
			<input class = "input input--hidden"
				   type = "file"
				   name = "certification"
				   ref = "certification"
				   @change = "onCertificationUpload" />
			<button class = "link link--button link--button-full-width link--button-white link--button-upload"
					type = "button"
					@click = "addFileCertification">
				<img class = "paper-fastener-button-image"
					 :src = "require('~/static/images/icons/paper-fastener-button-icon.svg')"
					 alt = "paper-fastener-button">
				<p>{{ models.certification ? models.certification.name : $t('forms.add-certification') }}</p>
			</button>
			<div class = "form__message" v-if = "errors.certification">{{ errors.certification }}</div>
			<div class = "form__message" v-if = "errors.certification_size">{{ errors.certification_size }}</div>
		</div>
		<div class = "form__item form__item--checkbox">
			<div class = "form__title form__title--accepted">
				{{ $t('genegal-translations.i-accept') }}
				<NuxtLink :to = "$routes.terms.path" class = "link link--small-blue" exact>
					{{ $t('genegal-translations.general-terms') }}
				</NuxtLink>
				{{ $t('genegal-translations.read-and-accept') }}
			</div>
			<input type = "checkbox"
				   name = "accepted"
				   ref = "accepted"
				   v-model = "models.accepted"
				   @change = "onAcceptChangeTerms" />
			<div class = "form__message" v-if = "errors.accepted">{{ errors.accepted }}</div>
		</div>
		<div class = "form__item form__item--checkbox">
			<div class = "form__title form__title--accepted">
				{{ $t('genegal-translations.i-accept') }}
				<NuxtLink :to = "$routes.datenschutzGmbh.path" class = "link link--small-blue" exact>
					{{ $t('genegal-translations.data-protection') }}
				</NuxtLink>
				{{ $t('genegal-translations.read-and-accept') }}
			</div>
			<input type = "checkbox"
				   name = "accepted2"
				   ref = "accepted2"
				   v-model = "models.accepted2"
				   @change = "onAcceptChangePolicy" />
			<div class = "form__message" v-if = "errors.accepted2">{{ errors.accepted2 }}</div>
		</div>
		<div class = "form__item form__item--checkbox">
			<div class = "form__title form__title--accepted">
				{{ $t('genegal-translations.accept') }}
				<NuxtLink :to = "$routes.arztvertrag.path" class = "link link--small-blue" exact>
					{{ $t('genegal-translations.medical-contract') }}
				</NuxtLink>
				{{ $t('genegal-translations.read-and-accept') }}
			</div>
			<input type = "checkbox"
				   name = "accepted3"
				   ref = "accepted3"
				   v-model = "models.accepted3"
				   @change = "onAcceptChangeReadContract" />
			<div class = "form__message" v-if = "errors.accepted3">{{ errors.accepted3 }}</div>
		</div>
		<div class = "form__item form__item--checkbox">
			<div class = "form__title form__title--accepted">
				{{ $t('genegal-translations.am-a-specialist') }}
			</div>
			<input type = "checkbox"
				   name = "accepted4"
				   ref = "accepted4"
				   v-model = "models.accepted4"
				   @change = "onAcceptChangeConfirm" />
			<div class = "form__message" v-if = "errors.accepted4">{{ errors.accepted4 }}</div>
		</div>
		<div class = "form__item">
			<button class = "link link--button link--button-full-width link--button-blue link--button-gradient"
					type = "submit"
					:disabled = "isFormSending">
				{{ isFormSending ? $t('states.loading') : $t('links.signup') }}
			</button>
		</div>
	</form>
</template>

<script>
    import modal from '~/mixins/modal';
    import validator from '~/mixins/validator';
    import recaptcha from '~/mixins/recaptcha';
    import localStorage from '~/mixins/localStorage';

    export default {
        mixins : [
            validator,
            recaptcha,
            modal,
            localStorage,
        ],
        created(){
            if(process.client){
                this.$recaptchaLoaded()
                    .then(() =>{
                        this.loadAndSetRecaptchaToken(this.$recaptchaActions.registerDoctor)
                    });
            }
        },
        data(){
            return {
                models            : {
                    lanr                  : '',
                    email                 : '',
                    password              : '',
                    password_confirmation : '',
                    phone_number          : '',
                    degree                : '',
                    certification         : '',
                    accepted              : false,
                    accepted2             : false,
                    accepted3             : false,
                    accepted4             : false
                },
                formIsValid       : {
                    lanr             : true,
                    password         : false,
                    confirm_password : false,
                    email            : false,
                    phone            : false,
                    terms            : false,
                    degree           : false,
                    certification    : false,
                    policy           : false,
                    read_contract    : false,
                    confirm          : false,
                },
                bindProps         : {
                    mode                    : "international",
                    defaultCountry          : "",
                    disabledFetchingCountry : false,
                    disabled                : false,
                    disabledFormatting      : false,
                    placeholder             : this.$t('forms.phone-number'),
                    required                : false,
                    enabledCountryCode      : false,
                    enabledFlags            : true,
                    autocomplete            : "off",
                    maxLen                  : 25,
                    validCharactersOnly     : true
                },
                isFormSending     : false,
                fieldTypePassword : true
            }
        },

        methods : {
            async onSubmit(){
                this.isFormSending = true;

                if(Object.values(this.formIsValid).indexOf(false) > -1){
                    this.validateForm(this.models);
                    this.isFormSending = false;
                    this.$forceUpdate();
                    return false;
                }

                const formData = this.prepareDataForSending(this.models);

                this.$store.dispatch('user/REGISTER_USER', formData)
                    .then((response) =>{
                        this.openModal(this.$modals.registerSuccess);
                        this.loadAndSetRecaptchaToken(this.$recaptchaActions.registerDoctor);
                        this.isFormSending = false;
                    })
                    .catch((response) =>{
                        this.$root.$emit('showNotify', {type : 'error', text : response.message});
                        this.handleErrorResponse(response.errors);
                        this.loadAndSetRecaptchaToken(this.$recaptchaActions.registerDoctor);
                        this.isFormSending = false;
                    });
            },
            validateForm(models){
                // check required fields
                if(!models.email){
                    this.errors['email'] = this.$t('errors.form.required-field');
                    this.$root.$emit('showNotify', {type : 'error', text : this.$t('errors.form.email-is-empty')});
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
                if(!models.phone_number){
                    this.errors['phone_number'] = this.$t('errors.form.required-field');
                    this.$root.$emit('showNotify', {type : 'error', text : this.$t('errors.form.phone-is-empty')});
                }
                if(!models.accepted){
                    this.errors['accepted'] = this.$t('errors.form.required-field');
                    this.$root.$emit('showNotify', {
                        type : 'error',
                        text : this.$t('errors.form.accept-terms')
                    });
                }
                if(!models.accepted2){
                    this.errors['accepted2'] = this.$t('errors.form.required-field');
                    this.$root.$emit('showNotify', {
                        type : 'error',
                        text : this.$t('errors.form.accept-conditions')
                    });
                }
                if(!models.accepted3){
                    this.errors['accepted3'] = this.$t('errors.form.required-field');
                    this.$root.$emit('showNotify', {
                        type : 'error',
                        text : this.$t('errors.form.accept-contract')
                    });
                }
                if(!models.accepted4){
                    this.errors['accepted4'] = this.$t('errors.form.required-field');
                    this.$root.$emit('showNotify', {
                        type : 'error',
                        text : this.$t('errors.form.i-am-specialist')
                    });
                }
               

                // check recaptcha token exist
                if(!this.recaptchaToken){
                    this.$root.$emit('showNotify', {
                        type : 'error',
                        text : this.$t('errors.form.invalid-recaptcha-tocken')
                    });
                }

                return false;
            },
            handleErrorResponse(errors){
                if(Object.keys(errors).length === 0){
                    return true;
                }

                for(let fieldName in errors){
                    this.errors[fieldName] = errors[fieldName][0];
                }
                this.$forceUpdate();
                return true;
            },

            prepareDataForSending(models){
                let formData = new FormData();

                // required fields
                formData.append('email', models.email);
                formData.append('phone_number', models.phone_number);
                formData.append('password', models.password);
                formData.append('password_confirmation', models.password_confirmation);
                formData.append('accepted', models.accepted);
                formData.append('accepted2', models.accepted2);
                formData.append('accepted3', models.accepted3);
                formData.append('accepted4', models.accepted4);

                // unrequired fields
                if(models.degree){
                    formData.append('medical_degree', models.degree);
                }
                if(models.certification){
                    formData.append('board_certification', models.certification);
                }
                if(models.lanr){
                    formData.append('lanr', models.lanr);
                }

                // recaptcha token for action 'register_doctor'
                formData.append('recaptcha', this.recaptchaToken);

                return formData;
            },
            // files upload
            addFileDegree(){
                this.$refs.degree.click()
            },
            addFileCertification(){
                this.$refs.certification.click()
            },
            // inputs changes
            onEmailChange(event){
                this.formIsValid.email = this.validateEmail(event);
                this.$forceUpdate();
                this.setObjLocalStorage({email : event.target.value});
            },
            onPasswordChange(event){
                this.formIsValid.password = this.validatePassword(event, this.$refs.password_confirmation);
                this.$forceUpdate();
            },
            onConfirmPasswordChange(event){
                this.formIsValid.confirm_password = this.validateConfirmPassword(event, this.$refs.password);
                this.$forceUpdate();
            },
            onPhoneChange(eventValue, telInput){
                this.models.telInput   = telInput;
                this.formIsValid.phone = this.validatePhone(eventValue, this.models.telInput);
                this.$forceUpdate()
            },
            onDegreeUpload(event){
                if(!event.target.files[0]){ return; }

                if(this.validateFileExtension(event)){
                    this.models.degree      = event.target.files[0];
                    this.formIsValid.degree = true;
                } else{
                    this.models.degree = '';
                }

                this.$forceUpdate();
            },
            onCertificationUpload(event){
                if(!event.target.files[0]){ return; }

                if(this.validateFileExtension(event)){
                    this.models.certification      = event.target.files[0];
                    this.formIsValid.certification = true;
                } else{
                    this.models.certification = '';
                }
                this.$forceUpdate();
            },
            onAcceptChangeTerms(event){
                this.formIsValid.terms = this.validateAccept(event, this.models.accepted);


            },
            onAcceptChangePolicy(event){
                this.formIsValid.policy = this.validateAccept(event, this.models.accepted2);
            },
            onAcceptChangeReadContract(event){
                this.formIsValid.read_contract = this.validateAccept(event, this.models.accepted3);
            },
            onAcceptChangeConfirm(event){
                this.formIsValid.confirm = this.validateAccept(event, this.models.accepted4);
            },
            togglePasswordVisibility(){
                this.$refs.password.type = this.$refs.password.type === 'password' ?
                    this.$refs.password.type = 'text' :
                    this.$refs.password.type = 'password';
            }
        }
    }
</script>

<style lang = "scss" scoped>
	.form {
		&--register {
			width           : 100%;
			display         : flex;
			align-items     : center;
			flex-direction  : column;
			justify-content : center;
		}
	}
	.form__item {
		width  : 100%;
		margin : 2% auto;
		
		.form__title {
			color       : $color-rolling-stone;
			font-size   : 14px;
			font-style  : normal;
			font-weight : 500;
			line-height : 28px;
			
			@include phone-big {
				font-size : 16px;
			}
			
			@include desktop {
				font-size : 18px;
			}
			
			span { color : $color-alert-red; }
		}
		
		.form__message {
			color        : $color-alert-red;
			text-align   : left;
			padding-left : 10px;
		}
		
		&--login,
		&--password,
		&--lanr {
			position : relative;
		}
		
		&--checkbox {
			display         : flex;
			align-items     : center;
			flex-direction  : row-reverse;
			justify-content : flex-end;
			position        : relative;
			margin          : 3% auto;
			
			.form__title--accepted {
				font-size    : 14px;
				text-align   : left;
				padding-left : 10px;
				line-height  : 18px;
				
				@include tablet {
					line-height : 28px;
				}
			}
			.form__message {
				position     : absolute;
				left         : 0;
				bottom       : -18px;
				padding-left : 0;
				@include tablet {
					bottom       : -15px;
					padding-left : 10px;
				}
			}
		}
		
		.input, #vue-tel-input {
			width         : 100%;
			height        : 40px;
			background    : $color-white;
			box-sizing    : border-box;
			padding-top   : 4px;
			padding-left  : 2%;
			border-radius : 4px;
			
			@include phone-big {
				height : 56px;
			}
			
			@include desktop {
				width : 544px;
			}
			
			&::placeholder, input::placeholder, &::-webkit-input-placeholder, &::-moz-placeholder, &:-ms-input-placeholder {
				color       : $color-form-input-placeholder;
				font-style  : normal;
				font-weight : 400;
			}
		}
	}
	input[type="checkbox"] { order : 1; }
	.form__message {
		text-align   : left;
		padding-left : 15px;
		
		@include phone-big {
			padding-left : 15px;
		}
	}
	.check-icon,
	.eye-icon {
		top      : 40px;
		right    : 20px;
		cursor   : pointer;
		position : absolute;
		
		@include phone-big {
			top : 48px;
		}
	}
</style>

<style lang = "scss">
	.vti__input {
		max-width : 150px;
		
		@include phone-big {
			max-width : 250px;
		}
		
		&::placeholder {
			color       : $color-form-input-placeholder;
			font-style  : normal;
			font-weight : 500;
		}
	}
	.vue-tel-input#vue-tel-input {
		border : 1px solid $color-table-border;
		.vti__input {
			max-width : 180px;
			
			@include phone-big {
				max-width : 300px;
			}
		}
	}
	.form__message {
		font-size : 13px;
	}
</style>