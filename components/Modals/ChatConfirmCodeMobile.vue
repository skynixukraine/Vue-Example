<template>
	<modal :name = "$modals.chatConfirmCodeMobile"
		   transition = "nice-modal-fade"
		   :width = "500"
		   :height = "'auto'"
		   :delay = "100"
		   :adaptive = "true"
		   :class = "'modal'">
		<button class = "modal__close-button" @click.stop = "closeModal($modals.chatConfirmCodeMobile)"></button>
		<header class = "modal__header">
			<h3 class = "modal__title">{{ $store.state.modals.modalTitle }}</h3>
		</header>
		<div class = "modal__main">
            <input type = "number"
                   name = "verifyCode"
				   :placeholder = "'Enter code...'"
                   ref = "verifyCodeInput"
                   v-model = "models.verifyCode"
                   @blur = "onVerifyCodeChange"
				   class = "custom-input__input">
            <div class = "form__message" v-if = "errors.verifyCode">{{ errors.verifyCode }}</div>
            <div class = "buttons-confirm-code-wrapper">
            <button type = "button"
                    class = "control-btn--submit confirm-btn-chat"
                    @click = "confirmCode">{{ $t("page-forschung.modal.confirm") }}
            </button>
            <button type = "button"
					class = "control-btn--cancel"
					@click.stop = "resendCode">{{ $t("page-forschung.modal.reset") }}
			</button>
            </div>
        </div>
	</modal>
</template>

<script>
    import modal from "~/mixins/modal";
    import diagnosticChatApi from "~/services/api/DiagnosticChat";
    import validator from "~/mixins/validator";
    import recaptcha from '~/mixins/recaptcha';
    

    export default {
        mixins : [
            modal,
            validator,
            recaptcha,
        ],
        created(){
            if(process.client){
                this.$recaptchaLoaded()
                    .then(() => {
                        this.loadAndSetRecaptchaToken(this.$recaptchaActions.submitVerificationSmsCode)
                    });
            }
        },
		beforeDestroy(){
            this.$store.commit("modals/SET_MODAL_TITLE", "");
            this.$store.commit("modals/SET_MODAL_MESSAGE_HTML", "");
        },
        data(){
            return {
                models : {
                    verifyCode  : "",
                },
                formIsValid : {
                    verifyCode    : "",
                },
                isCodeVerify : false,
			}
        },
        computed:{
            targetDoctor(){
				return this.$store.state.diagnosticChat.targetDoctorForDiagnosticChat;
            },
            userEnquireId() {
                return this.$store.state.user.userEnquireId;
            }
		},
        methods : {
            onVerifyCodeChange(event) {
                this.formIsValid.verifyCode = this.validateVerifyCode(event, this.$refs.verifyCodeInput);
                this.$forceUpdate();
            },
            confirmCode() {
                this.isCodeVerify = true;
                let userEnquireId = this.userEnquireId;
                let requestConfig = new FormData();

                this.loadAndSetRecaptchaToken(this.$recaptchaActions.submitVerificationSmsCode);

                if(Object.values(this.formIsValid).indexOf(false) > -1){
                    this.validateForm(this.models);
                    this.isFormSending = false;
                    this.$forceUpdate();
                    return false;
                }
                requestConfig.append("verification_code", this.models.verifyCode);
                requestConfig.append("recaptcha", this.recaptchaToken);

                diagnosticChatApi.verifySmsCode(userEnquireId, requestConfig).then((response) => {
                    this.$root.$emit("showNotify", {type : "success", text : response.message});
                    this.$store.commit("user/SET_USER_IS_VERIFY_PHONE", 1);
                    this.$store.commit("enquires/SET_ENQUIRE_ACCESS", response.data);
                    this.$root.$emit("submitDiagnosticChatChargeEnquire");
                    this.$root.$emit("submitConclusion");
                    this.closeModal(this.$modals.chatConfirmCodeMobile);

                }).catch((error) => {
                    this.$root.$emit("showNotify", {type : "error", text : error.message});
                });
            },
            resendCode() {
                let userEnquireId = this.userEnquireId;
                diagnosticChatApi.sendSmsCode(userEnquireId).then((response) => {
                    this.$root.$emit("showNotify", {type : "success", text : response.message});
                }).catch((error) => {
                    this.$root.$emit("showNotify", {type : "error", text : error.message});
                });
            },
            validateForm(models){
                // check required fields
                if(!models.verifyCode){
                    this.errors["verifyCode"] = 'Error';
                    this.$forceUpdate();
                    this.$root.$emit("showNotify", {type : "error", text : "Validation SMS-code Error"});
                    return false;
                }
                return true;
            },
        }
    }
</script>

<style lang = "scss" scoped>
    .confirm-btn-chat {
        margin-bottom: 5px;
    }
    .buttons-confirm-code-wrapper {
        padding-top: 10px;
        flex-direction: column;
    }
</style>