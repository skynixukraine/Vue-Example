<template>
	<div class = "verify-email">
		<h1>{{ title }}</h1>
		<transition name = "main-animation">
			<p class = "verify-email__message" v-if = "message">{{ message }}</p>
		</transition>
		<Loader v-if = "!isLoadingFinish" />
		<div class = "verify-email__sign-in-container" v-else>
			<transition name = "main-animation">
				<SigninForm v-if = "isSuccess" />
			</transition>
		</div>
		<NuxtLink :to = "$routes.home.path"
				  class = "link link--button link--button-blue link--button-gradient"
				  exact>Back to Home Page
		</NuxtLink>
	</div>
</template>

<script>
    import Loader from "~/components/App/Loader";
    import SigninForm from "~/components/Authorization/SigninForm";

    export default {
        components : {
            Loader,
            SigninForm
        },
        created(){
            if(process.client){
                this.verifyEmail();
            }
        },
        data(){
            return {
                title           : "Checking your email.",
                message         : "",
                isSuccess       : false,
                isLoadingFinish : false,
            }
        },
        methods    : {
            validateQuery(query){
                if(query.hasOwnProperty("expires") && query.hasOwnProperty("id") && query.hasOwnProperty("signature")){
                    return true;
                } else{
                    this.message = "Invalid vefiry data for sending.";
                    return false;
                }
            },
            prepareDataForSending(query){
                return {
                    id        : query.id,
                    expires   : query.expires,
                    signature : query.signature,
                };
            },
            verifyEmail(){
                if(this.validateQuery(this.$route.query)){
                    const requestData = this.prepareDataForSending(this.$route.query);

                    this.$store.dispatch("user/VERIFY_USER_EMAIL", requestData)
                        .then(response => {
                            this.title           = "Congratulation!";
                            this.message         = "Your mail has been successfully confirmed, now you can enter your personal account.";
                            this.isSuccess       = true;
                            this.isLoadingFinish = true;

                            // need this code for new component
                            // this.$store.dispatch("user/LOAD_USER", {
                            //     id: this.$cookies.get(this.$cookie.names.tokenId),
                            //     token: this.$cookies.get(this.$cookie.names.token)
                            // })
                        })
                        .catch(error => {
                            this.title           = "Something went wrong";
                            this.message         = error.message;
                            this.isLoadingFinish = true;
                        });
                }
            },
        }
    }
</script>

<style lang = "scss" scoped>
	.verify-email {
		
		&__sign-in-container {
			margin         : 0 auto $main_offset / 2;
			display        : flex;
			max-width      : 600px;
			align-items    : center;
			flex-direction : column;
		}
		
		&__message {
			margin-bottom : $main_offset / 2;
		}
		
		.link {
			margin-top : $main_offset;
		}
	}
</style>