<template>
	<modal :name = "$modals.beforeChat"
		   transition = "nice-modal-fade"
		   :width = "700"
		   :height = "'auto'"
		   :delay = "100"
		   :adaptive = "true"
		   :class = "'modal modal--before-chat'">
		<button class = "modal__close-button" @click = "closeModal($modals.beforeChat)"></button>
		<div class = "modal__main">
			<h3>{{ this.$t('before-chat-modal.title') }}</h3>
			<p>{{ this.$t('before-chat-modal.text1') }}<a href = "/datenschutz-gmbh" target="_blank">{{ this.$t('before-chat-modal.link') }}</a>{{ this.$t('before-chat-modal.text2') }}</p>
		</div>
		<footer class = "modal__footer">
			<button class = "control-btn--cancel"
					@click.stop = "closeModal($modals.beforeChat)">
				{{ this.$t('before-chat-modal.b1') }}
			</button>
			<button class = "control-btn--submit" @click.stop = "openDiagnosticChat">
				{{ this.$t('before-chat-modal.b2') }}
			</button>
		</footer>
	</modal>
</template>

<script>
    // mixins
    import modal from '~/mixins/modal';


    export default {
        mixins  : [
            modal,
        ],
    methods  : {
        openDiagnosticChat(){
            this.closeModal(this.$modals.beforeChat);
            this.$store.state.modals.modalMessageHTML();
        }
    }
    }
</script>
<style lang = "scss">
	.modal {
		&--before-chat {
		
		}
		
	}
</style>