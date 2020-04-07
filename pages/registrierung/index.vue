<template>
    <div class="page">
        <div class="section section--registration">
            <div class="container">
                <RegistrationContent />
                        <Signup />
                </div>
            </div>
        </div>
</template>

<script>
import Signup from "~/components/Authorization/Signup";
import RegistrationContent from "~/components/Static/RegistrationContent"

export default {
    middleware: [
        'nonauth',
    ],
    head(){
            return {title : this.$t("page-auth.head.title")}
        },
    async fetch ({ app, store, error }) {
        // if token exist and user empty - load User object        
        if (app.$cookies.get(app.cookie.names.token) && store.getters['user/USER'] === null) {
            await store.dispatch('user/LOAD_USER', { id: app.$cookies.get(app.cookie.names.tokenId), token: app.$cookies.get(app.cookie.names.token) })
                .catch(error => {
                    app.$cookies.remove(app.cookie.names.token)
                    app.$cookies.remove(app.cookie.names.tokenId)
                })
        }
    },

    components: {
        Signup,
        RegistrationContent
    },
  
};
</script>


<style lang="scss">
.section{
    &--authorization, &--registration{

        @include tablet-big {
            padding-top: 51px;
            padding-bottom: 51px;
        }
    
        .container {
            form {
                @media (min-width : #{962px}) {
                    width  : 50%;
                    margin : auto;
                }
            }
        
            .form__item {
                input, #vue-tel-input.vue-tel-input {
                    @media (min-width : #{962px}) {
                        width : 100%;
                    }
                }
                &--checkbox {
                    input {
                        @media (min-width : #{962px}) {
                            width : auto;
                        }
                    }
                }
            }
        }
        
    }
    
  
}

</style>