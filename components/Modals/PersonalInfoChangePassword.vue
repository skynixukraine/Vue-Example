<template>
	<modal :name = "$modals.personalInfoChangePassword"
		   transition = "nice-modal-fade"
		   :width = "500"
		   :height = "'auto'"
		   :delay = "100"
		   :adaptive = "true"
		   :class = "'modal'">
		<button class = "modal__close-button" @click.stop = "closeModal($modals.personalInfoChangePassword)"></button>
		<transition name = "main-animation">
			<div class = "modal__content" v-if = "!isSubmit">
				<header class = "modal__header">
					<h3 class = "modal__title">Passwort ändern</h3>
				</header>
				<div class = "modal__main">
					<div class = "modal__main__item current-password">
						<InputPassword :isToggle = 'true'
									   :labelTxt = "'Aktuelles Passwort'"
									   :value = "currentPassword"
									   :isRequired = 'true'
									   @change = "event => currentPassword = event.target.value.replace(/\s/g, '')" />
					</div>
					<div class = "modal__main__item new-password">
						<InputPassword :isToggle = 'true'
									   :labelTxt = "'Neues Passwort'"
									   :value = "newPassword"
									   :isRequired = 'true'
									   @change = "onChangeNewPassword"
									   @blur = "onBlur" />
					</div>
					<div class = "modal__main__item confirm-new-password">
						<InputPassword :labelTxt = "'Bestätigen Sie das neue Passwort'"
									   :value = "password_confirmation"
									   :isRequired = 'true'
									   :isValidate = 'false'
									   @change = "onChangePasswordConfirmation"
									   @blur = "onBlur" />
					</div>
				</div>
				<transition name = "main-animation">
					<span v-if = "errors.password" class = "equal-error">{{ errors.password }}</span>
				</transition>
				<footer class = "modal__footer">
					<button class = "control-btn control-btn--cancel"
							@click.stop = "closeModal($modals.personalInfoChangeEmail)">Abbrechen
					</button>
					<button class = "control-btn control-btn--submit"
							:class = "{'is-disable': isSubmitDisabled}"
							@click.stop = "onSubmit">Bestätigen
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
                isSubmit              : false,
                isPasswordsEqual      : false,
                currentPassword       : "",
                newPassword           : "",
                password_confirmation : ""
            }
        },
        computed   : {
            isSubmitDisabled(){
                return !this.currentPassword || !this.checkPassword(this.currentPassword) ||
                    !this.newPassword || !this.checkPassword(this.newPassword) ||
                    !this.password_confirmation || !this.checkPassword(this.password_confirmation) ||
                    this.password_confirmation !== this.newPassword;
            }
        },
        methods    : {
            onSubmit(){
                this.isSubmit = true;

                let formData = new FormData();

                formData.append("old_password", this.currentPassword);
                formData.append("password", this.newPassword);
                formData.append("password_confirmation", this.password_confirmation);

                formData.append("_method", "PATCH");

                this.$store.dispatch("user/UPDATE_USER", {
                    id     : this.$store.state.user.user.id,
                    token  : this.$cookies.get(this.$cookie.names.token),
                    params : formData
                }).then((response) => {
                    this.closeModal(this.$modals.personalInfoChangePassword);
                    this.openModal(this.$modals.defaultModal, "Password success changed", "Herzliche Glückwünsche!");
                }).catch((error) => {
                    // this.closeModal(this.$modals.personalInfoChangePassword);
                    this.openModal(this.$modals.defaultModal, error.message, "Etwas ist schief gelaufen!");
                });
            },
            onBlur(event){
                if(this.newPassword && this.password_confirmation){
                    if(this.newPassword === this.password_confirmation){
                        if(this.errors.hasOwnProperty("password")){
                            delete this.errors["password"];
                        }

                        this.isPasswordsEqual = true;
                    } else{
                        this.errors.password  = this.$t("errors.form.passwords-not-equal");
                        this.isPasswordsEqual = false;
                    }

                    this.$forceUpdate();
                }
            },
            comparePasswords(){
                if(this.errors.password){
                    delete this.errors.password;
                }

                if(this.newPassword && this.password_confirmation){
                    if(this.newPassword === this.password_confirmation){
                        this.isPasswordsEqual = true;
                    }

                    this.$forceUpdate();
                }
            },
            onChangeNewPassword(event){
                this.newPassword = event.target.value;
                this.comparePasswords();
            },
            onChangePasswordConfirmation(event){
                this.password_confirmation = event.target.value;
                this.comparePasswords();
            }
        }
    }
</script>

<style lang = "scss" scoped>
	.modal {
		&__main {
			&__item {
				margin-bottom : $main_offset;
				
				&:last-child { margin-bottom : 0; }
			}
		}
	}
	
	.equal-error {
		color     : $color-alert-red;
		float     : left;
		font-size : .75em;
	}
</style>