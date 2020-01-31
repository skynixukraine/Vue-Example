<template>
    <div class="page">
        <div class="section section--authorization">
            <div class="container">
                <div class="tab-buttons">
                    <button
                        class="link link--button link--button-blue link--button-gradient"
                        @click="setCurrentTab('signin')"
                    >Sign In</button>
                    <button
                        class="link link--button link--button-blue link--button-gradient"
                        @click="setCurrentTab('signup')"
                    >Sign Up</button>
                </div>
                <div class="container-forms">
                    <template v-if="windowWidth  >= 962 || currentTab === 'signin'">
                        <Signin />
                    </template>
                    <template v-if="windowWidth  >= 962 || currentTab === 'signup'">
                        <Signup />
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// Mixins
import windowWidth from "~/mixins/window";
// Components
import Signin from "~/components/Authorization/Signin";
import Signup from "~/components/Authorization/Signup";

const DEFAULT_CURRENT_TAB = "signin";

export default {
    middleware: [
        'nonauth',
    ],

    mixins: [windowWidth],

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
        Signin,
        Signup
    },

    data() {
        return {
            currentTab: DEFAULT_CURRENT_TAB
        };
    },

    methods: {
        setCurrentTab(tabName) {
            this.currentTab = tabName;
        }
    }
};
</script>


<style lang="scss">
.section{
    &--authorization{

        @include tablet-big {
            padding-top: 51px;
            padding-bottom: 51px;
        }
    }
}

.container-forms {
    width: 100%;
    max-width: 1160px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0;

    @media (min-width: #{962px}) {
        flex-direction: row;
        justify-content: space-around;
    }

    & > div {
     @media (min-width: #{962px}) {
         flex: 50%;
         padding: 0 10px;
    }

 }
}

.tab-buttons {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-content: center;
    margin: 0 auto;


    @media (min-width: #{962px}) {
        display: none;
    }

    button{
        margin: 1.5% 0;
    }
}
</style>