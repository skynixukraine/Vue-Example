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
                confirmCodeValue: null
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
                // API to Back-End
            },
            resendCode() {
                // API to Back-End
            }
        }
    }
</script>

<style lang = "scss" scoped>
    .buttons-confirm-code-wrapper {
        padding-top: 10px;
    }
</style>