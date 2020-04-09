<template>
	<modal :name = "$modals.chatModal"
		   transition = "nice-modal-fade"
		   :width = "500"
		   :height = "'auto'"
		   :delay = "100"
		   :adaptive = "true"
		   :class = "'modal'">
		<header class = "modal__header">
			<h3 class = "modal__title">{{ $store.state.modals.modalTitle }}</h3>
		</header>
		<div class = "modal__main" v-html = "$store.state.modals.modalMessageHTML"></div>
		<button class="control-btn--submit chatmodal-add-btn" @click.stop = "closeModal($modals.chatModal)"><nuxt-link to="/">Fertig</nuxt-link></button>
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
		}
    }
</script>

<style lang = "scss" scoped>
	.chatmodal-add-btn {
		margin-top: 10px;
		width: 50%;
	}
	.chatmodal-add-btn a {
		color: white;
	}
</style>

