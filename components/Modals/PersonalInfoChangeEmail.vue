<template>
	<modal :name = "$modals.personalInfoChangeEmail"
		   transition = "nice-modal-fade"
		   :width = "500"
		   :height = "'auto'"
		   :delay = "100"
		   :adaptive = "true"
		   :class = "'modal'">
		<button class = "modal__close-button" @click.stop = "closeModal($modals.personalInfoChangeEmail)"></button>
		<transition name = "main-animation">
			<div class = "modal__content" v-if = "!isSubmit">
				<header class = "modal__header">
					<h3 class = "modal__title">Geben Sie eine neue E-Mail-Adresse ein</h3>
				</header>
				<div class = "modal__main">
					<InputEmail :value = "newEmail"
								@change = "onChange"
								@blur = "onBlur" />
				</div>
				<footer class = "modal__footer">
					<button class = "control-btn control-btn--cancel"
							@click.stop = "closeModal($modals.personalInfoChangeEmail)">
						Abbrechen
					</button>
					<button class = "control-btn control-btn--submit"
							:class = "{'is-disable': !newEmail || !isValid || newEmail === $store.state.modals.newEmail}"
							@click.stop = "onSubmit">
						Bestätigen
					</button>
				</footer>
			</div>
			<div class = "modal__loader" v-else>
				<Loader />
			</div>
		</transition>
	</modal>
</template>

<script>
    import modal from "~/mixins/modal";
    import UserApi from "~/services/api/User";
    import validator from "~/mixins/validator";
    import Loader from "~/components/App/Loader";
    import InputEmail from "~/components/Content/InputEmail";

    export default {
        mixins     : [
            modal,
            validator,
        ],
        components : {
            Loader,
            InputEmail,
        },
        data(){
            return {
                isSubmit : false,
                newEmail : this.$store.state.modals.newEmail,
                isValid  : false
            }
        },
        methods    : {
            onSubmit(){
                this.isSubmit = true;

                let formData = new FormData;

                formData.append("email", this.newEmail);

                UserApi.sendChangeEmailLink({
                    token       : this.$cookies.get(this.$cookie.names.token),
                    requestData : formData,
                }).then(response => {
                    console.log(response);
                    this.openModal(this.$modals.defaultModal, response.message, "Herzliche Glückwünsche!");
				}).catch(error => {
                    this.openModal(this.$modals.defaultModal, error.message, "Etwas ist schief gelaufen!");
				});
            },
            onChange(event){
                this.isValid  = this.validateEmail(event);
                this.newEmail = event.target.value;
            },
            onBlur(event){
                this.isValid = this.validateEmail(event);
            }
        }
    }
</script>