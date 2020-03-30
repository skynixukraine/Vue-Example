<template>
	<modal :name = "$modals.sendFindings"
		   transition = "nice-modal-fade"
		   :width = "1100"
		   :height = "'auto'"
		   :delay = "100"
		   :adaptive = "true"
		   :class = "'modal'">
		<button class = "modal__close-button" @click = "closeModal($modals.sendFindings)"></button>
		<header class = "modal__header">
			<h3 class = "modal__title">BEFUND ABSCHICKEN</h3>
		</header>
		<div class = "modal__main">
			<form class = "modal__form">
				<AutoHeight :placeholder_text = "'BEFUND ABSCHICKEN'"
							:maxLength = '170'
							:minHeight = "'10em'" />
				<buttom class = "link link--button link--button-blue link--button-gradient" @click = "onSubmit">Ok
				</buttom>
			</form>
		</div>
	</modal>
</template>

<script>
    // mixins
    import modal from '~/mixins/modal';
    import AutoHeight from "~/components/Content/AutoHeight";

    import EnquiresApi from "~/services/api/Enquires";

    export default {
        components : {
            AutoHeight
        },

        mixins  : [
            modal,
        ],
        methods : {
            onSubmit(){

                let requestData = 2;
                let enquire_id  = this.$store.state.enquires.doctorEnquire.id
                EnquiresApi.sendFindings(enquire_id, {requestData}).then((response) =>{
                    console.log(response);
                }).catch((error) =>{
                    console.log(error);
                });
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