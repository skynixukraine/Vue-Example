<template>
	<modal :name = "$modals.openImageModal"
		   transition = "nice-modal-fade"
		   :width = "700"
		   :height = "'auto'"
		   :delay = "100"
		   :adaptive = "true"
		   :class = "'modal modal--open-image'">
		<button class = "modal__close-button" @click = "closeModal($modals.openImageModal)"></button>
		<div class = "modal__main">
			<img :src="$store.state.modals.modalMessageHTML">
		</div>
	</modal>
</template>

<script>
    // mixins
    import modal from '~/mixins/modal';
    

    export default {
        mixins  : [
            modal,
        ],
    }
</script>
<style lang = "scss">
	.modal {
		&--open-image {
			.v--modal-box.v--modal {
				padding: 5px;
				box-shadow: none;
				border-radius: 3px;
				
				.modal__close-button {
					display: none;
				}
				img {
					width : 100%;
					max-height: 600px;
					object-fit: contain;
				}
			}
		}
		
	}
</style>