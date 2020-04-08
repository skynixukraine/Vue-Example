<template>
	<div class = "modals">
		<Default v-if = "$store.state.modals.currentActiveModal === $modals.defaultModal" />
		<ContactModal v-if = "$store.state.modals.currentActiveModal === $modals.contactModals" />
		<RegisterSuccessModal v-if = "$store.state.modals.currentActiveModal === $modals.registerSuccess" />
		<PersonalInfoChangeEmail v-if = "$store.state.modals.currentActiveModal === $modals.personalInfoChangeEmail" />
		<PersonalInfoChangePassword v-if = "$store.state.modals.currentActiveModal === $modals.personalInfoChangePassword" />
		<DiagnosticChatConfirmEnquire v-if = "$store.state.modals.currentActiveModal === $modals.diagnosticChatConfirmEnquire" />
		<PersonalInfoConfirmDeleteAccount v-if = "$store.state.modals.currentActiveModal === $modals.personalInfoConfirmDeleteAccount" />
		<ChatConfirmCodeMobile v-if = "$store.state.modals.currentActiveModal === $modals.chatConfirmCodeMobile" />
		<SendFindings v-if = "$store.state.modals.currentActiveModal === $modals.sendFindings" />
		<OpenImageModal v-if = "$store.state.modals.currentActiveModal === $modals.openImageModal" />
		<BeforeChat v-if = "$store.state.modals.currentActiveModal === $modals.beforeChat" />
	</div>
</template>

<script>
    import Default from "~/components/Modals/Default";
    import ContactModal from "~/components/Modals/ContactModal";
    import RegisterSuccessModal from "~/components/Modals/RegisterSuccessModal";
    import PersonalInfoChangeEmail from "~/components/Modals/PersonalInfoChangeEmail";
    import PersonalInfoChangePassword from "~/components/Modals/PersonalInfoChangePassword";
    import DiagnosticChatConfirmEnquire from "~/components/Modals/DiagnosticChatConfirmEnquire";
	import PersonalInfoConfirmDeleteAccount from "~/components/Modals/PersonalInfoConfirmDeleteAccount";
	import ChatConfirmCodeMobile from "~/components/Modals/ChatConfirmCodeMobile";
    import SendFindings from "~/components/Modals/SendFindings";
    import OpenImageModal from "~/components/Modals/OpenImageModal";
    import BeforeChat from "~/components/Modals/BeforeChat";

    export default {
        components : {
            Default,
            ContactModal,
            RegisterSuccessModal,
            PersonalInfoChangeEmail,
            PersonalInfoChangePassword,
            DiagnosticChatConfirmEnquire,
			PersonalInfoConfirmDeleteAccount,
			ChatConfirmCodeMobile,
            SendFindings,
            OpenImageModal,
            BeforeChat
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