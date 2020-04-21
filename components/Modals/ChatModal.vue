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
		<nuxt-link :to="loadRedirectUrl"><button class="control-btn--submit chatmodal-add-btn" @click.stop = "closeModal($modals.chatModal)">Fertig</button></nuxt-link>
	</modal>
</template>

<script>
    import modal from "~/mixins/modal";

    export default {
        mixins : [
            modal,
		],
		computed : {
			loadRedirectUrl() {
				return this.$store.state.modals.modalRedirect
			}
		},
		beforeDestroy(){
            this.$store.commit("modals/SET_MODAL_TITLE", "");
			this.$store.commit("modals/SET_MODAL_MESSAGE_HTML", "");
			this.$store.commit("modals/SET_MODAL_REDIRECT", "");
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

