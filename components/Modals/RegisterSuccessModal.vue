<template>
	<modal :name = "$modals.registerSuccess"
		   transition = "nice-modal-fade"
		   :width = "500"
		   :height = "'auto'"
		   :delay = "100"
		   :adaptive = "true"
		   :class = "'modal'">
		<button class = "modal__close-button" @click.stop = "closeModal($modals.registerSuccess)"></button>
		<header class = "modal__header">
			<h3 class = "modal__title">Erfolgreich registriert</h3>
		</header>
		<div class = "modal__main">
			<p>Wir haben Ihnen eine E-Mail mit einem Bestätigungslink zugeschickt, der nur für drei Stunden gültig ist. Bitte prüfen Sie daher jetzt Ihre E-Mails, um die Anmeldung abzuschließen.
			</p>
			<h3>{{ countdown }}</h3>
		</div>
		<footer class = "modal__footer">
			<div class = "modal__footer-item">
				<button class = "link link--button link--button-blue link--button-gradient"
						:disabled = "countdown > 0"
						@click = "onResendEmail">
					E-Mail erneut zusenden
				</button>
			</div>
		</footer>
	</modal>
</template>

<script>
    import modal from "~/mixins/modal";
    import recaptcha from "~/mixins/recaptcha";
    import countdown from "~/mixins/countdown";
    import localStorage from '~/mixins/localStorage';

    export default {
        mixins : [
            modal,
            recaptcha,
            countdown,
            localStorage,
        ],
        created(){
            if(process.client){
                this.$recaptchaLoaded()
                    .then(() => {
                        this.loadAndSetRecaptchaToken(this.$recaptchaActions.sendEmailVerificationLink)
                    });

                this.startCountdown();
            }
        },

        watch : {
            '$store.state.user.user'(user){
                if(user.email_verified_at){
                    this.closeModal(this.$modals.registerSuccess);
                    this.$router.push({path : this.$routes.home.path});
                }
            },
        },

        methods : {
            onResendEmail(){
                this.startCountdown();
                const requestData = this.prepareDataForSending({
                    email          : this.email,
                    recaptchaToken : this.recaptchaToken
                });

                this.$store.dispatch("user/SEND_EMAIL_VERIFICATION_LINK", requestData)
                    .then(response => {
                        this.$root.$emit("showNotify", {type : "success", text : response.message});
                    })
                    .catch(error => {
                        this.$root.$emit("showNotify", {type : "error", text : error.message});
                    });
                this.loadAndSetRecaptchaToken(this.$recaptchaActions.sendEmailVerificationLink);
            },
            prepareDataForSending({email, recaptchaToken}){
                let formData = new FormData();

                formData.append("email", email);
                formData.append("recaptcha", recaptchaToken);

                return formData;
            },
        }
    }
</script>