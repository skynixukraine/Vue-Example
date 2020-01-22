<template>
    <div class="page">
        <div class="section">
            <div class="container">
                <div class="tab-buttons">
                    <button
                        class="link link--button link--button-blue"
                        @click="setCurrentTab('signin')"
                    >Sign In</button>
                    <button
                        class="link link--button link--button-blue"
                        @click="setCurrentTab('signup')"
                    >Sign Up</button>
                </div>
                <div class="container-forms">
                    <template v-if="windowWidth  > 962 || currentTab === 'signin'">
                        <Signin />
                    </template>
                    <template v-if="windowWidth  > 962 || currentTab === 'signup'">
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
    middleware: 'nonauth',

    mixins: [windowWidth],

    components: {
        Signin,
        Signup
    },

    beforeCreate() {
        setTimeout(() => {
            this.$store.dispatch("user/AUTOLOGIN_USER", {
                token: this.$store.getters["user/TOKEN"],
                user: this.$store.getters["user/USER"]
            });
        }, 0);
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
.container-forms {
    width: 100%;
    max-width: 1160px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 5%;

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