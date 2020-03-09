<template lang = "html">
	<div>
		<form class = "personal-info" @submit.prevent="">
			<div class = "personal-info__items">
				<div class = "personal-info__column">
					<div class = "personal-info__item">
						<header class = "personal-info__header">
							<div class = "personal-info__header-item">
								<div class = "personal-info__header-title">Title</div>
							</div>
						</header>
						<div class = "personal-info__main personal-info__main-select">
							<select class = "select"
									name = "title_id"
									ref = "title_id"
									v-model = "userInputData.title_id">
								<option disabled value = "">Choose one of the options</option>
								<option v-for = "(option, index) in $store.getters['doctorTitles/DOCTOR_TITLES']"
										:key = "`title_${index}`"
										:value = "option.id">
									{{ option.name }}
								</option>
							</select>
						</div>
					</div>
					<div class = "personal-info__item">
						<header class = "personal-info__header">
							<div class = "personal-info__header-item">
								<div class = "personal-info__header-title">First name</div>
							</div>
						</header>
						<div class = "personal-info__main">
							<InputText v-model = "userInputData.first_name" />
						</div>
					</div>
					<div class = "personal-info__item">
						<header class = "personal-info__header">
							<div class = "personal-info__header-item">
								<div class = "personal-info__header-title">Last name</div>
							</div>
						</header>
						<div class = "personal-info__main">
							<InputText v-model = "userInputData.last_name" />
						</div>
					</div>
					<div class = "personal-info__item">
						<header class = "personal-info__header">
							<div class = "personal-info__header-item">
								<div class = "personal-info__header-title">Phone number</div>
							</div>
						</header>
						<div class = "personal-info__main">
							<vue-tel-input id = "vue-tel-input"
										   class = "personal-info__main-phone"
										   name = "phone"
										   v-bind = "userInputData.phone.configs"
										   v-model = "userInputData.phone.value"
										   @input = "onPhoneChange" />
						</div>
						<footer class = "personal-info__footer" v-if = "errors.phone">{{ errors.phone }}</footer>
					</div>
					<div class = "personal-info__item">
						<header class = "personal-info__header">
							<div class = "personal-info__header-item">
								<div class = "personal-info__header-title">Specialization</div>
							</div>
						</header>
						<div class = "personal-info__main personal-info__main-select">
							<select class = "select"
									name = "specialization_id"
									ref = "specialization_id"
									v-model = "userInputData.specialization_id">
								<option disabled value = "">Choose one of the options</option>
								<option v-for = "(option, index) in $store.getters['specializations/SPECIALIZATIONS']"
										:key = "`specialization_${index}`"
										:value = "option.id">
									{{ option.name }}
								</option>
							</select>
						</div>
						<footer class = "personal-info__footer" v-if = "errors.specialization_id">
							{{errors.specialization_id }}
						</footer>
					</div>
					<div class = "personal-info__item">
						<div class = "single-form">
							<header class = "personal-info__header">
								<div class = "personal-info__header-item">
									<div class = "personal-info__header-title">E-Mail</div>
								</div>
							</header>
							<div class = "personal-info__main">
								<input class = "input input--login"
									   type = "email"
									   name = "email"
									   ref = "email"
									   v-model = "userInputData.email"
									   :placeholder = "$t('forms.enter-email')">
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
							<input class = "input"
								   type = "password"
								   name = "password"
								   ref = "password"
								   v-model = "userInputData.password"
								   :placeholder = "$t('forms.enter-password')">
							<div class = "form__message" v-if = "errors.password">{{ errors.password }}</div>
						</div>
					</div>
				</div>
				<div class = "personal-info__column">
					<div class = "personal-info__item">
						<header class = "personal-info__header">Medical Degree</header>
						<div class = "personal-info__upload"
							 @click.stop = "$refs.medicalDegreeInputFile.click();">
							<div v-if = "userInputData.medical_degree.fileBase64 && !userInputData.medical_degree.userInput.HTML"
								 class = "personal-info__upload-image">
								<img :src = "userInputData.medical_degree.fileBase64"
									 class = "personal-info__upload-src">
							</div>
							<div v-else-if = "userInputData.medical_degree.userInput.HTML"
								 class = "personal-info__upload">
								<div class = "personal-info__upload-image">
									<div v-html = "userInputData.medical_degree.userInput.HTML"></div>
								</div>
							</div>
							<button v-if = "userInputData.medical_degree.userInput.HTML"
									type = "button"
									@click.stop = "removeMedicalDegreeImage"
									class = "personal-info__upload-close">
							</button>
						</div>
						<button class = "link link--button link--button-full-width link--button-upload"
								type = "button"
								v-if = "!userInputData.medical_degree.userInput.HTML && !userInputData.medical_degree.fileBase64"
								@click.stop = "$refs.medicalDegreeInputFile.click();">
							<img class = "paper-fastener-button-image"
								 :src = "require('~/static/images/icons/paper-fastener-button-icon.svg')"
								 alt = "paper-fastener-button" />
							<p class = "link__txt">{{ $t("forms.add-degree") }}</p>
						</button>
						<div class = "form__message" v-if = "errors.medicalDegree">{{ errors.medicalDegree }}</div>
						<input class = "input input--hidden"
							   type = "file"
							   name = "medicalDegree"
							   ref = "medicalDegreeInputFile"
							   accept = ".jpg, .jpeg, .png, .pdf"
							   @change = "onMedicalDegreeUpload" />
					</div>
					<div class = "personal-info__item">
						<header class = "personal-info__header">Certification</header>
						<div class="personal-info__upload">
							<div v-if = "userInputData.board_certification.fileBase64 && !userInputData.board_certification.userInput.HTML"
								class =	"personal-info__upload-image"
								 @click.stop = "$refs.board_certificationInputFile.click();">
								<div v-if = "userInputData.board_certification.fileBase64 && !userInputData.board_certification.userInput.HTML"
									 class = "personal-info__upload-image">
									<img :src = "userInputData.board_certification.fileBase64"
										 class = "personal-info__upload-src">
								</div>
							</div>
							<div v-else-if = "userInputData.board_certification.userInput.HTML"
								 class = "personal-info__upload">
								<div class = "personal-info__upload-image">
									<div v-html = "userInputData.board_certification.userInput.HTML"></div>
								</div>
								<button type = "button"
										@click.stop = "removeCertificationImage"
										class = "personal-info__upload-close">
								</button>
							</div>
							<button class = "link link--button link--button-full-width link--button-upload"
									type = "button"
									v-if = "!userInputData.board_certification.userInput.HTML && !userInputData.board_certification.fileBase64"
									@click.stop = "$refs.board_certificationInputFile.click();">
								<img class = "paper-fastener-button-image"
									 :src = "require('~/static/images/icons/paper-fastener-button-icon.svg')"
									 alt = "paper-fastener-button" />
								<p class = "link__txt">{{ $t("forms.add-certification") }}</p>
							</button>
							<div class = "form__message" v-if = "errors.board_certification">{{ errors.board_certification }}</div>
							<input class = "input input--hidden"
								   type = "file"
								   name = "board_certification"
								   ref = "board_certificationInputFile"
								   accept = ".jpg, .jpeg, .png, .pdf"
								   @change = "onCertificationUpload" />
						</div>
					</div>
					<div class = "personal-info__item">
						<div class = "single-form">
							<header class = "personal-info__header">
								<div class = "personal-info__header-item">
									<div class = "personal-info__header-title">Business address</div>
								</div>
							</header>
							<div class = "personal-info__main personal-info__google-autocomplete">
								<AddressAutocomplete :value = "userInputData.location.fullAddress"
													 @place_change = "onAddressChange" />
							</div>
							<footer class = "personal-info__footer" v-if = "errors.region_id">{{ errors.region_id }}
							</footer>
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
								<select class = "select"
										name = "region_id"
										ref = "region_id"
										v-model = "userInputData.region_id">
									<option disabled value = "">Choose one of the options</option>
									<option v-for = "(option, index) in $store.state.regions.regions"
											:key = "index"
											:value = "option.id">
										{{ option.name }}
									</option>
								</select>
							</div>
							<footer class = "personal-info__footer" v-if = "errors.region_id">{{ errors.region_id }}
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
							<select class = "select"
									name = "languages"
									ref = "languages"
									multiple
									v-model = "userInputData.languages">
								<option disabled value = "">Choose one of the options</option>
								<option v-for = "(option, index) in $store.state.languages.languages"
										:key = "index"
										:value = "option.id">
									{{ option.name }}
								</option>
							</select>
						</div>
					</div>
					<div class = "personal-info__item">
						<header class = "personal-info__header">
							<div class = "personal-info__header-item">
								<div class = "personal-info__header-title">BIO Short</div>
							</div>
						</header>
						<div class = "personal-info__main">
							<AutoHeight :placeholder_text = "'BIO Short'"
										:maxLength = '170'
										@change = "(newValue) => {userInputData.short_description = newValue}" />
						</div>
					</div>
					<div class = "personal-info__item">
						<header class = "personal-info__header">
							<div class = "personal-info__header-item">
								<div class = "personal-info__header-title">BIO</div>
							</div>
						</header>
						<div class = "personal-info__main">
							<AutoHeight :placeholder_text = "'BIO'"
										:maxLength = '3000'
										@change = "(newValue) => {userInputData.description = newValue}" />
						</div>
					</div>
				</div>
				<div class = "personal-info__column personal-info__column-image">
					<div class = "personal-info__item personal-info__avatar"
						 @click = "$refs.avatarInputFile.click();">
						<img class = "personal-info__avatar-image"
							 v-if = "!userInputData.avatar.userInput.HTML"
							 :src = "userInputData.avatar.fileBase64 || require('~/static/images/images/placeholder_doctor_man_img.jpg')"
							 alt = "doctor avatar"
							 title = "Your photo">
						<div v-else v-html = "userInputData.avatar.userInput.HTML"></div>
						<button class = "link personal-info__avatar-add"
								type = "button">
							<img :src = "require('~/static/images/icons/add-avatar.svg')" />
						</button>
						<input class = "input input--hidden"
							   type = "file"
							   name = "avatar"
							   ref = "avatarInputFile"
							   accept = ".jpg, .jpeg, .png"
							   @change = "onAvatarUpload" />
					</div>
				</div>
			</div>
			<div class = "personal-info__items">
				<div class = "personal-info__column">
					<div class = "personal-info__item" v-if = "'true'">
						<button class = "link link--button link--button-full-width link--button-gradient personal-info__item-link"
								@click.stop = "onApproveRequest">
							Approve Request
						</button>
					</div>
				</div>
				<div class = "personal-info__column">
					<transition name = "main-animation">
						<div class = "personal-info__item" v-if = "isSomethingEdited">
							<button class = "link link--button link--button-full-width link--button-gradient personal-info__item-link"
									type = "button"
									@click.stop = "onSave">
								Save
							</button>
						</div>
					</transition>
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
					<button class = "link link--button link--button-full-width link--button-gradient personal-info__item-link"
							@click.stop = "onPauseOrUnpauseAccount">
						{{ `${isPauseAccount ? "UNPAUSE" : "PAUSE"} MY ACCOUNT` }}
					</button>
				</div>
				<div class = "personal-info__column personal-link__column">
					<button class = "link link--button link--button-full-width link--button-gradient personal-info__item-link"
							@click.stop = "onDeleteAccount">
						DELETE MY ACCOUNT
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
    import modal from "~/mixins/modal";
    import UserApi from "~/services/api/User";
    import validator from "~/mixins/validator";
    import singleForm from "~/mixins/singleForm";
    import InputText from "~/components/Content/InputText";
    import AutoHeight from "~/components/Content/AutoHeight";
    import AddressAutocomplete from "~/components/Content/AddressAutocomplete";

    export default {
        mixins     : [
            modal,
            validator,
            singleForm,
        ],
        components : {
            InputText,
            AutoHeight,
            AddressAutocomplete
        },
        data(){
            return {
                // By defaults equal to server data
                userInputData : {
                    email             : this.$store.state.user.user.email || "",
                    password          : "",
                    languages         : this.$store.state.user.user.language || [],
                    last_name         : this.$store.state.user.user.last_name || "",
                    first_name        : this.$store.state.user.user.first_name || "",
                    description       : this.$store.state.user.user.description || "",
                    short_description : this.$store.state.user.user.short_description || "",

                    title_id          : this.$store.state.user.user.title && this.$store.state.user.user.title.id || "",
                    region_id         : this.$store.state.user.user.region && this.$store.state.user.user.region.id || "",
                    specialization_id : this.$store.state.user.user.specialization && this.$store.state.user.user.specialization.id || "",

                    avatar              : {
                        fileBase64 : this.$store.state.user.user.photo,
                        userInput  : {
                            file : null,
                            HTML : ""
                        }
                    },
                    location            : {
                        fullAddress : this.$store.state.user.user.location ?
                            this.$store.state.user.user.location.city :
							"",
                        eventData   : null
                    },
                    medical_degree      : {
                        fileBase64 : this.$store.state.user.user.medical_degree && this.$store.state.user.user.medical_degree.data || "",
                        userInput  : {
                            file : null,
                            HTML : ""
                        }
                    },
                    board_certification : {
                        fileBase64 : this.$store.state.user.user.board_certification && this.$store.state.user.user.board_certification.data || "",
                        userInput  : {
                            file : null,
                            HTML : ""
                        }
                    },
                    phone               : {
                        value     : this.$store.state.user.user.phone_number || "",
                        eventData : null,
                        configs   : {
                            mode                    : "international",
                            maxLen                  : 25,
                            disabled                : false,
                            required                : false,
                            placeholder             : this.$t("forms.phone-number"),
                            enabledFlags            : true,
                            autocomplete            : "off",
                            defaultCountry          : "",
                            disabledFormatting      : false,
                            enabledCountryCode      : false,
                            validCharactersOnly     : true,
                            disabledFetchingCountry : false,
                        }
                    }
                },
            }
        },
        computed : {
            doctorDefaultData(){
                return this.$store.state.user.user;
            },
            isSomethingEdited(){
                let result = !!(this.userInputData.last_name && this.userInputData.last_name != this.$store.state.user.user.last_name ||
							this.userInputData.first_name && this.userInputData.first_name != this.$store.state.user.user.first_name ||
							this.userInputData.phone.eventData && this.userInputData.phone.value != this.$store.state.user.user.phone_number ||
							this.userInputData.description && this.userInputData.description != this.$store.state.user.user.description ||
                    		this.userInputData.short_description && this.userInputData.short_description != this.$store.state.user.user.short_description);

                if(!result && this.userInputData.title_id){
					result = this.$store.state.user.user.title ?
						!!this.$store.state.user.user.title.id != this.userInputData.title_id :
						true;
                }
                if(!result && this.userInputData.region_id){
					result = this.$store.state.user.user.region ?
						!!this.$store.state.user.user.region.id != this.userInputData.region_id :
						true;
                }
                if(!result && this.userInputData.specialization_id){
					result = this.$store.state.user.user.specialization ?
						!!this.$store.state.user.user.specialization.id != this.userInputData.specialization_id :
						true;
                }
                
                result = !result ?
                    !!this.userInputData.board_certification.userInput.file || !!this.userInputData.avatar.userInput.file || this.userInputData.medical_degree.userInput.file:
					result;
                
                return !!result;
            },
			isPauseAccount(){
                return this.$store.state.user.user && this.$store.state.user.user.status && this.$store.state.user.user.status === "DEACTIVATED";
			}
        },
        methods : {
            onPauseOrUnpauseAccount(){
                UserApi[`${this.isPauseAccount ? "unPauseAccount" : "pauseAccount"}`]({
                    id: this.$store.state.user.user.id,
                    token: this.$cookies.get(this.$cookie.names.token)
                }).then((response) => {
                    this.openModal(this.$modals.defaultModal, response.message);
                }).catch((error) => {
                    this.openModal(this.$modals.defaultModal, error.message, "Something was wrong!");
                });
			},
            onDeleteAccount(){
                UserApi.deleteUserAccount({
                    id: this.$store.state.user.user.id,
                    token: this.$cookies.get(this.$cookie.names.token)
                }).then((response) => {
                    this.openModal(this.$modals.defaultModal, response.message, "We will miss you!");
                }).catch((error) => {
                    this.openModal(this.$modals.defaultModal, error.message, "Something was wrong!");
                });
			},
            onApproveRequest(){
                UserApi.requestActivation({
					id: this.$store.state.user.user.id,
					token: this.$cookies.get(this.$cookie.names.token)
				}).then((response) => {
                    this.openModal(this.$modals.defaultModal, response.message, "Congratulations!");
                }).catch((error) => {
                    this.openModal(this.$modals.defaultModal, error.message, "Something was wrong!");
                });
            },
            onAddressChange(eventData){
                console.log("address change", eventData);
                this.userInputData.location.eventData = eventData;
            },
            onMedicalDegreeUpload(event){
                if(!event.target.files[0]){ return; }

                let file    = null;
                const _this = this;
                let reader  = new FileReader();

                this.validateFileExtension(event) ? this.userInputData.medical_degree.userInput.file = event.target.files[0] : this.userInputData.degree = "";
                this.validateFileExtension(event) ? file = event.target.files[0] : file = "";

                reader.onload = function(e){
                    _this.userInputData.medical_degree.userInput.HTML =
                        file.type === "application/pdf" ?
                            `<object type = "application/pdf" data = "${e.target.result}" class = "personal-info__upload-src"></object>` :
                            `<img class = "personal-info__upload-src" src = "${e.target.result}">`;
                };

                file && reader.readAsDataURL(file);
                this.$forceUpdate();
            },
            onCertificationUpload(event){
                if(!event.target.files[0]){ return; }

                let file    = null;
                let reader  = new FileReader();
                const _this = this;

                this.validateFileExtension(event) ? this.userInputData.board_certification.userInput.file = event.target.files[0] : this.userInputData.board_certification = "";
                this.validateFileExtension(event) ? file = event.target.files[0] : file = "";

                reader.onload = function(e){
                    _this.userInputData.board_certification.userInput.HTML =
                        file.type === "application/pdf" ?
                            `<object type = "application/pdf" data = "${e.target.result}" class = "personal-info__upload-src"></object>` :
                            `<img class = "personal-info__upload-src" src = "${e.target.result}">`;
                };

                file && reader.readAsDataURL(file);
                this.$forceUpdate();
            },
            onAvatarUpload(event){
                if(!event.target.files[0]){ return; }

                let file    = null;
                let reader  = new FileReader();
                const _this = this;

                this.validateFileExtension(event) ? this.userInputData.avatar.userInput.file = event.target.files[0] : this.userInputData.avatar = "";
                this.validateFileExtension(event) ? file = event.target.files[0] : file = "";

                reader.onload = function(e){
                    _this.userInputData.avatar.userInput.HTML = `<img class = "personal-info__avatar-image" src = "${e.target.result}">`;
                };

                file && reader.readAsDataURL(file);
                this.$forceUpdate();
            },
            removeMedicalDegreeImage(){
                this.userInputData.medical_degree.userInput.HTML = "";
                this.userInputData.medical_degree.userInput.file = "";
            },
            removeCertificationImage(){
                this.userInputData.board_certification.userInput.HTML = "";
                this.userInputData.board_certification.userInput.file = "";
            },
            onPhoneChange(formattedNumber, telInputData){
                this.userInputData.phone.eventData = telInputData;
            },
            onSave(){
                let formData = new FormData();

                this.userInputData.last_name && this.userInputData.last_name != this.$store.state.user.user.last_name && formData.append("last_name", this.userInputData.last_name);
                this.userInputData.first_name && this.userInputData.first_name != this.$store.state.user.user.first_name && formData.append("first_name", this.userInputData.first_name);
                this.userInputData.phone.eventData && this.userInputData.phone.value != this.$store.state.user.user.phone_number && formData.append("phone_number", this.userInputData.phone.value);
                this.userInputData.description && this.userInputData.description != this.$store.state.user.user.description && formData.append("description", this.userInputData.description);
                this.userInputData.short_description && this.userInputData.short_description != this.$store.state.user.user.short_description && formData.append("short_description", this.userInputData.short_description);

                if(this.userInputData.title_id){
                    if(this.$store.state.user.user.title){
                        this.$store.state.user.user.title.id != this.userInputData.title_id && formData.append("title_id", this.userInputData.title_id);
                    } else{
                        formData.append("title_id", this.userInputData.title_id);
                    }
                }
                if(this.userInputData.region_id){
                    if(this.$store.state.user.user.region){
                        this.$store.state.user.user.region.id != this.userInputData.region_id && formData.append("title_id", this.userInputData.region_id);
                    } else{
                        formData.append("region_id", this.userInputData.region_id);
                    }
                }

                if(this.userInputData.location.eventData){
                    this.userInputData.location.eventData.locality && formData.append("city", this.userInputData.location.eventData.locality);
                    this.userInputData.location.eventData.country && formData.append("state", this.userInputData.location.eventData.country);
                    this.userInputData.location.eventData.country && formData.append("country", this.userInputData.location.eventData.country);
                    this.userInputData.location.eventData.route && formData.append("address", this.userInputData.location.eventData.route + " " + (this.userInputData.location.eventData.street_number || ""));
                    this.userInputData.location.eventData.postal_code && formData.append("postal_code", this.userInputData.location.eventData.postal_code);

                    this.userInputData.location.eventData.latitude && formData.append("latitude", this.userInputData.location.eventData.latitude);
                    this.userInputData.location.eventData.longitude && formData.append("longitude", this.userInputData.location.eventData.longitude);
                }
                
                this.userInputData.avatar.userInput.file && formData.append("photo", this.userInputData.avatar.userInput.file);
                this.userInputData.board_certification.userInput.file && formData.append("board_certification", this.userInputData.board_certification.userInput.file);
                this.userInputData.medical_degree.userInput.file && formData.append("medical_degree", this.userInputData.medical_degree.userInput.file);
				
                formData.append("_method", "PATCH");
                
                this.$store.dispatch("user/UPDATE_USER", {
                    id     : this.$store.state.user.user.id,
                    token  : this.$cookies.get(this.$cookie.names.token),
                    params : formData
                }).then((response) => {
                    this.openModal(this.$modals.defaultModal, response.message, "Congratulations!");
                    clear();
				}).catch((error) => {
                    this.openModal(this.$modals.defaultModal, error.message, "Something was wrong!");
                    clear();
				});
            	
                let clear = () => {
					this.userInputData.avatar.userInput.file = "";
					this.userInputData.avatar.userInput.HTML = "";
					this.userInputData.medical_degree.userInput.file = "";
					this.userInputData.medical_degree.userInput.HTML = "";
					this.userInputData.board_certification.userInput.file = "";
					this.userInputData.board_certification.userInput.HTML = "";
					
                    this.userInputData.location.eventData = null;
                    this.userInputData.phone.eventData = null;
                }
            }
        }
    };
</script>

<style lang = "scss" scoped>
	.personal-info {
		margin-bottom : $main_offset * 2;
		
		&__items {
			margin    : $main_offset * 1.5 0 $main_offset 0;
			display   : flex;
			flex-wrap : wrap;
		}
		
		&__column {
			flex  : 0 0 100%;
			order : 2;
			
			@include tablet {
				$size : 50%;
				flex          : 0 0 $size;
				width         : $size;
				padding-right : 33px;
			}
			
			@include desktop {
				$size : 28.5%;
				flex  : 0 0 $size;
				width : $size;
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
			padding-left  : $main_offset;
			padding-right : $main_offset;
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
		
		&__main { position : relative; }
		
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
			
			.vti__input { width : 70%; }
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
			$size : 256px;
			width         : $size;
			height        : $size;
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
		
		/deep/ &__avatar-image {
			width      : 100%;
			height     : 100%;
			cursor     : pointer;
			object-fit : cover;
		}
		
		&__avatar-add {
			left             : 0;
			width            : 100%;
			bottom           : 0;
			padding          : 10px;
			position         : absolute;
			background-color : rgba(0, 0, 0, .24);
		}
		
		&__upload { display : flex; }
		
		/deep/ &__upload-src {
			width         : 100%;
			height        : 100%;
			cursor        : pointer;
			max-width     : 130px;
			max-height    : 90px;
			object-fit    : cover;
			border-radius : 4px;
		}
		
		/deep/ &__upload-close {
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
		
		&__footer { color : $color-cinnabar; }
		
		.link {
			overflow  : hidden;
			min-width : auto;
			
			&__txt {
				overflow      : hidden;
				white-space   : nowrap;
				text-overflow : ellipsis;
			}
		}
	}
	
	.personal-text {
		max-width : 555px;
		
		p { margin-bottom : 30px; }
	}
	
	.personal-link {
		&__column { margin-bottom : $main_offset; }
	}
	
	.check-icon, .eye-icon {
		top      : 0;
		right    : 15px;
		cursor   : pointer;
		bottom   : 0;
		margin   : auto;
		position : absolute;
	}
	
	.form__message {
		color        : $color-alert-red;
		text-align   : left;
		padding-left : 10px;
	}
	
	.select {
		option:first-child {
			display : none;
		}
	}
	
	// Vue transition
	.main-animation-enter-active, .main-animation-leave-active {
		transition : $transition;
	}
	
	.main-animation-enter, .main-animation-leave-to {
		opacity   : 0;
		transform : translateY(50px);
	}
</style>