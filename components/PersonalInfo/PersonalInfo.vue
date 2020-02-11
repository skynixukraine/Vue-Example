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
						<footer class = "personal-info__footer" v-if = "errors.first_name">{{ errors.first_name }}</footer>
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
						<footer class = "personal-info__footer" v-if = "errors.last_name">{{ errors.last_name }}</footer>
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
									name = "phone_number"
									v-model = "models.phone_number"
									@input = "onPhoneChange"
							></vue-tel-input>
							<div class = "form__message" v-if = "errors.phone_number">{{ errors.phone_number }}</div>
						</div>
						<footer class = "personal-info__footer" v-if = "errors.first_name">{{ errors.first_name }}</footer>
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
						<footer class = "personal-info__footer" v-if = "errors.specialization_id">{{ errors.specialization_id }}</footer>
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
				<div class = "personal-info__column personal-info__column_big">
					
					<div class = "personal-info__item">
						<div class = "personal-info__header">Approbationsurkunde hochladen</div>
						<input
								class = "input input--hidden"
								type = "file"
								name = "degree"
								ref = "degree"
								@change = "onDegreeUpload"
						/>
						
						<button
								class = "link link--button link--button-full-width link--button-upload"
								type = "button"
								@click = "addFileDegree"
						>
							<img
									class = "paper-fastener-button-image"
									:src = "require('~/static/images/icons/paper-fastener-button-icon.svg')"
									alt = "paper-fastener-button"
							/>
							<p>Choose file</p>
						</button>
					</div>
					
					<div class = "personal-info__item personal-info__item_big">
						<div class = "personal-info__header">Facharztzeugnis hochladen</div>
						<div class = "personal-info__upload">
							<div class = "personal-info__upload-image">
								<img
										class = "personal-info__upload-src"
										:src = "require('~/static/images/images/img-add.jpg')"
										alt = "single-form"
								/>
								<button class = "personal-info__upload-buttom">
									<img :src = "require('~/static/images/icons/close-icon.svg')"
										 alt = "personal info close" />
								</button>
							</div>
							<div class = "personal-info__upload-image">
								<img
										class = "personal-info__upload-src"
										:src = "require('~/static/images/images/img-add.jpg')"
										alt = "personal-info"
								/>
								<button class = "personal-info__upload-buttom">
									<img :src = "require('~/static/images/icons/close-icon.svg')"
										 alt = "personal info close" />
								</button>
							</div>
						</div>
						<input
								class = "input input--hidden"
								type = "file"
								name = "certification"
								ref = "certification"
								@change = "onCertificationUpload"
						/>
						<button
								class = "link link--button link--button-full-width link--button-upload"
								type = "button"
								@click = "addFileCertification"
						>
							<img
									class = "paper-fastener-button-image"
									:src = "require('~/static/images/icons/paper-fastener-button-icon.svg')"
									alt = "paper-fastener-button"
							/>
							<p>Choose file</p>
						</button>
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
									v-model = "value"
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
								<select class = "select" name = "region_id" ref = "region_id" v-model = "value">
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
							<select class = "select" name = "language_id" ref = "language_id" v-model = "value">
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
						/>
						<button class = "link personal-info__avatar-add">
							<img :src = "require('~/static/images/icons/add-avatar.svg')" />
						</button>
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
                value             : this.$store.getters["user/USER"].region.id,

                models        : {
                    phone_number : '',
                    email        : '',
                    password     : '',
                },
                isFormSending : false,


            }
        },

        methods : {

            // files upload
            addFileDegree(){
                this.$refs.degree.click()
            },
            addFileCertification(){
                this.$refs.certification.click()
            },

            onDegreeUpload(event){
                if(this.validateFilePDF(event)){
                    this.models.degree = event.target.files[0]
                }
            },

            onCertificationUpload(event){
                if(this.validateFilePDF(event)){
                    this.models.certification = event.target.files[0]
                }
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
			
			&-image {
				flex          : 0 0 100%;
				order         : 1;
				padding-right : 0;
				
				@include desktop {
					flex         : 0 0 28.5%;
					order        : 3;
					padding-left : 15px;
				}
			}
			
			&_big {
				@include desktop {
					flex : 0 0 36.5%;
				}
			}
		}
		
		&__item {
			width         : 100%;
			margin-bottom : 15px;
			
			@include desktop {
				max-width : 256px;
			}
			
			&_big {
				@include desktop {
					max-width : 335px;
				}
				
				.link {
					@include desktop {
						max-width : 256px;
						min-width : auto;
					}
				}
			}
			
			&-link {
				padding-left  : 20px;
				padding-right : 20px;
			}
		}
		
		&__header {
			display         : flex;
			align-items     : center;
			margin-bottom   : 6px;
			justify-content : space-between;
			
			&-title {
				font-size : 14px;
				
				@include phone-big {
					font-size : 16px;
				}
				
				@include tablet-big {
					font-size : 18px;
				}
			}
		}
		
		&__main {
			position : relative;
			overflow : hidden;
			
			&-select {
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
			width         : 100%;
			position      : relative;
			overflow      : hidden;
			max-width     : 256px;
			margin-left   : auto;
			margin-right  : auto;
			border-radius : 50%;
			
			@include phone-big {
				margin-left  : 0;
				margin-right : 0;
			}
			
			&-image {
				width : 100%;
			}
			
			&-add {
				left             : 0;
				width            : 100%;
				bottom           : 0;
				padding          : 10px;
				position         : absolute;
				background-color : rgba(0, 0, 0, 0.24);
			}
		}
		
		&__upload {
			display       : flex;
			flex-wrap     : wrap;
			margin-bottom : 20px;
			
			&-image {
				width         : 50%;
				position      : relative;
				padding-right : 10px;
			}
			
			&-src {
				width         : 100%;
				height        : 100%;
				max-width     : 130px;
				max-height    : 90px;
				object-fit    : cover;
				border-radius : 4px;
			}
			
			&-buttom {
				$size : 24px;
				top              : 0;
				right            : 10px;
				width            : $size;
				height           : $size;
				border           : none;
				display          : flex;
				position         : absolute;
				align-items      : center;
				border-radius    : 50%;
				justify-content  : center;
				background-color : $color-close;
			}
		}
		
		&__footer {
			color : $color-cinnabar;
		}
		
		.vue-tel-input {
			width         : 100%;
			height        : 40px;
			border        : 2px solid $color-curious-blue;
			background    : $color-white;
			box-sizing    : border-box;
			border-radius : 4px;
			
			@include phone-big {
				height : 56px;
			}
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

</style>
