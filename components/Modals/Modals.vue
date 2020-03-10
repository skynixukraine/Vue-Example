<template>
	<div class = "modals">
		<Default v-if = "activeModal === $modals.defaultModal" />
		<ContactModal v-if = "activeModal === $modals.contactModals" />
		<RegisterSuccessModal v-if = "activeModal === $modals.registerSuccess" />
		<PersonalInfoChangeEmail v-if = "activeModal === $modals.personalInfoChangeEmail" />
		<PersonalInfoChangePassword v-if = "activeModal === $modals.personalInfoChangePassword" />
		<DiagnosticChatConfirmEnquire v-if = "activeModal === $modals.diagnosticChatConfirmEnquire" />
	</div>
</template>

<script>
    import Default from "~/components/Modals/Default";
    import ContactModal from "~/components/Modals/ContactModal";
    import RegisterSuccessModal from "~/components/Modals/RegisterSuccessModal";
    import PersonalInfoChangeEmail from "~/components/Modals/PersonalInfoChangeEmail";
    import PersonalInfoChangePassword from "~/components/Modals/PersonalInfoChangePassword";
    import DiagnosticChatConfirmEnquire from "~/components/Modals/DiagnosticChatConfirmEnquire";

    export default {
        components : {
            Default,
            ContactModal,
            RegisterSuccessModal,
            PersonalInfoChangeEmail,
            PersonalInfoChangePassword,
            DiagnosticChatConfirmEnquire,
        },
		computed:{
            activeModal(){
                return this.$store.state.modals.currentActiveModal;
			}
		}
    }
</script>

<style lang = "scss">
	.modal {
		&__close-button {
			$size : 32px;
			top                 : $size / 2;
			right               : $size / 2;
			width               : $size;
			height              : $size;
			border              : none;
			margin              : 0;
			padding             : 0;
			position            : absolute;
			background-size     : cover;
			background-image    : url('~static/images/icons/close.svg');
			background-color    : transparent;
			background-repeat   : no-repeat;
			background-position : center center;
		}
		
		&__footer { margin-top : $main_offset * 2; }
		
		.v--modal {
			$vertical_padding : 64px;
			padding       : $vertical_padding 24px;
			background    : $color-white;
			text-align    : center;
			border-radius : 20px;
			
			@include tablet {
				padding : $vertical_padding 48px;
			}
		}
	}
</style>