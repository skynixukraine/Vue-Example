<template>
	<div class = "modals">
		<ContactModal v-if = "$store.getters['app/CURRENT_ACTIVE_MODAL'] === $modals.contactModals" />
		<RegisterSuccessModal v-if = "$store.getters['app/CURRENT_ACTIVE_MODAL'] === $modals.registerSuccess" />
	</div>
</template>

<script>
    import ContactModal from "~/components/Modals/ContactModal";
    import RegisterSuccessModal from "~/components/Modals/RegisterSuccessModal";

    export default {
        components : {
            ContactModal,
            RegisterSuccessModal,
        },
    }
</script>

<style lang = "scss">
	.modal {
		&__close-button {
			$size: 32px;
			
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
		
		&__main {
			margin-bottom : 40px;
		}
		
		& .v--modal {
			$vertical_padding: 64px;
			
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