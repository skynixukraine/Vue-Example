<template>
	<modal :name = "$modals.personalInfoChangeEmail"
		   transition = "nice-modal-fade"
		   :width = "500"
		   :height = "'auto'"
		   :delay = "100"
		   :adaptive = "true"
		   :class = "'modal'">
		<button class = "modal__close-button" @click.stop = "closeModal($modals.personalInfoChangeEmail)"></button>
		<div class = "modal__content">
			<transition name = "main-animation">
				<header class = "modal__header" v-if = "!isAwaitRequestSending">
					<h3>{{ title }}</h3>
					<span>{{ message }}</span>
				</header>
			</transition>
			<transition name = "main-animation">
				<div v-if = "!isSending">
					<div class = "modal__main">
						<InputEmail :value = "newEmail"
									@change = "onChange"
									@blur = "onBlur" />
					</div>
				</div>
			</transition>
			<div class = "modal__loader" v-if = "isSending && isAwaitRequestSending">
				<Loader />
			</div>
			<transition name = "main-animation">
				<div class = "s" v-if = "isCounterFinishForResend && !isAwaitRequestSending">
					<div class = "modal__main">
						<p>Wir haben eine E-Mail gesendet, in der die Änderung der E-Mail-Adresse in Ihre neue E-Mail-Adresse bestätigt wird.</p>
						<p>Diese E-Mail-Bestätigung ist 3 Stunden gültig.</p>
						<h3>{{ countdown }}</h3>
					</div>
				</div>
			</transition>
			<transition name = "main-animation">
				<footer class = "modal__footer" v-if = "isSending && isCanResend && !isAwaitRequestSending || !isSending">
					<button class = "control-btn--cancel"
							@click.stop = "closeModal($modals.personalInfoChangeEmail)">
						Abbrechen
					</button>
					<button class = "control-btn--submit"
							:class = "{'is-disable': !newEmail || !isValid || newEmail === $store.state.modals.newEmail || isCounterFinishForResend}"
							@click.stop = "onSubmit">
						{{ isCanResend ? `E-Mail zurücksenden` : `Bestätigen` }}
					</button>
				</footer>
			</transition>
		</div>
	</modal>
</template>

<script>
    import modal from "~/mixins/modal";
    import UserApi from "~/services/api/User";
    import countdown from "~/mixins/countdown";
    import validator from "~/mixins/validator";
    import Loader from "~/components/App/Loader";
    import InputEmail from "~/components/Content/InputEmail";

    export default {
        mixins     : [
            modal,
            validator,
            countdown,
        ],
        components : {
            Loader,
            InputEmail,
        },
        data(){
            return {
                title            : "Bitte geben Sie eine neue E-Mail-Adresse ein",
                message          : "",
                isValid          : false,
                newEmail         : this.$store.state.modals.newEmail,
                isSending        : false,
                isCanResend      : false,
                isAwaitRequestSending : false,
            }
        },
        computed   : {
            isCounterFinishForResend(){
                return this.isCanResend && this.countdown > 0;
            }
        },
        methods    : {
            onSubmit(){
                this.isSending = true;
                this.isAwaitRequestSending = true;

                let formData = new FormData;

                formData.append("email", this.newEmail);

                UserApi.sendChangeEmailLink({
                    token       : this.$cookies.get(this.$cookie.names.token),
                    requestData : formData,
                }).then(response => {
                    this.isCanResend      = true;
                    this.isAwaitRequestSending = false;

                    this.title   = `Die Bestätigung wurde an ${this.newEmail} gesendet.`;
                    this.message = "Bitte überprüfen Sie Ihre E-Mails und folgen Sie den Anweisungen. Die Bestätigungs-E-Mail ist 1 Stunde lang gültig";
                }).catch(error => {
                    this.isCanResend      = true;
                    this.isAwaitRequestSending = false;

                    this.title   = "Etwas ist schief gelaufen!";
                    this.message = error.message;
                });

                this.startCountdown();
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