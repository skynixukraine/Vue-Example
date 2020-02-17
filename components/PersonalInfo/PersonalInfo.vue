<template lang = "html">
	<div>
		<form class = "personal-info">
			<div class = "personal-info__items">
				<div class = "personal-info__column">
					
					<div class = "personal-info__item">
						<header class = "personal-info__header">
							<div class = "personal-info__header-item">
								<div class = "personal-info__header-title">Titel</div>
							</div>
						</header>
						<div class = "personal-info__main personal-info__main-select">
							<select
									class = "select"
									name = "title_id"
									ref = "title_id"
									v-model = "title_id"
							>
								<option disabled value = "">Choose one of the options</option>
								<option v-for = "(option, index) in $store.getters['doctorTitles/DOCTOR_TITLES']"
										:key = "index"
										:value = "option.id">{{ option.name }}
								</option>
							</select>
						</div>
						<footer class = "personal-info__footer" v-if = "errors.title_id">{{ errors.title_id }}</footer>
					</div>
					
					<div class = "personal-info__item">
						<header class = "personal-info__header">
							<div class = "personal-info__header-item">
								<div class = "personal-info__header-title">Vorname</div>
							</div>
						</header>
						<div class = "personal-info__main">
							<input
									class = "input"
									type = "text"
									name = "first_name"
									ref = "first_name"
									v-model = "first_name"
							/>
							<img v-if = "!errors.email"
								 class = "check-icon"
								 :src = "require('~/static/images/icons/check-icon.svg')"
								 alt = "check-icon"
							/>
						</div>
						<footer class = "personal-info__footer" v-if = "errors.first_name">{{ errors.first_name }}
						</footer>
					</div>
					
					<div class = "personal-info__item">
						<header class = "personal-info__header">
							<div class = "personal-info__header-item">
								<div class = "personal-info__header-title">Nachname</div>
							</div>
						</header>
						<div class = "personal-info__main">
							<input
									class = "input"
									type = "text"
									name = "last_name"
									ref = "last_name"
									v-model = "last_name"
							/>
						</div>
						<footer class = "personal-info__footer" v-if = "errors.last_name">{{ errors.last_name }}
						</footer>
					</div>
					
					<div class = "personal-info__item">
						<header class = "personal-info__header">
							<div class = "personal-info__header-item">
								<div class = "personal-info__header-title">Telefonnummer</div>
							</div>
						</header>
						<div class = "personal-info__main">
							<vue-tel-input
									id = "vue-tel-input"
									class = "personal-info__main-phone"
									name = "phone_number"
									v-bind = "bindProps"
									v-model = "models.phone_number"
									@input = "onPhoneChange"
							></vue-tel-input>
							<div class = "form__message" v-if = "errors.phone_number">{{ errors.phone_number }}</div>
						</div>
						<footer class = "personal-info__footer" v-if = "errors.first_name">{{ errors.first_name }}
						</footer>
					</div>
					
					<div class = "personal-info__item">
						<header class = "personal-info__header">
							<div class = "personal-info__header-item">
								<div class = "personal-info__header-title">Facharztbezeichnung</div>
							</div>
						</header>
						<div class = "personal-info__main personal-info__main-select">
							<select class = "select"
									name = "specialization_id"
									ref = "specialization_id"
									v-model = "specialization_id">
								<option disabled value>Choose one of the options</option>
								<option
										v-for = "(option, index) in $store.getters['specializations/SPECIALIZATIONS']"
										:key = "index"
										:value = "option.id"
								>{{ option.name }}
								</option>
							</select>
						</div>
						<footer class = "personal-info__footer" v-if = "errors.specialization_id">{{
							errors.specialization_id }}
						</footer>
					</div>
					
					<div class = "personal-info__item">
						<div class = "single-form">
							<header class = "personal-info__header">
								<div class = "personal-info__header-item">
									<div class = "personal-info__header-title">E-Mail Adresse</div>
								</div>
							</header>
							<div class = "personal-info__main">
								<input
										class = "input input--login"
										type = "email"
										name = "email"
										ref = "email"
										v-model = "models.email"
										:placeholder = "$t('forms.enter-email')"
								/>
								<div class = "form__message" v-if = "errors.email">{{ errors.email }}</div>
							</div>
						</div>
					</div>
					
					<div class = "personal-info__item">
						<header class = "personal-info__header">
							<div class = "personal-info__header-item">
								<div class = "personal-info__header-title">Password</div>
							</div>
						</header>
						<div class = "personal-info__main">
							<input
									class = "input"
									type = "password"
									name = "password"
									ref = "password"
									v-model = "models.password"
									:placeholder = "$t('forms.enter-password')"
							/>
							<div class = "form__message" v-if = "errors.password">{{ errors.password }}</div>
						</div>
					
					</div>
				
				</div>
				<div class = "personal-info__column">
					
					<div class = "personal-info__item">
						<div class = "personal-info__header">Approbationsurkunde hochladen</div>
						
						<div class = "personal-info__upload">
							<div v-html = "selectedDegreeImageHTML"
								 class = "personal-info__upload-image"
								 ref = "selectedDegreeImageHTML">
							</div>
							<button type = "button"
									v-if = "selectedDegreeImageHTML"
									@click = "removeDegreeImage"
									class = "personal-info__upload-close">
							</button>
						</div>
						
						<input class = "input input--hidden"
							   type = "file"
							   name = "degree"
							   ref = "degree"
							   accept = ".jpg, .jpeg, .png, .pdf"
							   @change = "onDegreeUpload" />
						<button class = "link link--button link--button-full-width link--button-upload"
								type = "button"
								@click = "addFileDegree">
							<img class = "paper-fastener-button-image"
								 :src = "require('~/static/images/icons/paper-fastener-button-icon.svg')"
								 alt = "paper-fastener-button" />
							<p>{{ selectedDegreeImageHTML ? models.degree.name : $t('forms.add-degree') }}</p>
						</button>
						<div class = "form__message" v-if = "errors.degree">{{ errors.degree }}</div>
						<div class = "form__message" v-if = "errors.degree_size">{{ errors.degree_size }}</div>
					</div>
					
					<div class = "personal-info__item">
						<div class = "personal-info__header">Facharztzeugnis hochladen</div>
						<div class = "personal-info__upload">
							<div v-html = "selectedCertificationImageHTML" class = "personal-info__upload-image"></div>
							<button type = "button"
									v-if = "selectedCertificationImageHTML"
									@click = "removeCertificationImage"
									class = "personal-info__upload-close"></button>
						</div>
						<input class = "input input--hidden"
							   type = "file"
							   name = "certification"
							   ref = "certification"
							   accept = ".jpg, .jpeg, .png, .pdf"
							   @change = "onCertificationUpload" />
						<button class = "link link--button link--button-full-width link--button-upload"
								type = "button"
								@click = "addFileCertification">
							<img class = "paper-fastener-button-image"
								 :src = "require('~/static/images/icons/paper-fastener-button-icon.svg')"
								 alt = "paper-fastener-button" />
							<p>{{ selectedCertificationImageHTML ? models.certification.name :
								$t('forms.add-certification') }}</p>
						</button>
						
						<div class = "form__message" v-if = "errors.certification">{{ errors.certification }}</div>
						<div class = "form__message" v-if = "errors.certification_size">{{ errors.certification_size }}
						</div>
					</div>
					
					<div class = "personal-info__item">
						<header class = "personal-info__header">
							<div class = "personal-info__header-item">
								<div class = "personal-info__header-title">Straße/Hausnummer</div>
							</div>
						</header>
						<div class = "personal-info__main">
							<input
									class = "input"
									type = "text"
									name = "address"
									ref = "address"
									v-model = "address"
							/>
						</div>
					</div>
					
					<div class = "personal-info__item">
						<div class = "single-form">
							<header class = "personal-info__header">
								<div class = "personal-info__header-item">
									<div class = "personal-info__header-title">Region</div>
								</div>
							</header>
							<div class = "personal-info__main personal-info__main-select">
								<select class = "select" name = "region_id" ref = "region_id" v-model = "region_id">
									<option disabled value>Choose one of the options</option>
									<option
											v-for = "(option, index) in $store.getters['regions/REGIONS']"
											:key = "index"
											:value = "option.id"
									>{{ option.name }}
									</option>
								</select>
							</div>
							<footer
									class = "personal-info__footer"
									v-if = "errors.region_id"
							>{{ errors.region_id }}
							</footer>
						</div>
					</div>
					
					<div class = "personal-info__item">
						<header class = "personal-info__header">
							<div class = "personal-info__header-item">
								<div class = "personal-info__header-title">Languages</div>
							</div>
						</header>
						<div class = "personal-info__main personal-info__main-select">
							<select class = "select" name = "language_id" ref = "language_id" v-model = "language_id">
								<option disabled value>Choose one of the options</option>
								<option></option>
								<option></option>
							</select>
						</div>
					</div>
					
					<div class = "personal-info__item">
						<header class = "personal-info__header">
							<div class = "personal-info__header-item">
								<div class = "personal-info__header-title">BIO</div>
							</div>
						</header>
						<div class = "personal-info__main">
							<AutoHeight :placeholder_text = "'BIO'" />
						</div>
					</div>
					
					<div class = "personal-info__item">
						<header class = "personal-info__header">
							<div class = "personal-info__header-item">
								<div class = "personal-info__header-title">BIO Short</div>
							</div>
						</header>
						<div class = "personal-info__main">
							<AutoHeight :placeholder_text = "'BIO Short'" />
						</div>
					</div>
				
				</div>
				
				<div class = "personal-info__column personal-info__column-image">
					<div class = "personal-info__item personal-info__avatar">
						
						<img
								class = "personal-info__avatar-image"
								src = "https://i.ya-webdesign.com/images/anonymous-png-avatar-17.png"
								alt = "personal-avatar"
								ref = "avatarImage"
						/>
						
						<input class = "input input--hidden"
							   type = "file"
							   name = "avatar"
							   ref = "avatar"
							   accept = ".jpg, .jpeg, .png"
							   @change = "onAvatarUpload" />
						
						<button class = "link personal-info__avatar-add"
								type = "button"
								@click = "addAvatar">
							<img :src = "require('~/static/images/icons/add-avatar.svg')" />
						</button>
						
						<div v-html = "selectedAvatarImageHTML"
							 class = "personal-info__upload-image"
							 ref = "selectedAvatarImageHTML">
						</div>
					
					</div>
				</div>
			</div>
			
			<div class = "personal-info__items">
				<div class = "personal-info__column">
					<div class = "personal-info__item">
						<template>
							<button class = "link link--button link--button-full-width link--button-gradient personal-info__item-link">
								REQUEST APPROVAL
							</button>
						</template>
					</div>
				</div>
				<div class = "personal-info__column">
					<div class = "personal-info__item">
						<template>
							<button class = "link link--button link--button-full-width link--button-gradient personal-info__item-link">
								Save
							</button>
						</template>
					</div>
				</div>
			</div>
		</form>
		<div class = "personal-text">
			<p>Please fill in all information in order to request Administrator’s approval and appear in search on
				Online Hautarzt.</p>
			<p>Once approved, you will be able to add your bank details and begin servicing your patients through Online
				Hautarzt platform.</p>
		</div>
		<div class = "personal-link">
			<div class = "personal-info__items">
				<div class = "personal-info__column personal-link__column">
					<button class = "link link--button link--button-full-width link--button-gradient personal-info__item-link">
						PAUSE/UNPAUSE MY ACCOUNT
					</button>
				</div>
				<div class = "personal-info__column personal-link__column">
					<button class = "link link--button link--button-full-width link--button-gradient personal-info__item-link">
						DELETE MY ACCOUNT
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

    import singleForm from '~/mixins/singleForm'
    import validator from '~/mixins/validator'
    import AutoHeight from "~/components/Content/AutoHeight"

    export default {
        mixins : [
            singleForm,
            validator,
        ],

        components : {
            AutoHeight,
        },

        data(){
            return {
                title_id          : this.$store.getters['user/USER'].title.id,
                first_name        : this.$store.getters['user/USER'].first_name,
                last_name         : this.$store.getters['user/USER'].last_name,
                specialization_id : this.$store.getters["user/USER"].specialization.id,
                region_id         : this.$store.getters["user/USER"].region.id,
                language_id       : '',
                address           : '',

                models        : {
                    phone_number  : '',
                    email         : '',
                    password      : '',
                    degree        : '',
                    certification : '',

                },
                bindProps     : {
                    placeholder : "Telefonnummer",
                },
                isFormSending : false,

                selectedCertificationImageHTML : "",
                selectedDegreeImageHTML        : "",
                selectedAvatarImageHTML        : ""
            }
        },

        methods : {

            // files upload
            addFileDegree(){
                this.$refs.degree.click();
            },

            addFileCertification(){
                this.$refs.certification.click()
            },

            addAvatar(){
                this.$refs.avatar.click()
            },

            onDegreeUpload(event){
                if(!event.target.files[0]){ return; }

                let file    = null;
                const _this = this;
                let reader  = new FileReader();

                this.validateFileExtension(event) ? this.models.degree = event.target.files[0] : this.models.degree = '';
                this.validateFileExtension(event) ? file = event.target.files[0] : file = '';

                reader.onload = function(e){
                    let uploadImage = null;
                    (file.type === "application/pdf") ? (uploadImage = '<object type="application/pdf" data="' + e.target.result + '" class="personal-info__upload-src"></object>') : (uploadImage = '<img class="personal-info__upload-src" src="' + e.target.result + '"/>');
                    _this.selectedDegreeImageHTML = uploadImage;
                };
                file && reader.readAsDataURL(file);
                this.$forceUpdate();
            },

            onCertificationUpload(event){
                if(!event.target.files[0]){ return; }

                let file    = null;
                const _this = this;
                let reader  = new FileReader();

                this.validateFileExtension(event) ? this.models.certification = event.target.files[0] : this.models.certification = '';
                this.validateFileExtension(event) ? file = event.target.files[0] : file = '';

                reader.onload = function(e){
                    let uploadImage = null;
                    (file.type === "application/pdf") ? (uploadImage = '<object type="application/pdf" data="' + e.target.result + '" class="personal-info__upload-src"></object>') : (uploadImage = '<img class="personal-info__upload-src" src="' + e.target.result + '"/>');
                    _this.selectedCertificationImageHTML = uploadImage;
                };

                file && reader.readAsDataURL(file);
                this.$forceUpdate();
            },

            onAvatarUpload(event){
                if(!event.target.files[0]){ return; }

                let file    = null;
                const _this = this;
                let reader  = new FileReader();

                this.validateFileExtension(event) ? this.models.avatar = event.target.files[0] : this.models.avatar = '';
                this.validateFileExtension(event) ? file = event.target.files[0] : file = '';

                reader.onload = function(e){
                    _this.$refs.avatarImage.src = e.target.result;
                };

                file && reader.readAsDataURL(file);
                this.$forceUpdate();
            },

            removeDegreeImage(){
                this.selectedDegreeImageHTML = "";
                this.$refs.degree.value      = "";
            },

            removeCertificationImage(){
                this.selectedCertificationImageHTML = "";
                this.$refs.certification.value      = "";
            },

            onPhoneChange(formattedNumber, telInput){
                this.validatePhone(telInput);
            },

        }
    };
</script>

<style lang = "scss">
	.personal-info {
		margin-bottom : 40px;
		
		&__items {
			margin    : 30px 0 20px 0;
			display   : flex;
			flex-wrap : wrap;
		}
		
		&__column {
			flex  : 0 0 100%;
			order : 2;
			
			@include tablet {
				flex          : 0 0 50%;
				padding-right : 33px;
			}
			
			@include desktop {
				flex : 0 0 28.5%;
			}
		}
		
		&__column-image {
			flex          : 0 0 100%;
			order         : 1;
			padding-right : 0;
			
			@include desktop {
				flex         : 0 0 28.5%;
				order        : 3;
				padding-left : 15px;
			}
		}
		
		&__item {
			width         : 100%;
			margin-bottom : 15px;
			
			@include desktop {
				max-width : 256px;
			}
		}
		
		&__item-link {
			padding-left  : 20px;
			padding-right : 20px;
		}
		
		&__header {
			display         : flex;
			align-items     : center;
			margin-bottom   : 6px;
			justify-content : space-between;
		}
		
		&__header-title {
			font-size : 14px;
			
			@include phone-big {
				font-size : 16px;
			}
			
			@include tablet-big {
				font-size : 18px;
			}
		}
		
		
		&__main {
			position : relative;
			overflow : hidden;
		}
		
		&__main-select {
			position : relative;
			
			&:after {
				$size : 20px;
				top              : 0;
				right            : 16px;
				width            : $size;
				height           : $size;
				margin           : auto;
				bottom           : 0;
				content          : "";
				display          : block;
				position         : absolute;
				pointer-events   : none;
				background-image : url("~static/images/icons/arrow-down.svg");
			}
		}
		
		
		&__main-phone.vue-tel-input {
			width         : 100%;
			height        : 40px;
			border        : 2px solid $color-curious-blue;
			background    : $color-white;
			box-sizing    : border-box;
			border-radius : 4px;
			
			@include phone-big {
				height : 56px;
			}
			
			.vti__input {
				width : 70%;
			}
		}
		
		
		&__nav-buttom {
			color            : $color-curious-blue;
			border           : none;
			padding          : 0;
			font-size        : 15px;
			line-height      : 22px;
			border-bottom    : 1px solid rgba(36, 126, 229, 0.2);
			background-color : transparent;
		}
		
		&__avatar {
			width         : 256px;
			height        : 256px;
			position      : relative;
			overflow      : hidden;
			margin-left   : auto;
			margin-right  : auto;
			border-radius : 50%;
			
			@include phone-big {
				margin-left  : 0;
				margin-right : 0;
			}
		}
		
		&__avatar-image {
			width      : 100%;
			height     : 100%;
			object-fit : cover;
		}
		
		&__avatar-add {
			left             : 0;
			width            : 100%;
			bottom           : 0;
			padding          : 10px;
			position         : absolute;
			background-color : rgba(0, 0, 0, 0.24);
		}
		
		&__upload {
			display : flex;
		}
		
		&__upload-src {
			width         : 100%;
			height        : 100%;
			max-width     : 130px;
			max-height    : 90px;
			object-fit    : cover;
			border-radius : 4px;
			margin-bottom : 20px;
		}
		
		&__upload-close {
			$size : 24px;
			top             : 0;
			width           : $size;
			height          : $size;
			border          : none;
			display         : flex;
			background      : url("~static/images/icons/close-icon.svg") no-repeat 50% 50% $color-close;
			align-items     : center;
			margin-left     : 10px;
			border-radius   : 50%;
			justify-content : center;
		}
		
		
		&__footer {
			color : $color-cinnabar;
		}
		
		.link {
			min-width : auto;
			overflow  : hidden;
		}
	}
	
	.personal-text {
		max-width : 555px;
		
		p {
			margin-bottom : 30px;
		}
	}
	
	.personal-link {
		&__column {
			margin-bottom : 20px;
		}
	}
	
	.check-icon,
	.eye-icon {
		top      : 0;
		right    : 15px;
		cursor   : pointer;
		bottom   : 0;
		margin   : auto;
		position : absolute;
	}
	
	
	.form__message {
		color        : $color-alert-red;
		padding-left : 10px;
		text-align   : left;
	}

</style>
