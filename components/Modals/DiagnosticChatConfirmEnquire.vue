<template>
	<modal :name = "$modals.diagnosticChatConfirmEnquire"
		   transition = "nice-modal-fade"
		   :width = "500"
		   :height = "'auto'"
		   :delay = "100"
		   :adaptive = "true"
		   :class = "'modal'">
		<button class = "modal__close-button" @click.stop = "closeModal($modals.diagnosticChatConfirmEnquire)"></button>
		<div class = "modal__content" v-if = "!isSubmit">
			<header class = "modal__header">
				<h3 class = "modal__title">Geschafft!</h3>
			</header>
			<div class = "modal__main">
				<p>{{ `Alles ist fertig eingegeben. Jetzt können Sie Ihren Fall an den Hautarzt abschicken. Die Online-Beratung kostet 19,- Euro. Einverstanden?` }}</p>
			</div>
			<footer class = "modal__footer">
				<button class = "control-btn--cancel"
						@click.stop = "closeModal($modals.diagnosticChatConfirmEnquire)">
					Abbrechen
				</button>
				<button class = "control-btn--submit" @click.stop = "onSubmit">
					Einverstanden
				</button>
			</footer>
		</div>
		<div class = "modal__loader" v-else>
			<Loader />
			<p>{{ this.$t('loader-text-diagnostic') }} </p>
		</div>
	</modal>
</template>

<script>
    import modal from "~/mixins/modal";
    import Loader from "~/components/App/Loader";

    export default {
        mixins     : [
            modal,
        ],
        components : {
            Loader,
        },
        data(){
            return {
                isSubmit : false
            }
        },
		computed:{
            targetDoctor(){
				const RESULT = this.$store.state.diagnosticChat.targetDoctorForDiagnosticChat;
				
                if(RESULT){
                    return RESULT;
                }else{
                    console.error("dont have 'targetDoctor', redirect to home page");
                    this.$router.replace(this.$routes.hautarzt.path);
                }
            }
		},
        methods    : {
            onSubmit(){
				this.isSubmit = true;
				this.$root.$emit("submitDiagnosticChatConfirmEnquire");
            }
        }
    }
</script>
