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
			<form class = "modal__form" v-if="enquire.success === false">
				<AutoHeight :placeholder_text = "'BEFUND ABSCHICKEN'"
							:minHeight = "'10em'"
							:value = "enquire.conclusion"
							@change = "(newValue) => {enquire.conclusion = newValue}"/>
				<button class = "link link--button link--button-blue link--button-gradient" @click = "onSubmit">Ok</button>
			</form>
			<div class = "modal__form--success" v-else>
				<p>Vielen Dank für Ihre Einreichung</p>
				<p>Dieser Fall ist jetzt abgeschlossen und Ihr Patient wird benachrichtigt.</p>
			</div>
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
        data(){
            return {
                enquire : {
                    conclusion: "",
					success: false,
				}
            }
        },
        mixins  : [
            modal,
        ],
        methods : {
            onSubmit(){
                let id = this.$store.state.enquires.doctorEnquire.id;
                let token = this.$cookies.get(this.$cookie.names.token);
				let requestConfig = new FormData();
				
                requestConfig.append("_method", "PATCH");
				requestConfig.append("conclusion", this.enquire.conclusion)
				
                EnquiresApi.sendFindings(id, token, requestConfig).then((response) =>{
                    this.enquire.success = true;
                    this.enquire.conclusion = response.data.data.conclusion;
                    setTimeout(() => location.reload(), 600);
                }).catch((error) =>{
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
			cursor: pointer;
			
			@include tablet {
				margin-top : 20px;
			}
		}
		
	}
</style>