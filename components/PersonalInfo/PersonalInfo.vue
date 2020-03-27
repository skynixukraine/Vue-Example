<template lang = "html">
	<div>
		<form class = "personal-info" @submit.prevent = "">
			<div class = "personal-info__items">
				<div class = "personal-info__column">
					<div class = "personal-info__item">
						<header class = "personal-info__header">{{ $t("page-personal-information.title") }}</header>
						<div class = "personal-info__main personal-info__main-select">
							<select class = "select"
									name = "title_id"
									ref = "title_id"
									v-model = "userInputData.title_id">
								<option disabled value = "">{{ $t("page-personal-information.behavior.chooseOptions") }}</option>
								<option v-for = "(option, index) in $store.getters['doctorTitles/DOCTOR_TITLES']"
										:key = "`title_${index}`"
										:value = "option.id">
									{{ option.name }}
								</option>
							</select>
						</div>
					</div>
					<div class = "personal-info__item">
						<header class = "personal-info__header">{{ $t("page-personal-information.firstName") }}</header>
						<div class = "personal-info__main">
							<InputText v-model = "userInputData.first_name" />
						</div>
					</div>
					<div class = "personal-info__item">
						<header class = "personal-info__header">{{ $t("page-personal-information.lastName") }}</header>
						<div class = "personal-info__main">
							<InputText v-model = "userInputData.last_name" />
						</div>
					</div>
					<div class = "personal-info__item">
						<header class = "personal-info__header">{{ $t("page-personal-information.numberMobile") }}</header>
						<div class = "personal-info__main">
							<vue-tel-input id = "vue-tel-input"
										   class = "personal-info__main-phone"
										   name = "phone"
										   v-bind = "userInputData.phone.CONFIG"
										   v-model = "userInputData.phone.value"
										   @input = "onPhoneChange" />
						</div>
						<footer class = "personal-info__footer" v-if = "errors.phone">{{ errors.phone }}</footer>
					</div>
					<div class = "personal-info__item">
						<header class = "personal-info__header">{{ $t("page-personal-information.specialist") }}</header>
						<div class = "personal-info__main personal-info__main-select">
							<select class = "select"
									name = "specialization_id"
									ref = "specialization_id"
									v-model = "userInputData.specialization_id">
								<option disabled value = "">{{ $t("page-personal-information.behavior.chooseOptions") }}</option>
								<option v-for = "(option, index) in $store.getters['specializations/SPECIALIZATIONS']"
										:key = "`specialization_${index}`"
										:value = "option.id">
									{{ option.name }}
								</option>
							</select>
						</div>
					</div>
					<div class = "personal-info__item">
						<header class = "personal-info__header personal-info__header--edit-box">
							<div class = "personal-info__label">{{ $t("page-personal-information.email") }}</div>
							<button class = "link--button-transparent link--line link--underline"
									@click.stop = "onChangeEmail">{{ $t("page-personal-information.behavior.changeIt") }}
							</button>
						</header>
						<input class = "input"
							   type = "email"
							   name = "medicalDegree"
							   v-model="userInputData.email"
							   disabled
						/>
					</div>
					<div class = "personal-info__item">
						<header class = "personal-info__header personal-info__header--edit-box">
							<div class = "personal-info__label">{{ $t("page-personal-information.password") }}</div>
							<button class = "link--button-transparent link--line link--underline"
									@click.stop = "onChangePassword">{{ $t("page-personal-information.behavior.changeIt") }}
							</button>
						</header>
						<input class = "input"
							   type = "password"
							   name = "medicalDegree"
							   v-model="userInputData.password"
							   disabled
						/>
					</div>
				</div>
				<div class = "personal-info__column">
					<div class = "personal-info__item-group">
						<div class = "personal-info__item">
							<header class = "personal-info__header">{{ $t("page-personal-information.medCert") }}</header>
							<div class = "personal-info__file">
								<div v-if = "userInputData.medical_degree.fileBase64 && !userInputData.medical_degree.userInput.HTML"
									 class = "personal-info__file__container"
									 @click.stop = "$refs.medicalDegreeInputFile.click();">
									<object class = "personal-info__file-src"
											v-if = "userInputData.medical_degree.fileBase64.indexOf('data:application/pdf') > -1"
											:src = "userInputData.medical_degree.fileBase64"
											type = "application/pdf"></object>
									<img v-else
										 :src = "userInputData.medical_degree.fileBase64"
										 class = "personal-info__file-src">
									<img :src = "require('~/static/images/icons/paper-fastener-button-icon.svg')"
										 class = "paper-fastener-button-image">
								</div>
								<div v-else-if = "userInputData.medical_degree.userInput.HTML"
									 class = "personal-info__file"
									 @click.stop = "$refs.medicalDegreeInputFile.click();">
									<div v-html = "userInputData.medical_degree.userInput.HTML"></div>
								</div>
								<button v-if = "userInputData.medical_degree.userInput.HTML"
										type = "button"
										@click.stop = "removeMedicalDegreeImage"
										class = "personal-info__file-remove">
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
							<header class = "personal-info__header">{{ $t("page-personal-information.approvalCert") }}</header>
							<div class = "personal-info__file">
								<div v-if = "userInputData.board_certification.fileBase64 && !userInputData.board_certification.userInput.HTML"
									 class = "personal-info__file__container"
									 @click.stop = "$refs.board_certificationInputFile.click();">
									<object class = "personal-info__file-src"
											v-if = "userInputData.board_certification.fileBase64.indexOf('data:application/pdf') > -1"
											:src = "userInputData.board_certification.fileBase64"
											type = "application/pdf"></object>
									<img v-else
										 :src = "userInputData.board_certification.fileBase64"
										 class = "personal-info__file-src">
									<img :src = "require('~/static/images/icons/paper-fastener-button-icon.svg')"
										 class = "paper-fastener-button-image">
								</div>
								<div v-else-if = "userInputData.board_certification.userInput.HTML"
									 class = "personal-info__file">
									<div v-html = "userInputData.board_certification.userInput.HTML"></div>
									<button type = "button"
											@click.stop = "removeCertificationImage"
											class = "personal-info__file-remove">
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
					</div>
					<div class = "personal-info__item">
						<div class = "single-form">
							<header class = "personal-info__header">{{ $t("page-personal-information.regionAndStreet") }}</header>
							<div class = "personal-info__main personal-info__google-autocomplete">
								<AddressAutocomplete :value = "userInputData.location.fullAddress"
													 @place_change = "onAddressChange" />
							</div>
						</div>
					</div>
					<div class = "personal-info__item hide-region">
						<div class = "single-form">
							<header class = "personal-info__header">{{ $t("page-personal-information.region") }}</header>
							<div class = "personal-info__main personal-info__main-select">
								<select class = "select"
										name = "region_id"
										ref = "region_id"
										v-model = "userInputData.region_id">
									<option disabled value = "">{{ $t("page-personal-information.behavior.chooseOptions") }}</option>
									<option v-for = "(option, index) in $store.state.regions.regions"
											:key = "index"
											:value = "option.id">
										{{ option.name }}
									</option>
								</select>
							</div>
						</div>
					</div>
					<div class = "personal-info__item">
						<header class = "personal-info__header">{{ $t("page-personal-information.lang") }}</header>
						<div class = "personal-info__item">
							<select2 v-bind:config="{
								options:$store.state.languages.languages,
								multiple:true,
								selected:userInputData.languages
							}"
									 @selectedData="onLanguagesChang"
							/>
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
			<div class = "personal-info__items personal-info__items--max-width">
				<h3>{{ $t("page-personal-information.bio.title") }}</h3>
				<div class = "personal-info__item">
					<header class = "personal-info__header">{{ $t("page-personal-information.bio.bioShort.title") }}
						<small>({{ $t("page-personal-information.bio.bioShort.previewText") }})</small>
					</header>
					<div class = "personal-info__main">
						<AutoHeight :placeholder_text = "'BIO Short'"
									:maxLength = '170'
									:minHeight = "'5em'"
									:value = "userInputData.short_description || $store.state.user.user && $store.state.user.user.short_description || ''"
									@change = "(newValue) => {userInputData.short_description = newValue}" />
					</div>
				</div>
				<div class = "personal-info__item">
					<header class = "personal-info__header">{{ $t("page-personal-information.bio.bioFull") }}</header>
					<div class = "personal-info__main">
						<AutoHeight :placeholder_text = "'BIO'"
									:maxLength = '3000'
									:minHeight = "'5em'"
									:value = "userInputData.description || $store.state.user.user && $store.state.user.user.description || ''"
									@change = "(newValue) => {userInputData.description = newValue}" />
					</div>
				</div>
			</div>
		</form>
		<div class = "personal-info__items">
			<div class = "personal-info__column">
				<div class = "personal-info__item">
					<button class = "link link--button link--button-full-width link--button-gradient personal-info__item-link personal-info__item--submit"
							:class = "{'personal-info__item--submit-disabled': !isSomethingEdited}"
							type = "button"
							@click.stop = "onSave">
						{{ $t("page-personal-information.buttons.btnSave") }}
					</button>
				</div>
			</div>
			<div class = "personal-info__column">
				<div class = "personal-info__item"
					 v-if = "!isApproved">
					<button class = "link link--button link--button-full-width link--button-gradient personal-info__item-link"
							@click.stop = "onApproveRequest">{{ $t("page-personal-information.buttons.btnApply") }}
					</button>
				</div>
			</div>
		</div>
		<div class = "personal-text">
			<p>{{this.$t('page-personal-information.p1')}}</p>
			<p>{{this.$t('page-personal-information.p2')}}</p>
		</div>
		<div class = "personal-link">

			<div class = "personal-info__items">
				<div class = "personal-info__column personal-link__column">
					<button class = "link link--button-transparent link--button link--line"
							@click.stop = "onPauseOrUnpauseAccount">
						{{ `${isPauseAccount ? "REAKTIVIEREN" : "PAUSIEREN"} MEIN KONTO` }}
					</button>
				</div>
				<div class = "personal-info__column personal-link__column">
					<button class = "link link--button-transparent link--button link--line"
							@click.stop = "openModal($modals.personalInfoConfirmDeleteAccount)">{{ $t("page-personal-information.buttons.btnDel") }}
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
    import statuses from "~/assets/js/accountStatuses";
    import InputText from "~/components/Content/InputText";
    import InputEmail from "~/components/Content/InputEmail";
    import AutoHeight from "~/components/Content/AutoHeight";
    import AddressAutocomplete from "~/components/Content/AddressAutocomplete";
    import select2 from "~/components/select2/select2.vue"

    export default {
        mixins     : [
            modal,
            validator,
            singleForm,
        ],
        components : {
            InputText,
            InputEmail,
            AutoHeight,
            AddressAutocomplete,
            select2
        },
        data(){
            return {
                userInputData : {
                    languages         : [],
                    last_name         : "",
                    first_name        : "",
                    description       : "",
                    short_description : "",
                    email			  : "",
                    password		  : "********",

                title_id          : "",
                    region_id         : "",
                    specialization_id : "",

                    avatar              : {
                        fileBase64 : "",
                        userInput  : {
                            file : null,
                            HTML : ""
                        }
                    },
                    location            : {
                        fullAddress : "",
                        placeData   : null,
                        customData   : null,
                    },
                    medical_degree      : {
                        fileBase64 : "",
                        userInput  : {
                            file : null,
                            HTML : ""
                        }
                    },
                    board_certification : {
                        fileBase64 : "",
                        userInput  : {
                            file : null,
                            HTML : ""
                        }
                    },
                    phone               : {
                        value     : this.$store.state.user.user.phone_number || "",
                        eventData : null,
                        CONFIG    : {
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
        computed   : {
            isSomethingEdited(){
                if(this.$store.state.user.user){
                    let result = !!(this.userInputData.last_name && this.userInputData.last_name !== this.$store.state.user.user.last_name ||
                        this.userInputData.first_name && this.userInputData.first_name !== this.$store.state.user.user.first_name ||
                        this.userInputData.phone.eventData && this.userInputData.phone.eventData.isValid && this.userInputData.phone.value !== this.$store.state.user.user.phone_number ||
                        this.userInputData.description && this.userInputData.description !== this.$store.state.user.user.description ||
                        this.userInputData.short_description && this.userInputData.short_description !== this.$store.state.user.user.short_description);

                    if(!result){
                        result = this.$store.state.user.user.title ?
                            this.$store.state.user.user.title.id !== this.userInputData.title_id :
                            !!this.userInputData.title_id;
                    }
                    if(!result){
                        result = this.$store.state.user.user.region ?
                            this.$store.state.user.user.region.id !== this.userInputData.region_id :
                            !!this.userInputData.region_id;
                    }
                    if(!result){
                        result = this.$store.state.user.user.specialization ?
                            this.$store.state.user.user.specialization.id !== this.userInputData.specialization_id :
                            !!this.userInputData.specialization_id;
                    }

                    if(!result){
                        result = this.$store.state.user.user.specialization ?
                            this.$store.state.user.user.specialization.id !== this.userInputData.specialization_id :
                            !!this.userInputData.specialization_id;
                    }

                    result = !result ?
                        !!this.userInputData.board_certification.userInput.file || !!this.userInputData.avatar.userInput.file || this.userInputData.medical_degree.userInput.file :
                        result;

                    if(!result){
                        result = this.userInputData.location.fullAddress !== this.defaultFullAddress;
                    }

                    if(!result){
                        result = JSON.stringify(this.userInputData.languages) !== JSON.stringify(this.defaultLanguages);
                    }

                    return !!result;
                } else{
                    return false;
                }
            },
            isPauseAccount(){
                return this.$store.state.user.user && this.$store.state.user.user.status && this.$store.state.user.user.status === statuses.deactivated;
            },
            isApproved(){
                return this.$store.state.user.user && this.$store.state.user.user.status &&
					this.$store.state.user.user.status === statuses.approved ||
					this.$store.state.user.user.status === statuses.activationRequested;
            },
            defaultFullAddress(){
                let res         = "";
                const SEPARATOR = "___";

                if(this.$store.state.user.user.location){
                    if(this.$store.state.user.user.location.country){
                        res += `${this.$store.state.user.user.location.country}${SEPARATOR}`;
                    }
                    if(this.$store.state.user.user.location.city){
                        res += `${this.$store.state.user.user.location.city}${SEPARATOR}`;
                    }
                    if(this.$store.state.user.user.location.address){
                        res += `${this.$store.state.user.user.location.address}${SEPARATOR}`;
                    }
                }

                return res.trim().split(SEPARATOR).join(", ").slice(0, -2);
            },
			defaultLanguages(){
                let res = [];
                
                for(let i = 0, languages = this.$store.state.user.user.languages; i < languages.length; i++){
                    res.push(languages[i].id);
				}
                
                return res;
			}
        },
        mounted(){
            this.setDefaultValues();
        },
        methods    : {
            setDefaultValues(){
                this.userInputData.email 			 = this.$store.state.user.user.email;
                this.userInputData.last_name         = this.$store.state.user.user.last_name || "";
                this.userInputData.first_name        = this.$store.state.user.user.first_name || "";
                this.userInputData.description       = this.$store.state.user.user.description || "";
                this.userInputData.short_description = this.$store.state.user.user.short_description || "";

                this.userInputData.title_id          = this.$store.state.user.user.title && this.$store.state.user.user.title.id || "";
                this.userInputData.region_id         = this.$store.state.user.user.region && this.$store.state.user.user.region.id || "";
                this.userInputData.specialization_id = this.$store.state.user.user.specialization && this.$store.state.user.user.specialization.id || "";

                this.userInputData.languages = this.defaultLanguages.slice();
                
                this.userInputData.avatar              = {
                    fileBase64 : this.$store.state.user.user.photo,
                    userInput  : {
                        file : null,
                        HTML : ""
                    }
                };
                this.userInputData.location            = {
                    fullAddress : this.defaultFullAddress,
                    placeData   : null
                };
                this.userInputData.medical_degree      = {
                    fileBase64 : this.$store.state.user.user.medical_degree && this.$store.state.user.user.medical_degree.data || "",
                    userInput  : {
                        file : null,
                        HTML : ""
                    }
                };
                this.userInputData.board_certification = {
                    fileBase64 : this.$store.state.user.user.board_certification && this.$store.state.user.user.board_certification.data || "",
                    userInput  : {
                        file : null,
                        HTML : ""
                    }
                };
                this.userInputData.phone               = {
                    value     : this.$store.state.user.user.phone_number || "",
                    eventData : null,
                };
            },
    		onLanguagesChang(val){
                this.userInputData.languages = val.id ? val.id : [];
			},
            onPauseOrUnpauseAccount(){
                UserApi[`${this.isPauseAccount ? "unPauseAccount" : "pauseAccount"}`]({
                    id    : this.$store.state.user.user.id,
                    token : this.$cookies.get(this.$cookie.names.token)
                }).then((response) => {
					let translateResponseMessage = response.message === 'Your account has been successfully suspended' ?
					 'Ihr Konto wurde erfolgreich pausiert. Sie können es jederzeit wieder reaktivieren.' :
					 'Ihr Konto wurde erfolgreich wiederhergestellt';
					 
                    this.openModal(this.$modals.defaultModal, translateResponseMessage);
                }).catch((error) => {
                    this.openModal(this.$modals.defaultModal, error.message, "Etwas ist schief gelaufen!");
                });
            },
            onApproveRequest(){
                UserApi.requestActivation({
                    id    : this.$store.state.user.user.id,
                    token : this.$cookies.get(this.$cookie.names.token)
                }).then((response) => {
                    this.openModal(this.$modals.defaultModal, response.message, "Herzliche Glückwünsche!");
                }).catch((error) => {
                    this.openModal(this.$modals.defaultModal, error.message, "Etwas ist schief gelaufen!");
                });
            },
            onAddressChange(placeData){
                let newFullAddress = "";

				if(placeData.address_components){
					this.userInputData.location.customData = {};
					for(let param = null, i = placeData.address_components.length - 1; i > -1; i--){
						param = placeData.address_components[i];

						if(param.types){
							switch(param.types[0]){
								case "country":{
									this.userInputData.location.customData.country = param.long_name;
									newFullAddress += ` ${param.long_name},`;
									break;
								}
								case "locality":{
									this.userInputData.location.customData.city = param.long_name;
									newFullAddress += ` ${param.long_name},`;
									break;
								}
								case "route":{
									this.userInputData.location.customData.street = param.long_name;
									newFullAddress += ` ${param.long_name},`;
									break;
								}
								case "street_number":{
									this.userInputData.location.customData.street_number = param.long_name;
									newFullAddress += ` ${param.long_name},`;
									break;
								}
							}
						}
					}
					
					newFullAddress = newFullAddress.slice(0, -2);
				} else{
					newFullAddress = placeData.formatted_address || placeData.name || "";
				}
				
                this.userInputData.location.placeData   = placeData;
                this.userInputData.location.fullAddress = newFullAddress.trim();
            },
            onMedicalDegreeUpload(event){
                if(!event.target.files[0]){ return; }

                let file    = null;
                const _this = this;
                let reader  = new FileReader();

                this.validateFileExtension(event) ? this.userInputData.medical_degree.userInput.file = event.target.files[0] : this.userInputData.medical_degree.userInput.HTML = "";
                this.validateFileExtension(event) ? file = event.target.files[0] : file = "";

                reader.onload = function(e){
                    _this.userInputData.medical_degree.userInput.HTML =
                        file.type === "application/pdf" ?
                            `<object type = "application/pdf" data = "${e.target.result}" class = "personal-info__file-src"></object>` :
                            `<img class = "personal-info__file-src" src = "${e.target.result}">`;
                };

                file && reader.readAsDataURL(file);
                this.$forceUpdate();
            },
            onCertificationUpload(event){
                if(!event.target.files[0]){ return; }

                let file    = null;
                let reader  = new FileReader();
                const _this = this;

                this.validateFileExtension(event) ? this.userInputData.board_certification.userInput.file = event.target.files[0] : this.userInputData.board_certification.userInput.HTML = "";
                this.validateFileExtension(event) ? file = event.target.files[0] : file = "";

                reader.onload = function(e){
                    _this.userInputData.board_certification.userInput.HTML =
                        file.type === "application/pdf" ?
                            `<object type = "application/pdf" data = "${e.target.result}" class = "personal-info__file-src"></object>` :
                            `<img class = "personal-info__file-src" src = "${e.target.result}">`;
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

                if(this.errors.phone){
                    delete this.errors.phone;
                    this.$forceUpdate();
                }
            },
            onSave(){
                let formData = new FormData();
                
                if(this.userInputData.phone.eventData){
                    if(this.userInputData.phone.eventData.isValid){
                        this.userInputData.phone.value != this.$store.state.user.user.phone_number && formData.append("phone_number", this.userInputData.phone.value);
                    } else{
                        this.errors.phone = "Ungültige telefonnummer";
                        this.$forceUpdate();
                        return;
                    }
                }

                this.userInputData.last_name && this.userInputData.last_name != this.$store.state.user.user.last_name && formData.append("last_name", this.userInputData.last_name);
                this.userInputData.first_name && this.userInputData.first_name != this.$store.state.user.user.first_name && formData.append("first_name", this.userInputData.first_name);
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
                        this.$store.state.user.user.region.id != this.userInputData.region_id && formData.append("region_id", this.userInputData.region_id);
                    } else{
                        formData.append("region_id", this.userInputData.region_id);
                    }
                }
                if(this.userInputData.specialization_id){
                    if(this.$store.state.user.user.specialization){
                        this.$store.state.user.user.specialization.id != this.userInputData.specialization_id && formData.append("specialization_id", this.userInputData.specialization_id);
                    } else{
                        formData.append("specialization_id", this.userInputData.specialization_id);
                    }
                }

                if(this.userInputData.languages.length){
                    for(let i = 0; i < this.userInputData.languages.length; i++){
                        formData.append(`language_ids[${i}]`, this.userInputData.languages[i]);
                    }
                }

                if(this.userInputData.location.placeData){
                    this.userInputData.location.customData.country && formData.append("country", this.userInputData.location.customData.country);
                    this.userInputData.location.customData.city && formData.append("city", this.userInputData.location.customData.city);
                    this.userInputData.location.customData.street && formData.append("address", this.userInputData.location.customData.street + ", " + (this.userInputData.location.customData.street_number || ""));

                    if(this.userInputData.location.placeData.geometry && this.userInputData.location.placeData.geometry.location){
                        formData.append("latitude", this.userInputData.location.placeData.geometry.location.lat());
                        formData.append("longitude", this.userInputData.location.placeData.geometry.location.lng());
					}
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
                    this.openModal(this.$modals.defaultModal, "", "Herzliche Glückwünsche!");
                    this.setDefaultValues();
                }).catch((error) => {
                    this.openModal(this.$modals.defaultModal, "", "Etwas ist schief gelaufen!");
                    this.setDefaultValues();
                });
            },
            onChangeEmail(){
                this.$store.commit("modals/SET_NEW_EMAIL", this.$store.state.user.user.email);
                this.openModal(this.$modals.personalInfoChangeEmail);
            },
            onChangePassword(){
                this.openModal(this.$modals.personalInfoChangePassword);
            }
        }
    };
</script>

<style lang = "scss" scoped>
	$tablet_padding_right: 33px;
	$avatar_img_size: 256px;
	$desktop_max_column_width: 28.5%;
	.v-select__multiple{
		width: 100%;
	}
	.link {

		&--line {
			min-width: auto;
		}
	}
	.personal-info {
		margin-bottom : $main_offset * 2;
		
		&__items {
			margin    : $main_offset * 1.5 0 $main_offset 0;
			display   : flex;
			flex-wrap : wrap;
			
			&--max-width {
				@include tablet {
					padding-right : $tablet_padding_right;
				}
				
				@include desktop {
					max-width : calc(#{$desktop_max_column_width * 2} + #{$avatar_img_size} + #{$main_offset});
				}
			}
		}
		&__item-group{
			height: 303px;
			@include tablet-big{
				height: 311px;
			}
		}
		&__column {
			flex      : 0 0 100%;
			order     : 2;
			max-width : 100%;
			
			@include tablet {
				$size : 50%;
				flex          : 0 0 $size;
				width         : $size;
				padding-right : $tablet_padding_right;
			}
			
			@include desktop {
				flex  : 0 0 $desktop_max_column_width;
				width : $desktop_max_column_width;
			}
		}
		
		&__column-image {
			flex          : 0 0 100%;
			order         : 1;
			padding-right : 0;
			
			@include desktop {
				flex         : 0 0 $desktop_max_column_width;
				order        : 3;
				padding-left : 15px;
			}
		}
		
		&__item {
			width         : 100%;
			font-size     : 14px;
			margin-bottom : 15px;
			
			@include phone-big {
				font-size : 16px;
			}
			
			@include tablet-big {
				font-size : 18px;
			}
			
			&--submit {
				transition : $transition;
				background : transparentize($color-user-is-active, .25);
				
				&-disabled {
					cursor           : not-allowed;
					pointer-events   : none;
					background-color : $color-rolling-stone;
				}
				
				&:hover {
					background : $color-user-is-active;
				}
			}
		}
		
		&__item-link {
			padding-left  : $main_offset;
			padding-right : $main_offset;
		}
		
		&__header {
			display       : flex;
			align-items   : center;
			margin-bottom : 6px;

			&--edit-box{
				justify-content:space-between;
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
		
		&__main-languages {
			display        : flex;
			flex-wrap      : wrap;
			margin-left    : $main_offset / -2;
			margin-right   : $main_offset / -2;
			flex-direction : row;
		}
		
		&__main-phone.vue-tel-input {
			width         : 100%;
			height        : 40px;
			border        : 1px solid $color-table-border;
			background    : $color-white;
			box-sizing    : border-box;
			border-radius : 4px;

			&:focus{
				border: 1px solid $color-curious-blue;
			}
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
			width         : $avatar_img_size;
			height        : $avatar_img_size;
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
		
		&__file {
			display : flex;
			
			&__container {
				display     : flex;
				align-items : flex-start;
			}
			
			.paper-fastener-button-image {
				cursor      : pointer;
				margin-left : $main_offset / 2;
			}
		}
		
		/deep/ &__file-src {
			width         : 100%;
			height        : 100%;
			cursor        : pointer;
			max-width     : 130px;
			max-height    : 90px;
			object-fit    : cover;
			border-radius : 4px;
		}
		
		/deep/ &__file-remove {
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
			color     : $color-cinnabar;
			font-size : .75em;
		}
		
		.link {
			overflow  : hidden;
			min-width : auto;
			font-size : inherit;

			@media screen and (max-width : $screen-phone-big-min - 1) {
				&--button-upload {
					padding : 11px 24px 7px 38px;
					
					img { top : 5px; }
				}
			}
			
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

	.hide-region {
		display: none
	}
</style>