<template>
	<modal :name = "$modals.openImageModal"
		   transition = "nice-modal-fade"
		   :width = "auto"
		   :height = "'auto'"
		   :delay = "100"
		   :adaptive = "true"
		   :class = "'modal'">
		<button class = "modal__close-button" @click = "closeModal($modals.openImageModal)"></button>
		<div class = "modal__main">
			<img src = "" alt = "">
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
        methods : {
            getImage(image) {
            
            },
        }
    }
</script>
<style lang = "scss">
	.modal {
		&__form {
			display        : flex;
			flex-direction : column;
			align-items    : center;
		}
		
		&__header {
			margin-bottom : 55px;
		}
		
		.link {
			margin-top : 10px;
			
			@include tablet {
				margin-top : 20px;
			}
		}
		
	}
</style>