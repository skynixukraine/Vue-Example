<template>
	<modal :name = "$modals.personalInfoConfirmDeleteAccount"
		   transition = "nice-modal-fade"
		   :width = "500"
		   :height = "'auto'"
		   :delay = "100"
		   :adaptive = "true"
		   :class = "'modal'">
		<button class = "modal__close-button"
				@click.stop = "closeModal($modals.personalInfoConfirmDeleteAccount)"></button>
		<transition name = "main-animation">
			<div class = "modal__content" v-if = "!isAwaitRequestSending">
				<header class = "modal__header">
					<h3>Möchten Sie Ihr Online-Hautarzt-Konto wirklich kündigen? Diese Aktion ist irreversibel.</h3>
					<span v-if = "responseErrorMessage">{{ responseErrorMessage }}</span>
				</header>
				<div class = "modal__main">
					<InputPassword :labelTxt = "'Aktuelles Passwort'"
								   :isRequired = 'true'
								   :isValidate = 'true'
								   @change = "onChangePassword" />
				</div>
				<footer class = "modal__footer">
					<button class = "control-btn--cancel"
							@click.stop = "closeModal($modals.personalInfoConfirmDeleteAccount)">
						Abbrechen
					</button>
					<button class = "control-btn--submit"
							:class = "{'control-btn--disabled': password && !isPasswordValid}"
							@click.stop = "onSubmit">Bestätigen
					</button>
				</footer>
			</div>
		</transition>
		<transition name = "main-animation">
			<div class = "modal__loader" v-if = "isAwaitRequestSending">
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
    import InputPassword from "~/components/Content/InputPassword";

    export default {
        mixins     : [
            modal,
            validator,
        ],
        components : {
            Loader,
            InputPassword,
        },
        data(){
            return {
                password              : "",
                responseErrorMessage  : "",
                isPasswordValid       : false,
                isAwaitRequestSending : false,
            }
        },
        methods    : {
            onSubmit(){
                UserApi.deleteUserAccount({
                    id       : this.$store.state.user.user.id,
                    token    : this.$cookies.get(this.$cookie.names.token),
                    password : encodeURIComponent(this.password)
                }).then((response) => {
                    this.closeModal(this.$modals.personalInfoConfirmDeleteAccount);

                    this.$cookies.remove(this.$cookie.names.token);
                    this.$cookies.remove(this.$cookie.names.tokenId);
                    this.$router.push({path : this.$routes.home.path});
                }).catch((error) => {
                    this.responseErrorMessage = error.message;
                });
            },
            onChangePassword(event){
                this.password        = event.target.value;
                this.isPasswordValid = this.checkPassword(this.password);
            }
        }
    }
</script>