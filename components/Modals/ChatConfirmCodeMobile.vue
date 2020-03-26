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
				   :placeholder = "'Enter code...'"
				   :value = "confirmCodeValue"
				   class = "custom-input__input"
				   @blur = "onBlur"
				   @input = "onChange"
				   @change = "onChange"
				   @keyup.stop = "onChange">
            <div class = "buttons-confirm-code-wrapper">
            <button type = "button"
                    class = "control-btn--submit"
                    @click = "confirmCode">Confirm
            </button>
            <button type = "button"
					class = "control-btn--cancel"
					@click.stop = "resendCode">Resend
			</button>
            </div>
        </div>
	</modal>
</template>

<script>
    import modal from "~/mixins/modal";
    import diagnosticChatApi from "~/services/api/DiagnosticChat";

    export default {
        mixins : [
            modal,
        ],
		beforeDestroy(){
            this.$store.commit("modals/SET_MODAL_TITLE", "");
            this.$store.commit("modals/SET_MODAL_MESSAGE_HTML", "");
        },
        data(){
            return {
                confirmCodeValue: null,
			}
        },
        computed:{
            targetDoctor(){
				return this.$store.state.diagnosticChat.targetDoctorForDiagnosticChat;
            }
		},
		mounted(){
            this.confirmCodeValue = this.confirmCodeValue;
		},
        methods : {
            onBlur(event){
                this.$forceUpdate();
            },
            onChange(event){
                this.confirmCodeValue = event.target.value;
            },
            confirmCode() {
                diagnosticChatApi.sendSmsCode(data).then((response) => {
                    conosle.log('OK')
                        this.openModal(
                        this.$modals.defaultModal,
                        `${this.targetDoctor.title ? this.targetDoctor.title.name : ""} ${this.targetDoctor.first_name} ${this.targetDoctor.last_name} wird Sie per E-Mail kontaktieren.`,
                        "Ihre Anfrage erstellt");
                }).catch((error) => {
                    this.openModal(this.$modals.defaultModal, error.message, "Etwas ist schief gelaufen!");
                });
            },
            resendCode() {
                diagnosticChatApi.sendSmsCode(enquireId).then((response) => {
                    conosle.log('resend')
                }).catch((error) => {
                    this.openModal(this.$modals.defaultModal, error.message, "Etwas ist schief gelaufen!");
                });
            }
        }
    }
</script>

<style lang = "scss" scoped>
    .buttons-confirm-code-wrapper {
        padding-top: 10px;
    }
</style>