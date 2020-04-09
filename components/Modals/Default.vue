<template>
	<modal :name = "$modals.defaultModal"
		   transition = "nice-modal-fade"
		   :width = "500"
		   :height = "'auto'"
		   :delay = "100"
		   :adaptive = "true"
		   :class = "'modal'">
		<button class = "modal__close-button" @click.stop = "closeModal($modals.defaultModal)"></button>
		<header class = "modal__header">
			<h3 class = "modal__title">{{ $store.state.modals.modalTitle }}</h3>
		</header>
		<div class = "modal__main" v-html = "$store.state.modals.modalMessageHTML"></div>
		<NuxtLink :to = "$routes.home.path"
					  class = "link link--button link--button-blue link--button-gradient"
					  exact>Zurück zur Homepage
			</NuxtLink>
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