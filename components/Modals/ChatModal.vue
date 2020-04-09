<template>
	<modal :name = "$modals.chatModal"
		   transition = "nice-modal-fade"
		   :width = "500"
		   :height = "'auto'"
		   :delay = "100"
		   :adaptive = "true"
		   :class = "'modal'">
        <button class = "modal__close-button" @click = "closeModal($modals.chatModal)"></button>
		<header class = "modal__header">
			<h3 class = "modal__title">{{ $store.state.modals.modalTitle }}</h3>
		</header>
		<div class = "modal__main" v-html = "$store.state.modals.modalMessageHTML"></div>
		<NuxtLink :to = "$routes.home.path"
					  exact><button class = "control-btn--submit" @click.stop = "closeModal($modals.chatModal)"></button>
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